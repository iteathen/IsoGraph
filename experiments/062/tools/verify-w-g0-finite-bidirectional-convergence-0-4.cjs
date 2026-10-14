#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const root = 'experiments/062/';
const manifestPath = root + 'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_4.json';
const load = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const gitBlob = raw => crypto.createHash('sha1').update(
  Buffer.concat([Buffer.from('blob ' + raw.length + '\0'), raw])
).digest('hex');
const repoHash = p => gitBlob(fs.readFileSync(p));
const m = load(manifestPath);
const d = Object.fromEntries(Object.entries(m.pins).map(([key, value]) => [key, load(value.path)]));
const clone = x => structuredClone(x);
const unitOf = x => x.source.match(/^W(?:01|02|03|04[a-e]|05)/)?.[0];
const versioned = new Set(['W01', 'W02', 'W05']);
const units = ['W01', 'W02', 'W03', 'W04a', 'W04b', 'W04c', 'W04d', 'W04e', 'W05'];
const nonload = new Set([
  'PROVENANCE', 'NON_LOAD_HEADING', 'HEADING', 'HEADING_AND_ROLE',
  'BIBLIOGRAPHY_SOURCE_ONLY', 'BIBLIOGRAPHY_PROVENANCE_ONLY'
]);
const bibliographies = new Set([
  'NATIVE_BIBLIOGRAPHY', 'BIBLIOGRAPHY_SOURCE_ONLY', 'BIBLIOGRAPHY_PROVENANCE_ONLY'
]);
const getStatements = item => item.source_expression_census?.statements || [];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function sourceIntervals(docs) {
  return [
    ...docs.w01.original_to_SSC.map((z, i) => ({
      unit: 'W01', ledger_index: i, original_locator: z.key,
      html_lines: z.source_original_html_lines, kind: z.disposition_kind,
      load_bearing: z.disposition_kind === 'SOURCE_LOAD_BEARING', ssc_ids: z.ssc_owners,
      source_review_disposition: z.source_meaning,
      cited_source_reference_ids: z.source_evidence?.citations || [],
      original_bibliography_id: z.source_evidence?.reference_id || null
    })),
    ...docs.w02.source_first_locations.map((z, i) => ({
      unit: 'W02', ledger_index: i, original_locator: z.key,
      html_lines: z.html_lines, kind: z.kind,
      load_bearing: !nonload.has(z.kind), ssc_ids: z.ssc_ids,
      source_review_disposition: z.source_semantics,
      cited_source_reference_ids: z.citations || [],
      original_bibliography_id: null
    })),
    ...docs.w05.original_source_location_dispositions.map((z, i) => ({
      unit: 'W05', ledger_index: i, original_locator: z.key,
      html_lines: z.html_lines, kind: z.kind,
      load_bearing: !nonload.has(z.kind), ssc_ids: z.ssc_owners,
      source_review_disposition: z.original_source_disposition,
      cited_source_reference_ids: z.source_citations || [],
      original_bibliography_id: null
    }))
  ];
}

function audit(meta, docs) {
  assert.equal(meta.schema, 'isograph.exp062-w-g0-finite-versioned-source-bidirectional-convergence.v0.4');
  assert.equal(meta.track, 'W');
  assert.equal(meta.semantic_authority, false);
  assert.equal(meta.current_G0.open, true);
  assert.equal(meta.current_G0.frozen, false);
  assert.equal(meta.current_G0.complete, false);
  assert.equal(meta.current_G0.G1_authorized, false);
  assert.equal(meta.current_G0.source_provenance_complete, false);
  assert.equal(meta.frozen_corpus, 'research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md');
  const legal = docs.gate.current_lawful_state;
  assert.equal(legal.G0_open, true);
  for (const key of [
    'G0_complete', 'G0_frozen', 'source_census_frozen', 
    'all_nine_source_full_reverse_assertion_enumeration_complete',
    'Oct03_mutable_source_byte_identity_verified', 'G1_authorized',
    'G2_authorized', 'G3_authorized', 'G4_authorized', 'G5_authorized',
    'G5H_authorized', 'G6_authorized', 'G7_authorized', 'recursive_IA_authorized',
    'NEI_authorized', 'DTS_authorized', 'DP_authorized',
    'cross_track_synthesis_authorized'
  ]) assert.equal(legal[key], false, 'historical/live authority drift ' + key);
  for (const key of Object.keys(meta.pins)) assert.ok(docs[key], 'missing pinned input ' + key);
  assert.equal(docs.gate.current_source_census.git_blob_sha, meta.pins.ssc.git_blob_sha);
  assert.equal(docs.gate.current_source_coverage.git_blob_sha, meta.pins.review.git_blob_sha);
  assert.equal(docs.gate.current_all_151_conservation_register.git_blob_sha, meta.pins.reg.git_blob_sha);
  const items = docs.ssc.items;
  assert.equal(docs.ssc.census_item_count, 151);
  assert.equal(docs.ssc.source_count, 9);
  assert.equal(docs.ssc.cross_author_semantics_available, false);
  assert.equal(items.length, 151);
  assert.equal(docs.review.rows.length, 151);
  assert.equal(docs.reg.rows.length, 151);
  assert.equal(new Set(items.map(x => x.id)).size, 151, 'census identity collision');
  assert.ok(items.every(x => units.includes(unitOf(x))), 'other-track item');

  const counts = {};
  const old57 = new Map(docs.old57.items.map(x => [x.id, x]));
  const old62 = new Map(docs.old62.items.map(x => [x.id, x]));
  const review = new Map(docs.review.rows.map(x => [x.census_id, x]));
  const earlierReview = new Map(docs.base.ssc_to_review_locator_index.map(x => [x.census_id, x]));
  const register = new Map(docs.reg.rows.map(x => [x.census_id, x]));
  assert.equal(review.size, 151);
  assert.equal(register.size, 151);
  assert.equal(earlierReview.size, 151);

  const original = sourceIntervals(docs);
  assert.equal(original.length, 437);
  assert.deepEqual(meta.versioned_original_source_to_ssc, original, 'source-first interval inventory differs');
  const ownersById = new Map();
  const loadOwners = new Set();
  const knownRanges = {W01: [49, 1232], W02: [27, 163], W05: [33, 410]};
  for (const u of versioned) {
    const a = original.filter(x => x.unit === u);
    let pos = knownRanges[u][0], loadCount = 0;
    const present = new Set();
    for (const x of a) {
      assert.equal(x.html_lines[0], pos, 'source-first GAP/OVERLAP at ' + x.original_locator);
      assert.ok(Number.isInteger(x.html_lines[1]) && x.html_lines[1] >= pos,
        'invalid original span at ' + x.original_locator);
      pos = x.html_lines[1] + 1;
      if (x.load_bearing) {
        loadCount++;
        assert.ok(x.ssc_ids.length > 0, 'source semantic omission at ' + x.original_locator);
      }
      for (const id of x.ssc_ids) {
        assert.ok(items.some(z => z.id === id && unitOf(z) === u), 'foreign/missing owner ' + id);
        if (x.load_bearing) {
          present.add(id);
          loadOwners.add(id);
        }
        const locs = ownersById.get(id) || [];
        locs.push(x.original_locator);
        ownersById.set(id, locs);
      }
    }
    assert.equal(pos, knownRanges[u][1] + 1, 'uncovered tail of original ' + u);
    assert.equal(present.size, items.filter(x => unitOf(x) === u).length,
      'SSC item not inversely supported by load-bearing source at ' + u);
    const expected = u === 'W01' ? [293, 188, 44] :
                     u === 'W02' ? [61, 32, 30] : [83, 48, 17];
    assert.deepEqual([a.length, loadCount, present.size], expected,
      'source scope/local load-bearing census shifted ' + u);
  }
  assert.equal(loadOwners.size, 91);
  const biblios = original.filter(z => bibliographies.has(z.kind));
  assert.equal(biblios.length, 115, 'citation provenance body dropped');
  assert.equal(biblios.filter(x => x.unit === 'W01').length, 76);
  assert.equal(biblios.filter(x => x.unit === 'W02').length, 19);
  assert.equal(biblios.filter(x => x.unit === 'W05').length, 20);
  assert.ok(biblios.every(z => !z.load_bearing),
    'source bibliography imported as separate author mathematical assertion');
  assert.deepEqual(biblios.filter(x => x.unit === 'W01').map(x => x.original_bibliography_id),
    Array.from({length:76},(_,i)=>i+1), 'W01 original bibliography IDs missing');
  for (const [unit, total] of [['W02',19],['W05',20]])
    assert.deepEqual(biblios.filter(x => x.unit === unit).map(x => x.cited_source_reference_ids),
      Array.from({length:total},(_,i)=>[i+1]), 'original bibliography citation provenance lost '+unit);
  assert.ok(original.every(z => typeof z.source_review_disposition === 'string' && z.source_review_disposition.length),
    'source-review semantic disposition lost');

  const grouped = [];
  const statementIds = new Map();
  for (const z of items) {
    const u = unitOf(z), sts = getStatements(z);
    const current = review.get(z.id), historical = earlierReview.get(z.id), reg = register.get(z.id);
    assert.ok(current && historical && reg, 'missing indexed source/SSC evidence ' + z.id);
    assert.equal(reg.source_body_exact, z.obligation, 'SSC→source body not conserved ' + z.id);
    assert.equal(reg.source_expression_statement_count, sts.length);
    assert.equal(current.source_expression_statement_count, sts.length);
    assert.equal(current.body_length_chars, z.obligation.length);
    assert.equal(reg.historical_closure_accepted_as_current, false);
    const old = (u === 'W01' ? old62 : old57).get(z.id);
    if (versioned.has(u)) assert.deepEqual(z, old,
      'full versioned original-source audit invalidated by current SSC change ' + z.id);
    const locs = ownersById.get(z.id) || [];
    if (versioned.has(u)) assert.ok(locs.length > 0 && loadOwners.has(z.id),
      'versioned SSC item has no source-first inverse: ' + z.id);
    else assert.deepEqual(locs, [], 'mutable source falsely treated as Oct03 original');
    for (const st of sts) {
      const list = statementIds.get(st.id) || [];
      list.push({ssc_id: z.id, source: st});
      statementIds.set(st.id, list);
    }
    grouped.push({
      ssc_id: z.id, unit: u,
      review_locator: current.source_locator_this_review || historical.review_locator,
      versioned_original_location_keys: locs,
      typed_statement_ids: sts.map(y => y.id),
      disposition: versioned.has(u) ?
        'EXPLICIT_ORIGINAL_SOURCE_INTERVAL_INVERSE_PLUS_CURRENT_REVIEW_POINTER' :
        'CURRENT_ORIGINAL_REVIEW_POINTER_ONLY_OCT03_BYTE_PROVENANCE_UNVERIFIED'
    });
  }
  assert.ok(grouped.every(x => x.review_locator),
    'review-index visibility missing - investigate evidence, not instant omission');
  assert.deepEqual(meta.current_ssc_to_original_or_review, grouped,
    'bidirectional source-first inverse or current SSC review pointer changed');
  const dupes = [...statementIds.entries()].filter(([key, value]) => value.length > 1);
  assert.equal(statementIds.size, 524);
  assert.equal([...statementIds.values()].reduce((n, a) => n + a.length, 0), 526);
  assert.deepEqual(dupes.map(([id, a]) => ({
    statement_id: id, ssc_ids: a.map(x => x.ssc_id)
  })), [
    {statement_id: 'W02-G0-YM-01', ssc_ids: ['W-SSC-118', 'W-SSC-146']},
    {statement_id: 'W02-G0-YM-02', ssc_ids: ['W-SSC-118', 'W-SSC-146']}
  ], 'unsupported/accidental duplicate source statements');
  for (const [, entries] of dupes) assert.ok(same(entries[0].source, entries[1].source),
    'the same statement identity has divergent typed semantics');

  const anchors = docs.base.source_first_navigation_anchors.map(x => ({
    key: x.key, unit: x.unit, title: x.title, original_revision: x.original_revision,
    status: versioned.has(x.unit) ?
      'VERSIONED_ORIGINAL_LOCALLY_SOURCE_FIRST_CROSSWALKED_NOT_EXTERNAL_COLD_CERTIFIED' :
      'FROZEN_OCT03_ORIGINAL_BYTES_MISSING_CURRENT_PAGE_REVIEW_NOT_HISTORICAL_CERTIFICATE'
  }));
  assert.equal(anchors.length, 65);
  assert.equal(new Set(anchors.map(x => x.key)).size, 65);
  assert.deepEqual(meta.original_navigation_anchors, anchors, 'missing/grafted source anchor');
  const byUnit = units.map(unit => {
    const ss = items.filter(x => unitOf(x) === unit), ol = original.filter(x => x.unit === unit);
    return {
      unit, original_navigational_anchors: anchors.filter(x => x.unit === unit).length,
      ssc_items: ss.length,
      current_typed_incidences: ss.reduce((n, x) => n + getStatements(x).length, 0),
      versioned_source_first_intervals: ol.length,
      load_bearing_versioned_intervals: ol.filter(x => x.load_bearing).length,
      source_first_inverse_items: ss.filter(x => (ownersById.get(x.id) || []).length > 0).length,
      october_03_mutable_bytes_verified: false,
      local_state: ol.length ?
        'VERSIONED_ARTIFACT_SOURCE_FIRST_BIDIRECTIONAL_RECONCILED_NOT_INDEPENDENT_COLD_QUALIFIED' :
        'LIVE_REVISION_SOURCE_REVIEWS_EXIST_HISTORICAL_OCT03_BYTE_IDENTITY_UNVERIFIED',
      bibliography_and_citation_provenance_intervals: ol.filter(x => bibliographies.has(x.kind)).length
    };
  });
  assert.deepEqual(meta.versioned_source_census_by_unit, byUnit, 'by-source finite denominator changed');
  const c = meta.counters;
  assert.equal(c.frozen_source_units, 9);
  assert.equal(c.original_navigation_anchors, 65);
  assert.equal(c.versioned_anchors, 57);
  assert.equal(c.mutable_anchors, 8);
  assert.equal(c.versioned_source_first_intervals, 437);
  assert.equal(c.versioned_source_first_load_bearing_intervals, 268);
  assert.equal(c.versioned_bibliography_provenance_intervals, 115);
  assert.equal(c.versioned_source_first_load_bearing_ownerless, 0);
  assert.equal(c.current_ssc_items, 151);
  assert.equal(c.versioned_original_bidirectional_ssc_items, 91);
  assert.equal(c.mutable_original_byte_unverified_ssc_items, 60);
  assert.equal(c.current_typed_statement_incidences, 526);
  assert.equal(c.distinct_statement_ids, 524);
  assert.equal(c.frozen_mutable_oct03_exact_bytes_unverified, 6);
  assert.equal(c.global_complete_source_first_audit_independently_qualified, false);
  assert.equal(c.all_ssc_review_locators_present, true);
  assert.equal(c.direct_existing_item_reviews_reported_by_current_coverage, 151);
  assert.equal(c.historical_baseline_typed_statement_incidences,
    docs.base.counters.typed_source_incidences);
  assert.equal(docs.base.counters.typed_source_incidences, 460);
  assert.equal(c.source_to_ssc_unmapped_load_bearing_frozen_mutable_locations,
    'UNKNOWN_WITHOUT_FROZEN_OCT03_SOURCE_BYTES');
  assert.deepEqual(meta.unresolved_G0[0].units, ['W03','W04a','W04b','W04c','W04d','W04e']);
  assert.equal(meta.unresolved_G0[0].state, 'HARD_EVIDENCE_BOUNDARY');
  assert.equal(meta.unresolved_G0[1].state, 'CANNOT_QUALIFY_WITHOUT_FROZEN_SOURCE_REVISION');
  assert.equal(meta.unresolved_G0[2].state, 'NOT_QUALIFIED');
  assert.equal(meta.current_G0.source_semantic_omission_count_known_exact, false);
  assert.equal(meta.current_G0.source_provenance_complete, false);
  assert.ok(meta.not_G0.includes('G1 semantic occurrence extraction'));
  assert.ok(meta.not_G0.includes('recursive IA fixed point'));

  // A page-level owner is not sufficient: require distinct author-source
  // relation, operation, binder and modality atoms. These seven cold-authored
  // oracle keys are independently fixed in this verifier, not generated
  // by splitting the SSC or accepting its source-item ownership as proof.
  const fixedAtoms = [
    ['W04E-P09-SPECTRAL-01','W-SSC-124','W04E-124-05','semigroup','C_PLUS_R_DIRECT_SUM_C_PLUS_L'],
    ['W04E-P09-SEMIGROUP-02','W-SSC-124','W04E-124-06','relation','ACTION_EXTENSION_NOT_GROUP_EQUALITY'],
    ['W04E-P10-SEGAL-03','W-SSC-124','W04E-124-07','single_chiral_representation','A_R'],
    ['W04E-P10-EQUATOR-04','W-SSC-124','W04E-124-08','left_circle_physics_dependence',false],
    ['W04E-P10-WITTEN-05','W-SSC-124','W04E-124-09','cited_wick_discussion',false],
    ['W04E-P11-CHIRAL-06','W-SSC-086','W04E086-E02','chiral_split_carrier','COMPLEXIFIED_ROTATIONS_NOT_SPACETIME'],
    ['W04E-P12-NULL-07','W-SSC-087','W04E087-E02','source_topological_identification','S3_TIMES_S2']
  ];
  assert.equal(docs.old65.predecessor.git_blob_sha, meta.pins.old64.git_blob_sha);
  const historicalSevenOwners = docs.old65.items.filter((z,i) => !same(z, docs.old64.items[i])).map(z => z.id);
  assert.deepEqual(historicalSevenOwners, ['W-SSC-086','W-SSC-087','W-SSC-124'],
    'prior seven-atom source repair silently revised');
  assert.equal(docs.ssc.predecessor.git_blob_sha, meta.pins.old65.git_blob_sha);
  const changed = docs.ssc.items.filter((z,i) => !same(z, docs.old65.items[i])).map(z => z.id);
  assert.deepEqual(changed, ['W-SSC-082','W-SSC-123'],
    'more than two current W04e source owner records changed');
  assert.ok(docs.ssc.items.every((z,i) =>
    changed.includes(z.id) || same(z, docs.old65.items[i])),
    'source item outside new W04e repair changed');
  for (const id of historicalSevenOwners) {
    const before = docs.old65.items.find(z => z.id === id);
    const after = docs.ssc.items.find(z => z.id === id);
    assert.deepEqual(after, before, 'previous W04e seven atom source identity not conserved ' + id);
  }
  assert.equal(docs.atoms.source.full_frozen_oct03_bytes_recovered, false);
  assert.equal(docs.atoms.G0_boundary.G0_complete, false);
  assert.equal(docs.atoms.G0_boundary.G0_frozen, false);
  assert.equal(docs.atoms.G0_boundary.G1_authorized, false);
  assert.equal(docs.gate.current_W04e_atom_source_first.audit.git_blob_sha,
    meta.pins.atoms.git_blob_sha);
  assert.equal(docs.atoms.source_first_atoms.length, 7);
  assert.equal(meta.current_W04e_source_atom_repair.added_typed, 7);
  const atomKeys = new Set();
  for (const [key,owner,typed,field,value] of fixedAtoms) {
    const f = docs.atoms.source_first_atoms.find(z => z.id === key);
    assert.ok(f && !atomKeys.has(key), 'missing/duplicate original source atom ' + key);
    atomKeys.add(key);
    assert.equal(f.owner, owner);
    assert.equal(f.typed_id, typed);
    assert.equal(f.fields[field], value, 'source-side atom meaning lost ' + key);
    const item = items.find(z => z.id === owner);
    const st = getStatements(item).find(z => z.id === typed);
    assert.ok(st, 'page-owner-only false coverage: missing typed atom ' + key);
    assert.equal(st.kind, f.kind);
    assert.equal(st[field], value, 'SSC typed original meaning lost ' + key);
    assert.equal(st.source_locator.printed_pdf_page, f.printed_pdf_page);
    assert.equal(st.source_locator.pdf_index, f.pdf_index);
    assert.deepEqual(st.source_locator.original_pdf_text_lines, f.source_text_lines);
    assert.equal(st.scope, 'W04E_JUL14_2026_CURRENT_AUTHOR_PDF_NOT_OCT03_BYTE_AUTHENTICATED');
    assert.equal(st.epistemic_role, 'SOURCE_FIDELITY_G0_ONLY_NO_PRIMITIVE_OR_EXTERNAL_CITATION_PROMOTION');
    for (const [k,v] of Object.entries(f.fields)) assert.deepEqual(st[k],v,
      'undercounted distinct W04e source atom component ' + key + ':' + k);
  }
  assert.equal(atomKeys.size, 7);

  // Second independent W04e source-first atom oracle (pre-existing page audit
  // acknowledged the example, but it was underindexed in the SSC). This
  // verifies precise source semantics rather than treating a page owner as
  // complete source coverage or an older successful CI as an SSC0.66 pass.
  assert.equal(docs.oscillator.schema, 'isograph.exp062-w04e-source-first-p04-p05-ssc-omission.v0.1');
  assert.equal(docs.oscillator.track, 'W');
  assert.equal(docs.oscillator.source.original_oct03_historical_byte_identity, false);
  assert.equal(docs.oscillator.atoms.length, 4);
  const expectedNewAtoms = [
    ['W04E-ORIG-AXIOM-SEC2', 'W-SSC-082', 'W04E-082-05',
     'SOURCE_CONVENTIONAL_WIGHTMAN_ANALYTIC_EXTENSION_ASSUMPTIONS'],
    ['W04E-ORIG-OSC-SEC21', 'W-SSC-082', 'W04E-082-06',
     'SOURCE_BOSONIC_SINGLE_OSCILLATOR_PRINTED_H_AND_CANONICAL_OPERATORS'],
    ['W04E-ORIG-OSC-TWOPOINT', 'W-SSC-082', 'W04E-082-07',
     'SOURCE_WIGHTMAN_SCHWINGER_DELTA_AND_SCHWARTZ_SMEARING_OSCILLATOR'],
    ['W04E-ORIG-OSC-HILBERT', 'W-SSC-123', 'W04E-123-02',
     'SOURCE_WIGHTMAN_SINGLE_OSCILLATOR_HILBERT_AND_SYMMETRIC_FOCK']
  ];
  const newAtoms = new Map();
  for (const [atomId, owner, typedId, kind] of expectedNewAtoms) {
    const src = docs.oscillator.atoms.find(z => z.atom === atomId);
    assert.ok(src && !newAtoms.has(atomId), 'source-atom missing or duplicate '+atomId);
    assert.equal(src.owner, owner);
    assert.equal(src.typed_id, typedId);
    assert.equal(src.kind, kind);
    const item = items.find(z => z.id === owner);
    const typed = getStatements(item).find(z => z.id === typedId);
    assert.ok(typed, 'page-level W04e owner without exact source atom ' + typedId);
    assert.equal(typed.kind, kind);
    assert.equal(typed.source_first_atom, atomId);
    assert.equal(typed.source_locator.historical_october_03_2026_bytes_verified, false);
    assert.deepEqual(typed.source_locator.original_pdf_text_lines, src.text_lines);
    assert.deepEqual(typed.source_locator.printed_pages, src.pdf_pages);
    assert.deepEqual(typed.source_locator.pdf_indices, src.pdf_indices);
    assert.equal(typed.scope, 'W04E_JUL14_LIVE_NOT_FROZEN_OCT03_BYTES');
    assert.equal(typeof src.meaning, 'string');
    assert.ok(src.meaning.length > 50);
    newAtoms.set(atomId, typed);
  }
  assert.equal(newAtoms.size, 4);
  assert.deepEqual(getStatements(items.find(z => z.id === 'W-SSC-082')).slice(-3).map(z => z.id),
    ['W04E-082-05','W04E-082-06','W04E-082-07']);
  assert.equal(getStatements(items.find(z => z.id === 'W-SSC-123')).at(-1).id, 'W04E-123-02');
  const axiom = newAtoms.get('W04E-ORIG-AXIOM-SEC2');
  assert.equal(axiom.positive_spectrum, 'FOURIER_SUPPORT_IN_FORWARD_ENERGY_MOMENTUM_LIGHT_CONE_E_GE_ABS_P');
  assert.deepEqual(axiom.additional_axioms,
    ['LORENTZ_SO(3,1)_COVARIANCE_OF_WIGHTMAN_FUNCTIONS',
     'SPACELIKE_LOCALITY_SYMMETRY_OF_WIGHTMAN_FUNCTIONS']);
  assert.deepEqual(axiom.continuation_regions,
    ['FORWARD_TUBE','LORENTZ_COMPLEXIFICATION_EXTENDED_TUBE',
     'SPACELIKE_PERMUTED_EXTENDED_TUBE_INCLUDES_EUCLIDEAN']);
  assert.equal(axiom.source_qualifier, 'CITED_CONVENTIONAL_WIGHTMAN_FRAMEWORK_NOT_AUTHOR_CHIRAL_TWISTOR_PROOF');
  const boson = newAtoms.get('W04E-ORIG-OSC-SEC21');
  assert.equal(boson.printed_hamiltonian, 'H=omega*psi(t)*psi_dagger(t)');
  assert.deepEqual(boson.printed_operator_order, ['psi','psi_dagger']);
  assert.equal(boson.omega_condition, 'omega>0');
  assert.equal(boson.equation_of_motion, '(i*d/dt-omega)*psi(t)=0');
  assert.equal(boson.field, 'psi(t)=a*exp(-i*omega*t)');
  assert.equal(boson.adjoint, 'psi_dagger(t)=a_dagger*exp(i*omega*t)');
  assert.equal(boson.canonical_relation, '[a,a_dagger]=1');
  assert.equal(boson.related_case.omega, '|p|^2/(2*m)');
  assert.equal(boson.source_qualifier,'CONVENTIONAL_SINGLE_FREE_BOSONIC_MODE_IN_AUTHOR_ILLUSTRATION');
  const two = newAtoms.get('W04E-ORIG-OSC-TWOPOINT');
  assert.equal(two.Wightman, 'W2(t1,t2)=exp(-i*omega*(t1-t2))');
  assert.equal(two.Fourier_distribution, 'W2_tilde(E)=delta(E-omega)');
  assert.equal(two.holomorphic, 'W2(z)=exp(-i*omega*z)');
  assert.equal(two.Schwinger, 'S2(tau)=exp(-omega*tau)');
  assert.equal(two.test_space, 'Schwartz(R)');
  assert.equal(two.normalization, 'SOURCE_PRINTED_4_PI_SQUARED');
  assert.equal(two.inner_product_source,
    '<0|psi(f)psi_dagger(g)|0>=4*pi^2*conj(f_tilde(omega))*g_tilde(omega)');
  const h1 = newAtoms.get('W04E-ORIG-OSC-HILBERT');
  assert.equal(h1.numerator, 'Schwartz(R)');
  assert.equal(h1.null_denominator, '{f: W2(f,f)=0}');
  assert.equal(h1.one_particle_space, 'H1=Schwartz(R)/null(W2)');
  assert.equal(h1.dimension_complex, 1);
  assert.equal(h1.full_space, 'SYMMETRIC_TENSOR_FOCK_S_STAR(H1)');
  assert.equal(h1.distinct_from,
    'SECTION3_OS_SCHWARTZ(R_POSITIVE)_QUOTIENT_WITH_OS_THETA_INNER_PRODUCT');
  assert.ok(items.find(z=>z.id==='W-SSC-082').obligation.includes('H=ω ψ(t)ψ†(t)'));
  assert.ok(items.find(z=>z.id==='W-SSC-123').obligation.includes('Wightman single-oscillator'));
  assert.equal(meta.current_W04e_oscillator_source_repair.audit.git_blob_sha,
    meta.pins.oscillator.git_blob_sha);
  assert.deepEqual(meta.current_W04e_oscillator_source_repair.changed_current_W_SSC_ids,
    ['W-SSC-082','W-SSC-123']);
  assert.equal(meta.current_W04e_oscillator_source_repair.current_revision_oct03_exact_bytes_verified,false);
  assert.equal(meta.current_W04e_oscillator_source_repair.all_nine_independently_cold_qualified,false);
  assert.equal(docs.gate.current_source_census.typed_incidences,526);
  assert.equal(docs.gate.current_W04e_conventional_sec2_source_first.audit.git_blob_sha,
    meta.pins.oscillator.git_blob_sha);
  assert.equal(docs.unit.summary.structured_incidences, 526);
  assert.equal(docs.unit.summary.other149_exact, true);
  assert.equal(docs.reg.current_round.added_source_incidences,4);
  assert.equal(docs.review.current_round.new_typed_incidences,4);
  assert.equal(docs.gate.current_lawful_state.global_source_first_cold_audit_qualified, false);
  assert.equal(docs.gate.current_lawful_state.source_semantic_omission_count_known_exact, false);

  assert.equal(docs.unit.units.find(z => z.unit === 'W04e').structured_incidences, 36);
  assert.equal(meta.counters.frozen_mutable_oct03_exact_bytes_unverified, 6);
  assert.equal(meta.current_G0.source_semantic_omission_count_known_exact, false);

  return {original_intervals: original.length, source_semantic_intervals: 268,
    bibliography_entries: biblios.length, versioned_inversed_items: loadOwners.size,
    current_ssc: items.length, current_typed: 526, unique_typed: 524, G0: 'OPEN'};
}

for (const [key, pin] of Object.entries(m.pins)) {
  assert.equal(repoHash(pin.path), pin.git_blob_sha, 'input blob SHA changed '+key);
}
const positive = audit(m, d);
const mutations = [
 ['erase new conventional Wightman axiom', x => x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.splice(4,1)],
 ['swap printed bosonic Hamiltonian ordering', x => x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-06').printed_hamiltonian='H=omega*a_dagger*a'],
 ['co-corrupt source oracle and SSC bosonic commutator', x => {
    x.d.oscillator.atoms.find(z=>z.atom==='W04E-ORIG-OSC-SEC21').meaning='[a,a_dagger]_plus=1'; 
    x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-06').canonical_relation='{a,a_dagger}=1';
 }],
 ['erase spectral locality premise', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-05').additional_axioms.pop()],
 ['replace Fourier positive support', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-05').positive_spectrum='ALL_ENERGIES'],
 ['turn source conventional context into novel theorem', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-05').source_qualifier='SOURCE_PROVEN_NEW_CHIRAL_QFT'],
 ['lose Wightman delta spectrum', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-07').Fourier_distribution='delta(E+omega)'],
 ['erase 4pi2 source normalization', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.find(z=>z.id==='W04E-082-07').normalization='UNKNOWN'],
 ['equate Minkowski Wightman and OS positive-time quotients', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.find(z=>z.id==='W04E-123-02').distinct_from='SAME_QUOTIENT'],
 ['change one-dimensional Wightman Hilbert', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.find(z=>z.id==='W04E-123-02').dimension_complex=2],
 ['replace bosonic symmetric Fock by fermionic', x=>x.d.ssc.items.find(z=>z.id==='W-SSC-123').source_expression_census.statements.find(z=>z.id==='W04E-123-02').full_space='EXTERIOR_FOCK'],
 ['erase one source-oracle atom', x=>x.d.oscillator.atoms.pop()],
 ['swap source-oracle owner for oscillator', x=>x.d.oscillator.atoms[1].owner='W-SSC-059'],
 ['promote live PDF into frozen Oct03 original', x=>x.d.oscillator.source.original_oct03_historical_byte_identity=true],
 ['alter prior seven-atom historical SSC while current same', x=>x.d.old65.items.find(z=>z.id==='W-SSC-124').obligation+='ALTER'],
 ['drop one original current 151 inverse review row', x=>x.d.review.rows.splice(81,1)],
 ['forge false G1 authority in stage', x=>x.d.gate.current_lawful_state.G1_authorized=true],
 ['override historical mutable bytes without evidence', x=>x.m.current_G0.source_provenance_complete=true],
 ['change current structured typed denominator', x=>x.m.counters.current_typed_statement_incidences=525],

 ['drop one formerly hidden source atom', x => x.d.atoms.source_first_atoms.pop()],
 ['inject false original atom owner', x => x.d.atoms.source_first_atoms[0].owner = 'W-SSC-001'],
 ['erase new conformal semigroup operator', x => x.d.ssc.items.find(z => z.id === 'W-SSC-124').source_expression_census.statements.find(z => z.id === 'W04E-124-06').relation = 'UNKNOWN'],
 ['co-corrupt source summary and SSC semigroup', x => {
    x.d.atoms.source_first_atoms[0].fields.semigroup = 'NONE';
    x.d.ssc.items.find(z => z.id === 'W-SSC-124').source_expression_census.statements.find(z => z.id === 'W04E-124-05').semigroup = 'NONE';
 }],
 ['misstate Segal citation role', x => x.d.ssc.items.find(z => z.id === 'W-SSC-124').source_expression_census.statements.find(z => z.id === 'W04E-124-07').source_modality = 'INDEPENDENT_THEOREM'],
 ['erase separate left chirality negative', x => x.d.ssc.items.find(z => z.id === 'W-SSC-124').source_expression_census.statements.find(z => z.id === 'W04E-124-08').left_circle_physics_dependence = true],
 ['deny distinct Hermiticity doubling', x => x.d.ssc.items.find(z => z.id === 'W-SSC-086').source_expression_census.statements.find(z => z.id === 'W04E086-E02').conventional_obstacles.pop()],
 ['replace light-rays with space points', x => x.d.ssc.items.find(z => z.id === 'W-SSC-087').source_expression_census.statements.find(z => z.id === 'W04E087-E02').ray_carrier = 'CP1_POINTS'],
 ['promote live page to historical Oct03 bytes', x => x.d.atoms.source.full_frozen_oct03_bytes_recovered = true],
 ['rewrite unrelated source item silently', x => x.d.ssc.items.find(z => z.id === 'W-SSC-068').obligation += ' SILENT_REWRITE'],

 ['drop frozen original interval', x => x.m.versioned_original_source_to_ssc.pop()],
 ['duplicate original interval', x => x.d.w01.original_to_SSC.splice(4, 0, clone(x.d.w01.original_to_SSC[4]))],
 ['source interval gap', x => x.d.w05.original_source_location_dispositions[10].html_lines[0]++],
 ['source interval overlap', x => x.d.w02.source_first_locations[15].html_lines[0]--],
 ['delete true semantic owner', x => x.d.w01.original_to_SSC.find(z => z.disposition_kind === 'SOURCE_LOAD_BEARING').ssc_owners = []],
 ['fake cross-author original owner', x => x.d.w05.original_source_location_dispositions.find(z => z.ssc_owners.length).ssc_owners = ['L-SSC-001']],
 ['drop W02 source-specific citation', x => x.d.w02.source_first_locations.find(z => z.kind === 'BIBLIOGRAPHY_PROVENANCE_ONLY').citations = []],
 ['falsely promote bibliography to theorem', x => x.m.versioned_original_source_to_ssc.find(z => z.kind === 'BIBLIOGRAPHY_PROVENANCE_ONLY').load_bearing = true],
 ['erase bibliography provenance', x => x.d.w02.source_first_locations.pop()],
 ['erase original navigation anchor', x => x.m.original_navigation_anchors.pop()],
 ['erase current SSC inverse', x => x.m.current_ssc_to_original_or_review.pop()],
 ['erase mutable evidence pointer', x => x.m.current_ssc_to_original_or_review.find(z => z.unit === 'W04e').review_locator = null],
 ['invent historical Oct03 source inverse', x => x.m.current_ssc_to_original_or_review.find(z => z.unit === 'W04e').versioned_original_location_keys = ['FAKE']],
 ['rewrite historic W01 source meaning', x => x.d.old62.items.find(z => z.id === 'W-SSC-001').obligation += 'OTHER'],
 ['rewrite current W01 source', x => x.d.ssc.items.find(z => z.id === 'W-SSC-006').obligation += 'OTHER'],
 ['rewrite current W02 semantic modality', x => x.d.ssc.items.find(z => z.id === 'W-SSC-150').obligation += 'THEOREM'],
 ['rewrite W05 source payload', x => x.d.w05.original_source_location_dispositions[18].original_source_disposition = 'NOT AUTHORED'],
 ['alter one of two shared typed aliases', x => x.d.ssc.items.find(z => z.id === 'W-SSC-146').source_expression_census.statements.find(z => z.id === 'W02-G0-YM-02').modality = 'EQUALITY'],
 ['invent another duplicate statement', x => x.d.ssc.items.find(z => z.id === 'W-SSC-005').source_expression_census.statements[0].id = 'W02-G0-YM-01'],
 ['erase existing source evidence', x => x.d.review.rows.find(z => z.census_id === 'W-SSC-001').source_locator_this_review = 'FAKE'],
 ['change SSC-to-body register', x => x.d.reg.rows.find(z => z.census_id === 'W-SSC-024').source_body_exact = 'DROPPED'],
 ['promote failed source G0 freeze', x => x.d.gate.current_lawful_state.G0_frozen = true],
 ['authorize G1 without G0', x => x.m.current_G0.G1_authorized = true],
 ['assert independent nine-source cold pass', x => x.m.counters.global_complete_source_first_audit_independently_qualified = true],
 ['invent historical mutable bytes', x => x.m.current_G0.source_provenance_complete = true],
 ['import other author item', x => x.d.ssc.items[0].source = 'L01'],
 ['hide prior baseline denominator', x => x.m.counters.historical_baseline_typed_statement_incidences = 522]
];
let rejected = 0;
for (const [name, mutate] of mutations) {
  const x = clone({m, d});
  const before = JSON.stringify(x);
  mutate(x);
  assert.notEqual(JSON.stringify(x), before, 'inert adversarial control ' + name);
  try {
    audit(x.m, x.d);
  } catch (e) {
    rejected++;
    continue;
  }
  throw Error('ADVERSARIAL_ESCAPE: ' + name);
}
assert.equal(rejected, mutations.length);
console.log('W finite G0 source-first convergence PASS ' + JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+mutations.length+
  '. Six October3 mutable original-source byte identities and all-nine independent cold verification remain OPEN; no G1–G7 or W/L synthesis.');
