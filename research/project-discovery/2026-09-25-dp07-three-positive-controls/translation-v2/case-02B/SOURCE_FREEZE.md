# v2 source freeze — case 02B

Finite variable family, assignment family, and equation-row family.

Assigned values and right-hand sides lie in GF(2)={0,1}.

Addition is fixed by:

```text
0+0=0
0+1=1
1+0=1
1+1=0
```

Rows are represented sparsely: selected variables are precisely the nonzero coefficient-1 terms.

For assignment a and row r:

```text
row_sum(a,r)
 = fold_plus(selected_variables(r), value(a,v), initial=0)

row_satisfied(a,r)
 = equal(row_sum(a,r), rhs(r))

system_satisfied(a)
 = for every r in rows: row_satisfied(a,r)
```
