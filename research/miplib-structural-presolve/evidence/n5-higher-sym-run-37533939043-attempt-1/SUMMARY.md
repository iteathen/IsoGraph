# n5-3 higher-order symmetry benchmark 0.1

**Disposition:** PASS
**Automorphism:** 168 moved vars / 60 moved rows
**Breaker:** C0012 >= C0039 (cycle length 2)

## HiGHS 20 s

- baseline: {'status': 'Time limit reached', 'objective': 8604.999999999996, 'dual': 7812.429147388404, 'gap': 0.09210585155277079, 'nodes': 101, 'lp_iterations': 105243, 'wall_s': 20.004051239}
- breaker: {'status': 'Time limit reached', 'objective': 8469.999999999998, 'dual': 7873.728737720622, 'gap': 0.0703980238818626, 'nodes': 34, 'lp_iterations': 94337, 'wall_s': 20.00807873400001}

## SCIP 20 s on same HiGHS residual

- default: {'status': 'timelimit', 'primal': 8104.999999999999, 'dual': 7542.74306022323, 'gap': 0.07454276717204379, 'nodes': 469, 'lp_iterations': 86152, 'wall_s': 20.000482409, 'transformed_vars': 2128, 'transformed_conss': 857}
- symmetry off: {'status': 'timelimit', 'primal': 8104.999999999999, 'dual': 7542.74306022323, 'gap': 0.07454276717204379, 'nodes': 474, 'lp_iterations': 86818, 'wall_s': 20.000504997000007, 'transformed_vars': 2128, 'transformed_conss': 858}
- symmetry off + IG breaker: {'status': 'timelimit', 'primal': 8105.0, 'dual': 7637.856613265063, 'gap': 0.06116158110688078, 'nodes': 501, 'lp_iterations': 78186, 'wall_s': 20.00038232900002, 'transformed_vars': 2128, 'transformed_conss': 855}
