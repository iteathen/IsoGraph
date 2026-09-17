import fs from 'node:fs';
import crypto from 'node:crypto';

const sourcePath = 'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md';
const outPath = 'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md';
const expectedSourceBlob = '8c9a3c9030388a39bb89aed9045083fa03fb3209';

const source = fs.readFileSync(sourcePath, 'utf8');
const blobHeader = Buffer.from(`blob ${Buffer.byteLength(source)}\0`);
const sourceBlob = crypto.createHash('sha1').update(blobHeader).update(source).digest('hex');
if (sourceBlob !== expectedSourceBlob) {
  throw new Error(`Draft 0.16 qualified source blob mismatch: expected ${expectedSourceBlob}, got ${sourceBlob}`);
}

function replaceOnce(text, needle, replacement, label) {
  const first = text.indexOf(needle);
  if (first < 0) throw new Error(`Missing patch anchor: ${label}`);
  if (text.indexOf(needle, first + needle.length) >= 0) throw new Error(`Non-unique patch anchor: ${label}`);
  return text.slice(0, first) + replacement + text.slice(first + needle.length);
}

let out = source;

out = replaceOnce(out,
  '# IsoGraph Core Specification — Draft 0.16 Consolidated Qualified',
  '# IsoGraph Core Specification — Draft 0.17 Consolidated Qualified',
  'title');

out = replaceOnce(out,
  '**Status:** qualified consolidated authority; Experiment 005 obligation-sufficiency qualification complete  ',
  '**Status:** qualified consolidated authority; narrow Semantic Identity description correction applied  ',
  'status');

out = replaceOnce(out,
  '**Historical lineage:** qualified Draft 0.15 consolidated candidate + Draft 0.16 obligation-sufficiency clarification  ',
  '**Historical lineage:** qualified Draft 0.16 consolidated authority + Draft 0.17 Semantic Identity scope correction  ',
  'lineage');

out = replaceOnce(out,
  '**Authority:** self-contained current qualified semantic authority for Draft 0.16 artifacts  ',
  '**Authority:** self-contained current qualified semantic authority for Draft 0.17 artifacts  ',
  'authority');

out = replaceOnce(out,
  '**Growth rule:** this consolidation adds no surface syntax, domain operator, structural class, comparison relation kind, D/E transformation kind, or irreducible primitive',
  '**Growth rule:** this consolidation adds no surface syntax, domain operator, structural class, comparison relation kind, D/E transformation kind, irreducible primitive, or external identity-extension semantics',
  'growth-rule');

out = replaceOnce(out,
  'This document consolidates the surviving qualified Draft 0.15 rules plus the qualified Draft 0.16 obligation-sufficiency clarifications into one current authority. A Draft 0.16 decoder or verifier does **not** need to replay the amendment chain to determine current semantics.',
  'This document consolidates the qualified Draft 0.16 authority plus the Draft 0.17 Semantic Identity description correction into one current authority. A Draft 0.17 decoder or verifier does **not** need to replay the amendment chain to determine current semantics.',
  'intro-1');

out = replaceOnce(out,
  'Draft 0.15 remains immutable historical qualification evidence at its recorded revision. Draft 0.16 does not retroactively change Experiment 004 results. Its only semantic changes clarify how much evidence a stated claim requires, how exact witness families may be represented without mandatory enumeration, when witness quotienting is valid, how factorization-space coverage scopes claims, and that proof obligations do not prescribe stronger discovery algorithms.',
  'Draft 0.16 remains immutable historical qualification evidence at its recorded revision. Draft 0.17 does not retroactively reinterpret Draft 0.16, Experiment 005, or earlier evidence. Its only core correction narrows the description of the existing bare-ID mechanism to representation-level Semantic Identity (SI). The operational ID behavior qualified under Draft 0.16 is unchanged.',
  'intro-2');

out = replaceOnce(out,
`structural identity
    != member occurrence`,
`Semantic Identity (SI)
    != member occurrence`,
  'interpretation-identity-occurrence');

out = replaceOnce(out,
  '- opaque structural identity;',
  '- opaque Semantic Identity (SI);',
  'primitive-identity');

out = replaceOnce(out,
`# 6. Identity, namespaces, literals, and stable labels

## 6.1 Structural identities

Bare integers are opaque structural identities.

Within one structural namespace:

\`\`\`text
same structural identity = same object
\`\`\`

Different structural IDs are distinct structural identities even if an object-theory equality formula relates them.

Bare spelling may alpha-map where the frozen comparison policy permits.

Independent top-level documents/bundles do not share structural identity merely because numeral spellings match.

Cross-document identity continuity requires explicit shared namespace, import/export mapping, port relation, or qualified partition witness.

## 6.2 Nested namespace inheritance

A nested scope inherits its enclosing structural-identity namespace by default.

If inner and outer structure use the same bare structural identity under one inherited namespace, they refer to the same object.

A nested construct may introduce a distinct local structural namespace only when that fact is explicit/recoverable. Relationships between local and enclosing identities then require a hygienic import/export/port/renaming bridge.`,
`# 6. Semantic Identity, namespaces, literals, and stable labels

## 6.1 Semantic Identities

Bare integers are opaque Semantic Identity (SI) handles.

Within one SI namespace:

\`\`\`text
same SI = same represented referent
\`\`\`

Different bare SIs are distinct represented referents for core addressing, sharing, matching, allocation, and reconstruction semantics.

These statements define representation-level reference only. SI equality or inequality is not, merely by existing, independent evidence for any stronger identity relation supplied by an object theory, profile, or external semantic extension.

In particular:

\`\`\`text
same SI
    != proof of a stronger externally defined identity relation

different SI
    != proof of stronger natural/ontological distinctness
\`\`\`

A stronger identity authority may use SI-addressable referents as its carrier and may derive additional relations over them, but it does not retroactively change what the SI tokens mean. Any transformation that coalesces, splits, or rerenders SI referents remains an explicit qualified transformation with the applicable provenance/reconstruction obligations.

Bare SI spelling may alpha-map where the frozen comparison policy permits.

Independent top-level documents/bundles do not share SI merely because numeral spellings match.

Cross-document SI continuity requires explicit shared namespace, import/export mapping, port relation, or qualified partition witness.

## 6.2 Nested namespace inheritance

A nested scope inherits its enclosing SI namespace by default.

If inner and outer structure use the same bare SI under one inherited namespace, they refer to the same represented referent.

A nested construct may introduce a distinct local SI namespace only when that fact is explicit/recoverable. Relationships between local and enclosing SIs then require a hygienic import/export/port/renaming bridge.`,
  'section-6');

out = replaceOnce(out,
`## 8.2 Structural identity is not occurrence identity

A direct scope member is an occurrence referring to a represented term/object.

\`\`\`text
[7 7]
\`\`\`

contains two direct member occurrences referring to structural identity \`7\`; it does not create two structural identities.

Removing one occurrence removes only that membership occurrence. It does not destroy identity \`7\`, cascade-delete other incidences mentioning \`7\`, or imply object destruction.

Global deletion, cascading incidence removal, garbage collection, ownership destruction, or lifetime semantics require an explicit represented/profile construction.

If an occurrence itself requires persistent identity, ports, provenance, or relations, reify that occurrence explicitly.`,
`## 8.2 Semantic Identity is not occurrence identity

A direct scope member is an occurrence referring to a represented term/referent.

\`\`\`text
[7 7]
\`\`\`

contains two direct member occurrences referring to SI \`7\`; it does not create two SIs.

Removing one occurrence removes only that membership occurrence. It does not destroy SI \`7\`, cascade-delete other incidences mentioning \`7\`, or imply referent destruction.

Global deletion, cascading incidence removal, garbage collection, ownership destruction, or lifetime semantics require an explicit represented/profile construction.

If an occurrence itself requires persistent SI, ports, provenance, or relations, reify that occurrence explicitly.`,
  'occurrence-section');

out = replaceOnce(out,
`Crossing identity is a useful interface cue but not a complete component contract.

Where composition matters, interfaces may include:

- exposed identities;`,
`Crossing SI is a useful interface cue but not a complete component contract.

Where composition matters, interfaces may include:

- exposed SIs;`,
  'ports-si');

out = replaceOnce(out,
  '- structural identities inside the referred term;',
  '- SIs inside the referred term;',
  'reference-preserves-si');

out = replaceOnce(out,
  'Repeated uses of one reference may create multiple use-site occurrences while preserving identities inside the referred structure. The reference handle does not identify those use-site occurrences.',
  'Repeated uses of one reference may create multiple use-site occurrences while preserving SIs inside the referred structure. The reference handle does not identify those use-site occurrences.',
  'reference-repeat-si');

out = replaceOnce(out,
  '- distinct variables may alias the same object unless explicit disequality/distinctness forbids it;',
  '- distinct variables may alias the same SI referent unless explicit disequality/distinctness forbids it;',
  'variable-alias-si');

out = replaceOnce(out,
`allocation namespace
pre-application occupied-identity set / membership authority
fresh result identity
constraint: result was not occupied in that namespace before the event
allocation/application event identity when concurrent or independent allocations are load-bearing`,
`allocation SI namespace
pre-application occupied-SI set / membership authority
fresh result SI
constraint: result SI was not occupied in that SI namespace before the event
allocation/application event SI when concurrent or independent allocations are load-bearing`,
  'freshness-si-fields');

out = replaceOnce(out,
  'Two allocations in independent namespaces may serialize with the same local numeral and remain distinct. Later composition may capture-avoidably alpha-rename local fresh identities under an explicit hygienic namespace bridge.',
  'Two allocations in independent SI namespaces may serialize with the same local numeral and remain distinct SIs. Later composition may capture-avoidably alpha-rename local fresh SIs under an explicit hygienic namespace bridge. Fresh SI allocation by itself makes no claim about any stronger external identity relation.',
  'freshness-independent');

out = replaceOnce(out,
  'Same-namespace concurrent allocation must represent enough event/occupancy structure to prevent two events from silently selecting the same identity.',
  'Same-SI-namespace concurrent allocation must represent enough event/occupancy structure to prevent two events from silently selecting the same SI.',
  'freshness-concurrent');

out = replaceOnce(out,
`\`A == B\` is object-theory equality, not structural identity. Pure structural comparison does not collapse nodes because an object formula asserts equality.

Any equality-induced quotient/collapse is an explicit semantic/projection transformation.`,
`\`A == B\` is object-theory equality, not Semantic Identity (SI). Pure structural comparison does not coalesce SIs because an object formula asserts equality.

Any equality-induced quotient/collapse is an explicit semantic/projection transformation. A separately defined stronger identity system may admit a qualified equality theory as evidence only under that system's own authority; core equality supplies no such bridge by itself.`,
  'object-equality');

out = replaceOnce(out,
  '- local structural-ID namespace/renaming;',
  '- local SI namespace/renaming;',
  'bundle-si');

out = replaceOnce(out,
  'Local alpha identities may bijectively rename. Namespace-qualified stable labels and literals are rigid.',
  'Local alpha SIs may bijectively rename. Namespace-qualified stable labels and literals are rigid.',
  'v0-si');

out = replaceOnce(out,
  'Parameters may be identity-, literal-, relation-, predicate/formula-, rule/profile-, substructure-, or port-valued.',
  'Parameters may be SI-, literal-, relation-, predicate/formula-, rule/profile-, substructure-, or port-valued.',
  'parameter-si');

out = replaceOnce(out,
  'rigid identities/literals held fixed',
  'rigid SIs/literals held fixed',
  'witness-rigid-si');

out = replaceOnce(out,
`shared ports/identities
compatibility constraints`,
`shared ports/SIs
compatibility constraints`,
  'composition-shared-si-list');

out = replaceOnce(out,
  'Shared identity alone is insufficient.',
  'Shared SI alone is insufficient.',
  'composition-shared-si');

out = replaceOnce(out,
  '4. randomize local identity/reference/presentation choices allowed by N0/N1.',
  '4. randomize local SI/reference/presentation choices allowed by N0/N1.',
  'isolation-si');

out = replaceOnce(out,
  'E1I    identity/variable-owner/namespace edge-case audit',
  'E1I    SI/variable-owner/namespace edge-case audit',
  'gate-si');

out = replaceOnce(out,
  '- identity/label namespaces;',
  '- Semantic Identity / label namespaces;',
  'historical-si');

out = replaceOnce(out,
  '7. structural-ID and stable-label namespace collisions;',
  '7. SI and stable-label namespace collisions;',
  'target-si');

out = replaceOnce(out,
  '- identity-versus-occurrence distinction;',
  '- SI-versus-occurrence distinction;',
  'falsifier-si');

out = replaceOnce(out,
  'occurrence != identity',
  'occurrence != Semantic Identity',
  'constitution-si');

out += `\n\n---\n\n# 46. Draft 0.17 correction status\n\nDraft 0.17 is the current qualified authority for the narrow Semantic Identity description correction. The correction changes no operational bare-ID behavior from Draft 0.16 and introduces no Natural Entropic Identity or other stronger identity semantics into core.\n`;

fs.writeFileSync(outPath, out);
console.log(JSON.stringify({ sourcePath, sourceBlob, outPath, bytes: Buffer.byteLength(out) }, null, 2));
