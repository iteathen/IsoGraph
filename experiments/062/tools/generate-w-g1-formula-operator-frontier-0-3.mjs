import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const extraction=JSON.parse(fs.readFileSync('experiments/062/W_EXTRACTION_RECONCILED_0_16.json','utf8'));
const out='experiments/062/W_G1_FORMULA_OPERATOR_FRONTIER_0_3.json';
const byExtraction=new Map(extraction.items.map(x=>[x.census_id,x]));
const items=[];

function candidateAsciiX(body,i){
  const prev=body[i-1]||'',next=body[i+1]||'';
  const left=body.slice(0,i),right=body.slice(i+1);
  if(prev===' '&&next===' ')return true;
  if(/\)$/.test(left)&&/^[A-Z]/.test(right))return true;
  if(/_L$/.test(left)&&/^U\(/.test(right))return true;
  return false;
}
for(const c of corpus.items.filter(x=>x.track==='W')){
  const ext=byExtraction.get(c.census_id);
  if(!ext)throw new Error('missing extraction '+c.census_id);
  const tokens=[];
  for(let i=0;i<c.body.length;i++){
    const ch=c.body[i];
    if(ch!=='x'&&ch!=='×')continue;
    if(ch==='x'&&!candidateAsciiX(c.body,i))continue;
    const enclosing=[];
    for(const o of ext.occurrences||[]){
      let p=c.body.indexOf(o.source_span);
      while(p>=0){
        if(p<=i&&p+o.source_span.length>=i+1){enclosing.push(o.occurrence_id);break;}
        p=c.body.indexOf(o.source_span,p+1);
      }
    }
    const exact=(ext.occurrences||[]).filter(o=>o.relation_span===ch).map(o=>o.occurrence_id);
    tokens.push({
      kind:ch==='×'?'UNICODE_PRODUCT_CANDIDATE':'ASCII_X_CANDIDATE',
      lexeme:ch,start:i,end:i+1,
      context:c.body.slice(Math.max(0,i-24),Math.min(c.body.length,i+25)),
      enclosing_occurrence_ids:enclosing,
      exact_relation_occurrence_ids:exact,
      review_state:'SOURCE_LOCAL_PRODUCT_OR_VARIABLE_REVIEW_REQUIRED'
    });
  }
  if(tokens.length)items.push({census_id:c.census_id,body:c.body,tokens});
}
const artifact={
 schema:'isograph.exp062-w-g1-formula-operator-frontier.v0.3',
 date:'2026-10-06',
 status:'DIAGNOSTIC_SOURCE_ONLY_X_PRODUCT_FRONTIER_NOT_G1_COMPLETENESS',
 authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
 predecessor:'experiments/062/W_G1_FORMULA_OPERATOR_FRONTIER_0_2.json',
 governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',
 source_corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',
 extraction:'experiments/062/W_EXTRACTION_RECONCILED_0_16.json',
 purpose:'Close the W source-visible x/× composition blind spot left by v0.2 while distinguishing group/carrier product notation from the source variable x in action formulas.',
 guards:[
  'x is not presumed to be an operator: every candidate is source-locally adjudicated.',
  'The x variable in x KAPPA(x), x -> g_L x g_R^{-1}, and x -> Omega_L x Omega_R^{-1} remains a variable, not a product token.',
  '2x2 dimensional notation remains a dimension literal and is outside this candidate selector.',
  'A product token may be surfaced without importing direct-product, Cartesian-product, or other conventional product semantics.',
  'This frontier is diagnostic only and cannot close G1 or authorize G2.'
 ],
 counts:{
   bodies_with_candidates:items.length,
   candidate_tokens:items.reduce((n,x)=>n+x.tokens.length,0),
   ascii_x_candidates:items.flatMap(x=>x.tokens).filter(t=>t.kind==='ASCII_X_CANDIDATE').length,
   unicode_product_candidates:items.flatMap(x=>x.tokens).filter(t=>t.kind==='UNICODE_PRODUCT_CANDIDATE').length
 },
 items
};
fs.writeFileSync(out,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({pass:true,output:out,counts:artifact.counts},null,2));
