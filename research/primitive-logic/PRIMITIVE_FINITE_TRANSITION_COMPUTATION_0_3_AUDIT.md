# Primitive finite transition computation 0.3 — carrier correction

**Status:** unqualified successor

0.2 incorrectly typed raw transition-table and bound-function relation objects in the ordinary state/symbol data carrier.

0.3 introduces a distinct raw relation-graph carrier:

```text
7900 = raw extensional relation/function graph identity carrier
```

and binds the transparent transition/path/bound definitions over that carrier.

This is a representation correction only. It prevents relation identities from being conflated with tape/state data identities.

The relation carrier contributes no hidden domain semantics: a relation object's behavior is only its applications/extension and the logical constraints represented over them.
