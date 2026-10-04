# Primitive Quaternion Presentation 0.1

**Status:** RESEARCH-LOCAL FINITE PRESENTATION SUPPORT  
**Native:** PRIMITIVE_QUATERNION_PRESENTATION_0_1.isg

Schema 193100 closes the source-specific algebraic meaning of a quaternion carrier without using "quaternion" as an opaque leaf.

It requires:
- an associative unital algebra over a field with 2 != 0;
- an explicit basis 1,i,j,k;
- i^2=j^2=k^2=-1;
- ij=k, jk=i, ki=j;
- ji=-k, kj=-i, ik=-j;
- an involutive order-reversing conjugation fixing 1 and negating i,j,k.

It reuses 185001, 187601, and 188000 for associative algebra, exact four-basis semantics, and anti-involution semantics.

Topology, completeness of the real field, and norm semantics are not added here.

For BT01, 193100 is the finite source-specific presentation needed to ensure the transported Lisi coefficient carrier is actually H, not an arbitrary four-dimensional associative algebra.
