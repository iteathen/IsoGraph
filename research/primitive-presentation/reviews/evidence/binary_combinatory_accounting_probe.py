#!/usr/bin/env python3
"""Bounded two-symbol SK test: count grammar and evaluation, not just binary bytes.

This test verifies a finite set of examples of binary combinatory logic. It is
NOT a proof of universality, primitive-role minimality, physical ontology, or
a self-grounding/Godel impossibility.
"""
from functools import lru_cache
import json

K, S = "K", "S"


def app(x, y):
    return (x, y)


def encode(t):
    if t == K:
        return "00"
    if t == S:
        return "01"
    if not isinstance(t, tuple) or len(t) != 2:
        raise ValueError("invalid AST")
    return "1" + encode(t[0]) + encode(t[1])


def parse(bits, start=0):
    if start >= len(bits):
        raise ValueError("truncated term")
    if bits[start] == "1":
        x, p = parse(bits, start + 1)
        y, q = parse(bits, p)
        return app(x, y), q
    if start + 2 > len(bits):
        raise ValueError("truncated atom")
    atom = bits[start:start + 2]
    if atom == "00":
        return K, start + 2
    if atom == "01":
        return S, start + 2
    raise ValueError("invalid atom")


def decode(bits):
    tree, end = parse(bits)
    if end != len(bits):
        raise ValueError("extra bits outside complete term")
    return tree


@lru_cache(None)
def trees(application_count):
    if application_count == 0:
        return K, S
    return tuple(
        app(left, right)
        for left_count in range(application_count)
        for left in trees(left_count)
        for right in trees(application_count - 1 - left_count)
    )


def top_rewrite(tree):
    if not isinstance(tree, tuple):
        return None
    left, z = tree
    if not isinstance(left, tuple):
        return None
    op, y = left
    if op == K:
        return y
    if isinstance(op, tuple) and op[0] == S:
        x = op[1]
        return app(app(x, z), app(y, z))
    return None


def leftmost_outermost_rewrite(tree):
    root = top_rewrite(tree)
    if root is not None:
        return root
    if not isinstance(tree, tuple):
        return None
    left, right = tree
    new_left = leftmost_outermost_rewrite(left)
    if new_left is not None:
        return app(new_left, right)
    new_right = leftmost_outermost_rewrite(right)
    if new_right is not None:
        return app(left, new_right)
    return None


def main():
    candidates = tuple(tree for n in range(5) for tree in trees(n))
    encodings = [encode(tree) for tree in candidates]
    assert len(candidates) == 550, len(candidates)
    assert len(set(encodings)) == len(candidates)
    assert all(decode(code) == tree for code, tree in zip(encodings, candidates))
    samples = (
        (app(app(K, S), K), S),
        (app(app(app(S, K), K), S), app(app(K, S), app(K, S))),
        (app(app(app(S, K), K), K), app(app(K, K), app(K, K))),
    )
    for before, after in samples:
        assert leftmost_outermost_rewrite(before) == after
        assert decode(encode(leftmost_outermost_rewrite(before))) == after
    assert parse("10001") == (app(K, S), 5)
    malformed = ("", "0", "1", "001", "010", "1000", "111", "11")
    for bits in malformed:
        try:
            decode(bits)
            raise AssertionError("unexpected valid term " + bits)
        except ValueError:
            pass
    print(json.dumps({
        "result": "PASS",
        "alphabet": ["0", "1"],
        "object_grammar": "Term ::= 00 | 01 | 1 Term Term",
        "meaning": {"00": "K", "01": "S", "1xy": "App(x,y)"},
        "max_application_count": 4,
        "distinct_terms_roundtripped": len(candidates),
        "reduction_cases_checked": len(samples),
        "malformed_strings_rejected": len(malformed),
        "limits": [
            "The grammar, parser, reduction clauses, rewrite-selection strategy, and readout convention remain counted apparatus.",
            "This is not a two-primitive-role lower/upper bound.",
            "This is not a physically instantiated self-sufficient universe or a proof of universal self-grounding."
        ]
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
