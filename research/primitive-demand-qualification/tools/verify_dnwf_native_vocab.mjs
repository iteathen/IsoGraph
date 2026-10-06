import fs from "node:fs";

const root="research/primitive-demand-qualification/dnwf";
const candidate=JSON.parse(fs.readFileSync(root+"/DNWF_0_1_CANDIDATE.json","utf8"));
const vocab=fs.readFileSync(root+"/DNWF_VOCAB_0_1.isg","utf8");
const doc=fs.readFileSync(root+"/DNWF_NATIVE_VOCAB_0_1.md","utf8");
const errors=[];
const ids=[160100,160110,160111,160112,160113,160114,160115,160116];

for(const id of ids){
  const re=new RegExp("\\^"+id+"(?![0-9])","g");
  const hits=[...vocab.matchAll(re)].length;
  if(hits!==1)errors.push("vocab declaration count "+id+"="+hits);
}
const numeric=[...vocab.matchAll(/\^([0-9]+)/g)].map(x=>Number(x[1])).filter(x=>x!==0);
if(JSON.stringify(numeric)!==JSON.stringify(ids))errors.push("vocab ID surface");
if(candidate.new_semantic_relations?.length!==1||candidate.new_semantic_relations[0]?.id!==160100)errors.push("candidate semantic relation");
const raw=(candidate.raw_packet_metadata_relations||[]).map(x=>x.id);
if(JSON.stringify(raw)!==JSON.stringify(ids.slice(1)))errors.push("candidate metadata IDs");
if(!doc.includes("Only `^160100` is proposed as new semantic extension authority."))errors.push("semantic boundary prose");
if(!doc.includes("finite extensional packet-incidence semantics only"))errors.push("metadata boundary prose");
if(/\^1601(?:0[1-9]|1[7-9]|[2-9][0-9])/.test(vocab))errors.push("undeclared DNWF namespace growth");
const result={pass:errors.length===0,errors,new_semantic_relation:160100,metadata_ids:ids.slice(1),qualified:false};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
