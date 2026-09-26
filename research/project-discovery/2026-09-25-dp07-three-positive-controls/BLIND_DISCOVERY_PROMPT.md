# Blind DP 0.7 discovery prompt

You are given three anonymous pairs of frozen IsoGraph renderings.

Use the current qualified IsoGraph stack plus the unqualified DP 0.7 candidate on this branch.

## Input restriction

Read only files listed in `DISCOVERY_INPUT_MANIFEST.json.discovery_inputs`.

Do not read any path listed in `withheld_oracles`.

If an oracle file is accidentally exposed, mark that case `TEST_CONTAMINATED`.

## Task

For each pair independently:

1. compare primitive structure before using a high-level conceptual description;
2. ignore raw SI numbers, raw stable-label numbers, filenames, and domain vocabulary as evidence;
3. identify exact common structure;
4. propose an exact mapping witness where supported;
5. attempt reconstruction in both directions;
6. preserve residuals and scope;
7. use QU only when unresolved structure is actually load-bearing;
8. do not make a global negative-isomorphism claim from failure to find a mapping.

Report:

- mapping witness;
- common primitive structure;
- residuals;
- exact obligations verified;
- unresolved obligations;
- higher-level derived view, if one emerges only after primitive comparison.

Do not score against an expected answer during discovery.
