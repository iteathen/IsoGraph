# Generator note for W Core-0.21 ledger 0.2

Inputs:
- CORE021_CLOSURE_LEDGER_0_1.json
- W027_SPIN4_ACTION_CLOSURE_PACKET_0_2.json
- the 17 native dependency files pinned by that packet

Revision 0.2 promotes only W-SSC-027 to CLOSED_SCHEMA. The file-level dependency graph is the corrected all-local-ID graph recorded by verify_w027_spin4_closure_0_2.mjs. All other frozen census items remain INCOMPLETE_UNEXPANDED.

Recursive IA remains blocked until full primitive/schema closure and Core qualification.
