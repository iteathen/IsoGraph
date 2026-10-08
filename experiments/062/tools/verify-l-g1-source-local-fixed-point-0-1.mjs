import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const predecessorPath='experiments/062/L_EXTRACTION_RECONCILED_0_24.json';
const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_25.json';
const auditPath='experiments/062/L_G1_COMPLETE_REPEAT_AUDIT_0_1.json';
const lastAdjPath='experiments/062/L_G1_SOURCE_LOCAL_ADJUDICATION_0_25.json';

execFileSync(process.execPath,['experiments/062/tools/verify-l-extraction-reconciled-0-25.mjs'],{stdio:'inherit'});

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
const lastAdj=JSON.parse(fs.readFileSync(lastAdjPath,'utf8'));
const errors=[],fail=m=>errors.push(m);
const expectedIds=corpus.items.filter(x=>x.track==='L').map(x=>x.census_id);

if(extraction.items.length!==151||extraction.items.reduce((n,x)=>n+x.occurrences.length,0)!==818)fail('current extraction shape/count');
if(audit.current_input!==extractionPath)fail('audit current input');
if(audit.current_verifier!=='experiments/062/tools/verify-l-extraction-reconciled-0-25.mjs')fail('audit verifier');
if(audit.status!=='SOURCE_LOCAL_ZERO_CHANGE_FIXED_POINT_CANDIDATE_INDEPENDENT_COLD_AUDIT_REQUIRED')fail('audit status');
if((audit.items||[]).length!==151)fail('audit item count');
if(JSON.stringify((audit.items||[]).map(x=>x.census_id))!==JSON.stringify(expectedIds))fail('audit census order');
if((audit.items||[]).some(x=>x.status!=='PASS_NO_CORRECTION'))fail('non-PASS audit row');
const byExtraction=new Map(extraction.items.map(x=>[x.census_id,x]));
for(const row of audit.items||[]){const item=byExtraction.get(row.census_id);if(!item||row.occurrence_count!==item.occurrences.length)fail('audit occurrence count '+row.census_id);}
if(audit.counts?.current_repeat_corrections!==0)fail('repeat corrections not zero');
if(audit.fixed_point?.source_local_zero_change!==true)fail('source-local fixed point not true');
if(audit.fixed_point?.L_candidate_frozen_for_independent_cold_audit!==true)fail('candidate not frozen');
if(audit.fixed_point?.L_G1_complete!==false)fail('L G1 must remain incomplete');
if(audit.fixed_point?.joint_G1_complete!==false)fail('joint G1 must remain incomplete');
if(audit.fixed_point?.G2_authorized!==false)fail('G2 must remain blocked');

const pm=new Map(predecessor.items.map(x=>[x.census_id,x]));
const changed=extraction.items.filter(x=>JSON.stringify(pm.get(x.census_id))!==JSON.stringify(x)).map(x=>x.census_id);
if(JSON.stringify(changed)!==JSON.stringify(['L-SSC-075']))fail('changed body set');
if(audit.counts?.changed_from_L_0_24!==1||audit.counts?.byte_identical_from_L_0_24!==150)fail('audit delta counts');
if(lastAdj.corrections?.length!==1||lastAdj.corrections?.[0]?.census_id!=='L-SSC-075')fail('last adjudication lineage');
const l075=byExtraction.get('L-SSC-075');
if(!l075?.occurrences.some(o=>o.relation_span==='same'&&o.argument_spans?.[0]==='spin(11,3) Clifford presentation'))fail('L075 same relation');

const cues=['only','first','then','while','because','therefore','rather than','after','before','under','within','instead','alone','may','can','cannot','must','not necessarily','not merely','tentatively','strictly','exactly','same','so that','but','despite','when','until','without','respectively','separately','accordingly'];
const esc=s=>s.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&');
const noRel=[];
const corpusMap=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
for(const item of extraction.items){
 const body=corpusMap.get(item.census_id);
 for(const cue of cues){
  const re=new RegExp('(?<![A-Za-z0-9_])'+esc(cue)+'(?![A-Za-z0-9_])','gi');let m;
  while((m=re.exec(body))){
   const start=m.index,end=start+m[0].length;
   let covered=false;
   for(const o of item.occurrences){let p=body.indexOf(o.relation_span);while(p>=0){if(p<=start&&p+o.relation_span.length>=end){covered=true;break;}p=body.indexOf(o.relation_span,p+1);}if(covered)break;}
   if(!covered)noRel.push(JSON.stringify([item.census_id,m[0],start]));
  }
 }
}
const auditKeys=(audit.high_signal_qa?.entries||[]).map(x=>JSON.stringify([x.id,x.cue,x.start]));
if(noRel.length!==15||auditKeys.length!==15)fail('high-signal QA count');
if(JSON.stringify([...noRel].sort())!==JSON.stringify([...auditKeys].sort()))fail('high-signal QA conservation');
if((audit.high_signal_qa?.entries||[]).some(x=>!['NO_NEW_OCCURRENCE','NON_SEMANTIC_SUBTOKEN'].includes(x.disposition)))fail('high-signal unresolved disposition');
if(audit.high_signal_qa?.conservation?.new_corrections!==0)fail('high-signal correction count');

const l130=byExtraction.get('L-SSC-130');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O01')?.argument_spans?.[0]!=='individual generalized reflections')fail('L130 individual scope');
if(!l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O03')?.source_span?.includes('even compositions'))fail('L130 even scope');
if(l130?.occurrences.find(x=>x.occurrence_id==='L-SSC-130-O06')?.argument_spans?.[1]!=='T')fail('L130 preservation');

console.log(JSON.stringify({schema:'isograph.exp062-verify-l-g1-source-local-fixed-point.v0.1',pass:errors.length===0,errors,current_input:extractionPath,item_count:151,occurrence_count:818,changed_from_L_0_24:changed.length,repeat_corrections:audit.counts?.current_repeat_corrections,high_signal_uncovered:noRel.length,L_G1_complete:audit.fixed_point?.L_G1_complete,G2_authorized:audit.fixed_point?.G2_authorized,gate_effect:'SOURCE_LOCAL_FIXED_POINT_INTEGRITY_ONLY_INDEPENDENT_COLD_AUDIT_STILL_REQUIRED'},null,2));
if(errors.length)process.exitCode=1;
