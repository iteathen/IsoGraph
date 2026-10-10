#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const ex='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const p={
 old:w+'SOURCE_SEMANTIC_CENSUS_0_58.json',now:w+'SOURCE_SEMANTIC_CENSUS_0_59.json',
 audit:ex+'W01_G0_A1_ORIGINAL_SOURCE_FIRST_REVERSE_0_1.json',
 negative:ex+'W01_G0_A1_AUTHOR_LITERAL_AND_NONAUTHOR_DISCREPANCY_0_1.json',
 defect:ex+'W01_G0_A1_SYSTEMATIC_OMISSION_CLASS_0_1.json',
 oldreg:ex+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_44.json',
 reg:ex+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_45.json',
 oldcov:ex+'W_G0_LINE_BY_LINE_151_COVERAGE_0_43.json',
 cov:ex+'W_G0_LINE_BY_LINE_151_COVERAGE_0_44.json',
 oldinv:ex+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_25.json',
 inv:ex+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_26.json',
 oldgate:ex+'W_CURRENT_STAGE_GATE_0_118.json',
 gate:ex+'W_CURRENT_STAGE_GATE_0_119.json'
};
const read=v=>JSON.parse(fs.readFileSync(v,'utf8'));
const gitSHA=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const sha=v=>gitSHA(fs.readFileSync(v));
const shaParsed=v=>gitSHA(Buffer.from(JSON.stringify(v,null,2)+'\n','utf8'));
const originals=Object.fromEntries(Object.entries(p).map(([k,v])=>[k,read(v)]));
const clone=x=>structuredClone(x);
const changed=['W-SSC-047','W-SSC-048','W-SSC-049'];
const counts=(c,unit)=>c.items.filter(x=>!unit||x.source.startsWith(unit)).reduce((n,x)=>n+(x.source_expression_census?.statements?.length||0),0);
const startEnd='389-389|390-391|392-398|399-400|401-405|406-411|412-418|419-433|434-455|456-458|459-476|477-480|481-481|482-485|486-490';
function check(x){
 const {old,now,audit,negative,defect,oldreg,reg,oldcov,cov,oldinv,inv,oldgate,gate}=x;
 assert.equal(old.schema,'woit.source-semantic-census.v0.58');
 assert.equal(now.schema,'woit.source-semantic-census.v0.59');
 assert.equal(shaParsed(old),sha(p.old),'HISTORICAL_SSC_MUST_NOT_BE_REWRITTEN');
 assert.equal(shaParsed(now),sha(p.now),'NEW_SOURCE_SSC_CHECKED_TUPLE_MUTATED');
 assert.equal(shaParsed(audit),sha(p.audit),'source-first original location changed without successor');
 assert.equal(shaParsed(negative),sha(p.negative),'negative witness altered');
 assert.equal(shaParsed(defect),sha(p.defect),'defect history altered');
 assert.equal(now.predecessor.git_blob_sha,sha(p.old));
 assert.equal(old.items.length,151);assert.equal(now.items.length,151);
 assert.equal(audit.schema,'isograph.exp062-w01-a1-original-first-disjoint-source-inventory.v0.1');
 assert.equal(audit.track,'W');assert.equal(audit.semantic_authority,false);
 assert.equal(audit.source.revision,'arXiv:2104.05099v2');
 assert.deepEqual(audit.source.full_A1_html_scope,[389,490]);
 assert.deepEqual(audit.source.original_pdf_printed_pages,[16,17,18,19]);
 assert.deepEqual(audit.source.html_diagram_gaps,[479,484]);
 assert.equal(audit.source.Oct03_download_raw_pdf_bytes_SHA256,'UNVERIFIED');
 assert.equal(audit.partitions,undefined); // this schema uses source_locations, not another ledger
 const rows=audit.source_locations;
 assert.equal(rows.length,15);
 assert.equal(rows.map(t=>t.source_lines.join('-')).join('|'),startEnd);
 assert.equal(new Set(rows.map(t=>t.key)).size,15);
 assert.equal(audit.counters.total_disjoint_source_locations,15);
 assert.equal(audit.counters.load_bearing_locations,14);
 assert.equal(audit.counters.source_pdf_diagrams_recovered,2);
 assert.equal(audit.counters.original_literal_discrepancies,2);
 let cursor=389,load=0;const owners=new Set();
 for(const row of rows){
   assert.equal(row.source_lines[0],cursor,'gap/overlap in original source');
   assert.ok(row.source_lines[1]>=cursor);
   cursor=row.source_lines[1]+1;
   if(row.kind!=='HEADING'){
      load++;assert.ok(row.ssc_owners.length>0,'source-original missing SSC correspondence '+row.key);
      for(const id of row.ssc_owners){assert.ok(changed.includes(id),'wrong W01 A1 source owner');owners.add(id);}
   }else assert.equal(row.ssc_owners.length,0);
 }
 assert.equal(cursor,491);assert.equal(load,14);assert.deepEqual([...owners].sort(),changed);
 assert.equal(audit.predecessor_ssc.git_blob_sha,sha(p.old));
 assert.equal(audit.source_local_outcome.G0_frozen,false);
 assert.equal(audit.source_local_outcome.all_W01_reverse_qualified,false);
 assert.equal(audit.source_local_outcome.all_nine_W_reverse_qualified,false);
 assert.equal(negative.source_revision,'arXiv:2104.05099v2');
 assert.equal(negative.observations.length,3);
 assert.deepEqual(negative.observations.map(z=>z.key),['PRINTED_DUPLICATED_Z01','PRINTED_FULL_NULL_CHAIN','TWO_SOURCE_PDF_DIAGRAMS_MISSING_HTML']);
 assert.equal(negative.no_source_repair_done,true);
 const chart=negative.observations[0];
 assert.deepEqual(chart.source_printed_Z,[['z01','z01'],['z10','z11']]);
 assert.deepEqual(chart.source_printed_4x2_matrix,[['1','0'],['0','1'],['z01','z01'],['z10','z11']]);
 assert.equal(chart.author_tangent_dimension,4);
 assert.equal(chart.nonauthor_sanity.conditional_distinct_parameter_count,3);
 const nullEvidence=negative.observations[1];
 assert.equal(nullEvidence.source_printed,'sperp=(Z1-Z2)s=0');
 const q=nullEvidence.independent_finite_witness;
 const multiply=(A,v)=>A.map(row=>row.reduce((sum,item,i)=>sum+item*v[i],0));
 const subtract=(A,B)=>A.map((row,i)=>row.map((item,j)=>item-B[i][j]));
 const diff=subtract(q.Z1,q.Z2);
 assert.deepEqual(q.sperp,multiply(q.Z1,q.s));
 assert.deepEqual(q.sperp,multiply(q.Z2,q.s));
 assert.notDeepEqual(q.sperp,[0,0]);
 assert.deepEqual(multiply(diff,q.s),[0,0]);
 assert.equal(diff[0][0]*diff[1][1]-diff[0][1]*diff[1][0],0);
 assert.deepEqual(q.difference,diff);
 assert.deepEqual(negative.observations[2].html_placeholders,[479,484]);
 assert.deepEqual(negative.observations[2].pdf_pages,[18,19]);
 assert.deepEqual(defect.affected,changed);
 assert.equal(defect.types.length,4);
 assert.equal(defect.G0,'OPEN_UNFROZEN');
 assert.equal(counts(old),474);assert.equal(counts(now),485);
 assert.equal(counts(old,'W01'),187);assert.equal(counts(now,'W01'),198);
 assert.equal(counts(now,'W02'),71);
 const byId=new Map(now.items.map(z=>[z.id,z]));
 assert.equal(new Set(byId.keys()).size,151);
 const A=byId.get('W-SSC-047'),B=byId.get('W-SSC-048'),C=byId.get('W-SSC-049');
 assert.equal(A.source_expression_census.statements.length,3);
 assert.equal(B.source_expression_census.statements.length,8);
 assert.equal(C.source_expression_census.statements.length,3);
 assert.deepEqual(A.source_expression_census.statements.map(z=>z.id),['W01-A1-047-01','W01-A1-047-02','W01-A1-047-03']);
 assert.equal(A.source_expression_census.statements[0].source_antisymmetric_tensor,'v1⊗v2 - v2⊗v1');
 assert.equal(A.source_expression_census.statements[0].source_equation,'ω∧ω=0');
 assert.equal(A.source_expression_census.statements[2].S_perp,'C⁴/S_COMPLEX_RANK_2_QUOTIENT');
 assert.deepEqual(B.source_expression_census.statements[2].plane_matrix_rows,[['1','0'],['0','1'],['z01','z01'],['z10','z11']]);
 assert.deepEqual(B.source_expression_census.statements[2].local_Z_rows,[['z01','z01'],['z10','z11']]);
 assert.equal(B.source_expression_census.statements[3].chart_output,'(C+D*Z)*INVERSE(A+B*Z)');
 assert.equal(B.source_expression_census.statements[4].source_equation,'⟨Z,Z⟩=det Z');
 assert.equal(B.source_expression_census.statements[5].source_map,'Z→DZA⁻¹');
 assert.deepEqual(B.source_expression_census.statements.slice(6).map(z=>[z.source_html_line,z.pdf_diagram_present]),[[479,true],[484,true]]);
 assert.equal(C.source_expression_census.statements[1].alpha_plane_source_type,'CP²');
 assert.equal(C.source_expression_census.statements[1].twistor_line_source_type,'CP¹');
 assert.equal(C.source_expression_census.statements[2].source_printed_chain,'s⊥=(Z₁−Z₂)s=0');
 assert.equal(C.source_expression_census.statements[2].guard,'KEEP_AUTHOR_LITERAL_AND_NONAUTHOR_DISCREPANCY_SEPARATE');
 assert.equal(now.correction.unaffected_full_predecessor_items,148);
 assert.deepEqual(now.correction.changed_W_ids,changed);
 assert.equal(now.correction.G0_frozen,false);
 assert.equal(now.cross_author_semantics_available,false);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
   const left=old.items[i],right=now.items[i],r=reg.rows[i],s=cov.rows[i];
   assert.equal(left.id,right.id);assert.equal(r.census_id,right.id);assert.equal(s.census_id,right.id);
   assert.equal(r.source_body_exact,right.obligation);
   assert.equal(r.source_expression_statement_count,(right.source_expression_census?.statements?.length||0));
   assert.equal(s.source_expression_statement_count,(right.source_expression_census?.statements?.length||0));
   assert.equal(s.body_length_chars,right.obligation.length);
   assert.equal(r.historical_86_member,oldreg.rows[i].historical_86_member);
   assert.equal(r.historical_ledger_0_19_mode,oldreg.rows[i].historical_ledger_0_19_mode);
   assert.equal(r.historical_closure_accepted_as_current,false);
   if(!changed.includes(right.id)){
      assert.deepEqual(right,left,'unmodified full historical source record altered');
      assert.deepEqual(r,oldreg.rows[i],'unmodified membership history altered');
      assert.deepEqual(s,oldcov.rows[i],'unmodified old source-review pointer altered');
   }
 }
 assert.equal(reg.source_census.git_blob_sha,sha(p.now));
 assert.equal(inv.source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_source_census.git_blob_sha,sha(p.now));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(p.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(p.cov));
 assert.equal(gate.current_W_nine_source_inventory_026.git_blob_sha,sha(p.inv));
 assert.equal(gate.current_W01_A1_source_first.oracle.git_blob_sha,sha(p.audit));
 assert.equal(gate.current_W01_A1_source_first.source_semantic_extraction_defects.git_blob_sha,sha(p.defect));
 assert.equal(gate.current_W01_A1_source_first.independent_nonauthor_discrepancy.git_blob_sha,sha(p.negative));
 assert.equal(gate.supersedes.git_blob_sha,sha(p.oldgate));
 assert.deepEqual(gate.current_historical_86_member_projection,oldgate.current_historical_86_member_projection);
 assert.equal(inv.summary.structured_incidences,485);
 assert.equal(inv.units.find(z=>z.unit==='W01').structured_incidences,198);
 assert.equal(inv.units.find(z=>z.unit==='W01').all_original_source_assertions_reverse_qualified,false);
 assert.equal(reg.counts.source_expression_total,485);
 assert.equal(cov.counts.total_structured_source_incidents,485);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[k],false,'illegal source/G-stage promotion '+k);
 return {frozen_W_units:9,W01_original_A1_intervals:15,A1_load_bearing:14,census_unchanged_items:148,source_items:151,source_typed:485,W01_typed:198,source_printed_discrepancies:2,original_PDF_only_diagrams:2,G0:'OPEN'};
}
const good=check(originals);
const mutations=[
 ['delete source interval',x=>x.audit.source_locations.pop()],
 ['source overlap',x=>x.audit.source_locations[9].source_lines[0]--],
 ['source gap',x=>x.audit.source_locations[7].source_lines[0]++],
 ['remove A1 SSC owner',x=>x.audit.source_locations[7].ssc_owners=[]],
 ['invent unrelated SSC owner',x=>x.audit.source_locations[7].ssc_owners=['W-SSC-130']],
 ['duplicate original interval key',x=>x.audit.source_locations[9].key=x.audit.source_locations[8].key],
 ['erase PDF source diagram',x=>x.negative.observations.pop()],
 ['change first chart printed coordinate',x=>x.negative.observations[0].source_printed_Z[0][1]='z00'],
 ['change author null chain',x=>x.negative.observations[1].source_printed='(Z1-Z2)s=0'],
 ['invalidate finite witness',x=>x.negative.observations[1].independent_finite_witness.sperp=[0,0]],
 ['fake Oct03 PDF bytes',x=>x.audit.source.Oct03_download_raw_pdf_bytes_SHA256='VERIFIED'],
 ['change arxiv source revision',x=>x.audit.source.revision='v3'],
 ['erase fourth omission mechanism',x=>x.defect.types.pop()],
 ['delete W47 Plucker claim',x=>x.now.items.find(z=>z.id==='W-SSC-047').source_expression_census.statements.shift()],
 ['normalize printed tensor expression',x=>x.now.items.find(z=>z.id==='W-SSC-047').source_expression_census.statements[0].source_antisymmetric_tensor='v1∧v2'],
 ['normalize source local chart',x=>x.now.items.find(z=>z.id==='W-SSC-048').source_expression_census.statements[2].local_Z_rows[0][1]='z00'],
 ['silently remove source diagram map direction',x=>x.now.items.find(z=>z.id==='W-SSC-048').source_expression_census.statements[6].left.map='ν'],
 ['falsify chart denominator',x=>x.now.items.find(z=>z.id==='W-SSC-048').source_expression_census.statements[3].chart_output='(C+DZ)*INVERSE(B+AZ)'],
 ['change source alpha CP2 to CP1',x=>x.now.items.find(z=>z.id==='W-SSC-049').source_expression_census.statements[1].alpha_plane_source_type='CP¹'],
 ['silently normalize nullness',x=>x.now.items.find(z=>z.id==='W-SSC-049').source_expression_census.statements[2].source_printed_chain='(Z1-Z2)s=0'],
 ['change untouched earlier W01 record',x=>x.now.items.find(z=>z.id==='W-SSC-027').obligation+='fake'],
 ['rewrite historical old W47',x=>x.old.items.find(z=>z.id==='W-SSC-047').obligation+='fake'],
 ['rewrite historical old W55',x=>x.old.items.find(z=>z.id==='W-SSC-055').obligation+='fake'],
 ['drop conserved source body',x=>x.reg.rows[46].source_body_exact=''],
 ['drop census review row',x=>x.cov.rows.pop()],
 ['lose source review exact formula count',x=>x.cov.rows.find(z=>z.census_id==='W-SSC-048').source_expression_statement_count=7],
 ['mutate historical W86 member',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-048').historical_86_member=!x.reg.rows.find(z=>z.census_id==='W-SSC-048').historical_86_member],
 ['wrong current gate source SHA',x=>x.gate.current_source_census.git_blob_sha='NO'],
 ['wrong current gate reverse index SHA',x=>x.gate.current_source_coverage.git_blob_sha='NO'],
 ['false all-nine original reverse complete',x=>x.gate.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['false G0 frozen',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['premature G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['premature IA',x=>x.gate.current_lawful_state.recursive_IA_authorized=true],
 ['W L cross-track leakage',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true]
];
let rejected=0;for(const [name,mutate] of mutations){const t=clone(originals);mutate(t);try{check(t);}catch(e){rejected++;continue;}throw new Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,mutations.length);
console.log('W01 Appendix A.1 original-source fidelity and conservation PASS '+JSON.stringify(good));
console.log('Hostile controls correctly rejected '+rejected+'/'+mutations.length+'. All-nine source G0, October03 mutable-source byte identities remain OPEN.');
