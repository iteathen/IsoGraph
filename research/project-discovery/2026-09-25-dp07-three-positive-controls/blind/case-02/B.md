# Anonymous case 02B semantic sidecar

Variables take values in the two-element field {0,1}. Each equation row selects variables with coefficient 1 and has right-hand side r in {0,1}.

A row is satisfied when the finite field-sum of selected assigned values equals r.

The whole system is satisfied exactly when every row is satisfied.

Field addition table:
```text
0+0=0
0+1=1
1+0=1
1+1=0
```
