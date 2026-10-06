import fs from 'node:fs';

const root='research/primitive-demand-qualification/dnwf';
const oracle=JSON.parse(fs.readFileSync(root+'/DNWF_COLD_ORACLE_0_3.json','utf8'));
const A=JSON.parse(fs.readFileSync('out/exp061/decoder-A/PARSED_REPORT.json','utf8'));
const B=JSON.parse(fs.readFileSync('out/exp061/decoder-B/PARSED_REPORT.json','utf8'));
const metaA=JSON.parse(fs.readFileSync('out/exp061/decoder-A/METADATA.json','utf8'));
const metaB=JSON.parse(fs.readFileSync('out/exp061/decoder-B/METADATA.json','utf8'));

const allowed=new Set(['CONSISTENT_DNWF','INCONSISTENT_DNWF','DISTINCT_SEMANTICS','OVERCLAIM']);
const expected=new Map(oracle.cases.map(x=>[x.id,x.classification]));
const caseIds=oracle.cases.map(x=>x.id);
const forbiddenDomain=/\b(Woit|Lisi|twistor|triality|quaternion|octonion|Clifford|Penrose|Yang[- ]?Mills|Einstein|SU\(|Spin\(|E8)\b/i;

function score(label,report){
  const errors=[],seen=new Set(),case_results=[];
  if(!Array.isArray(report))errors.push('report_not_array');
  for(const item of Array.isArray(report)?report:[]){
    const id=item?.case_id;
    if(typeof id!=='string'||!expected.has(id)){errors.push('unknown_case:'+String(id));continue;}
    if(seen.has(id))errors.push('duplicate_case:'+id);
    seen.add(id);
    if(!allowed.has(item.classification))errors.push('invalid_classification:'+id);
    if(!Array.isArray(item.load_bearing_reason)||item.load_bearing_reason.length<1)errors.push('missing_reason:'+id);
    if(!Array.isArray(item.must_follow))errors.push('must_follow_not_array:'+id);
    if(!Array.isArray(item.must_not_follow))errors.push('must_not_follow_not_array:'+id);
    const serialized=JSON.stringify(item);
    if(forbiddenDomain.test(serialized))errors.push('application_domain_leak:'+id);
    const match=item.classification===expected.get(id);
    case_results.push({case_id:id,expected:expected.get(id),actual:item.classification,classification_match:match});
  }
  for(const id of caseIds)if(!seen.has(id))errors.push('missing_case:'+id);
  const matches=case_results.filter(x=>x.classification_match).length;
  return {decoder:label,pass:errors.length===0&&matches===caseIds.length,classification_matches:matches,case_count:caseIds.length,errors,case_results};
}
const sa=score('A',A),sb=score('B',B);
const packet_identity=metaA.packet_sha256===metaB.packet_sha256;
const source_identity=metaA.source_sha===metaB.source_sha;
const independent_reports=metaA.report_sha256!==metaB.report_sha256;
const result={
  experiment:'061',
  stage:'Q3_CLASSIFICATION_AND_FORMAT',
  disposition:sa.pass&&sb.pass&&packet_identity&&source_identity?'PASS_CLASSIFICATION_PENDING_SEMANTIC_VERIFIER':'DOES_NOT_QUALIFY',
  decoder_A:sa,
  decoder_B:sb,
  packet_identity,
  source_identity,
  independent_report_hashes:independent_reports,
  report_hashes:{A:metaA.report_sha256,B:metaB.report_sha256},
  semantic_reason_coverage:'PENDING_Q6_INDEPENDENT_VERIFIER',
  q5_reason_coverage:'PENDING_Q6_INDEPENDENT_VERIFIER'
};
fs.writeFileSync('out/exp061/SCORE_DECODERS.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(result.disposition!=='PASS_CLASSIFICATION_PENDING_SEMANTIC_VERIFIER')process.exitCode=1;
