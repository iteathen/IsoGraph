# v2 source freeze — case 02A

Finite variable family, assignment family, and constraint family.

Assigned values and targets lie in a two-element domain {F,T}.

Operation XOR is fixed by:

```text
F XOR F = F
F XOR T = T
T XOR F = T
T XOR T = F
```

For assignment a and constraint r:

```text
parity(a,r)
 = fold_XOR(selected_variables(r), value(a,v), initial=F)

constraint_satisfied(a,r)
 = equal(parity(a,r), target(r))

system_satisfied(a)
 = for every r in constraints: constraint_satisfied(a,r)
```
