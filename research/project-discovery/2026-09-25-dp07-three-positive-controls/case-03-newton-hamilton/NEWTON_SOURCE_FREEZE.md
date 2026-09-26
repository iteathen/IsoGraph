# Case 03A — Newton-form simple harmonic oscillator source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
coordinate q(t)
v(t)=dq/dt
a(t)=dv/dt=d2q/dt2
m>0
k>0
m a + k q = 0
```

Independent source anchor:

- https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/resources/lecture-9-solving-second-order-linear-odes-with-constant-coefficients/

Do not import momentum or Hamiltonian structure.

Local reconstruction roles:

```text
5100 model
5110 time domain
5111 q occurrence
5112 velocity
5113 acceleration
5114 q->velocity derivative
5115 velocity->acceleration derivative
5116 mass
5117 stiffness
5118 inertial term
5119 restoring term
5120 zero-balance equation
```
