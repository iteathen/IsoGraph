import fs from 'node:fs';

const failures=[];
const must=(path,needle)=>{
  const text=fs.readFileSync(path,'utf8');
  if(!text.includes(needle)) failures.push(path+': missing required current-routing text: '+needle);
};
const mustNot=(path,needle)=>{
  const text=fs.readFileSync(path,'utf8');
  if(text.includes(needle)) failures.push(path+': stale front-door text remains: '+needle);
};

const frontDoors=[
  'README.md',
  'evidence/external/README.md',
  'extensions/dts/profiles/README.md',
  'historical/branch-archive/README.md',
  'research/glycan-cleavage/2026-09-27/README.md',
  'research/navier-stokes-proof/README.md',
  'research/p-vs-np/README.md',
  'research/publications/2026-09-27/README.md'
];
for(const path of frontDoors){
  if(!fs.existsSync(path)||!fs.statSync(path).size) failures.push(path+': missing/empty README front door');
}

must('README.md','## Current project mission');
must('README.md','Source Semantic Census');
must('README.md','Discovery Protocols 0.1–0.10');
must('README.md','Experimental Inquiry 0.1');
must('README.md','missing definition != QU');
must('README.md','schema closure != exhaustive materialization');
must('README.md','experiment != proof');
must('README.md','QUALIFIED cumulative rendering-conservation / Schema-Closure / closure-invalidation clarification');

mustNot('README.md','## Active research lead — P versus NP primitive-logic campaign');
mustNot('README.md','The strongest current core candidates include:');
mustNot('README.md','current qualified family authority is DP 0.1–0.8');
mustNot('README.md','current qualified family authority is DP 0.1–0.7');

must('research/glycan-cleavage/2026-09-27/README.md','## Current-family continuation boundary');
must('research/glycan-cleavage/2026-09-27/README.md','Core through 0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1');
mustNot('research/glycan-cleavage/2026-09-27/README.md','DP 0.8 is now the current cumulative qualified discovery successor');

must('research/navier-stokes-proof/README.md','**Historical rendering dependencies used by this research artifact:**');
must('research/navier-stokes-proof/README.md','**Current repository family:** Core through 0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1');
must('research/navier-stokes-proof/README.md','Omitted lower-level proof structure is **not** automatically QU.');
must('research/navier-stokes-proof/README.md','## Current-family continuation rules');
mustNot('research/navier-stokes-proof/README.md','Omitted lower-level proof structure is represented through QU completeness boundaries');

must('research/p-vs-np/README.md','current repository Discovery authority is cumulative DP 0.1–0.10');
must('research/p-vs-np/README.md','**Current-family continuation note:**');
must('research/p-vs-np/README.md','P = NP:  OPEN');
must('research/p-vs-np/README.md','P != NP: OPEN');
mustNot('research/p-vs-np/README.md','current qualified family authority is DP 0.1–0.8');

must('research/publications/2026-09-27/README.md','They do **not** define current IsoGraph semantic authority merely by being published.');
must('evidence/external/README.md','None of those controls turns project-controlled qualification into external validation.');
must('extensions/dts/profiles/README.md','Core Schema Closure may finitely close generation semantics, while DTS still owns any load-bearing transition anatomy/order distinction.');
must('historical/branch-archive/README.md','This archive is now the durable inert record of their unique evidence.');

if(failures.length){
  console.error(JSON.stringify({readme_mission_alignment:'FAIL',failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  readme_mission_alignment:'PASS',
  front_doors_checked:frontDoors.length,
  current_family:'Core 0.17-0.21 + QU 0.1 + NEI 0.4 + DP 0.1-0.10 + DTS 0.1 + EI 0.1'
},null,2));
