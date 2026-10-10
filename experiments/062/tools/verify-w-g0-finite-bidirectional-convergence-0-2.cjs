#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const root = 'experiments/062/';
const manifestPath = root + 'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_2.json';
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
  assert.equal(meta.schema, 'isograph.exp062-w-g0-finite-versioned-source-bidirectional-convergence.v0.2');
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
  assert.equal(statementIds.size, 513);
  assert.equal([...statementIds.values()].reduce((n, a) => n + a.length, 0), 515);
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
  assert.equal(c.current_typed_statement_incidences, 515);
  assert.equal(c.distinct_statement_ids, 513);
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
  return {original_intervals: original.length, source_semantic_intervals: 268,
    bibliography_entries: biblios.length, versioned_inversed_items: loadOwners.size,
    current_ssc: items.length, current_typed: 515, unique_typed: 513, G0: 'OPEN'};
}

for (const [key, pin] of Object.entries(m.pins)) {
  assert.equal(repoHash(pin.path), pin.git_blob_sha, 'input blob SHA changed '+key);
}
const positive = audit(m, d);
const mutations = [
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
 ['hide prior baseline denominator', x => x.m.counters.historical_baseline_typed_statement_incidences = 515]
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
