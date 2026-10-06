#!/usr/bin/env python3
import gzip
import hashlib
import json
import math
import os
import time
import urllib.request
from pathlib import Path

import highspy
import numpy as np

OUT = Path("out/miplib-structural-presolve-symmetry")
OUT.mkdir(parents=True, exist_ok=True)
URL = "https://miplib.zib.de/WebData/instances/glass4.mps.gz"
EXPECTED = 1200012599.972384
TIME_LIMIT = 30.0

def download():
    gz_path = OUT / "glass4.mps.gz"
    mps_path = OUT / "glass4.mps"
    data = urllib.request.urlopen(URL, timeout=60).read()
    gz_path.write_bytes(data)
    raw = gzip.decompress(data)
    mps_path.write_bytes(raw)
    return {
        "gz_sha256": hashlib.sha256(data).hexdigest(),
        "mps_sha256": hashlib.sha256(raw).hexdigest(),
        "gz_bytes": len(data),
        "mps_bytes": len(raw),
        "mps_path": str(mps_path),
    }

def configure(h, presolve="off"):
    opts = {
        "output_flag": False,
        "presolve": presolve,
        "threads": 1,
        "parallel": "off",
        "random_seed": 0,
        "time_limit": TIME_LIMIT,
        "mip_rel_gap": 0.0,
    }
    for k, v in opts.items():
        s = h.setOptionValue(k, v)
        if s == highspy.HighsStatus.kError:
            raise RuntimeError(f"failed option {k}={v}")

def matrix_views(lp):
    n = int(lp.num_col_)
    m = int(lp.num_row_)
    rows = [dict() for _ in range(m)]
    cols = [dict() for _ in range(n)]
    start = list(lp.a_matrix_.start_)
    index = list(lp.a_matrix_.index_)
    value = list(lp.a_matrix_.value_)
    fmt = lp.a_matrix_.format_
    if fmt == highspy.MatrixFormat.kColwise:
        if len(start) != n + 1:
            raise RuntimeError(f"unexpected colwise start length {len(start)} for {n} cols")
        for j in range(n):
            for p in range(start[j], start[j + 1]):
                i = int(index[p])
                v = float(value[p])
                cols[j][i] = v
                rows[i][j] = v
    elif fmt == highspy.MatrixFormat.kRowwise:
        if len(start) != m + 1:
            raise RuntimeError(f"unexpected rowwise start length {len(start)} for {m} rows")
        for i in range(m):
            for p in range(start[i], start[i + 1]):
                j = int(index[p])
                v = float(value[p])
                rows[i][j] = v
                cols[j][i] = v
    else:
        raise RuntimeError(f"unsupported matrix format {fmt}")
    return rows, cols

def is_binary(lp, j):
    if len(lp.integrality_) <= j:
        return False
    return (
        lp.integrality_[j] == highspy.HighsVarType.kInteger
        and float(lp.col_lower_[j]) == 0.0
        and float(lp.col_upper_[j]) == 1.0
    )

def row_without(row, a, b):
    return tuple(sorted((j, v) for j, v in row.items() if j != a and j != b))

def verify_restricted_transposition(lp, rows, cols, a, b):
    # Column semantics must be exactly exchangeable.
    if not (is_binary(lp, a) and is_binary(lp, b)):
        return None
    if float(lp.col_cost_[a]) != float(lp.col_cost_[b]):
        return None
    if float(lp.col_lower_[a]) != float(lp.col_lower_[b]):
        return None
    if float(lp.col_upper_[a]) != float(lp.col_upper_[b]):
        return None
    if lp.integrality_[a] != lp.integrality_[b]:
        return None

    touched = sorted(set(cols[a]) | set(cols[b]))
    different = [r for r in touched if cols[a].get(r, 0.0) != cols[b].get(r, 0.0)]
    if len(different) != 2:
        return None
    r, s = different

    # The two differing rows must themselves be exchangeable.
    if float(lp.row_lower_[r]) != float(lp.row_lower_[s]):
        return None
    if float(lp.row_upper_[r]) != float(lp.row_upper_[s]):
        return None
    if row_without(rows[r], a, b) != row_without(rows[s], a, b):
        return None
    if rows[r].get(a, 0.0) != rows[s].get(b, 0.0):
        return None
    if rows[r].get(b, 0.0) != rows[s].get(a, 0.0):
        return None

    # Every other row is fixed by the transposition, so it must see equal coefficients.
    for q in touched:
        if q in (r, s):
            continue
        if cols[a].get(q, 0.0) != cols[b].get(q, 0.0):
            return None

    return {
        "cols": [a, b],
        "rows": [r, s],
        "col_names": [str(lp.col_names_[a]), str(lp.col_names_[b])],
        "row_names": [str(lp.row_names_[r]), str(lp.row_names_[s])],
        "cost": float(lp.col_cost_[a]),
        "bounds": [float(lp.col_lower_[a]), float(lp.col_upper_[a])],
        "integrality": str(lp.integrality_[a]),
        "proof": (
            "Exact restricted automorphism: swapping the two binary columns and the two "
            "listed rows leaves objective coefficients, variable domains, row bounds, "
            "and every matrix coefficient unchanged; all remaining rows are fixed."
        ),
    }

def find_transpositions(lp):
    rows, cols = matrix_views(lp)
    n = int(lp.num_col_)
    buckets = {}
    for j in range(n):
        if not is_binary(lp, j):
            continue
        key = (
            float(lp.col_cost_[j]),
            float(lp.col_lower_[j]),
            float(lp.col_upper_[j]),
            str(lp.integrality_[j]),
            len(cols[j]),
            tuple(sorted(cols[j].values())),
        )
        buckets.setdefault(key, []).append(j)

    certs = []
    for group in buckets.values():
        for ix in range(len(group)):
            for iy in range(ix + 1, len(group)):
                c = verify_restricted_transposition(lp, rows, cols, group[ix], group[iy])
                if c is not None:
                    certs.append(c)
    certs.sort(key=lambda c: tuple(c["col_names"]))
    return certs

def solve_lp(lp, breaker=None):
    h = highspy.Highs()
    configure(h, "off")
    if h.passModel(lp) == highspy.HighsStatus.kError:
        raise RuntimeError("passModel failed")
    if breaker is not None:
        a, b = breaker["cols"]
        idx = np.array([a, b], dtype=np.int32)
        val = np.array([1.0, -1.0], dtype=np.double)
        status = h.addRow(0.0, highspy.kHighsInf, 2, idx, val)
        if status == highspy.HighsStatus.kError:
            raise RuntimeError("addRow symmetry breaker failed")
    t0 = time.perf_counter()
    h.run()
    wall = time.perf_counter() - t0
    info = h.getInfo()
    status = h.getModelStatus()
    return {
        "status": h.modelStatusToString(status),
        "optimal": status == highspy.HighsModelStatus.kOptimal,
        "objective": float(info.objective_function_value),
        "dual_bound": float(info.mip_dual_bound),
        "gap": float(info.mip_gap),
        "nodes": int(info.mip_node_count),
        "lp_iterations": int(info.simplex_iteration_count),
        "highs_runtime_s": float(h.getRunTime()),
        "wall_runtime_s": wall,
        "rows": int(h.getNumRow()),
        "cols": int(h.getNumCol()),
        "nonzeros": int(h.getNumNz()),
    }

def main():
    source = download()
    source_h = highspy.Highs()
    source_h.setOptionValue("output_flag", False)
    if source_h.readModel(source["mps_path"]) == highspy.HighsStatus.kError:
        raise RuntimeError("readModel failed")
    if source_h.presolve() == highspy.HighsStatus.kError:
        raise RuntimeError("presolve failed")
    lp = source_h.getPresolvedLp()
    certs = find_transpositions(lp)

    chosen = None
    for c in certs:
        if c["col_names"] == ["z1&3.4", "z1&3.8"]:
            chosen = c
            break
    if chosen is None and certs:
        chosen = certs[0]

    baseline = solve_lp(lp, None)
    broken = solve_lp(lp, chosen) if chosen is not None else None

    result = {
        "experiment": "miplib-structural-presolve-symmetry-0.1",
        "date": "2026-10-06",
        "highs_version": highspy.Highs().version(),
        "instance": "glass4",
        "source": source,
        "presolved_dimensions": {
            "rows": int(lp.num_row_),
            "cols": int(lp.num_col_),
            "nonzeros": len(lp.a_matrix_.value_),
        },
        "exact_restricted_transpositions": certs,
        "chosen_breaker": chosen,
        "symmetry_break_law": (
            "For an objective-preserving automorphism swapping x and y, imposing x>=y "
            "retains at least one representative of every two-element orbit and therefore "
            "preserves the optimal objective value."
        ) if chosen else None,
        "baseline": baseline,
        "symmetry_broken": broken,
        "expected_objective": EXPECTED,
    }

    failures = []
    if chosen is None:
        failures.append("NO_EXACT_TRANSPOSITION_FOUND")
    if broken is not None and baseline["optimal"] and broken["optimal"]:
        if not math.isclose(baseline["objective"], broken["objective"], rel_tol=1e-9, abs_tol=1e-6):
            failures.append("OPTIMAL_OBJECTIVE_MISMATCH")
    if broken is not None and broken["optimal"]:
        if not math.isclose(broken["objective"], EXPECTED, rel_tol=1e-9, abs_tol=1e-4):
            failures.append("MIPLIB_TARGET_MISMATCH")

    result["failures"] = failures
    result["disposition"] = "PASS" if not failures else "FAIL"
    if broken is not None:
        result["comparison"] = {
            "node_ratio_broken_over_baseline": (
                broken["nodes"] / baseline["nodes"] if baseline["nodes"] > 0 else None
            ),
            "lp_iteration_ratio_broken_over_baseline": (
                broken["lp_iterations"] / baseline["lp_iterations"]
                if baseline["lp_iterations"] > 0 else None
            ),
            "baseline_gap": baseline["gap"],
            "symmetry_broken_gap": broken["gap"],
            "baseline_incumbent": baseline["objective"],
            "symmetry_broken_incumbent": broken["objective"],
            "baseline_dual_bound": baseline["dual_bound"],
            "symmetry_broken_dual_bound": broken["dual_bound"],
        }

    (OUT / "SYMMETRY_RESULT.json").write_text(json.dumps(result, indent=2) + "\n")
    lines = [
        "# MIPLIB structural presolve — symmetry follow-up",
        "",
        f"**Disposition:** {result['disposition']}",
        f"**Exact restricted transpositions:** {len(certs)}",
        f"**Chosen pair:** {chosen['col_names'] if chosen else None}",
        "",
        "## Controlled comparison",
        "",
        "| Variant | Status | Incumbent | Bound | Gap | Nodes | LP iterations | Wall |",
        "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |",
        f"| Baseline presolved residual | {baseline['status']} | {baseline['objective']} | {baseline['dual_bound']} | {baseline['gap']} | {baseline['nodes']} | {baseline['lp_iterations']} | {baseline['wall_runtime_s']:.4f}s |",
    ]
    if broken is not None:
        lines.append(
            f"| + exact symmetry breaker | {broken['status']} | {broken['objective']} | {broken['dual_bound']} | {broken['gap']} | {broken['nodes']} | {broken['lp_iterations']} | {broken['wall_runtime_s']:.4f}s |"
        )
    lines += [
        "",
        "The symmetry breaker is accepted only after an exact coefficient-level transposition check. "
        "Equal refinement color alone is not sufficient.",
        "",
        "This pass tests one exact consequence of the first-run structural lead; it is not a claim "
        "that the restricted detector is a complete symmetry algorithm.",
    ]
    (OUT / "SYMMETRY_SUMMARY.md").write_text("\n".join(lines) + "\n")
    print(json.dumps({
        "disposition": result["disposition"],
        "transpositions": len(certs),
        "chosen": chosen["col_names"] if chosen else None,
        "baseline": baseline,
        "symmetry_broken": broken,
        "comparison": result.get("comparison"),
        "failures": failures,
    }, indent=2))
    if failures:
        raise SystemExit(1)

if __name__ == "__main__":
    main()
