#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const M=read('experiments/062/W_G0_AUTHOR_HTML_STRUCTURAL_FINGERPRINT_SUPPLEMENT_0_1.json');
const L=read('/tmp/woit-current-author-structural-0-2.json');
const P={
scope:['research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json','86bb7d5ad55c26ea3586f2a74f1411c2a5d843c7'],
ssc:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
stage:['experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json','e3848f4025a733d33b8b8b3411fa779e8b0a5b9a'],
oldstage:['experiments/062/W_CURRENT_STAGE_GATE_0_131.json','dcaebb6246e1f277fb0a343eac639d24d54b5821']
};
for(const [n,[p,h]]of Object.entries(P))assert.equal(blob(p),h,'existing frozen source changed '+n);
const scope=read(P.scope[0]),ssc=read(P.ssc[0]),stage=read(P.stage[0]),old=read(P.oldstage[0]);
const FIXED={
W03:['e5cfa33097192953233ef5c9e8aa1b0f7f15b6855aacf3cf3d6bec66e5b405f0',13,0],
W04a:['55507f44749b1e6abde8032b78f5c4d8adbfd7113d3e5ebf95effec4986b0a59',5,6],
W04b:['0a9592be1e5670d2e7e7ffbdfb85700d2cf8a6f9f0fe64bb037448e4b1d6d9ee',2,3],
W04c:['1110f87fe5c880c89f2628e4a2789be3ffa1a0c8960e2f5a037448e4b1d6d9ee',2,0],
W04d:['11921a53f6c8b0c63d59874535d189cd7b6afde1935fd7b59e95c56b63bc387d',5,0],
W04e:['c051b2ba7fee062e37aa13c987f0be66a843fe2605c983b45c8499ae7d68b229',3,0]
};
const clone=x=>structuredClone(x);
function verify(m,l){
 assert.equal(m.schema,'isograph.exp062.W.G0.author-source-semantic-surface-source-first-supplement.v0.1');
 assert.equal(m.prior_ci.run_id,38142568606);
 assert.equal(m.prior_ci.conclusion,'SUCCESS');
 assert.equal(m.old_target_G0,'OPEN');
 assert.equal(m.current_target_G0,'FROZEN_CONSERVED');
 assert.equal(m.historical_2026_10_03_byte_equality_asserted,false);
 assert.equal(m.source_semantic_g0_claim_changed,false);
 assert.equal(m.G1_started,false);
 assert.equal(m.no_L_semantics,true);
 assert.equal(m.PR70_unmerged,true);
 assert.equal(m.original_scope_file.blob_sha,P.scope[1]);
 assert.equal(m.original_SSC_file.blob_sha,P.ssc[1]);
 assert.equal(m.counts.source_units,6);
 assert.equal(m.counts.total_original_entry_links,30);
 assert.equal(m.counts.math_nodes,9);
 assert.equal(m.counts.article_images,0);
 assert.equal(m.counts.new_SSC_source_items,0);
 assert.equal(l.schema,'isograph.W.G0.author-semantic-html-surface.live.v0.2');
 assert.equal(m.sources.length,6);
 assert.equal(l.entries.length,6);
 assert.equal(scope.original_frozen_target.retained_open,true);
 assert.equal(scope.source_scope.exact_mutable_oct03_bytes_claimed_same,false);
 assert.equal(stage.current.G0_frozen,true);
 assert.equal(stage.historical_oct03_target.G0_complete,false);
 assert.equal(old.current_lawful_state.G0_open,true);
 assert.equal(old.current_lawful_state.G1_authorized,false);
 assert.equal(ssc.items.length,151);
 const seen=new Set();
 for(let i=0;i<6;i++){
  const a=m.sources[i],b=l.entries[i],fixed=FIXED[a.unit];
  assert.ok(fixed,'unexpected unit '+a.unit);
  assert.equal(a.unit,b.unit);
  assert.ok(!seen.has(a.unit));seen.add(a.unit);
  assert.equal(a.canonical_semantic_surface_sha256,fixed[0]);
  assert.equal(b.canonical_semantic_surface_sha256,fixed[0]);
  assert.equal(a.link_count,fixed[1]);
  assert.equal(b.links_count,fixed[1]);
  assert.equal(a.math_nodes_count,fixed[2]);
  assert.equal(b.math_text_nodes_count,fixed[2]);
  assert.equal(a.links_sha256,b.links_fingerprint,'changed source href '+a.unit);
  assert.equal(a.math_nodes_sha256,b.math_nodes_fingerprint);
  assert.equal(a.images_sha256,b.images_fingerprint);
  assert.equal(a.image_count,b.images_count);
  assert.equal(a.authored_text_sha256,b.author_text_sha256);
  assert.equal(a.chars,b.article_text_character_count);
  assert.deepEqual(a.source_specific_links,b.source_specific_links);
  const scopeUnit=scope.source_scope.units.find(x=>x.unit===a.unit);
  assert.equal(scopeUnit?.original_url,a.url);
  assert.equal(scopeUnit?.authored_content_sha256,a.authored_text_sha256);
  assert.equal(b.original_url,a.url);
  assert.equal(b.historical_oct03_byte_equality_asserted,false);
  if(a.unit==='W04d')assert.ok(b.source_specific_links.includes(m.explicit_link_guards.W04d));
  if(a.unit==='W04e')assert.ok(b.source_specific_links.includes(m.explicit_link_guards.W04e));
 }
 assert.deepEqual([...seen].sort(),Object.keys(FIXED).sort());
 return {units:6,ordered_source_hyperlinks:30,math_nodes:9,changed_source_claims:0,historical_G0:'OPEN'};
}
const ok=verify(clone(M),clone(L));
const test=[
 ['W04d linked PDF href',x=>x.l.entries[4].source_specific_links[0]='https://invalid.example/test.pdf'],
 ['W04e linked notes href',x=>x.m.explicit_link_guards.W04e='https://invalid.example/note.pdf'],
 ['W03 citation URL',x=>x.l.entries[0].links_fingerprint='0'.repeat(64)],
 ['W04a inline math deleted',x=>x.l.entries[1].math_text_nodes_count=5],
 ['W04b inline math replaced',x=>x.l.entries[2].math_nodes_fingerprint='bad'],
 ['W04c source syntax changed',x=>x.l.entries[3].canonical_semantic_surface_sha256='bad'],
 ['one new author image',x=>x.l.entries[4].images_count=1],
 ['source article text replaced',x=>x.l.entries[0].author_text_sha256='bad'],
 ['old G0 fabricated closed',x=>x.m.old_target_G0='CLOSED'],
 ['scope identity changed',x=>x.m.original_scope_file.blob_sha='bad'],
 ['source census changed',x=>x.m.counts.new_SSC_source_items=1],
 ['begin G1 prematurely',x=>x.m.G1_started=true],
 ['cross-author semantics',x=>x.m.no_L_semantics=false],
 ['claim Oct03 equality',x=>x.m.historical_2026_10_03_byte_equality_asserted=true],
 ['false live W04d math',x=>x.l.entries[4].math_text_nodes_count=1],
 ['fake W03 nonauthor source',x=>x.m.sources[0].unit='W04e']
];
for(const [name,change]of test){const x={m:clone(M),l:clone(L)};change(x);let rejected=false;try{verify(x.m,x.l)}catch(e){rejected=true;}assert.ok(rejected,'mutation escaped: '+name)}
console.log('W G0 author source structural integrity PASS '+JSON.stringify({...ok,adversarial_rejected:test.length,total:test.length}));
