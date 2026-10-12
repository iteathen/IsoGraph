#!/usr/bin/env python3
"""Bounded independent grammar/regression check of archived inquiry manuscript.

Implements the §7 SKI delimiter grammar and tests roundtrips, sample reductions,
and the §14 displayed strings. This test does NOT prove universality, role
minimality, ontological correspondence, or any physical claim.
"""
from __future__ import annotations

from functools import lru_cache
import json

DOT = "∅"
S, K, I = "S", "K", "I"


def app(left, right):
    return (left, right)


def encode(term):
    if isinstance(term, str):
        return "(" + DOT * {S: 1, K: 2, I: 3}[term] + ")"
    left, right = term
    return "((" + encode(left) + ")(" + encode(right) + "))"


def _parse(source, pos):
    if pos >= len(source) or source[pos] != "(":
        raise ValueError("not a Term")
    pos += 1
    if pos < len(source) and source[pos] == DOT:
        start = pos
        while pos < len(source) and source[pos] == DOT:
            pos += 1
        run_len = pos - start
        if run_len not in (1, 2, 3) or pos >= len(source) or source[pos] != ")":
            raise ValueError("invalid Atom")
        return {1: S, 2: K, 3: I}[run_len], pos + 1
    if pos < len(source) and source[pos] == "(":
        left, pos = _parse(source, pos + 1)
        if pos >= len(source) or source[pos] != ")":
            raise ValueError("unclosed left subterm")
        pos += 1
        if pos >= len(source) or source[pos] != "(":
            raise ValueError("missing right wrapper")
        right, pos = _parse(source, pos + 1)
        if pos + 1 >= len(source) or source[pos:pos + 2] != "))":
            raise ValueError("unclosed application")
        return app(left, right), pos + 2
    raise ValueError("invalid Term")


def decode(source):
    result, end = _parse(source, 0)
    if end != len(source):
        raise ValueError("trailing garbage")
    return result


def accepted(source):
    try:
        decode(source)
        return True
    except (ValueError, IndexError):
        return False


@lru_cache(None)
def terms(exact_app_nodes):
    if exact_app_nodes == 0:
        return (S, K, I)
    return tuple(
        (left, right)
        for left_app in range(exact_app_nodes)
        for left in terms(left_app)
        for right in terms(exact_app_nodes - 1 - left_app)
    )


def head_step(term):
    if isinstance(term, str):
        return None
    left, right = term
    if left == I:
        return right
    if isinstance(left, tuple):
        op, x = left
        if op == K:
            return x
        if isinstance(op, tuple) and op[0] == S:
            y = x
            z = right
            return app(app(op[1], z), app(y, z))
    left_step = head_step(left)
    if left_step is not None:
        return app(left_step, right)
    right_step = head_step(right)
    if right_step is not None:
        return app(left, right_step)
    return None


def main():
    all_terms = tuple(t for n in range(5) for t in terms(n))
    codes = tuple(encode(t) for t in all_terms)
    assert len(set(codes)) == len(all_terms)
    assert all(decode(code) == term for code, term in zip(codes, all_terms))
    samples = (
        (app(I, K), K),
        (app(app(K, S), I), S),
        (app(app(app(S, K), K), I), app(app(K, I), app(K, I))),
    )
    assert all(head_step(source) == target for source, target in samples)
    assert all(decode(encode(head_step(source))) == target for source, target in samples)
    cited = [DOT, "(" + DOT + ")", "((" + DOT + "))", "(" + DOT + "(" + DOT + "))"]
    report = {
        "scope": "bounded decode/encode grammar and sample SKI reductions; not theorem qualification",
        "max_application_nodes": 4,
        "distinct_source_terms_roundtripped": len(all_terms),
        "tested_reductions": len(samples),
        "witness_section_14_examples": [
            {"string": term, "accepted_by_section_7_grammar": accepted(term)}
            for term in cited
        ],
        "result": "PASS with 3/4 section 14 displayed examples ill-formed under section 7 grammar",
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
