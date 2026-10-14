# L-SSC-128 Typed Coefficient Roles Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Source:** L05 §2  
**Frozen census:** `L-SSC-128`

The source's three coefficient roles are represented as three **distinct** vector-space carriers for every ordinary/split algebra case.

For each of `C, C', H, H', O, O'`:

- V has an exact 2/4/8-element basis;
- Q_minus has an exact basis;
- Q_plus has an exact basis;
- all three have exact linear bijections into the source coefficient carrier;
- V and Q_minus bases map to the ordinary source basis;
- Q_plus maps through source conjugation, preserving the tilde basis.

The dependency scan reports:

~~~text
native files:                  17
declared project-local IDs:   363
unresolved project-local IDs:   0
duplicate declarations:         0
unreachable files:              0
~~~

The packet does not identify the three role carriers with one another; it only establishes source-explicit representation isomorphisms.

No triality, Clifford, generation, Woit, or synthesis semantics are imported.

Candidate Core-0.21 disposition:

~~~text
CLOSED_SCHEMA
coverage = EXACT_ALL_AND_ONLY
hidden side conditions = false
termination = NOT_LOAD_BEARING
~~~
