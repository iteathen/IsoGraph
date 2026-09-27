# Primitive finite transition computation 0.5 — role-identity audit

**Status:** unqualified successor

0.5 preserves one universal raw-data carrier while making semantic role distinctions explicit through constructor-tag incidence.

Three raw tag identities distinguish:

- control-state atoms;
- tape-symbol atoms;
- movement atoms.

The tags are pairwise role-disjoint by logic.

The distinguished start/terminal identities, bit/blank identities, and two movement identities are explicitly tagged.

This prevents accidental Semantic Identity overlap from silently collapsing typed roles.

The tags themselves have no behavior; they are raw data used by primitive incidence clauses.
