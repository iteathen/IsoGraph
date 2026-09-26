# v2 source freeze — case 01B

Finite undirected 2-regular interaction graph.

For each complete configuration c and site i:

```text
n(c,i) in {0,1}
```

Real parameters epsilon,mu and positive real beta.

```text
G(c)
 = epsilon * fold_add_edges( n(c,left(e))*n(c,right(e)) )
   -mu * fold_add_sites( n(c,i) )

w(c) = exp( -beta * G(c) )

Xi = fold_add_configurations( w(c) )

P(c) = w(c) / Xi
```

Every fold has additive identity 0.
