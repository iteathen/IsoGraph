# IsoGraph repository settings baseline

This file records the intended server-side GitHub configuration so the repository can be checked against the mature public-repository pattern used by `iteathen/CUDA-JS`, `iteathen/CUDA-MCGS`, and `iteathen/DevBridge`.

## Repository metadata

- Visibility: public
- Default branch: `main`
- Description: `Agent-native structural knowledge representation for exposing invariants, isomorphisms, and common structure across independently expressed domains.`
- Homepage: `https://github.com/iteathen/IsoGraph#readme`
- Suggested topics:
  - `ai`
  - `formal-methods`
  - `graph-isomorphism`
  - `hypergraph`
  - `knowledge-representation`
  - `reasoning`
  - `structural-analysis`
  - `symbolic-ai`

## Features

- Issues: enabled
- Projects: enabled
- Downloads: disabled
- Wiki: disabled
- Discussions: enabled
- Pages: disabled unless a documentation site is intentionally introduced
- Pull requests: enabled
- Web commit signoff: required

## Merge policy

- Squash merge: enabled
- Merge commits: disabled
- Rebase merge: enabled
- Auto-merge: enabled
- Automatically delete head branches: enabled
- Always suggest updating pull request branches: enabled

## Rulesets

### Main

Target:

```text
~DEFAULT_BRANCH
refs/heads/release/**/*
refs/heads/releases/**/*
```

Rules:

- prevent deletion;
- prevent non-fast-forward updates.

### PR review - owner and ChatGPT exceptions

Same branch targets as `Main`.

Rules:

- require 1 approving review;
- dismiss stale reviews on push;
- require code-owner review;
- require review-thread resolution;
- require extra approval for unattributed changes;
- allow standard merge methods subject to repository merge settings.

Bypass mode should match the mature repositories: repository owner and the authorized ChatGPT integration may bypass through a pull request only, not bypass branch integrity directly.

### Required CI

Same branch targets as `Main`.

Required status check:

```text
verify
```

Policy:

- strict branch-up-to-date requirement;
- do not enforce on branch creation.

Add further required checks only after they exist and are stable; do not copy CUDA runtime-specific checks into this research repository.

### Immutable release tags

Target all tags.

Rules:

- prevent tag updates;
- prevent tag deletion.

## Community files

Repository-local files intentionally override account defaults where IsoGraph needs research-specific process:

- `.github/CODEOWNERS`
- `.github/ISSUE_TEMPLATE/*`
- `.github/pull_request_template.md`
- `CONTRIBUTING.md`
- `STATUS.md`

Account-level defaults may continue to provide general code of conduct, security, support, and governance material where no IsoGraph-specific override exists.

## Audit rule

Changes to server-side settings should keep this file synchronized. A setting that materially changes evidence isolation, review authority, provenance, or release immutability should be treated as a repository-governance change rather than incidental administration.
