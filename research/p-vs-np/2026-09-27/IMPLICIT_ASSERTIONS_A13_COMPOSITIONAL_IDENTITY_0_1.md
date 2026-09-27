# P versus NP implicit-assertion pass A13 — coarsest compositional identity

**Status:** admitted exact implicit assertions, round 13  
**Premise state:** A0 + corrected A1 + A2-A12  
**Scope:** normalized fixed-horizon witness processing

---

## IA-177 — right congruence plus terminal-output preservation implies full continuation equivalence

### Premises

Let `E_t` be an equivalence relation on residual prefixes at each witness depth.

Assume:

1. **right congruence**

```text
p E_t q
    ->
p·a E_{t+1} q·a
```

for every admissible next symbol `a`;

2. **terminal-output preservation**

at final depth `m`:

```text
p E_m q
    ->
ACCEPT(p)=ACCEPT(q).
```

### Body

For every depth `t`:

```text
p E_t q
    ->
for every complete remaining suffix s:
    C_p(s)=C_q(s).
```

### Witness

Induct on remaining suffix length.

Repeated right-congruence transports `E` along the entire suffix.

At terminal depth, output preservation gives equal acceptance.

### Disposition

ADMITTED EXACT.

---

## IA-178 — every exact right-congruent acceptance-preserving quotient refines Q-RESIDUAL

### Body

Under the premises of `IA-177`:

```text
p E_t q
    ->
p Q-RESIDUAL-SAME q.
```

### Support

`IA-177` supplies equality on every complete continuation.

Apply `IA-068`.

### Disposition

ADMITTED EXACT.

---

## IA-179 — Q-RESIDUAL is the coarsest exact right congruence preserving terminal acceptance

### Candidate space

Equivalence families over fixed-horizon residual prefixes satisfying:

- exact right congruence under every next witness symbol;
- exact terminal acceptance preservation.

### Body

Q-RESIDUAL belongs to this candidate space (`IA-069`, `IA-071`) and every other candidate refines it (`IA-178`).

Therefore Q-RESIDUAL is the coarsest / minimum-width exact quotient in this **compositional candidate space**.

### Relation to IA-106

`IA-106` used the stronger premise that all future acceptance observations were preserved directly.

`IA-179` shows that this stronger premise is not needed:

```text
right congruence
+
terminal-output preservation
```

already forces full future-behavior preservation.

### Disposition

ADMITTED EXACT MINIMUM CLAIM.

---

## IA-180 — no strictly coarser exact local-transition quotient exists

### Body

There is no equivalence quotient strictly coarser than Q-RESIDUAL that simultaneously retains:

```text
exact local transition:
    class × next-symbol -> class

and

exact terminal acceptance.
```

### Support

Such a quotient would satisfy `IA-177` and therefore refine Q-RESIDUAL, contradicting strict coarseness.

### Scope

Fixed-horizon, witness-symbol-by-witness-symbol deterministic quotient processing.

### Disposition

ADMITTED EXACT.

---

## IA-181 — Q-EXISTS escapes the coarsest-congruence theorem by losing congruence

### Body

Q-EXISTS can be strictly coarser than Q-RESIDUAL only because it does **not** generally satisfy right congruence.

### Support

- strict coarseness: `IA-166`;
- noncongruence: `IA-168`;
- coarsest right-congruence theorem: `IA-179`.

### Disposition

ADMITTED EXACT.

---

## IA-182 — any exact Markovian witness-symbol DP state partition refines Q-RESIDUAL

### Premises

A deterministic dynamic program processes witness symbols one at a time with state:

```text
s_{t+1} = F_t(s_t,a)
```

and terminal output:

```text
OUT(s_m).
```

Suppose state equality is used as exact substitutability:

```text
same state
    ->
same next state for same symbol
```

and terminal output is state-determined.

### Body

The equivalence relation:

```text
p E_t q
IFF
DPSTATE(p)=DPSTATE(q)
```

is a right congruence preserving terminal output.

Therefore:

```text
E_t refines Q-RESIDUAL.
```

### Consequence

At every depth, the number of exact DP states is at least:

```text
W_NEI(x,t).
```

using the representative-list cardinality interpretation.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-183 — W_NEI is a semantic state lower bound for exact sequential Markovian witness processing

### Body

For the algorithm architecture in `IA-182`:

```text
#exact reachable DP states at depth t
    >=
W_NEI(x,t).
```

### Support

`IA-182`, `IA-106`.

### Scope firewall

This is not a lower bound on:

- arbitrary deterministic algorithms;
- random-access/global algorithms;
- algebraic elimination;
- hitting-set methods;
- direct canonical-witness methods;
- proof systems.

### Disposition

ADMITTED EXACT.

---

## IA-184 — beating Q-RESIDUAL width requires changing more than the equivalence relation

### Body

If a proposed exact algorithm uses fewer semantic states than Q-RESIDUAL at some layer, it must violate at least one assumption of `IA-182`, for example by:

- not processing witness symbols through a local Markovian state transition;
- using nonlocal/global aggregation;
- using a hitting-set/canonical witness route;
- using richer state whose observable is not a quotient solely of the prefix;
- changing the decomposition/ordering of the witness space;
- exploiting additional algebraic/factorization structure.

### Support

Contrapositive of `IA-180..183`.

### Disposition

ADMITTED EXACT STRUCTURAL CONSEQUENCE.

---

## IA-185 — the quotient search has a sharp boundary

### Body

Within local sequential exact propagation:

```text
Q-RESIDUAL
```

is already semantically maximally coarse.

Therefore further progress inside this architecture can come only from:

```text
1. proving W_NEI polynomial for the target family;
2. computing/canonicalizing Q-RESIDUAL efficiently;
3. choosing a finer quotient with better implementation valuation;
```

—not from finding a strictly coarser exact right congruence.

### Support

`IA-179..184`.

### Disposition

ADMITTED EXACT.

---

# A13 central result

The identity landscape is now sharply separated:

```text
Q-EXISTS
    coarsest terminal observable
    <=2 classes
    noncompositional
    classification = original existential question

Q-RESIDUAL
    coarsest exact right congruence
    compositional
    potentially wide / hard to access.
```

There is no missing intermediate **strictly coarser exact right-congruent quotient** under the same local witness-symbol transition architecture.

This does not solve P versus NP.

It tells DP where not to search and which architectural assumption must change to obtain a genuinely coarser exact representation.
