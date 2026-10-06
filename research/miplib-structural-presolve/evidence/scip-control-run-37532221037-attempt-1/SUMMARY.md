# SCIP stronger-incumbent control 0.1

**Disposition:** PASS
**PySCIPOpt:** 6.2.1
**SCIP:** 10.0.2

## Presolve target survival

- default symmetry: {'z1&3.4': True, 'z1&3.8': True, 'id60': True, 'id70': True}
- symmetry off: {'z1&3.4': True, 'z1&3.8': True, 'id60': True, 'id70': True}

## 15-second solve comparison

| Variant | Status | Primal | Dual | Gap | Nodes | LP iterations |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| SCIP default symmetry | timelimit | 2055573177.7777777 | 800005157.1166968 | 1.5694499085309408 | 1274 | 390306 |
| SCIP symmetry off | timelimit | 2000017700.0 | 800005296.5072925 | 1.5000055733778117 | 2974 | 480777 |
| SCIP symmetry off + IG breaker | timelimit | 1900017050.0 | 800005159.5621105 | 1.37500599501132 | 2883 | 501508 |

The IG breaker was admitted only from the separate exact automorphism certificate. This control measures interaction with SCIP's incumbent symmetry machinery; it does not establish novelty.
