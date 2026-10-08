# Lisi-Local Ordered Field / Positive-Definite Map Schema 0.1

**Status:** L-TRACK RESEARCH-LOCAL PRIMITIVE/SCHEMA SUPPORT  
**Native:** `LISI_PRIMITIVE_ORDERED_FIELD_POSDEF_SCHEMA_0_1.isg`

This is the Track-L counterpart of the independently developed W-local ordered-field support. During the parallel-worker phase the two are kept separate deliberately.

## 216000

Extends the abstract field interface with a total compatible order relation:
- typing;
- reflexivity;
- antisymmetry;
- transitivity;
- totality;
- additive monotonicity;
- closure of nonnegative values under multiplication;
- `0 <= 1`.

It does not add completeness, topology, Archimedean structure, or a claim that every ordered field is the standard real numbers.

## 216001

Defines a positive-definite scalar map `Q: V -> C` over an ordered vector space:
- `Q(0) = 0`;
- `Q(v) >= 0`;
- `Q(v) = 0` implies `v = 0`.

This schema exists so L05's source distinction between positive-definite division-algebra metrics and split metrics is represented below the English classification.
