# Case 02A — XOR-SAT source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
Boolean variables x_i
truth assignment a_i in {false,true}
constraint C_j selects finite variables and target parity b_j
C_j satisfied iff XOR(selected assigned values)=b_j
formula satisfied iff every C_j is satisfied
```

Independent source anchor:

- https://www.cs.cmu.edu/~mheule/publications/SAT2020-XOR.pdf

Do not consult the GF(2) equivalence oracle.

Local reconstruction roles:

```text
3100 formula
3110 variable family
3111 truth-value domain
3112 assignment
3113 constraint family
3114 selected-variable incidence
3115 target parity
3116 XOR fold
3117 constraint satisfaction
3118 all-constraints satisfaction
```
