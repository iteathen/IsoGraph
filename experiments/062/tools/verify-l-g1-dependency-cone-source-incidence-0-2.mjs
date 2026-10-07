import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
 const b=Buffer.from(read(p),'utf8');
 return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};
const path='experiments/062/L_G1_DEPENDENCY_CONE_SOURCE_INCIDENCE_0_2.json';
const S=json(path);

check(S.schema==='isograph.exp062-l-g1-dependency-cone-source-incidence.v0.2','schema');
check(S.status==='TARGETED_G1_SOURCE_INCIDENCE_REOPEN_FORMULA_COMPLETE_CANDIDATE','status');
check(S.authority===false && S.track==='L','authority/track');
check(S.predecessor?.path==='experiments/062/L_G1_DEPENDENCY_CONE_SOURCE_INCIDENCE_0_1.json','predecessor path');
check(fs.existsSync(S.predecessor.path) && blobSha(S.predecessor.path)===S.predecessor.git_blob_sha,'predecessor pin');
check(S.counts?.reopened_bodies===4 && S.counts?.reopened_occurrences===28,'counts');
check(S.formula_ast_coverage?.occurrences_with_formula_ast===18,'formula AST count');
const required=S.formula_ast_coverage?.required_formula_occurrences||[];
check(required.length===18,'required formula list count');

const all=S.items.flatMap(x=>x.occurrences||[]);
const by=Object.fromEntries(all.map(x=>[x.occurrence_id,x]));
for(const id of required)check(!!by[id]?.formula_ast,'missing formula AST '+id);
check(by['L-SSC-125-R04']?.formula_ast?.op==='EQUALITY','anti-involution AST');
check(by['L-SSC-125-R07']?.formula_ast?.op==='FINITE_BASIS_ALGEBRA_EXTENSION','finite basis extension AST');
check(by['L-SSC-128-R05']?.formula_ast?.op==='LINEAR_BIJECTION_EXTENSION','linear extension AST');
check(by['L-SSC-129-R04']?.formula_ast?.op==='RECOVERY_DEFINITION','recovery AST');
check(by['L-SSC-130-R02']?.formula_ast?.op==='R_v','Rv AST');
check(by['L-SSC-130-R03']?.formula_ast?.op==='R_m','Rm AST');
check(by['L-SSC-130-R04']?.formula_ast?.op==='R_p','Rp AST');
for(const id of ['L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09'])check(by[id]?.formula_ast?.op==='EQUALITY','reflection invariant AST '+id);

const ids=new Set(all.map(x=>x.occurrence_id));
for(const o of all)for(const d of o.depends_on||[])check(ids.has(d),'dependency outside cone '+o.occurrence_id+' -> '+d);
for(const [p,rec] of Object.entries(S.source_pins||{})){
 check(fs.existsSync(p),'missing source pin '+p);
 if(fs.existsSync(p))check(blobSha(p)===rec.git_blob_sha,'source pin mismatch '+p);
}

const text=JSON.stringify(S);
check(!/W-SSC-/.test(text),'W occurrence leak');
check(!/research\/woit-lisi-isomorph\/woit\//.test(text),'W source leak');
check(!/\bPD-[A-Z0-9_-]+\b/.test(text),'PD category leak');
check(!/\bB-[A-Z0-9_-]+\b/.test(text),'candidate basis leak');
check(!/DNWF|DNIA/.test(text),'DNWF/DNIA leak');

console.log(JSON.stringify({
 schema:'isograph.exp062-l-g1-dependency-cone-source-incidence-verifier.v0.2',
 pass:errors.length===0,
 errors,
 bodies:S.counts?.reopened_bodies,
 occurrences:S.counts?.reopened_occurrences,
 formula_occurrences:S.formula_ast_coverage?.occurrences_with_formula_ast
},null,2));
if(errors.length)process.exit(1);
