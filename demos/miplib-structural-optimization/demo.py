#!/usr/bin/env python3
"""IsoGraph MIPLIB structural-optimization demo.

Default mode reproduces the exact structural certificate and the direct mapping
back to the original n5-3 variables. Benchmark mode additionally runs paired
SCIP solves on the original model.

Agent-assisted research produced using the IsoGraph system designed by
Joshua Oshiro.
"""

import argparse
import gzip
import hashlib
import json
import math
import statistics
import time
import urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

SOURCE_URL = "https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
EXPECTED_GZIP_SHA256 = "48efedf21c4057851a4ef7efc79fbbcbd292b68ee5f6b6a16e904d11ab11bacc"
EXPECTED_MPS_SHA256 = "9369795c7d1f3943e9204b140fc2c77714790d4b4856fe354d48e6abef00f31f"
EXPECTED_TRANSFORMED = [("t_C0021", "t_C0026"), ("t_C0027", "t_C0028")]
EXPECTED_ORIGINAL = [("C0021", "C0026"), ("C0027", "C0028")]
BAD_STATUSES = {"FIXED", "AGGREGATED", "MULTAGGR", "NEGATED"}


def cf(x):
    x = float(x)
    inf = highspy.kHighsInf
    if x >= 0.5 * inf:
        return "+INF"
    if x <= -0.5 * inf:
        return "-INF"
    if abs(x) < 1e-13:
        x = 0.0
    return format(x, ".12g")


def close(a, b, tol=1e-10):
    return abs(float(a) - float(b)) <= tol * max(1.0, abs(float(a)), abs(float(b)))


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def download(out_dir):
    print("Downloading official MIPLIB n5-3 instance...")
    compressed = urllib.request.urlopen(SOURCE_URL, timeout=90).read()
    raw = gzip.decompress(compressed)
    gz_hash = sha256(compressed)
    raw_hash = sha256(raw)
    if gz_hash != EXPECTED_GZIP_SHA256:
        raise RuntimeError(f"compressed-source hash mismatch: {gz_hash}")
    if raw_hash != EXPECTED_MPS_SHA256:
        raise RuntimeError(f"MPS hash mismatch: {raw_hash}")
    path = out_dir / "n5-3.mps"
    path.write_bytes(raw)
    return path, {
        "url": SOURCE_URL,
        "gzip_sha256": gz_hash,
        "mps_sha256": raw_hash,
    }


def set_common(model, seed, time_limit, symmetry=None):
    try:
        model.setIntParam("parallel/maxnthreads", 1)
    except Exception:
        pass
    try:
        model.setIntParam("randomization/randomseedshift", int(seed))
    except Exception:
        pass
    if symmetry is not None:
        model.setIntParam("misc/usesymmetry", int(symmetry))
    if time_limit is not None:
        model.setRealParam("limits/time", float(time_limit))


def matrix_views(lp):
    n = int(lp.num_col_)
    m = int(lp.num_row_)
    rows = [{} for _ in range(m)]
    cols = [{} for _ in range(n)]
    start = list(lp.a_matrix_.start_)
    index = list(lp.a_matrix_.index_)
    value = list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_ == highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(start[j], start[j + 1]):
                i = int(index[p])
                v = float(value[p])
                rows[i][j] = v
                cols[j][i] = v
    elif lp.a_matrix_.format_ == highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(start[i], start[i + 1]):
                j = int(index[p])
                v = float(value[p])
                rows[i][j] = v
                cols[j][i] = v
    else:
        raise RuntimeError(f"unsupported matrix format: {lp.a_matrix_.format_}")
    return rows, cols


def build_active_graph_data(lp, rows, cols, active_names):
    nold = int(lp.num_col_)
    m = int(lp.num_row_)
    raw_names = list(lp.col_names_)
    costs = [float(x) for x in lp.col_cost_]
    lowers = [float(x) for x in lp.col_lower_]
    uppers = [float(x) for x in lp.col_upper_]
    integrality = list(lp.integrality_) if len(lp.integrality_) else []
    row_lowers = [float(x) for x in lp.row_lower_]
    row_uppers = [float(x) for x in lp.row_upper_]

    old_names = [
        str(raw_names[j]) if j < len(raw_names) and raw_names[j] else f"col#{j}"
        for j in range(nold)
    ]
    active = []
    inactive = []
    for j, name in enumerate(old_names):
        (active if name in active_names else inactive).append(j)

    unsafe = []
    for j in inactive:
        degree = len(cols[j])
        if not (
            degree == 0
            and (close(costs[j], 0.0) or close(lowers[j], uppers[j]))
        ):
            unsafe.append(
                {
                    "name": old_names[j],
                    "degree": degree,
                    "cost": costs[j],
                    "lower": lowers[j],
                    "upper": uppers[j],
                }
            )
    if unsafe:
        raise RuntimeError(f"unsafe export-only columns: {unsafe[:5]}")

    remap = [-1] * nold
    for k, j in enumerate(active):
        remap[j] = k

    names = [old_names[j] for j in active]
    attrs = [
        (
            "V",
            cf(costs[j]),
            cf(lowers[j]),
            cf(uppers[j]),
            str(integrality[j]) if integrality else "C",
        )
        for j in active
    ]
    attrs.extend(("R", cf(row_lowers[i]), cf(row_uppers[i])) for i in range(m))

    triples = []
    for i, row in enumerate(rows):
        for j, a in row.items():
            k = remap[j]
            if k >= 0:
                triples.append((i, k, float(a)))

    attrs.extend(("E", cf(a)) for _, _, a in triples)

    palette = {}
    colors = []
    for attr in attrs:
        if attr not in palette:
            palette[attr] = len(palette)
        colors.append(palette[attr])

    base = len(active) + m
    edges = []
    for k, (i, j, _) in enumerate(triples):
        e = base + k
        edges.append((j, e))
        edges.append((e, len(active) + i))

    meta = {
        "active_variables": len(active),
        "dropped_export_only_variables": len(inactive),
        "rows": m,
        "active_nonzeros": len(triples),
        "vertices": len(attrs),
        "edges": len(edges),
        "color_classes": len(palette),
    }
    return names, colors, edges, meta


def replay_generator(graph, colors, permutation, edge_set):
    if len(permutation) != graph.vcount():
        raise RuntimeError("generator length mismatch")
    if sorted(permutation) != list(range(graph.vcount())):
        raise RuntimeError("generator is not a permutation")
    for i, image in enumerate(permutation):
        if colors[i] != colors[image]:
            raise RuntimeError("generator changes a vertex color")
    for u, v in edge_set:
        mapped = tuple(sorted((permutation[u], permutation[v])))
        if mapped not in edge_set:
            raise RuntimeError("generator fails exact edge replay")


def select_two(generators, names, graph, colors):
    n = len(names)
    edge_set = {tuple(sorted(e.tuple)) for e in graph.es}
    accepted = []

    for k, permutation in enumerate(generators):
        replay_generator(graph, colors, permutation, edge_set)
        moved = [j for j in range(n) if permutation[j] != j]
        if not moved:
            continue
        if any(permutation[j] >= n for j in moved):
            raise RuntimeError("variable maps outside the variable partition")
        involution = all(
            permutation[permutation[i]] == i for i in range(len(permutation))
        )
        _, a = sorted((names[j], j) for j in moved)[0]
        b = permutation[a]
        accepted.append(
            {
                "index": k,
                "permutation": permutation,
                "a": a,
                "b": b,
                "a_name": names[a],
                "b_name": names[b],
                "involution": involution,
                "moved_variables": len(moved),
            }
        )

    accepted.sort(key=lambda x: (x["a_name"], x["b_name"], x["index"]))

    for i in range(len(accepted)):
        for j in range(i + 1, len(accepted)):
            x = accepted[i]
            y = accepted[j]
            if not (x["involution"] and y["involution"]):
                continue
            if y["permutation"][x["a"]] != x["a"] or y["permutation"][x["b"]] != x["b"]:
                continue
            if x["permutation"][y["a"]] != y["a"] or x["permutation"][y["b"]] != y["b"]:
                continue
            pairs = [(x["a_name"], x["b_name"]), (y["a_name"], y["b_name"])]
            return accepted, pairs

    raise RuntimeError("no composable active symmetry pair found")


def var_record(variable):
    return {
        "name": str(variable.name),
        "status": str(variable.getStatus()),
        "active": bool(variable.isActive()),
        "vtype": str(variable.vtype()),
        "lb_global": float(variable.getLbGlobal()),
        "ub_global": float(variable.getUbGlobal()),
    }


def discover_and_map(source_path, out_dir):
    t0 = time.perf_counter()
    stages = {}

    model = Model()
    model.hideOutput(True)
    set_common(model, seed=0, time_limit=None, symmetry=0)
    model.readProblem(str(source_path))
    original = {str(v.name): v for v in model.getVars(transformed=False)}

    for a, b in EXPECTED_ORIGINAL:
        if a not in original or b not in original:
            raise RuntimeError(f"required original variable missing: {a}/{b}")

    t = time.perf_counter()
    model.presolve()
    stages["scip_presolve_s"] = time.perf_counter() - t

    mapping = {}
    for original_name in sorted({x for pair in EXPECTED_ORIGINAL for x in pair}):
        ov = original[original_name]
        tv = model.getTransformedVar(ov)
        orec = var_record(ov)
        trec = var_record(tv)
        expected_name = "t_" + original_name
        record = {
            "original": orec,
            "transformed": trec,
            "expected_transformed_name": expected_name,
            "name_match": trec["name"] == expected_name,
            "status_acceptable": trec["status"] not in BAD_STATUSES,
            "domain_match": (
                orec["vtype"] == trec["vtype"]
                and close(orec["lb_global"], trec["lb_global"])
                and close(orec["ub_global"], trec["ub_global"])
            ),
        }
        record["licensed"] = bool(
            record["name_match"]
            and trec["active"]
            and record["status_acceptable"]
            and record["domain_match"]
        )
        if not record["licensed"]:
            raise RuntimeError(f"original/transformed mapping not licensed: {original_name}")
        mapping[original_name] = record

    active_names = {str(v.name) for v in model.getVars(transformed=True)}
    residual_path = out_dir / "n5-stage1.mps"

    t = time.perf_counter()
    model.writeProblem(str(residual_path), trans=True, genericnames=False, verbose=False)
    stages["scip_export_s"] = time.perf_counter() - t

    highs = highspy.Highs()
    highs.setOptionValue("output_flag", False)

    t = time.perf_counter()
    if highs.readModel(str(residual_path)) == highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS failed to read SCIP transformed residual")
    stages["highs_parse_s"] = time.perf_counter() - t
    lp = highs.getLp()

    t = time.perf_counter()
    rows, cols = matrix_views(lp)
    stages["sparse_materialize_s"] = time.perf_counter() - t

    t = time.perf_counter()
    names, colors, edges, graph_meta = build_active_graph_data(
        lp, rows, cols, active_names
    )
    stages["graph_data_s"] = time.perf_counter() - t

    t = time.perf_counter()
    graph = ig.Graph(n=len(colors), edges=edges, directed=False)
    stages["igraph_construct_s"] = time.perf_counter() - t

    t = time.perf_counter()
    generators = graph.automorphism_group(sh="fl", color=colors)
    stages["bliss_s"] = time.perf_counter() - t

    t = time.perf_counter()
    active_generators, transformed_pairs = select_two(
        generators, names, graph, colors
    )
    stages["exact_replay_select_s"] = time.perf_counter() - t

    if transformed_pairs != EXPECTED_TRANSFORMED:
        raise RuntimeError(
            f"frozen transformed breaker drift: {transformed_pairs}"
        )

    stages["total_s"] = time.perf_counter() - t0

    return {
        "mapping": mapping,
        "transformed_breakers": transformed_pairs,
        "original_breakers": EXPECTED_ORIGINAL,
        "generator_count": len(generators),
        "active_generator_count": len(active_generators),
        "graph_meta": graph_meta,
        "stages": stages,
    }


def finite(x):
    try:
        x = float(x)
        return x if math.isfinite(x) else None
    except Exception:
        return None


def solve_original(source_path, seed, time_limit, breakers=None):
    t0 = time.perf_counter()
    model = Model()
    model.hideOutput(True)
    set_common(model, seed=seed, time_limit=time_limit, symmetry=None)
    model.readProblem(str(source_path))

    added = 0
    if breakers:
        variables = {str(v.name): v for v in model.getVars(transformed=False)}
        for k, (a, b) in enumerate(breakers):
            if a not in variables or b not in variables:
                raise RuntimeError(f"benchmark breaker variable missing: {a}/{b}")
            model.addCons(
                variables[a] >= variables[b],
                name=f"IG_DEMO_EXACT_BREAKER_{k}",
            )
            added += 1

    model.optimize()
    wall = time.perf_counter() - t0

    return {
        "status": str(model.getStatus()),
        "objective": finite(model.getPrimalbound()),
        "dual": finite(model.getDualbound()),
        "gap": finite(model.getGap()),
        "nodes": int(model.getNNodes()),
        "lp_iterations": int(model.getNLPIterations()),
        "wall_s": wall,
        "added_constraints": added,
    }


def median(values):
    values = [x for x in values if x is not None]
    return statistics.median(values) if values else None


def run_benchmark(source_path, frontend, seeds, time_limit):
    trials = []
    frontend_s = frontend["stages"]["total_s"]

    for seed in seeds:
        if seed % 2 == 0:
            baseline = solve_original(source_path, seed, time_limit, None)
            treated = solve_original(
                source_path, seed, time_limit, EXPECTED_ORIGINAL
            )
            order = "baseline_first"
        else:
            treated = solve_original(
                source_path, seed, time_limit, EXPECTED_ORIGINAL
            )
            baseline = solve_original(source_path, seed, time_limit, None)
            order = "treated_first"

        treated_e2e = frontend_s + treated["wall_s"]
        trial = {
            "seed": seed,
            "order": order,
            "baseline": baseline,
            "treated": treated,
            "treated_end_to_end_wall_s": treated_e2e,
        }
        trials.append(trial)

        print(
            f"seed {seed}: baseline={baseline['status']} {baseline['wall_s']:.3f}s; "
            f"treated={treated['status']} {treated_e2e:.3f}s e2e"
        )

    paired_optimal = [
        t
        for t in trials
        if t["baseline"]["status"] == "optimal"
        and t["treated"]["status"] == "optimal"
    ]

    for trial in paired_optimal:
        a = trial["baseline"]["objective"]
        b = trial["treated"]["objective"]
        if a is not None and b is not None and not close(a, b, 1e-8):
            raise RuntimeError(
                f"optimal objective mismatch at seed {trial['seed']}: {a} vs {b}"
            )

    summary = {
        "paired_both_optimal": len(paired_optimal),
        "paired_end_to_end_wins": sum(
            t["treated_end_to_end_wall_s"] < t["baseline"]["wall_s"]
            for t in paired_optimal
        ),
        "paired_end_to_end_losses": sum(
            t["treated_end_to_end_wall_s"] > t["baseline"]["wall_s"]
            for t in paired_optimal
        ),
        "baseline_median_wall_s": median(
            [t["baseline"]["wall_s"] for t in paired_optimal]
        ),
        "treated_median_end_to_end_wall_s": median(
            [t["treated_end_to_end_wall_s"] for t in paired_optimal]
        ),
        "baseline_median_nodes": median(
            [t["baseline"]["nodes"] for t in paired_optimal]
        ),
        "treated_median_nodes": median(
            [t["treated"]["nodes"] for t in paired_optimal]
        ),
        "baseline_median_lp_iterations": median(
            [t["baseline"]["lp_iterations"] for t in paired_optimal]
        ),
        "treated_median_lp_iterations": median(
            [t["treated"]["lp_iterations"] for t in paired_optimal]
        ),
        "structural_frontend_wall_s": frontend_s,
    }

    if paired_optimal:
        ratios = [
            t["treated_end_to_end_wall_s"] / t["baseline"]["wall_s"]
            for t in paired_optimal
            if t["baseline"]["wall_s"] > 0
        ]
        summary["median_end_to_end_ratio"] = median(ratios)

    return {"trials": trials, "summary": summary}


def parse_seeds(value):
    try:
        seeds = [int(x.strip()) for x in value.split(",") if x.strip()]
    except ValueError as exc:
        raise argparse.ArgumentTypeError("seeds must be comma-separated integers") from exc
    if not seeds:
        raise argparse.ArgumentTypeError("at least one seed is required")
    return seeds


def main():
    parser = argparse.ArgumentParser(
        description="Reproduce the IsoGraph n5-3 exact structural certificate."
    )
    parser.add_argument(
        "--benchmark",
        action="store_true",
        help="also run paired SCIP solves on the original model",
    )
    parser.add_argument(
        "--seeds",
        type=parse_seeds,
        default=parse_seeds("41,42,43"),
        help="comma-separated SCIP random seed shifts (default: 41,42,43)",
    )
    parser.add_argument(
        "--time-limit",
        type=float,
        default=60.0,
        help="per-solve benchmark limit in seconds (default: 60)",
    )
    parser.add_argument(
        "--out",
        default="out/result.json",
        help="result JSON path relative to this demo directory",
    )
    args = parser.parse_args()

    demo_dir = Path(__file__).resolve().parent
    output_path = demo_dir / args.out
    output_path.parent.mkdir(parents=True, exist_ok=True)
    working_dir = output_path.parent

    source_path, source = download(working_dir)

    print("Recomputing exact active-support structural certificate...")
    frontend = discover_and_map(source_path, working_dir)

    print("Certificate PASS")
    print("Transformed:", frontend["transformed_breakers"])
    print("Original:   ", frontend["original_breakers"])
    print(f"Structural frontend: {frontend['stages']['total_s']:.4f}s")

    result = {
        "demo": "isograph-miplib-structural-optimization",
        "author": "Joshua Oshiro",
        "source": source,
        "versions": {
            "highs": highspy.Highs().version(),
            "igraph": ig.__version__,
            "pyscipopt": pyscipopt.__version__,
        },
        "certificate": frontend,
        "benchmark": None,
        "disposition": "PASS",
    }

    if args.benchmark:
        print(
            f"Running paired benchmark: seeds={args.seeds}, "
            f"time_limit={args.time_limit}s"
        )
        result["benchmark"] = run_benchmark(
            source_path, frontend, args.seeds, args.time_limit
        )
        print(json.dumps(result["benchmark"]["summary"], indent=2))

    output_path.write_text(json.dumps(result, indent=2) + "\n")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
