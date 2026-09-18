# COLD REPORT — Q004-S02 (RULE_SPLICE)
 
**Inputs read:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`, `experiments/004/Q004_S02_RULE_SPLICE.isg`, this prompt. No other material consulted.
 
**Schema resolution:** `(^0 [^6200 ^6201 ^6202])` declares that each subsequent record group is a triple: a case tag (`^6200`), a state (`^6201`), and a rule (`^6202`). Two record groups follow, tagged `#1` and `#2`. Resolving accordingly:
 
 
- Case `#1`: state `(^6201 1000 [10])`, rule `(^6202 2000 [ [10] > [20 21] ])`
 
- Case `#2`: state `(^6201 1001 [10])`, rule `(^6202 2001 [ [10] > [[20 21]] ])`
 
 
  
## Outer LHS rule container (applies identically to both cases)
 
The outer bracket of each `^6202` object — the one wrapping `[10] > [RHS]` — is **not** treated as a literal nested scope to be matched. Per the spec's standing constitutional discipline (`rule-side container != nested scope`), this bracket functions only as a rule-side container holding the single LHS→RHS mapping. There is no requirement that the state contain a matching sub-scope corresponding to this outer wrapper.
  
## Case #1 (`^6201 1000`, `^6202 2000`)
 
 
- **Selected direct LHS member occurrence(s):** the single direct member occurrence `10`, present as a direct member of state `1000`'s own scope `[10]`. The LHS pattern `[10]` matches this occurrence directly — no additional nested-scope requirement is imposed by the LHS bracket itself.
 
- **Successor direct member occurrence count:** 2
 
- **Exact successor member structure:** `[20 21]` — two flat direct member occurrences, `20` and `21`, spliced directly into the successor scope in place of the matched `10` occurrence.
 
- **Outer RHS brackets inserted as semantic nested scope?** No. The outer RHS bracket is a rule-side container listing the members to splice; it is not itself inserted as a scope boundary in the result.
 
- **Literal nested scope present?** None. The successor structure is flat.
 
 
  
## Case #2 (`^6201 1001`, `^6202 2001`)
 
 
- **Selected direct LHS member occurrence(s):** the single direct member occurrence `10`, present as a direct member of state `1001`'s own scope `[10]` — same match shape as case #1.
 
- **Successor direct member occurrence count:** 1
 
- **Exact successor member structure:** `[[20 21]]` — one direct member occurrence, which is itself a bracketed sub-structure containing `20` and `21`. Per nested-boundary non-flattening, this inner bracket is preserved as a genuine nested scope rather than being flattened into two direct top-level members.
 
- **Outer RHS brackets inserted as semantic nested scope?** The *outer* RHS bracket (the rule-side container) is not itself the inserted scope — it is not inserted as an object in the result, it's rule-side syntax listing the one member to splice. But that one spliced-in member is itself a bracket, `[20 21]`, and that inner bracket **is** constructed as a literal nested scope in the successor.
 
- **Literal nested scope present?** Yes — `[20 21]`, nested one level inside the successor's top-level scope, holding occurrences `20` and `21` as its own direct members (not direct members of the outer state).
 
 
  
## Difficulties / ambiguities
 
 
1. **Identity of the secondary numeric field.** Each object carries two numbers before its bracketed content (e.g., state `1000`/`1001`, rule `2000`/`2001`). The permitted files don't disambiguate whether this is a structural-ID, a stable label, a revision/version tag, or an opaque identity token distinct from the bracketed content. Per §0/§4.2 (`source name does not prove primitive status`; `class label != class-membership evidence`), I have not assumed semantic meaning for these — I treat them purely as identifiers distinguishing case #1's objects from case #2's, not as content contributing to the match or rewrite.
 
2. **Match discipline for `10`.** The spec distinguishes `structural identity != member occurrence`, but the permitted files don't specify whether LHS matching is by occurrence-position, by opaque identity, or by value equality of the token `10`. I resolved the match as an occurrence-level match (one direct member occurrence consumed), since that is the only interpretation supported without importing outside registry/label assumptions.
 
3. **Token semantics of `10`/`20`/`21`.** These are surface tokens; per §0 (`surface syntax != irreducible substrate`) and §2 (`labels are downstream handles... not evidence for their own structural meaning`), I have not assigned them numeric or domain meaning — treated strictly as opaque member labels.
 
4. **Whitespace-delimited multi-member brackets.** I assumed `[20 21]` denotes two distinct direct members (space-delimited), consistent with the single-member precedent `[10]`. The permitted files contain no explicit grammar/delimiter rule confirming this, so it is an assumption, not a verified parse.
 
 
 
**Report frozen as above; no scoring, registry, or prior-output material consulted.**