# COLD REPORT — Q004-S03 (VARIABLE_OWNERSHIP)
 
**Inputs read:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`, `experiments/004/Q004_S03_VARIABLE_OWNERSHIP.isg`, this prompt. No other material consulted.
 
**Schema resolution:** `(^0 [^6300 ^6301 ^6302 ^6303])` declares each subcase as up to four fields: subcase tag (`^6300`), a closed body (`^6301`), an explicit open-interface declaration (`^6302`), and that interface's body (`^6303`), per the prompt's stipulated test-record roles.
  
## Case #1 (`^6300 #1`, `^6301 1000 [ ?0 => 10 ]`)
 
 
- **Variable occurrences:** one occurrence of `?0`, on the LHS of the implication `?0 => 10`.
 
- **Owner:** none. Per §11, declarative constructors — explicitly including `A => B` — "do not introduce variable ownership by themselves." No quantifier, lexical abstraction, or interface declaration is present to own `?0`.
 
- **Well-formed under the declared contract?** No. This record is asserted (by the fixture's role definition) to be a closed body, and §11 states a standalone closed declarative proposition "is invalid if any variable remains unowned/free." `?0` is unowned, so the object is **invalid** under its closed contract.
 
- **Does implication supply an owner?** No — this is the direct case the spec addresses: `A => B` adds no implicit variable owner.
 
- **Implicit universal/existential/wildcard semantics for the unowned variable?** No. §11 explicitly rules this out: `?n` appearing in a declarative surface never acquires implicit universal, existential, or wildcard/pattern meaning merely from appearing.
 
 
  
## Case #2 (`^6300 #2`, `^6301 1001 [ *?0 (?0 10) ]`)
 
 
- **Variable occurrences:** two occurrences of `?0` — the binder position in `*?0`, and a use occurrence inside the body `(?0 10)`.
 
- **Owner:** the explicit quantifier `*?0`. §11 lists "explicit quantifiers" among possible owners, and §14.1 confirms `*?n BODY` "preserve[s] binder ownership and quantifier kind." Both occurrences resolve to one binding under this one owner, consistent with the rule "repeated same variable within one owner requires one binding."
 
- **Well-formed under the declared contract?** Partially. As far as *ownership* goes, `?0` is not free — it is bound by `*?0` — so it does not trigger the closed-term unowned-variable violation seen in case #1. However, §14.1 also states a quantified construction "[is] semantically complete only when their domain/generator is determined," and the fixture shows only a binder and body — no domain/generator field. So while the object is not invalid on ownership grounds, I cannot certify it as a fully semantically complete quantified construction from what's given; that is a distinct, unresolved gap (flagged below).
 
- **Does implication supply an owner?** Not applicable here (no implication present in this case), and in general — as established in case #1 — implication supplies no ownership.
 
- **Implicit universal/existential/wildcard semantics for any unowned variable?** Not applicable — `?0` here is owned (by the explicit quantifier), not unowned, so the no-implicit-semantics rule isn't triggered for this case.
 
 
  
## Case #3 (`^6300 #3`, `^6302 1002 [?0]`, `^6303 1002 [ ?0 => 10 ]`)
 
 
- **Variable occurrences:** the interface declaration `^6302` lists `?0` as an owned/exposed variable; the body `^6303` contains one occurrence of `?0`, on the LHS of `?0 => 10` — structurally the same body shape as case #1.
 
- **Owner:** the explicit qualified open-interface declaration `^6302`. §11 lists "schema/pattern parameter interfaces" and "another qualified represented binder/interface" among possible owners, and the prompt's stipulated fixture role assigns exactly this function to `^6302`. Per §11, "Open formula/schema terms are legal only when the containing native interface explicitly owns and exposes their free-variable interface" — which is the case here.
 
- **Well-formed under the declared contract?** Yes, as an **open** formula/schema term (not a closed proposition): `?0` is owned and exposed by `^6302`'s interface, so the body in `^6303` is legally open rather than an invalid closed term. This is the contrasting positive case to #1's invalid closed term with the same body shape.
 
- **Does implication supply an owner?** No — same as case #1, the `=>` construct itself supplies no ownership. Ownership here comes entirely from the separate interface declaration `^6302`, not from the implication in `^6303`.
 
- **Implicit universal/existential/wildcard semantics?** Not applicable — `?0` is explicitly owned via the interface, so no implicit-semantics question arises.
 
 
  
## Difficulties / ambiguities
 
 
1. **Linkage between `^6302` and `^6303` in case #3.** I inferred that the shared secondary field value `1002` is what identifies `^6303`'s body as "the referenced object" whose interface is declared by `^6302`, since the cold prompt states this role relationship but the fixture itself contains no explicit reference token connecting the two records beyond the matching numeral. Per §0 (`structural identity != member occurrence`) and the general caution against unproven identity, I treat this numeral match as the intended linkage only because the prompt's stipulated roles require some such link to exist and this is the only candidate in the fixture — not because the spec defines numeral-matching as a semantic linking mechanism.
 
2. **Case #2 completeness gap.** `*?0 (?0 10)` supplies binder and body but no explicit domain/generator, which §14.1 requires for semantic completeness. I have reported ownership as resolved (bound) while separately flagging that completeness is not established from the given material — these are two distinct questions the spec keeps apart, and I did not collapse them.
   2a. Relatedly, it's ambiguous whether `(?0 10)` is a two-member scope, a labeled-edge application, or some other surface; I have not assumed a specific reading beyond identifying the one `?0` occurrence inside it, since the spec (§0) warns against treating surface syntax as revealing irreducible structure without further qualification.
 
3. **Meaning of the leading numeral fields (`1000`, `1001`, `1002`).** As in the prior run, I have not assumed these are structural IDs, labels, or anything content-bearing beyond opaque case-distinguishing identifiers, per §4.2 ("a source name does not prove primitive status") and §2 ("class label != class-membership evidence").
 
4. **"Asserted to be closed" for `^6301` generally.** The prompt states this role once for `^6301` without qualifying it per-case; I applied it uniformly to cases #1 and #2's `^6301` records. Whether that closed assertion was intended to still apply once a quantifier binder is present (case #2) versus only to unquantified bodies (case #1) is not disambiguated in the permitted material — I evaluated both against the same closed-contract rule since no case-specific exception was given.
 
 
Report frozen as above; no scoring, registry, or prior-output material consulted.
