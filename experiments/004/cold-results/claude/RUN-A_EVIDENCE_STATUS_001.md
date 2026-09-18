# RUN-A Claude evidence status

**Branch:** `experiment/004-cold-results-claude`  
**Qualification source commit:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Cold packet:** `RUN-A` / `COLD_PHASE_A_PROMPT_004_DRAFT_0_15.md`  
**Decoder:** Claude (external model, user-operated)  
**Final disposition:** PASS — accepted by project owner with recorded protocol exception

## Received artifacts

1. `RUN-A_RAW_FRAGMENT_001.txt`
   - verbatim final verdict / summary supplied by Claude after the cold run;
   - shorter than the complete raw cold report requested by the Experiment 004 freeze protocol.
2. `RUN-A_SCORING_CLAUDE_001.md`
   - verbatim standalone post-unblind scoring report supplied by the user;
   - reports 20/21 assertions AGREE, 1 PARTIAL, 0 DISAGREE, 0 NOT TESTED;
   - classifies the sole PARTIAL (Q004-07 V0 terminal relation wording) as `decoder/search implementation error`;
   - records Q004-05 subcase 3 as blocked/null because the NAC-only variable lacks supplied matching-profile authority.

## Owner disposition

The project owner explicitly directed that RUN-A be passed despite the abbreviated cold output.

RUN-A is therefore **accepted as PASS for Experiment 004 campaign accounting**.

This acceptance does not rewrite the evidence record. The protocol exception remains explicit:

```text
requested artifact: complete detailed pre-unblind raw cold report
received artifact: final cold verdict / summary only
scoring: 20 AGREE / 1 PARTIAL / 0 DISAGREE / 0 NOT TESTED
owner disposition: ACCEPT / PASS
```

The sole PARTIAL is not treated as a semantic failure. Claude's structural reasoning for Q004-07 supported V0 non-isomorphism but its terminal wording was more conservative than the frozen assertion. No specification repair is justified from that item.

Q004-05 subcase 3 is treated as an intended blocked/null outcome rather than a failure: the NAC-only variable lacked matching-profile authority in the permitted cold inputs, and the scorer agreed with that disposition.

## Qualification interpretation

Accepted substantive signal:

- occurrence multiplicity versus structural identity recovered;
- nested scope boundary preserved;
- reference-binding transparency and repeated-use occurrence semantics recovered;
- V0 stable-label rigidity versus explicit VS mapping recovered;
- compact quantifier syntax distinguished from linked domain/generator structure;
- no scored disagreement with the hidden assertions;
- no Core Specification repair indicated by this run.

The abbreviated-output exception is a protocol/reporting limitation of this run, not evidence that the structural semantics failed.
