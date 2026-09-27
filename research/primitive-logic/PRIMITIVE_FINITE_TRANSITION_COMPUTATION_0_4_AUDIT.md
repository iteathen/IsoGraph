# Primitive finite transition computation 0.4 — configuration/carrier audit

**Status:** unqualified successor

Corrections from 0.3:

- removes the separate state/symbol carrier;
- all state, tape-symbol, movement, and distinguished raw values now live in the universal primitive finite-data carrier `7400`;
- all distinguished raw values are explicitly members of `7400`;
- every configuration-carrier object is explicitly a tagged four-field constructor object;
- state/current-symbol fields range over `7400`;
- left/right fields range over the finite-list carrier;
- each configuration field is functional.

This removes intended typing that previously existed only in the explanatory reading of the graph.
