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
  'research/README.md',
  'research/glycan-cleavage/README.md',
  'research/navier-stokes-proof/README.md',
  'research/p-vs-np/README.md',
  'research/project-discovery/README.md',
  'research/publications/README.md'
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
must('README.md','## Research programs and demonstrated applications');
must('README.md','# Exact rendering is conserved');
must('README.md','# Implicit Assertions are derived structure with explicit support');
must('README.md','# Schema Closure represents iteration without exhaustive execution');
must('README.md','# Detailed Transition System: change has internal structure');
must('README.md','# Minimum sufficient support and valuation');
must('README.md','# Discovery can escalate to experimental inquiry');
must('README.md','Current Connect4 / IsoMax full-discovery research');
must('README.md','JSMinSys / IsoMax implementation research');
must('README.md','## 19. Implicit consequences can be generated recursively instead of guessed');
must('README.md','## 21. Large iterative and recursive families can be represented without exhaustive unrolling');
must('README.md','## 22. Transition anatomy can be compared independently of endpoints');
must('README.md','## 25. The system can discover minimum sufficient support');
must('README.md','## 27. IsoGraph can identify when reasoning should stop and new evidence should be generated');
must('README.md','## 28. Experiments can be represented as provisional, revisable structural inquiries');
must('README.md','## 33. Cross-domain discovery can recover exact correspondences while rejecting tempting false ones');
must('README.md','A Packaging Dependency in the Periodic Navier–Stokes Blowup Corollary');
must('README.md','Unique Minimum Support in Two Frozen Navier–Stokes Proof Deletion Spaces');

const researchIndex=fs.readFileSync('research/README.md','utf8');
for(const match of researchIndex.matchAll(/\(([^()\/]+)\/README\.md\)/g)){
  const project=match[1];
  must('README.md','research/'+project+'/README.md');
}

mustNot('README.md','## Active research lead — P versus NP primitive-logic campaign');
mustNot('README.md','The strongest current core candidates include:');
mustNot('README.md','current qualified family authority is DP 0.1–0.8');
mustNot('README.md','current qualified family authority is DP 0.1–0.7');

must('research/glycan-cleavage/README.md','## Current-family continuation');
must('research/glycan-cleavage/README.md','Core 0.21');
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
must('research/project-discovery/README.md','**Research status:** early prototype / proof-of-function research program; the intended mature Project Discovery has not yet been built.');
must('research/project-discovery/README.md','## Mission');
must('research/project-discovery/README.md','## Intended scale');
must('research/project-discovery/README.md','## Current state');
must('research/project-discovery/README.md','## Resource requirements');
must('research/project-discovery/README.md','## Organizational requirement: independence must scale with discovery');
must('research/project-discovery/README.md','## Infrastructure needed before grand scale');
must('research/project-discovery/README.md','## Scaling path');
must('research/project-discovery/README.md','## Success criteria');
must('research/project-discovery/README.md','The current evidence does not establish:');
must('research/project-discovery/README.md','more agents');
must('research/project-discovery/README.md','!= more truth');
mustNot('research/p-vs-np/README.md','current qualified family authority is DP 0.1–0.8');

must('research/publications/README.md','publication does not create semantic authority');
must('research/publications/README.md','A Packaging Dependency in the Periodic Navier–Stokes Blowup Corollary');
must('research/publications/README.md','Unique Minimum Support in Two Frozen Navier–Stokes Proof Deletion Spaces');
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
