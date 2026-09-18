# Experiment 008 Hidden Oracle

This file is scorer-only and MUST NOT enter the cold decoder packet.

The pair is designed to contain a shared finite-capacity / propagated-dependency architecture expressed through different kinds of generated sequences.

Expected motifs:

- **O1 — common generated-orbit setup**  
  Alpha: A01,A02  
  Beta: B01,B02  
  Both start from one seed, repeatedly apply one fixed generator, and inspect an initial segment inside a finite-capacity ambient setting.

- **O2 — capacity overflow produces a dependency witness**  
  Alpha: A02,A03  
  Beta: B02,B03  
  One more generated object than the ambient capacity supports independently forces a witness: repeated state on Alpha, linear dependence on Beta.  
  This is a deep motif.

- **O3 — witness becomes a finite forward constraint**  
  Alpha: A03,A05  
  Beta: B03,B04  
  The local witness is rewritten into a finite rule constraining later behavior: a positive repeat offset on Alpha, fixed recurrence coefficients on Beta.  
  This is a deep motif.

- **O4 — the same generator propagates the witness**  
  Alpha: A04,A05  
  Beta: B05  
  The dependency survives every common forward shift because the same generating map/operator is applied to the relation.  
  This is a deep motif.

- **O5 — finite data plus rule determines an infinite future**  
  Alpha: A06,A07,A08  
  Beta: B06,B07,B08  
  Both compress an infinite generated sequence into finite initial data plus a persistent rule, while preserving the important residual that Alpha becomes literally periodic whereas Beta need only satisfy a linear recurrence.

The benchmark does NOT require:

- literal equality of repeated-state and linear-dependence witnesses;
- literal equality of periods and recurrence coefficients;
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
- semantic overclaim rejection under QRC 0.1;
- promotion no stronger than SUPPORTED_CANDIDATE.
