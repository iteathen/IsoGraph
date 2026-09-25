import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export const MODULES=Object.freeze([
  {module:'CORE_0_18',path:'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',heading:'# 0. Additional interpretation barriers',relation:97310},
  {module:'QU_0_1',path:'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',heading:'# 0. Interpretation barriers',relation:97311},
  {module:'NEI_0_4',path:'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',heading:'# 0. Constitutional barriers',relation:97312},
  {module:'DP_0_5',path:'extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md',heading:'# 0. Interpretation barriers',relation:97313},
  {module:'DP_0_6',path:'extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md',heading:'# 0. Authority-routing barriers',relation:97314},
  {module:'DTS_0_1',path:'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',heading:'# 0. Interpretation barriers',relation:97315},
]);

export function extractBarrierGroups(text,heading){
  const headingIndex=text.indexOf(heading);
  if(headingIndex<0) throw new Error('missing barrier heading '+heading);
  const fence=text.indexOf('```text',headingIndex);
  const end=text.indexOf('```',fence+7);
  if(fence<0||end<0) throw new Error('missing barrier fence '+heading);
  const body=text.slice(fence+7,end).trim();
  const blocks=body.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  return blocks.map((block,index)=>{
    const lines=block.split('\n').map(x=>x.trim()).filter(Boolean);
    if(lines.length<2) throw new Error('barrier block without target: '+block);
    const left=lines[0];
    const rights=lines.slice(1).map(line=>{
      if(!line.startsWith('!=')) throw new Error('unexpected barrier syntax: '+line);
      return line.replace(/^!=\s*/,'');
    });
    return {group:index+1,left,rights};
  });
}

function blobSha(root,relativePath){
  return execFileSync('git',['hash-object',relativePath],{cwd:root,encoding:'utf8'}).trim();
}

export function buildBarrierCorpus(root=process.cwd()){
  let nextTerm=230000;
  const modules=[];
  const scopes=[];

  for(const cfg of MODULES){
    const text=fs.readFileSync(path.join(root,cfg.path),'utf8');
    const groups=extractBarrierGroups(text,cfg.heading);
    const barriers=[];
    const edges=[];

    for(const group of groups){
      const leftId=nextTerm++;
      for(const right of group.rights){
        const rightId=nextTerm++;
        barriers.push({
          barrier_id:`${cfg.module}-B${String(barriers.length+1).padStart(2,'0')}`,
          group:group.group,
          left:{term_id:leftId,text:group.left},
          right:{term_id:rightId,text:right},
        });
        edges.push({left:leftId,right:rightId});
      }
    }

    modules.push({
      module:cfg.module,
      source_path:cfg.path,
      source_blob_sha:blobSha(root,cfg.path),
      source_heading:cfg.heading,
      local_relation_label:`^${cfg.relation}`,
      groups:groups.length,
      edges:barriers.length,
      barriers,
    });
    scopes.push({relation:cfg.relation,edges});
  }

  return {
    corpus:{
      experiment:'023',
      status:'development discovery corpus; not qualification',
      representation_rule:'Each module uses a distinct source-local relation label. Identical lexical phrases across modules do not share term SIs. Multi-target source barriers share only their source-local left term. No cross-module barrier relation or semantic generator is predeclared.',
      modules,
    },
    isg:renderIsg(scopes),
  };
}

export function renderIsg(scopes){
  let out='[\n  (^0 [\n    '+scopes.map(s=>`^${s.relation}`).join(' ')+'\n  ])\n]\n\n';
  for(const scope of scopes){
    out+='[\n';
    for(const edge of scope.edges) out+=`  (^${scope.relation} ${edge.left} ${edge.right})\n`;
    out+=']\n\n';
  }
  return out;
}

export function checkCommitted(root=process.cwd()){
  const {corpus,isg}=buildBarrierCorpus(root);
  const corpusText=JSON.stringify(corpus,null,2)+'\n';
  const committedCorpus=fs.readFileSync(path.join(root,'experiments/023/SOURCE_BARRIERS.json'),'utf8');
  const committedIsg=fs.readFileSync(path.join(root,'experiments/023/BARRIERS.isg'),'utf8');
  const errors=[];
  if(corpusText!==committedCorpus) errors.push('SOURCE_BARRIERS.json differs from exact source extraction');
  if(isg!==committedIsg) errors.push('BARRIERS.isg differs from generated source-local graph');
  return {ok:errors.length===0,errors,corpus,isg};
}

const here=fileURLToPath(import.meta.url);
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(here)){
  const root=process.cwd();
  const mode=process.argv[2]||'--check';
  const built=buildBarrierCorpus(root);
  if(mode==='--write'){
    fs.writeFileSync(path.join(root,'experiments/023/SOURCE_BARRIERS.json'),JSON.stringify(built.corpus,null,2)+'\n');
    fs.writeFileSync(path.join(root,'experiments/023/BARRIERS.isg'),built.isg);
    console.log('Experiment 023 barrier corpus written');
  }else if(mode==='--check'){
    const result=checkCommitted(root);
    if(!result.ok){
      console.error(result.errors.join('\n'));
      process.exit(1);
    }
    console.log('Experiment 023 barrier corpus source fidelity: PASS');
  }else{
    throw new Error('unknown mode '+mode);
  }
}
