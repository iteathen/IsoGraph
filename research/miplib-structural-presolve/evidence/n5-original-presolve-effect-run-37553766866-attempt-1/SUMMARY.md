# n5-3 original presolve-effect audit 1.2

| Variant | Active vars | Active conss | Export rows | Export cols | Export nz | Sym-named | Presolve wall |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| default | 2142 | 846 | 846 | 2354 | 8316 | 0 | 0.039921s |
| aggressive | 2146 | 851 | 850 | 2354 | 8324 | 3 | 0.035680s |
| ig | 2142 | 848 | 848 | 2354 | 8320 | 0 | 0.035308s |
| aggressive_plus_ig | 2146 | 851 | 850 | 2354 | 8324 | 1 | 0.034993s |

## Symmetry-named constraints

~~~json
{
  "default": [],
  "aggressive": [
    {
      "name": "SSTcut_167_168",
      "handler": "linear",
      "vars": [
        "t_C0168",
        "t_C0169"
      ]
    },
    {
      "name": "SSTcut_161_166",
      "handler": "linear",
      "vars": [
        "t_C0162",
        "t_C0167"
      ]
    },
    {
      "name": "orbitope_component_0",
      "handler": "orbitope_full",
      "vars": [
        "t_C2408",
        "t_C2444"
      ]
    }
  ],
  "ig": [],
  "aggressive_plus_ig": [
    {
      "name": "orbitope_component_0",
      "handler": "orbitope_full",
      "vars": [
        "t_C2408",
        "t_C2444"
      ]
    }
  ]
}
~~~
