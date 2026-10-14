#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const b='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const paths={
old:w+'SOURCE_SEMANTIC_CENSUS_0_62.json',now:w+'SOURCE_SEMANTIC_CENSUS_0_63.json',
audit:b+'W04D_G0_28_SLIDE_6_POST_SOURCE_FIRST_0_1.json',defect:b+'W04D_G0_FULL_DECK_PREDECESSOR_SOURCE_DEFECT_0_1.json',
oldreg:b+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_48.json',reg:b+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_49.json',
oldcov:b+'W_G0_LINE_BY_LINE_151_COVERAGE_0_47.json',cov:b+'W_G0_LINE_BY_LINE_151_COVERAGE_0_48.json',
oldinv:b+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_29.json',inv:b+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_30.json',
oldgate:b+'W_CURRENT_STAGE_GATE_0_122.json',gate:b+'W_CURRENT_STAGE_GATE_0_123.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=x=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');
const sha=p=>gitBlob(fs.readFileSync(p));
const canonical=x=>gitBlob(Buffer.from(JSON.stringify(x,null,2)+'\n','utf8'));
const original=Object.fromEntries(Object.entries(paths).map(([key,path])=>[key,load(path)]));
const clone=x=>JSON.parse(JSON.stringify(x));
const changed=['W-SSC-089','W-SSC-090','W-SSC-091'];
const w04dSource=['W-SSC-019','W-SSC-020','W-SSC-079','W-SSC-080','W-SSC-081','W-SSC-089','W-SSC-090','W-SSC-091','W-SSC-092','W-SSC-093','W-SSC-094','W-SSC-095','W-SSC-096'].sort();
const typed=x=>x.items.reduce((a,z)=>a+(z.source_expression_census?.statements||[]).length,0);
const Wtyped=x=>x.items.filter(z=>z.source.startsWith('W04d')).reduce((a,z)=>a+(z.source_expression_census?.statements||[]).length,0);
function verify(x,enforceCurrentBlobIdentity=true){
 const {old,now,audit,defect,oldreg,reg,oldcov,cov,oldinv,inv,oldgate,gate}=x;
 assert.equal(canonical(old),sha(paths.old),'historical SSC0.62 changed');
 if(enforceCurrentBlobIdentity){
  assert.equal(canonical(now),sha(paths.now),'SSC0.63 source changed');
  assert.equal(canonical(audit),sha(paths.audit),'source-first primary ledger changed');
  assert.equal(canonical(defect),sha(paths.defect),'historical defect classification changed');
 }
 assert.equal(old.schema,'woit.source-semantic-census.v0.62');
 assert.equal(now.schema,'woit.source-semantic-census.v0.63');
 assert.equal(now.predecessor.git_blob_sha,sha(paths.old));
 assert.equal(audit.track,'W');assert.equal(audit.semantic_authority,false);
 assert.equal(audit.source.source_unit,'W04d');
 assert.equal(audit.source.pdf_talk_date,'2026-04-03');
 assert.equal(audit.source.source_date,'2026-04-17');
 assert.equal(audit.source.slides_exact_2026_10_03_raw_bytes_sha256,'UNVERIFIED');
 assert.equal(audit.source.article_exact_2026_10_03_raw_bytes_sha256,'UNVERIFIED');
 assert.equal(audit.source.current_post_oct03_identity,'NOT_ESTABLISHED');
 assert.equal(audit.source.blog_comments,'NOT_INCLUDED_IN_2026_10_03_FROZEN_W04D_SCOPE_UNLESS_SEPARATELY_ADJUDICATED');
 assert.equal(audit.slides.length,28);assert.equal(audit.author_original_article.length,6);
 assert.equal(audit.source.pdf_visual_verified_printed_pages.length,15);
 let all=new Set;
 for(let i=0;i<28;i++){
  const row=audit.slides[i];
  assert.equal(row.printed_slide,i+1,'page order');
  assert.equal(row.zero_index_page,i,'page zero index');
  assert.equal(row.source_location,'W04D-PDF-P'+String(i+1).padStart(2,'0'));
  if(i<2)assert.equal(row.source_to_ssc.length,0,'title/outline should be provenance only');
  else assert.ok(row.source_to_ssc.length>0,'source page without SSC disposition');
  for(const id of row.source_to_ssc){
    assert.ok(w04dSource.includes(id),'foreign source semantic item imported');
    all.add(id);
  }
 }
 let next=11;
 for(let i=0;i<audit.author_original_article.length;i++){
  const row=audit.author_original_article[i];
  assert.equal(row.live_author_article_lines[0],next,'author blog interval gap');
  assert.ok(row.live_author_article_lines[1]>=next);
  next=row.live_author_article_lines[1]+1;
  assert.ok(row.source_to_ssc.length,'unrepresented load-bearing author body');
  for(const id of row.source_to_ssc){assert.ok(w04dSource.includes(id));all.add(id);}
 }
 assert.equal(next,25);assert.deepEqual([...all].sort(),w04dSource);
 assert.equal(audit.coverage.source_slots,34);
 assert.equal(audit.coverage.original_source_to_SSC_disposed,34);
 assert.equal(audit.coverage.SSC_to_original_supported,13);
 assert.equal(audit.coverage.new_typed_occurrences_justified,4);
 assert.deepEqual(audit.coverage.source_body_owners_affected,changed);
 assert.equal(audit.coverage.Oct03_immutable_W04d_source_bytes_recovered,false);
 assert.equal(audit.coverage.full_original_nine_W_G0_complete,false);
 assert.equal(audit.G0,'OPEN_UNFROZEN');
 assert.equal(audit.other_track_semantics_used,false);
 assert.equal(defect.predecessor.git_blob_sha,sha(paths.old));
 assert.equal(defect.source_first_oracle.git_blob_sha,sha(paths.audit));
 assert.deepEqual(defect.affected,changed);
 assert.equal(defect.cases.length,3);
 assert.equal(defect.preservation.old_typed,507);
 assert.equal(defect.preservation.new_typed_expected,511);
 assert.equal(defect.preservation.unchanged_other_source_items,148);
 assert.equal(defect.preservation.source_historical_page_bytes_authenticated,false);
 assert.equal(old.items.length,151);assert.equal(now.items.length,151);
 assert.equal(typed(old),507);assert.equal(typed(now),511);
 assert.equal(Wtyped(old),12);assert.equal(Wtyped(now),16);
 assert.equal(now.correction.other148_source_items_exact,true);
 assert.deepEqual(now.correction.changed_W_ids,changed);
 assert.equal(now.cross_author_semantics_available,false);
 const a=now.items.find(z=>z.id==='W-SSC-089');
 const c=now.items.find(z=>z.id==='W-SSC-090');
 const d=now.items.find(z=>z.id==='W-SSC-091');
 assert.equal(a.source_expression_census.statements.length,3);
 assert.equal(c.source_expression_census.statements.length,4);
 assert.equal(d.source_expression_census.statements.length,1);
 const motive=a.source_expression_census.statements[2];
 assert.equal(motive.id,'W04D-089-03');
 assert.deepEqual(motive.original_slide_pages,[3,6]);
 assert.equal(motive.source_stat_mech_scope,'PARTITION_FUNCTION_IN_CERTAIN_CASES_ONLY');
 assert.equal(motive.Minkowski_metric,'−dt²+dx²+dy²+dz²');
 assert.equal(motive.Euclidean_metric,'+dt²+dx²+dy²+dz²');
 const gamma=c.source_expression_census.statements[2];
 assert.equal(gamma.id,'W04D-090-03');
 assert.deepEqual(gamma.matrix_X,[['x0+x3','x1−i*x2'],['x1+i*x2','x0−x3']]);
 assert.deepEqual(gamma.gamma_matrix,[['0','v0+v·σ'],['−v0+v·σ','0']]);
 assert.equal(gamma.conjugate_spinor_relation.group,'SL(2,C)');
 assert.equal(gamma.conjugate_spinor_relation.relation,'DEFINING_AND_COMPLEX_CONJUGATE_INEQUIVALENT');
 assert.equal(gamma.usual_embedding,'Ω↦(Ω,conjugate(Ω)) in Spin(4,C)');
 const Weyl=c.source_expression_census.statements[3];
 assert.equal(Weyl.id,'W04D-090-04');
 assert.equal(Weyl.right_weyl_equation,'(E−σ·p)ψ̃(E,p)=0');
 assert.deepEqual(Weyl.energy_helicity,[{E:'+|p|',state:'PARTICLE',helicity:'+1/2'},{E:'−|p|',state:'ANTIPARTICLE',helicity:'−1/2'}]);
 assert.equal(Weyl.right_only_proposal_scope,'MINKOWSKI_GEOMETRY_ALONE_DOES_NOT_DISTINGUISH_ALTERNATIVE_FROM_CONVENTIONAL');
 const proj=d.source_expression_census.statements[0];
 assert.equal(proj.id,'W04D-091-01');
 assert.equal(proj.fractional_action,'z↦(αz+β)/(γz+δ)');
 assert.deepEqual(proj.group_actions[2].ordered_orbits,['UPPER_HEMISPHERE','LOWER_HEMISPHERE','EQUATOR']);
 assert.equal(proj.guard,'THIS_CP1_REAL_ORBIT_CLASSIFICATION_IS_NOT_SU22_PT0_THREE_ORBITS');
 const existing=c.source_expression_census.statements[1];
 assert.equal(existing.source_printed_conjugation_bar_on_lhs,false);
 assert.equal(existing.source_bar_in_preceding_text,true);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
  const left=old.items[i],right=now.items[i],R=reg.rows[i],C=cov.rows[i];
  assert.equal(left.id,right.id);
  assert.equal(R.census_id,right.id);assert.equal(C.census_id,right.id);
  assert.equal(R.source_body_exact,right.obligation);
  assert.equal(R.source_expression_statement_count,(right.source_expression_census?.statements||[]).length);
  assert.equal(C.source_expression_statement_count,(right.source_expression_census?.statements||[]).length);
  assert.equal(C.body_length_chars,right.obligation.length);
  assert.equal(R.historical_86_member,oldreg.rows[i].historical_86_member);
  assert.equal(R.historical_ledger_0_19_mode,oldreg.rows[i].historical_ledger_0_19_mode);
  assert.equal(R.historical_closure_accepted_as_current,false);
  if(!changed.includes(right.id)){
   assert.deepEqual(right,left,'untouched source item changed');
   assert.deepEqual(R,oldreg.rows[i],'untouched register row changed');
   assert.deepEqual(C,oldcov.rows[i],'untouched source review row changed');
  }
 }
 assert.equal(reg.source_census.git_blob_sha,sha(paths.now));
 assert.equal(inv.source_census.git_blob_sha,sha(paths.now));
 assert.equal(gate.current_source_census.git_blob_sha,sha(paths.now));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(paths.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(paths.cov));
 assert.equal(gate.current_W_nine_source_inventory_030.git_blob_sha,sha(paths.inv));
 assert.equal(gate.current_W04d_all_original_source_first.audit.git_blob_sha,sha(paths.audit));
 assert.equal(gate.current_W04d_all_original_source_first.defect.git_blob_sha,sha(paths.defect));
 assert.equal(gate.supersedes.git_blob_sha,sha(paths.oldgate));
 assert.deepEqual(gate.current_historical_86_member_projection,oldgate.current_historical_86_member_projection);
 assert.equal(inv.summary.structured_incidences,511);
 assert.equal(inv.units.find(z=>z.unit==='W04d').structured_incidences,16);
 assert.equal(inv.units.find(z=>z.unit==='W04d').all_original_source_assertions_reverse_qualified,false);
 assert.equal(reg.counts.source_expression_total,511);
 assert.equal(cov.counts.total_structured_source_incidents,511);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[k],false,'false stage '+k);
 return {unit:'W04d',slides:28,article_intervals:6,source_items:151,typed:511,source_native_W04d_incidences:16,unchanged_other_source_items:148,G0:'OPEN'};
}
const good=verify(original);
const cases=[
 ['drop last slide',x=>x.audit.slides.pop()],
 ['wrong zero page index',x=>x.audit.slides[12].zero_index_page=16],
 ['slide page gap',x=>x.audit.slides[12].printed_slide=12],
 ['erase source owner gamma slide',x=>x.audit.slides[9].source_to_ssc=[]],
 ['wrong owner for source slide',x=>x.audit.slides[10].source_to_ssc=['W-SSC-001']],
 ['import other author semantics',x=>x.audit.slides[15].source_to_ssc=['L-SSC-001']],
 ['drop original blog interval',x=>x.audit.author_original_article.pop()],
 ['make blog interval gap',x=>x.audit.author_original_article[2].live_author_article_lines[0]=17],
 ['include comments as frozen author body',x=>x.audit.source.blog_comments='INCLUDED'],
 ['claim original Oct03 PDF bytes',x=>x.audit.source.slides_exact_2026_10_03_raw_bytes_sha256='ASSUMED'],
 ['claim original Oct03 article bytes',x=>x.audit.source.article_exact_2026_10_03_raw_bytes_sha256='ASSUMED'],
 ['falsify source first ledger SHA',x=>x.defect.source_first_oracle.git_blob_sha='NO'],
 ['lose failure category',x=>x.defect.cases.pop()],
 ['drop W089 Wick metric expression',x=>x.now.items.find(z=>z.id==='W-SSC-089').source_expression_census.statements.pop()],
 ['change source Euclidean metric sign',x=>x.now.items.find(z=>z.id==='W-SSC-089').source_expression_census.statements[2].Euclidean_metric='-dt2'],
 ['turn contingent stat mech into universal',x=>x.now.items.find(z=>z.id==='W-SSC-089').source_expression_census.statements[2].source_stat_mech_scope='ALL'],
 ['wrong source Minkowski matrix',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[2].matrix_X[0][1]='x1+i*x2'],
 ['flip gamma lower-left sign',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[2].gamma_matrix[1][0]='v0+v·σ'],
 ['change SL2 complex restriction',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[2].conjugate_spinor_relation.group='SU2'],
 ['rewrite Minkowski-only scope',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[3].right_only_proposal_scope='GLOBAL_EQUIVALENCE'],
 ['drop Weyl energy sign',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[3].energy_helicity[1].helicity='+1/2'],
 ['normalize literal bar on second original equation',x=>x.now.items.find(z=>z.id==='W-SSC-090').source_expression_census.statements[1].source_printed_conjugation_bar_on_lhs=true],
 ['wrong Mobius denominator',x=>x.now.items.find(z=>z.id==='W-SSC-091').source_expression_census.statements[0].fractional_action='z↦(αz+β)/(δz+γ)'],
 ['merge CP1 and PT0 orbit',x=>x.now.items.find(z=>z.id==='W-SSC-091').source_expression_census.statements[0].guard='CP1=PT0'],
 ['drop projective real-group orbit',x=>x.now.items.find(z=>z.id==='W-SSC-091').source_expression_census.statements[0].group_actions.pop()],
 ['rewrite historical W089',x=>x.old.items.find(z=>z.id==='W-SSC-089').obligation+=' fake'],
 ['rewrite historical W001',x=>x.old.items.find(z=>z.id==='W-SSC-001').obligation+=' fake'],
 ['alter untouched W source object',x=>x.now.items.find(z=>z.id==='W-SSC-095').obligation+=' fake'],
 ['drop existing review row',x=>x.cov.rows.pop()],
 ['change previous historical W86',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-091').historical_86_member=!x.reg.rows.find(z=>z.census_id==='W-SSC-091').historical_86_member],
 ['wrong source tuple pin',x=>x.gate.current_source_census.git_blob_sha='NO'],
 ['wrong source register pin',x=>x.gate.current_all_151_conservation_register.git_blob_sha='NO'],
 ['false G0 completed',x=>x.gate.current_lawful_state.G0_complete=true],
 ['false G0 frozen',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['G1 premature',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['cross-author analysis',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true]
];
let rejected=0;
for(const [name,mut] of cases){
 const copy=clone(original);mut(copy);
 if(JSON.stringify(copy)===JSON.stringify(original))throw Error('INERT_HOSTILE_CASE '+name);
 try {verify(copy,false);}catch(err){rejected++;continue;}
 throw Error('HOSTILE_ESCAPED '+name);
}
assert.equal(rejected,cases.length);
console.log('W04d PDF+post G0 original source reconstruction PASS '+JSON.stringify(good));
console.log('W04d adversarial controls rejected '+rejected+'/'+cases.length+'; original historical Oct03 bytes, independent nine-source G0 remain OPEN.');
