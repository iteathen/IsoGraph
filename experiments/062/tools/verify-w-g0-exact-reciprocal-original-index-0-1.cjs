#!/usr/bin/env node
'use strict';
// G0 evidence-index consistency only. It does not certify frozen mutable source bytes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const prefix = 'experiments/062/';
const PATH = {
  corpus: 'research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md',
  ssc: 'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json',
  finite: prefix+'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_9.json',
  W01: prefix+'W01_G0_FULL_ORIGINAL_SOURCE_BIDIRECTIONAL_0_1.json',
  W02: prefix+'W02_G0_VERSIONED_FULL_ORIGINAL_SOURCE_REVERSE_0_1.json',
  W05: prefix+'W05_G0_VERSIONED_FULL_SOURCE_FIRST_PDF_HTML_0_2.json',
  W04e: prefix+'W04E_G0_ALL_15PAGE_CURRENT_AUTHOR_PDF_ORIGINAL_FIRST_CONVERGENCE_0_1.json',
  gate: prefix+'W_CURRENT_STAGE_GATE_0_131.json'
};
// Independently frozen Git object identities, not values read from the inverse ledger.
const PIN = {
  corpus: '5775af1ab9289f97d903b39d5eb8eda241bafe78',
  ssc: 'f13075a1e2b039bab66e738cc992e121cd6c9947',
  finite: '6218ba14b5c9c222e897f74600fc000b41436729',
  W01: '67a8b002a799b60a3c3dd5178fa4fcac584ffd0e',
  W02: '1ff25926dcdce24408e889b6ca71766f6e403bcc',
  W05: '3af2512add89a58678c61b0dfd289ba192a304ed',
  W04e: '4d5abe5ccff0149a2f72b10c3b78c73752fd6041',
  gate: 'dcaebb6246e1f277fb0a343eac639d24d54b5821'
};
const sha = b => crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'), b])).digest('hex');
const originals = {};
for (const key of Object.keys(PATH)) {
  const buf=fs.readFileSync(PATH[key]);
  assert.equal(sha(buf),PIN[key],'input provenance differs from qualified source tuple: '+key);
  originals[key]=key==='corpus'?buf.toString('utf8'):JSON.parse(buf.toString('utf8'));
}
const lockedPrimary = Object.fromEntries(['W01','W02','W05','W04e'].map(k=>[k,JSON.stringify(originals[k])]));
const clone = x => structuredClone(x);
const nonload = {
  W01: new Set(['NONLOAD_PROVENANCE','NONLOAD_HEADING','NATIVE_BIBLIOGRAPHY']),
  W02: new Set(['PROVENANCE','NON_LOAD_HEADING','BIBLIOGRAPHY_PROVENANCE_ONLY']),
  W05: new Set(['PROVENANCE','HEADING','HEADING_AND_ROLE','BIBLIOGRAPHY_SOURCE_ONLY'])
};
const PAGE_RANGES = [[0,24],[25,60],[61,106],[107,150],[151,208],[209,259],[260,301],[302,347],[348,409],[410,470],[471,513],[514,573],[574,633],[634,665],[666,693]];
function sourceRows(s) {
  return [
    ...s.W01.original_to_SSC.map(x=>({unit:'W01',key:x.key,html:x.source_original_html_lines,kind:x.disposition_kind,owners:x.ssc_owners,meaning:x.source_meaning})),
    ...s.W02.source_first_locations.map(x=>({unit:'W02',key:x.key,html:x.html_lines,kind:x.kind,owners:x.ssc_ids,meaning:x.source_semantics})),
    ...s.W05.original_source_location_dispositions.map(x=>({unit:'W05',key:x.key,html:x.html_lines,kind:x.kind,owners:x.ssc_owners,meaning:x.original_source_disposition}))
  ];
}
function verify(s) {
  assert.match(s.corpus, /W03/);assert.match(s.corpus,/W04e/);
  for(const key of Object.keys(lockedPrimary))assert.equal(JSON.stringify(s[key]),lockedPrimary[key],'original first evidence mutated '+key);
  assert.equal(s.ssc.source_count,9); assert.equal(s.ssc.items.length,151);
  assert.equal(s.ssc.census_item_count,151);
  const byId=new Map(s.ssc.items.map(x=>[x.id,x]));
  assert.equal(byId.size,151,'duplicate SSC identifier');
  const statements=s.ssc.items.flatMap(x=>x.source_expression_census?.statements||[]);
  assert.equal(statements.length,539,'typed source incidence loss');
  assert.equal(new Set(statements.map(x=>x.id)).size,537,'incorrect source occurrence aliases');
  assert.equal(s.finite.versioned_original_source_to_ssc.length,437);
  const rows=sourceRows(s),idx=s.finite.versioned_original_source_to_ssc;
  assert.equal(rows.length,437);
  const expectations={W01:{first:49,last:1232,rows:293,load:188,owners:44},W02:{first:27,last:163,rows:61,load:32,owners:30},W05:{first:33,last:410,rows:83,load:48,owners:17}};
  const originalPairs=[],originalKeys=new Set(),allOwners=new Set();
  for(const unit of Object.keys(expectations)) {
    const expected=expectations[unit];let cursor=expected.first,load=0,owned=new Set();
    const unitRows=rows.filter(x=>x.unit===unit);
    assert.equal(unitRows.length,expected.rows,'source unit row denominator '+unit);
    for(const original of unitRows) {
      assert.ok(!originalKeys.has(original.key),'original source interval repeated '+original.key);
      originalKeys.add(original.key);
      assert.deepEqual(original.html.length,2);
      assert.equal(original.html[0],cursor,'original source gap/overlap '+original.key);
      assert.ok(original.html[1]>=cursor,'invalid original source span '+original.key);
      cursor=original.html[1]+1;
      const isLoad=!nonload[unit].has(original.kind);
      if(isLoad){load++;assert.ok(original.owners.length,'unrepresented source semantic interval '+original.key)}
      for(const owner of original.owners){
        assert.equal(s.finite.current_ssc_to_original_or_review.find(x=>x.ssc_id===owner)?.unit,unit,'cross-unit source owner '+original.key);
        assert.ok(byId.has(owner),'source links missing SSC ID '+owner);
        owned.add(owner);allOwners.add(owner);
        originalPairs.push(original.key+'|'+owner);
      }
    }
    assert.equal(cursor,expected.last+1,'original source trailing interval missing '+unit);
    assert.equal(load,expected.load,'load-bearing interval classification changed '+unit);
    assert.equal(owned.size,expected.owners,'missing unit SSC original inverse '+unit);
  }
  assert.equal(allOwners.size,91,'versioned original SSC inverse lost');
  const inverse=s.finite.current_ssc_to_original_or_review;
  assert.equal(inverse.length,151,'incomplete SSC inverse index');
  assert.equal(new Set(inverse.map(x=>x.ssc_id)).size,151,'duplicate SSC inverse identifier');
  const inversePairs=[];
  for(let i=0;i<151;i++){
    const item=s.ssc.items[i],entry=inverse[i];
    assert.equal(item.id,entry.ssc_id,'SSC inverse order/id drift');
    assert.deepEqual(entry.typed_statement_ids,(item.source_expression_census?.statements||[]).map(x=>x.id),'typed source evidence index drift '+item.id);
    const keys=entry.versioned_original_location_keys;
    assert.ok(Array.isArray(keys),'undefined SSC original inverse keys '+item.id);
    assert.equal(new Set(keys).size,keys.length,'repeated SSC original inverse key '+item.id);
    if(['W01','W02','W05'].includes(entry.unit))assert.ok(keys.length,'unrepresented versioned source owner '+item.id);
    else assert.equal(keys.length,0,'mutable source represented as versioned original '+item.id);
    for(const key of keys){
      assert.ok(originalKeys.has(key),'dangling inverse original source location '+item.id+':'+key);
      inversePairs.push(key+'|'+entry.ssc_id);
    }
  }
  const seen=new Set();let cursorByUnit={};let localOrdinal={W01:0,W02:0,W05:0};
  for(let i=0;i<437;i++){
    const original=rows[i],m=idx[i];
    assert.equal(m.ledger_index,localOrdinal[original.unit]++,'source unit ordinal drift');
    assert.equal(m.unit,original.unit);
    assert.equal(m.original_locator,original.key);
    assert.deepEqual(m.html_lines,original.html,'original location boundaries drift '+original.key);
    assert.equal(m.kind,original.kind);
    assert.equal(m.load_bearing,!nonload[original.unit].has(original.kind));
    assert.deepEqual(m.ssc_ids,original.owners,'source→SSC index differs from original-first ledger '+original.key);
    assert.equal(m.source_review_disposition,original.meaning,'source-first semantic disposition drift '+original.key);
    assert.ok(!seen.has(m.original_locator));seen.add(m.original_locator);
    cursorByUnit[m.unit]=m.html_lines[1];
  }
  assert.deepEqual(cursorByUnit,{W01:1232,W02:163,W05:410});
  originalPairs.sort();inversePairs.sort();
  assert.equal(originalPairs.length,330);assert.equal(inversePairs.length,330);
  assert.deepEqual(inversePairs,originalPairs,'original→SSC and SSC→original are not exact reciprocals');
  assert.equal(new Set(originalPairs).size,330,'duplicate original-source membership relation');
  const current=s.W04e.original_source_to_ssc;
  assert.equal(current.length,88,'current W04e available PDF locations changed');
  let line=0,load=0,non=0,pdfOwner=new Set(),page=1;
  for(const [i,x] of current.entries()){
    assert.equal(x.original_pdf_text_lines[0],line,'current W04e line gap/overlap '+x.key);
    assert.ok(x.original_pdf_text_lines[1]>=line);
    const [lo,hi]=PAGE_RANGES[page-1];
    assert.ok(line>=lo && x.original_pdf_text_lines[1]<=hi,'W04e page boundary crossed '+x.key);
    assert.equal(x.printed_pdf_page,page,'incorrect original W04e page '+x.key);
    line=x.original_pdf_text_lines[1]+1;
    if(line===hi+1)page++;
    assert.equal(x.current_revision_only,true);
    if(x.kind==='PROVENANCE'||x.kind.startsWith('NONLOAD')){non++;assert.equal(x.ssc_owners.length,0)}
    else{load++;assert.ok(x.ssc_owners.length,'unowned W04e source meaning');}
    for(const owner of x.ssc_owners){
      assert.equal(inverse.find(y=>y.ssc_id===owner)?.unit,'W04e','W04e source owner wrong unit');
      pdfOwner.add(owner);
    }
  }
  assert.equal(page,16);assert.equal(line,694);assert.equal(load,78);assert.equal(non,10);
  assert.equal(pdfOwner.size,13);
  assert.equal(s.W04e.original_source.original_2026_oct03_raw_bytes_authenticated,false);
  assert.equal(s.W04e.convergence.global_frozen_G0_verified,false);
  assert.equal(s.finite.counters.frozen_mutable_oct03_exact_bytes_unverified,6);
  const gate=s.gate.current_lawful_state;
  assert.equal(gate.G0_open,true);
  for(const field of ['G0_complete','G0_frozen','source_census_frozen','global_source_first_cold_audit_qualified','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate[field],false,'premature W G0 qualification: '+field);
  return {versioned_locations:437,versioned_load:268,versioned_reciprocal_links:330,versioned_owners:91,current_W04e_locations:88,current_W04e_lines:694,current_W04e_load:78,SSC:151,typed:539,G0:'OPEN_ORIGINAL_OCT03_BYTES_UNVERIFIED'};
}
const base=clone(originals);
const positive=verify(base);
const hostiles=[
 ['source W01 loses one owner',x=>x.W01.original_to_SSC[1].ssc_owners.pop()],
 ['source W02 owner relabeled',x=>x.W02.source_first_locations[1].ssc_ids[0]='W-SSC-151'],
 ['source W05 interval gap',x=>x.W05.original_source_location_dispositions[1].html_lines[0]++],
 ['co-edit W01 owner and both inverse surfaces',x=>{x.W01.original_to_SSC[1].ssc_owners.pop();x.finite.versioned_original_source_to_ssc[1].ssc_ids.pop();x.finite.current_ssc_to_original_or_review[0].versioned_original_location_keys.shift();}],
 ['versioned original claims extra owner',x=>x.finite.versioned_original_source_to_ssc[1].ssc_ids.push('W-SSC-030')],
 ['versioned original meaning changed',x=>x.finite.versioned_original_source_to_ssc[1].source_review_disposition='UNSCOPED_PROOF'],
 ['versioned original spans overlap',x=>x.finite.versioned_original_source_to_ssc[2].html_lines[0]--],
 ['versioned source order changed',x=>[x.finite.versioned_original_source_to_ssc[2],x.finite.versioned_original_source_to_ssc[3]]=[x.finite.versioned_original_source_to_ssc[3],x.finite.versioned_original_source_to_ssc[2]]],
 ['inverse drops one exact link',x=>x.finite.current_ssc_to_original_or_review[0].versioned_original_location_keys.shift()],
 ['inverse adds false existing-source link',x=>x.finite.current_ssc_to_original_or_review[0].versioned_original_location_keys.push('W01-INVERSE-003')],
 ['inverse owner cross-unit change',x=>x.finite.current_ssc_to_original_or_review[0].unit='W05'],
 ['inverse whole owner erased',x=>x.finite.current_ssc_to_original_or_review.splice(3,1)],
 ['original duplicate source location',x=>x.finite.versioned_original_source_to_ssc[6].original_locator=x.finite.versioned_original_source_to_ssc[5].original_locator],
 ['SSC item duplicated',x=>x.ssc.items[4].id=x.ssc.items[3].id],
 ['SSC typed occurrence silently dropped',x=>x.ssc.items.find(i=>(i.source_expression_census?.statements||[]).length).source_expression_census.statements.pop()],
 ['current W04e interval erased',x=>x.W04e.original_source_to_ssc.splice(5,1)],
 ['current W04e loads demoted to heading',x=>{x.W04e.original_source_to_ssc[1].kind='NONLOAD_HEADING';x.W04e.original_source_to_ssc[1].ssc_owners=[];}],
 ['current W04e owner hidden',x=>x.W04e.original_source_to_ssc[1].ssc_owners=[]],
 ['current W04e original byte falsely certified',x=>x.W04e.original_source.original_2026_oct03_raw_bytes_authenticated=true],
 ['provenance falsely closed',x=>x.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['G0 falsely frozen',x=>{x.gate.current_lawful_state.G0_open=false;x.gate.current_lawful_state.G0_frozen=true;}],
 ['G1 falsely authorized',x=>x.gate.current_lawful_state.G1_authorized=true]
];
let rejected=0;
for(const [label,mutate] of hostiles){
  const x=clone(base);mutate(x);
  let bad=false;try{verify(x)}catch(err){bad=true;}
  assert.ok(bad,'hostile mutation escaped: '+label);rejected++;
}
console.log('W G0 exact independently pinned reciprocal original index PASS '+JSON.stringify({...positive,hostile_rejected:rejected,hostile_total:hostiles.length}));
