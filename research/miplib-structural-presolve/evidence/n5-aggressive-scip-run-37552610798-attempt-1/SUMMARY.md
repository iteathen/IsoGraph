# n5-3 aggressive SCIP residual-symmetry control 0.7

**Exact breakers:** [('t_C0021', 't_C0026'), ('t_C0027', 't_C0028')]

| Variant | Median gap | Median nodes | Median LP | Symmetry-named constraints |
| --- | ---: | ---: | ---: | ---: |
| default | 0.05828192567044435 | 434 | 98541 | 0 |
| late | 0.05828192567044435 | 434 | 98516 | 0 |
| aggressive | 0.05677286463017406 | 369 | 103993 | 2 |
| ig | 0.05680833797934605 | 421 | 93645 | 0 |

## Parameters

~~~json
{
  "default": {
    "misc/usesymmetry": 7,
    "propagating/symmetry/symtiming": 2,
    "propagating/symmetry/addstrongsbcs": false,
    "propagating/symmetry/usedynamicprop": true
  },
  "late": {
    "misc/usesymmetry": 7,
    "propagating/symmetry/symtiming": 2,
    "propagating/symmetry/addstrongsbcs": false,
    "propagating/symmetry/usedynamicprop": true
  },
  "aggressive": {
    "misc/usesymmetry": 5,
    "propagating/symmetry/symtiming": 2,
    "propagating/symmetry/addstrongsbcs": true,
    "propagating/symmetry/usedynamicprop": false
  },
  "ig": {
    "misc/usesymmetry": 0,
    "propagating/symmetry/symtiming": 2,
    "propagating/symmetry/addstrongsbcs": false,
    "propagating/symmetry/usedynamicprop": true
  }
}
~~~
