import fs from 'node:fs';

const failures=[];
const requiredFiles=[
  'IDEA_PROVENANCE_POLICY.md',
  'ORIGIN_AND_PROVENANCE.md',
  'provenance/IDEA_PROVENANCE_LEDGER.json',
  'research/project-discovery/ORIGIN_AND_PROVENANCE.md',
  'README.md',
  'MIGRATION.md',
  'DESIGN_NOTES.md',
  'DESIGN_IDEALS.md',
  'STATUS.md',
  'EVIDENCE.md',
  'AGENTS.md',
  'CONTRIBUTING.md',
  'PUBLICATION_ATTRIBUTION_POLICY.md',
  'research/README.md',
  'research/project-discovery/README.md'
];

for(const path of requiredFiles){
  if(!fs.existsSync(path) || !fs.statSync(path).isFile() || fs.statSync(path).size===0){
    failures.push('missing/empty provenance-governance file: '+path);
  }
}

const must=(path,needle)=>{
  const text=fs.readFileSync(path,'utf8');
  if(!text.includes(needle)) failures.push(path+': missing provenance marker: '+needle);
};

if(fs.existsSync('provenance/IDEA_PROVENANCE_LEDGER.json')){
  let ledger;
  try{
    ledger=JSON.parse(fs.readFileSync('provenance/IDEA_PROVENANCE_LEDGER.json','utf8'));
  }catch(error){
    failures.push('provenance ledger is invalid JSON: '+error.message);
  }
  if(ledger){
    if(ledger.schema!=='isograph.idea-provenance-ledger.v1'){
      failures.push('unexpected provenance ledger schema');
    }
    if(ledger.retrospective!==true){
      failures.push('ledger must explicitly declare retrospective=true');
    }
    for(const key of ['local','utc']){
      const value=ledger.recorded_on?.[key];
      if(typeof value!=='string' || Number.isNaN(Date.parse(value))){
        failures.push('ledger recorded_on.'+key+' must be an ISO-parseable timestamp');
      }
    }
    const allowed=new Set([
      'HUMAN_ORIGINATED_DIRECTION',
      'HUMAN_ORIGINATED_IDEA',
      'AGENT_ORIGINATED_FORMULATION',
      'AGENT_ASSISTED_FORMALIZATION',
      'CO_DEVELOPED',
      'RESEARCH_FINDING',
      'EXTERNAL_ANTECEDENT'
    ]);
    const entries=Array.isArray(ledger.entries)?ledger.entries:[];
    if(entries.length<15) failures.push('expected at least 15 provenance entries; got '+entries.length);
    const ids=new Set();
    for(const entry of entries){
      if(typeof entry.id!=='string' || !entry.id){
        failures.push('entry missing id');
        continue;
      }
      if(ids.has(entry.id)) failures.push('duplicate provenance id: '+entry.id);
      ids.add(entry.id);
      if(typeof entry.title!=='string' || !entry.title) failures.push(entry.id+': missing title');
      if(!Array.isArray(entry.attribution) || entry.attribution.length===0){
        failures.push(entry.id+': missing attribution');
      }else{
        for(const a of entry.attribution){
          if(typeof a.party!=='string' || !a.party) failures.push(entry.id+': attribution missing party');
          if(!allowed.has(a.role)) failures.push(entry.id+': invalid attribution role '+a.role);
        }
      }

      const evidenceKeys=Object.keys(entry).filter(k=>
        /evidence|conversation|precursor|record|trigger/i.test(k) &&
        !['attribution'].includes(k)
      );
      if(evidenceKeys.length===0) failures.push(entry.id+': no evidence/provenance pointer field');

      const walk=(node,trail)=>{
        if(Array.isArray(node)){
          node.forEach((v,i)=>walk(v,trail+'['+i+']'));
          return;
        }
        if(!node || typeof node!=='object') return;
        if(node.basis==='PRESERVED_DATED_CONVERSATION_RETROSPECTIVELY_SUMMARIZED'){
          if(node.public_at_event_time!==false){
            failures.push(entry.id+': '+trail+' retrospective conversation must declare public_at_event_time=false');
          }
          if(typeof node.time!=='string' || Number.isNaN(Date.parse(node.time))){
            failures.push(entry.id+': '+trail+' retrospective conversation must have parseable time');
          }
        }
        if(node.commit!==undefined){
          if(typeof node.commit!=='string' || !/^[0-9a-f]{40}$/.test(node.commit)){
            failures.push(entry.id+': '+trail+' commit must be a full 40-hex SHA');
          }
        }
        for(const [k,v] of Object.entries(node)) walk(v,trail+'.'+k);
      };
      walk(entry,entry.id);
    }

    const requiredIds=[
      'IG-ORIGIN-001','IG-ORIGIN-002','IG-ORIGIN-003','IG-ORIGIN-004',
      'IG-ORIGIN-005','IG-ORIGIN-006','IG-ORIGIN-007','IG-ORIGIN-008',
      'IG-ORIGIN-009','IG-ORIGIN-010','IG-ORIGIN-011',
      'PD-ORIGIN-001','PD-ORIGIN-002','PD-ORIGIN-003','PD-ORIGIN-004'
    ];
    for(const id of requiredIds){
      if(!ids.has(id)) failures.push('missing required provenance entry: '+id);
    }
  }
}

must('README.md','ORIGIN_AND_PROVENANCE.md');
must('README.md','IDEA_PROVENANCE_POLICY.md');
must('MIGRATION.md','idea provenance');
must('DESIGN_NOTES.md','Historical provenance');
must('DESIGN_IDEALS.md','Idea origin and contribution history');
must('STATUS.md','## Idea/provenance status');
must('EVIDENCE.md','idea provenance');
must('AGENTS.md','### Idea and research provenance requirement');
must('CONTRIBUTING.md','## Idea and finding provenance');
must('PUBLICATION_ATTRIBUTION_POLICY.md','## Idea/finding provenance is separate from authorship');
must('research/README.md','**Preserve idea/finding provenance.**');
must('research/project-discovery/README.md','## Origin and provenance');
must('research/project-discovery/README.md','ORIGIN_AND_PROVENANCE.md');
must('ORIGIN_AND_PROVENANCE.md','**Recorded on:** 2026-10-02T14:06:06-07:00 / 2026-10-02T21:06:06Z');
must('ORIGIN_AND_PROVENANCE.md','earliest evidence currently located');
must('research/project-discovery/ORIGIN_AND_PROVENANCE.md','**Recorded on:** 2026-10-02T14:06:06-07:00 / 2026-10-02T21:06:06Z');
must('research/project-discovery/ORIGIN_AND_PROVENANCE.md','This record does **not** infer copying, influence, or priority from similarity.');
must('IDEA_PROVENANCE_POLICY.md','## 1. Never backdate a provenance record');
must('IDEA_PROVENANCE_POLICY.md','## 9. External-priority discipline');

if(failures.length){
  console.error(JSON.stringify({idea_provenance:'FAIL',failure_count:failures.length,failures},null,2));
  process.exit(1);
}

console.log(JSON.stringify({
  idea_provenance:'PASS',
  ledger_schema:'isograph.idea-provenance-ledger.v1',
  recorded_on:'2026-10-02T14:06:06-07:00',
  required_entries:15,
  retrospective_boundary_enforced:true
},null,2));
