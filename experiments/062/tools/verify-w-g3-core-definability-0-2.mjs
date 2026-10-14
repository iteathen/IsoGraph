import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const predecessorPath='experiments/062/W_G3_CORE_DEFINABILITY_0_1.json';
const adjudicationPath='experiments/062/W_G3_CORE_DEFINABILITY_ADJUDICATION_0_2.json';
const currentPath='experiments/062/W_G3_CORE_DEFINABILITY_0_2.json';
const generatorPath='experiments/062/tools/apply-w-g3-core-definability-adjudication-0-2.mjs';

const predecessor=JSON.parse(fs.readFileSync(predecessorPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
const current=JSON.parse(fs.readFileSync(currentPath,'utf8'));
const errors=[];
const fail=m=>errors.push(m);

if(current.schema!=='isograph.exp062-w-g3-core-definability.v0.2') fail('schema mismatch');
if(current.track!=='W') fail('track mismatch');
if(current.predecessor!==predecessorPath) fail('predecessor path mismatch');
if(current.adjudication!==adjudicationPath) fail('adjudication path mismatch');
if(current.fixed_point?.G3_complete!==false||current.fixed_point?.G4_authorized!==false) fail('G3/G4 gate overclaim');

const pred=new Map(), cur=new Map();
for(const item of predecessor.items||[]) for(const row of item.occurrences||[]) pred.set(row.occurrence_id,row);
for(const item of current.items||[]) for(const row of item.occurrences||[]) cur.set(row.occurrence_id,row);
if(pred.size!==425||cur.size!==425) fail('coverage must remain 425 occurrences');

const expectedChanged=new Set((adjudication.corrections||[]).map(x=>x.occurrence_id));
const actualChanged=[];
for(const [id,p] of pred){
  const c=cur.get(id);
  if(!c){fail(id+': missing current row');continue;}
  const semChanged=JSON.stringify({
    disposition:p.disposition,
    closure_basis:p.closure_basis,
    missing:p.missing_definition_or_authority,
    review_note:p.review_note
  })!==JSON.stringify({
    disposition:c.disposition,
    closure_basis:c.closure_basis,
    missing:c.missing_definition_or_authority,
    review_note:c.review_note
  });
  if(semChanged) actualChanged.push(id);
  if(!expectedChanged.has(id)){
    const pCopy=JSON.parse(JSON.stringify(p));
    const cCopy=JSON.parse(JSON.stringify(c));
    if(JSON.stringify(pCopy)!==JSON.stringify(cCopy)) fail(id+': unexpected row mutation');
  }
}
if(JSON.stringify(actualChanged.sort())!==JSON.stringify([...expectedChanged].sort())) fail('changed occurrence set mismatch');

for(const change of adjudication.corrections||[]){
  const p=pred.get(change.occurrence_id), c=cur.get(change.occurrence_id);
  if(!p||!c) continue;
  if(p.disposition!==change.from||c.disposition!==change.to) fail(change.occurrence_id+': disposition transition mismatch');
  if(c.disposition!=='CORE_CLOSED'||!c.closure_basis||c.missing_definition_or_authority!==null) fail(change.occurrence_id+': invalid closed row');

  const rel=c.source_provenance?.relation_span;
  const id=change.occurrence_id;
  const allowedRole=(['W-SSC-062-O06','W-SSC-130-O04'].includes(id)&&rel==='from')||
                    (['W-SSC-062-O07','W-SSC-130-O05'].includes(id)&&rel==='to');
  if(!allowedRole) fail(id+': 0.2 closed outside reviewed role-incidence set');
}

const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const row of cur.values()){
  if(!(row.disposition in counts)) fail(row.occurrence_id+': invalid disposition');
  else counts[row.disposition]++;
}
for(const [k,v] of Object.entries(adjudication.resulting_counts||{})) if(counts[k]!==v) fail('resulting count mismatch '+k);
if(counts.CORE_CLOSED!==7||counts.UNEXPANDED_DEMAND!==418) fail('expected 7 closed / 418 open');

for(const held of adjudication.reviewed_not_closed||[]){
  const row=cur.get(held.occurrence_id);
  if(!row||row.disposition!=='UNEXPANDED_DEMAND') fail(held.occurrence_id+': reviewed-not-closed row changed');
}

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',currentPath],{encoding:'utf8'});
if(diff.trim()) fail('0.2 generator does not exactly replay current artifact');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-w-g3-core-definability.v0.2',
  pass:errors.length===0,
  errors,
  changed_occurrences:actualChanged.sort(),
  counts,
  replay_exact:diff.trim()==='',
  G3_complete:false,
  G4_authorized:false
},null,2));
if(errors.length) process.exit(1);
