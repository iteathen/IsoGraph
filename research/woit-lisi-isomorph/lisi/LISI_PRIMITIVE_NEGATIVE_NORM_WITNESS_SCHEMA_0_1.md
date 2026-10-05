# Lisi-Local Negative-Norm Witness Schema 0.1

**Status:** L-TRACK RESEARCH-LOCAL PRIMITIVE/SCHEMA SUPPORT  
**Native:** `LISI_PRIMITIVE_NEGATIVE_NORM_WITNESS_SCHEMA_0_1.isg`

216002 represents an explicit negative-norm witness in an ordered vector-space setting.

The schema takes the witness vector and its scalar norm as arguments and requires:

~~~text
vneg belongs to V
Q(vneg) = qneg
qneg <= 0
qneg != 0
~~~

together with the L-local ordered-field interface 216000 and exact vector/Q function typing.

This does not define a named split algebra. It is only the primitive structural fact needed to distinguish a represented split metric from a positive-definite one.
