# IsoGraph Rendering Modernization Profile — 0.1

**Status:** research/authoring profile; not semantic authority  
**Purpose:** apply the current qualified rendering discipline plus the unqualified DP 0.8 successor view to existing formula/application renderings without rewriting frozen evidence.

## Governing boundaries

This profile changes no Core syntax and invents no implicit-assertion primitive.

For each subject, keep these layers distinct:

1. **source-semantic rendering** — exact/native source structure where an exact claim is made;
2. **implicit/derived support view** — consequences admitted only under Core 0.19 and pinned authority;
3. **discovery view** — DP structure such as common cores, residuals, alternate sufficient support, objective-relevant slices, and valuation;
4. **qualification/evidence state** — whether any of the above has actually been qualified.

A richer discovery view must not leak missing source semantics back into the native source rendering.

## Modernization checklist

For every maintained formula/application rendering:

- pin the source freeze/revision and declared interpretation;
- identify whether the artifact claims exact rendering, partial exploration, or derived view;
- preserve every load-bearing source distinction;
- remove unsupported additions from any successor that claims source faithfulness;
- keep QU explicit where unresolved structure is load-bearing;
- distinguish source-explicit assertions from derived/implicit support;
- preserve support provenance for derived assertions;
- keep high-level concepts as derived views over primitive structure;
- identify the declared target before sufficiency analysis;
- distinguish upstream support cone from bounded consumer/fallback analysis slice;
- distinguish sufficient, minimal, and minimum support correctly;
- treat nonessential-for-sufficiency as separate from an implementation omission recommendation;
- apply valuation only after sufficiency;
- use valuation quantities only when represented, mechanically derivable, or supplied as measured evidence;
- preserve measurement scope/uncertainty where material;
- keep NEI conclusions separate from structural correspondence;
- route transition-sensitive substitution through DTS;
- never rewrite frozen qualification evidence merely to meet a newer standard.

## Successor rule

When a predecessor is frozen, qualified, or historically load-bearing:

```text
old artifact
    -> preserve exact bytes

new standard
    -> create successor artifact
    -> record predecessor relation
    -> qualify successor separately if authority is desired
```

No successor inherits exact-rendering qualification merely because its predecessor was qualified.

## Current standards used by this modernization

Qualified authority:

- Core 0.17 + Core 0.18 + Core 0.19;
- QU 0.1;
- NEI 0.4;
- DP 0.1–0.7;
- DTS 0.1.

Qualification contract used where exact rendering is claimed:

- ESR 0.1 candidate as the current exact-source-rendering qualification discipline.

Successor discovery guidance used experimentally:

- DP 0.8 candidate from PR #48 lineage.

DP 0.8 remains unqualified. Conformance to its authoring guidance is not a qualification claim.
