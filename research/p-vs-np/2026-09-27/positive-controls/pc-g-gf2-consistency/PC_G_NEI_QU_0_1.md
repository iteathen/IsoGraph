# PC-G NEI / QU scopes 0.1

**Status:** experimental control-local overlay
**Identity authority:** qualified NEI 0.4 semantics
**Unknown authority:** qualified QU 0.1 semantics
**Primitive source:** `PC_G_PRIMITIVE_0_1.isg`
**Implicit support:** `PC_G_IMPLICIT_ASSERTIONS_0_1.md`

## 1. Global identity

Input equation IDs, raw coefficient tuples, witness lists, and derived row objects retain ordinary data/constructor identity.

A row changed by XOR replacement is not globally the same row merely because it participates in an equivalent equation system.

## 2. Q-G-ASSIGN — extensional assignment identity

For witness lists `w1,w2`:

```text
w1 ~A w2
IFF
for every x in VL:
    MEMBER(x,w1) IFF MEMBER(x,w2).
```

This identity exactly preserves all source equation truth.

Different list serializations may therefore be globally DISTINCT but Q-G-ASSIGN SAME.

## 3. Q-G-SOLUTION — equation-system solution-set identity

For two finite row systems `S,T` over the fixed variable carrier:

```text
S ~SOL T
IFF
for every assignment X:
    X satisfies S IFF X satisfies T.
```

Every row swap and every retained-row XOR replacement in PC-G-IA-009/010 supplies exact evidence of Q-G-SOLUTION SAME.

This is scoped semantic identity, not global syntactic identity.

## 4. Local identity certificates versus complete semantic identity

The normalization never asks:

```text
are arbitrary S and T Q-G-SOLUTION SAME?
```

Instead each local transform carries its own reversible exact certificate.

Thus:

```text
sound locally generated identity facts
    !=
complete solution-set identity oracle.
```

This mirrors the main campaign's sound-incomplete identity/dominance opening.

## 5. Q-G-NORMALIZATION state

A normalization state consists of:

- the current polynomial row array;
- the next variable coordinate;
- the pivot-row frontier.

Exact equality of this state supplies exact equality of all subsequent deterministic normalization behavior under the fixed order.

No claim is made here that the final normalized syntax is the globally coarsest or unique representative of Q-G-SOLUTION identity.

## 6. Q-G-EXISTS

Terminal objective:

```text
E_G(S)
=
exists assignment satisfying S.
```

It has two values.

Again, compact semantic range does not supply access.

## 7. QU state

The coefficient/RHS input relations and coordinate lists are closed-world.

No semantic QU is load-bearing for the frozen control.

The hidden standard solving method is not QU.

If coefficient or RHS tuples were unresolved, their admissible alternatives would require an explicit QU state. A missing required QU would make dependent identity classification INCOMPLETE, not semantic UNKNOWN.
