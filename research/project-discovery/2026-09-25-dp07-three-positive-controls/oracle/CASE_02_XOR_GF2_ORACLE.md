# WITHHELD ORACLE — Case 02 XOR-SAT / GF(2)

**Do not expose to discovery.**

Exact-positive anchor:

- https://www.cs.cmu.edu/~odonnell/15455-s17/homework04.pdf

Witness:

```text
false <-> 0
true  <-> 1
XOR   <-> addition in GF(2)
target b <-> RHS b
selected variable <-> coefficient 1
unselected variable <-> coefficient 0
AND of constraints <-> simultaneous row satisfaction
```

For each constraint:

```text
x_i1 XOR ... XOR x_ik = b
```

the corresponding equation is:

```text
y_i1 + ... + y_ik = b (mod 2)
```

Satisfying assignments are preserved bijectively.
