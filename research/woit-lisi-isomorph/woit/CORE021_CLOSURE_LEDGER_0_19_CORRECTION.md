# W Core-0.21 Ledger 0.19 correction

**Status:** HISTORICAL / STALE GROUP-IDENTITY SUPPORT

Ledger 0.19 was structurally valid but several W02 closures rested on source instances that supplied `204120=E22` where the matrix-group schemas require the exact identity `204116=E11+E22`.

The defect affected W-SSC-128, W-SSC-131, W-SSC-144, W-SSC-138, and W-SSC-010.

Successor source instances and closure packets correct/revalidate those semantics. Current ledger 0.20 preserves the same 21 closure dispositions only after revalidation.

No IA fixed point, NEI, DTS, or DP result existed on ledger 0.19.
