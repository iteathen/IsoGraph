# P versus NP primitive truth kernel 0.3 — role-typing audit

**Status:** unqualified successor

0.3 adds two universal primitive constraints to each witness:

- every member of the finite control list carries the raw control-state tag;
- every member of the finite tape-symbol list carries the raw tape-symbol tag.

Together with `PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_5.isg`, this prevents role identity from being supplied by prose or position alone.

Current support bundle target:

- primitive logic kernel 0.1;
- primitive natural arithmetic 0.3;
- primitive finite-data constructors 0.3;
- primitive finite-transition computation 0.5;
- P-vs-NP primitive truth kernel 0.3.

No high-level complexity-theory concept is a native semantic leaf in this bundle.
