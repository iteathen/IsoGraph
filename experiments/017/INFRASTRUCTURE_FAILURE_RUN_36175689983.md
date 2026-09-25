# Experiment 017 infrastructure failure — workflow run 36175689983

**Disposition:** INFRASTRUCTURE_FAILURE  
**Semantic call executed:** no  
**Cold report produced:** no  
**Qualification meaning:** none

The first trigger at commit `c0152a3c2aaef57744176dada67d298ba0f8d50f` failed before any workflow job started.

Inspection localized the problem to corruption of the transferred workflow YAML itself. The frozen candidate, public cases, hidden assertions, cold runner and scorer were not implicated, and no external semantic call was spent.

The correction rewrites only the workflow transport plus the trigger record. Core 0.18 semantic bytes and the Experiment 017 holdout/assertion bytes remain unchanged.

Historical failure is retained rather than reclassified as a semantic result.
