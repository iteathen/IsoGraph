# Anonymous case 01B semantic sidecar

Finite indexed sites with local value y_i in {0,1}. The same abstract kind of fixed symmetric neighbor relation selects interacting pairs.

State score:
```text
E_B(y) = c * sum_<ij> y_i y_j - d * sum_i y_i
```

With inverse-scale parameter u:
```text
w_B(y)=exp(-u E_B(y))
Z_B=sum_y w_B(y)
P_B(y)=w_B(y)/Z_B
```

No relation between {a,b,t} and {c,d,u} is supplied.
