# v2 source freeze — case 01A

Finite undirected 2-regular interaction graph.

For each complete configuration c and site i:

```text
s(c,i) in {-1,+1}
```

Real parameters J,h and positive real beta.

```text
E(c)
 = -J * fold_add_edges( s(c,left(e))*s(c,right(e)) )
   -h * fold_add_sites( s(c,i) )

w(c) = exp( -beta * E(c) )

Z = fold_add_configurations( w(c) )

P(c) = w(c) / Z
```

Every fold has additive identity 0.

This v2 freeze replaces the earlier generic-neighbor source for qualification because the exact one-body parameter transport in the positive control requires fixed degree. The earlier source remains historical evidence.
