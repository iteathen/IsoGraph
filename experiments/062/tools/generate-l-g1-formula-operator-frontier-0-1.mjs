import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const extraction=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_20.json','utf8'));
const out='experiments/062/L_G1_FORMULA_OPERATOR_FRONTIER_0_1.json';
const nmap=new Map(extraction.items.map(x=>[x.census_id,x]));
const specs=[
 ['EQUALS',/=/g],['APPROX',/≈/g],['TILDE',/~/g],['ARROW_ASCII',/->/g],['TENSOR',/⊗/g],['CENTRAL_PRODUCT',/∘/g],
 ['SUBSET_SYMBOL',/⊂/g],['PLUS',/\+/g],['STAR',/\*/g],['CARET',/\^/g],['NUMERIC_FRACTION',/\b\d+\/\d+\b/g],
 ['BRACKET_GROUP',/\[[A-Za-z0-9_', *+\-]+\]/g]
];
const items=[],byKind={};
for(const c of corpus.items.filter(x=>x.track==='L')){
 const it=nmap.get(c.census_id),tokens=[];
 if(!it)throw new Error('missing '+c.census_id);
 for(const [kind,re] of specs){
  re.lastIndex=0;let m;
  while((m=re.exec(c.body))){
   const lexeme=m[0],start=m.index,end=start+lexeme.length,enclosing=[];
   for(const o of it.occurrences){
    let idx=c.body.indexOf(o.source_span);
    while(idx>=0){if(idx<=start&&idx+o.source_span.length>=end){enclosing.push(o.occurrence_id);break;}idx=c.body.indexOf(o.source_span,idx+1);}
   }
   const exact=it.occurrences.filter(o=>o.relation_span===lexeme).map(o=>o.occurrence_id);
   tokens.push({kind,lexeme,start,end,enclosing_occurrence_ids:enclosing,exact_relation_occurrence_ids:exact,review_state:'SOURCE_LOCAL_OPERATOR_REVIEW_REQUIRED'});
   byKind[kind]=(byKind[kind]||0)+1;
  }
 }
 tokens.sort((a,b)=>a.start-b.start||a.end-b.end||a.kind.localeCompare(b.kind));
 if(tokens.length)items.push({census_id:c.census_id,body:c.body,tokens});
}
const artifact={
 schema:'isograph.exp062-l-g1-formula-operator-frontier.v0.1',date:'2026-10-06',
 status:'DIAGNOSTIC_SOURCE_ONLY_OPERATOR_FRONTIER_NOT_G1_COMPLETENESS',authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
 governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',
 source_corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',
 extraction:'experiments/062/L_EXTRACTION_RECONCILED_0_20.json',
 purpose:'Enumerate exact source-visible symbolic tokens in the frozen L bodies after ordinary 0.20 incidence repair. No conventional mathematical meaning is assigned by this frontier; every token requires source-local adjudication before semantic promotion.',
 token_kinds:specs.map(x=>x[0]),
 guards:[
  'Token kinds are lexical/source-visible only; PLUS does not assert addition, STAR does not assert Hodge duality, TENSOR does not assert tensor-product semantics, and so on.',
  'Hyphen/minus and slash are not scanned generically because prose/names use them ambiguously; numeric fractions are recorded explicitly.',
  'Compact named operators such as dA, Dphi, det(...), tilde(...), bar(...), and source juxtaposition require a separate source-local review because their operator boundaries are not safely determined by symbol lexing alone.',
  'A token inside an identifier or role label may be adjudicated NON_OPERATOR_SOURCE_TOKEN; no token is promoted automatically.',
  'This frontier neither closes G1 nor authorizes G2.'
 ],
 counts:{bodies_with_tokens:items.length,total_tokens:items.reduce((n,x)=>n+x.tokens.length,0),by_kind:byKind},
 items
};
fs.writeFileSync(out,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({pass:true,output:out,counts:artifact.counts},null,2));
