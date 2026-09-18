# Experiment 007 Hidden Oracle

This file is scorer-only and MUST NOT enter the cold decoder packet.

The pair is designed to contain a common deficiency-certificate architecture expressed through different machinery.

Expected motifs:

- **O1 — failure witness / contradiction setup**  
  Alpha: A02  
  Beta: B03  
  Both assume failure of a complete pairing and select an extremal obstruction witness.

- **O2 — closed witness region**  
  Alpha: A03,A06  
  Beta: B04  
  Alpha's alternating-reachable region is closed under adjacency; Beta's source-side cut region is closed against large-capacity relation edges.  
  This is a deep motif.

- **O3 — local no-extension condition becomes structural closure/counting**  
  Alpha: A04,A05  
  Beta: B04,B05  
  Failure to augment / failure to cross the cut forces a constrained local region whose boundary structure supports counting.  
  This is a deep motif.

- **O4 — deficiency certificate**  
  Alpha: A05,A07  
  Beta: B05,B06,B07  
  Both derive a strict cardinality deficit for a left-side subset from the obstruction region.  
  This is a deep motif.

- **O5 — terminal contradiction and completion**  
  Alpha: A07,A08  
  Beta: B07,B08  
  The deficit contradicts the subset condition and discharges the original failure assumption.

The benchmark does NOT require:
- literal equality of alternating paths and cuts;
- literal equality of pairings and flows;
- full proof isomorphism;
- natural identity;
- identical intermediate objects;
- identical algorithms.

Qualification threshold:
- at least 4 of 5 motifs;
- at least one of O2/O3/O4;
- bounded findings;
- substantial residuals on both sides;
- explicit falsification;
- overclaim rejection;
- promotion no stronger than SUPPORTED_CANDIDATE.
