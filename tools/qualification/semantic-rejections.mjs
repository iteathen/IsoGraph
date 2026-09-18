export const CONTRACT_VERSION = 'QRC-0.1';

export const REJECTION_CONCEPTS = Object.freeze({
  FULL_PROOF_ISOMORPHISM: Object.freeze({
    all: Object.freeze(['full', 'proof', 'isomorph']),
    any: Object.freeze([])
  }),
  NATURAL_IDENTITY: Object.freeze({
    all: Object.freeze(['natural', 'identit']),
    any: Object.freeze([])
  }),
  SAME_INTERMEDIATE_OBJECTS: Object.freeze({
    all: Object.freeze(['intermediate', 'object']),
    any: Object.freeze(['same', 'ident', 'equiv', 'differ', 'distinct'])
  }),
  SAME_ALGORITHM: Object.freeze({
    all: Object.freeze(['algorithm']),
    any: Object.freeze(['same', 'ident', 'equiv', 'differ', 'distinct'])
  })
});

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function hasStem(text, stem) {
  return text.split(' ').some(token => token.startsWith(stem));
}

function lexicalMatch(text, signature) {
  const normalized = normalize(text);
  if (!normalized) return false;
  if (!signature.all.every(stem => hasStem(normalized, stem))) return false;
  return signature.any.length === 0 || signature.any.some(stem => hasStem(normalized, stem));
}

function canonicalIdFromEntry(entry) {
  if (typeof entry === 'string') return null;
  if (!entry || typeof entry !== 'object') return null;
  const id = String(entry.claim_id ?? entry.concept_id ?? '').trim().toUpperCase();
  if (!Object.hasOwn(REJECTION_CONCEPTS, id)) return null;
  const status = String(entry.status ?? 'REJECTED').trim().toUpperCase();
  if (status !== 'REJECTED') return null;
  return id;
}

export function identifyRejectedConcept(entry) {
  const structured = canonicalIdFromEntry(entry);
  if (structured) {
    return { concept_id: structured, recognition: 'CANONICAL_ID', entry };
  }

  if (typeof entry !== 'string') {
    return { concept_id: null, recognition: 'UNRESOLVED', entry };
  }

  const exact = String(entry).trim().toUpperCase();
  if (Object.hasOwn(REJECTION_CONCEPTS, exact)) {
    return { concept_id: exact, recognition: 'CANONICAL_ID', entry };
  }

  const matches = Object.entries(REJECTION_CONCEPTS)
    .filter(([, signature]) => lexicalMatch(entry, signature))
    .map(([id]) => id);

  if (matches.length === 1) {
    return { concept_id: matches[0], recognition: 'PUBLIC_LEXICAL_SIGNATURE', entry };
  }

  return {
    concept_id: null,
    recognition: matches.length > 1 ? 'AMBIGUOUS' : 'UNRESOLVED',
    candidates: matches,
    entry
  };
}

export function assessRejectedOverclaims(entries, requiredConcepts) {
  const items = Array.isArray(entries) ? entries : [];
  const required = [...new Set((requiredConcepts ?? []).map(x => String(x).trim().toUpperCase()))];
  for (const id of required) {
    if (!Object.hasOwn(REJECTION_CONCEPTS, id)) {
      throw new Error(`Unknown public rejection concept: ${id}`);
    }
  }

  const recognizedEntries = items.map(identifyRejectedConcept);
  const recognized = [...new Set(recognizedEntries.map(x => x.concept_id).filter(Boolean))];
  const missing = required.filter(id => !recognized.includes(id));
  const unresolvedEntries = recognizedEntries.filter(x => !x.concept_id);
  const exactCanonicalStrings = new Set(
    items.filter(x => typeof x === 'string').map(x => x.trim().toUpperCase()).filter(x => Object.hasOwn(REJECTION_CONCEPTS, x))
  );

  return {
    contract_version: CONTRACT_VERSION,
    required_concepts: required,
    recognized_concepts: recognized,
    missing_concepts: missing,
    semantic_coverage_complete: missing.length === 0,
    exact_canonical_string_coverage_complete: required.every(id => exactCanonicalStrings.has(id)),
    unresolved_entries: unresolvedEntries,
    recognition: recognizedEntries
  };
}
