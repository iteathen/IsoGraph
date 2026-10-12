# A one-bit physical entropy interface supplying a 512-bit seed over time

**Date:** 2026-10-12  
**Status:** correction to earlier known-generator analysis, elementary information-theoretic analysis; no new Shannon-entropy theorem or certified cryptographic implementation.  
**Human research input:** Joshua Oshiro's new proposed mechanism: start with epoch-derived bits, collect a one-bit physical noise source *once per clock cycle*, modify 512 seed positions sequentially, and pass the composite seed to a publicly known PRG which is used on secret data. He objects correctly that a prior "only two possible outputs" answer assumed a **single sampled random bit reused across the complete run**.  
**AI role:** distinction between source width and accumulated entropy, formal examples, evidence caveats, and editorial record.  
**Verbatim source:** [discussion log](../DISCUSSION_LOG.md). This note is exploratory, not an authoritative design spec.

## The essential correction

There are at least two materially different schemes:

**A. One total random bit:**

~~~text
B ∈ {0,1}, sampled once.
K = F(epoch, B) with a fixed publicly known F and epoch.
~~~

Conditional on the epoch, K has **at most two** possible values; H(K | epoch) ≤ 1 bit. This was the scope of the earlier "two possible outputs" comment.

**B. One-bit-wide source sampled 512 times:**

~~~text
B_1, B_2, ..., B_512 ∈ {0,1}, sampled over 512 clock cycles.
K_i = E_i XOR B_i,  i = 1,...,512
K = K_1 ... K_512
Y = PRG(K), used by the specified protective mechanism.
~~~

The XOR here is an illustrative known way to apply a collected noise bit to each epoch-derived position; the researcher's text allows other publicly specified transformations. **The hardware interface is one bit wide, but the total source record contains 512 bit-valued observations.** The previous two-possibility claim does *not* apply to this scheme.

If the 512 noise samples are conditionally independent and unbiased given epoch E, then B=(B_1,...,B_512) is uniformly distributed over {0,1}^512. XOR with a fixed known E is a bijection; therefore

~~~text
H(K | E) = H(B | E) = 512 bits.
~~~

The composed PRG receives 512 bits of physical source entropy (before accounting for any additional losses/collisions or security caps in the PRG). There may be up to 2^512 distinct seeds even though the **source device has only one output bit at any instant**. This demonstrates how a narrow physical entropy generator may accumulate a large random seed over time. It does **not** produce 512 random bits from only one independent random bit of *total* physical entropy.

## Sampling rate is not the same as entropy rate

One binary sample per clock cycle gives at most one bit of Shannon entropy **per sample**, not necessarily exactly one.

The joint entropy obeys the chain rule:

~~~text
H(B_1,...,B_512 | E)
 = Σ_{i=1}^{512} H(B_i | B_1,...,B_{i-1},E).
~~~

Each term is between zero and one bit. Under 512 independent fair draws the total is 512. If the one-bit register simply repeats one initially chosen random bit, the total is only one bit even after 512 reads. With a physical noise process whose state changes unpredictably only occasionally, the result lies between these extremes according to actual correlations and event rates.

**Researcher's event-driven description:** A stored bit may or may not change because of underlying physical noise. That is a plausible motivation for generating a stochastic *sequence*, but it does not alone establish uniform independent samples or an exact entropy rate. If the physical events are rare, consecutive samples may be strongly correlated. The physical source must be characterized before one can claim a particular number of secret, unpredictable bits.

If the source is truly independent, the proposed design can achieve the same source entropy as a device that returns 512 independent bits in parallel. The cost is temporal throughput and source validation, not a Shannon-law violation.

## What the public epoch contributes

A 512-bit *encoding* of Unix time does not contain 512 independent unpredictable bits by itself. If the outsider knows or can narrow the timestamp, time provides little or no cryptographic secrecy. Its useful functions may include uniqueness, initialization, or synchronization, depending on the protocol.

For the XOR example, conditional on the epoch:

~~~text
K = E XOR B
H(K | E) = H(B | E).
~~~

Thus any large secret-entropy content must come from the **accumulated noise samples**, not from the number of timestamp digits. This is not an objection to the mechanism: it specifies its actual physical entropy source.

If the epoch or selection process is itself genuinely secret/uncertain, that may affect an outsider's inference; it should be counted as separate information, not assumed to be 512 bits of physical randomness.

## Implication for the original short-seed/long-seed research

The revised proposal gives an illuminating **new comparison of hardware width and total acquired entropy**:

- "one-bit entropy source" as an *interface width* can be completely adequate for filling a long seed over time;
- "one bit of entropy total" remains insufficient to create 512 bits of Shannon entropy through known deterministic processing alone;
- a publicly known transformation need not eliminate the randomness of **fresh** independent physical samples;
- matching the functional value of a larger physical entropy source is possible if the gathered stream meets the target's actual entropy and security needs.

The question is no longer strictly about a one-bit seed becoming as valuable as a longer seed, because the 512-cycle system collects **many samples from a narrow source**. That is not cheating; it is a separate physically realizable mechanism that should not be excluded by defining "one bit" to mean "only one sample ever."

A **true** one-total-bit public-process variant remains a different challenge and cannot have more than two possible deterministic outcomes conditional on the remaining inputs.

## Security and standards boundary

A PRG is not by itself an authenticated-encryption scheme; if the intended operation is protecting secret information, the construction requires a specified secure encryption/authentication mode and appropriate threat assumptions. For this research turn, the seed-building mechanism is the object of analysis, not a production security design.

NIST SP 800-90B explicitly characterizes physical entropy sources by **entropy per noise-source sample** and tests IID or non-IID assumptions, restarts and health. [SP 800-90B](https://csrc.nist.gov/pubs/sp/800/90/b/final).

NIST SP 800-90C (final 2025) defines random-bit-generator constructions combining entropy sources with deterministic generators and includes continuous entropy access in its RBG3 family. [SP 800-90C](https://csrc.nist.gov/pubs/sp/800/90/c/final).

These standards are established prior art confirming that sequential one-bit or small-width entropy inputs can be accumulated/conditioned for larger keys or seeds. They do **not** validate the particular proposed error-cache hardware or imply that a 512-sample stream contains exactly 512 bits of unpredictability.

## Disposition

**Correction accepted:** The prior public-generator "one bit -> only two possible outputs" response incorrectly matched the researcher's serially sampled proposal to a single-draw model. The correct model tracks 512 potential new random samples, with a total entropy set by the joint distribution of the sample sequence.

**Precise distinction to preserve:** hardware width, sample count, entropy rate, conditional source entropy, encoded seed length, and eventual cryptographic security are different quantities. No new entropy-amplification theorem or equal-security claim is inferred solely from the mechanism.
