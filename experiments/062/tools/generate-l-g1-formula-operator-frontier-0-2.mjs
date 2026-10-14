import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const extraction=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_20.json','utf8'));
const nmap=new Map(extraction.items.map(x=>[x.census_id,x]));
const specs=[['EQUALS',/=/g],['APPROX',/≈/g],['TILDE',/~/g],['ARROW_ASCII',/->/g],['TENSOR',/⊗/g],['CROSS',/×/g],['CENTRAL_PRODUCT',/∘/g],['SUBSET_SYMBOL',/⊂/g],['PLUS',/\+/g],['STAR',/\*/g],['CARET',/\^/g],['NUMERIC_FRACTION',/\b\d+\/\d+\b/g],['BRACKET_GROUP',/\[[A-Za-z0-9_', *+\-]+\]/g]];
const items=[],byKind={};
for(const c of corpus.items.filter(x=>x.track==='L')){
 const it=nmap.get(c.census_id),tokens=[];
 for(const [kind,re] of specs){re.lastIndex=0;let m;while((m=re.exec(c.body))){
  const lexeme=m[0],start=m.index,end=start+lexeme.length,enclosing=[];
  for(const o of it.occurrences){let idx=c.body.indexOf(o.source_span);while(idx>=0){if(idx<=start&&idx+o.source_span.length>=end){enclosing.push(o.occurrence_id);break;}idx=c.body.indexOf(o.source_span,idx+1);}}
  const exact=it.occurrences.filter(o=>o.relation_span===lexeme).map(o=>o.occurrence_id);
  tokens.push({kind,lexeme,start,end,enclosing_occurrence_ids:enclosing,exact_relation_occurrence_ids:exact,review_state:'SOURCE_LOCAL_OPERATOR_REVIEW_REQUIRED'});
  byKind[kind]=(byKind[kind]||0)+1;
 }}
 tokens.sort((a,b)=>a.start-b.start||a.end-b.end||a.kind.localeCompare(b.kind));
 if(tokens.length)items.push({census_id:c.census_id,body:c.body,tokens});
}
const artifact={schema:'isograph.exp062-l-g1-formula-operator-frontier.v0.2',date:'2026-10-06',status:'DIAGNOSTIC_SOURCE_ONLY_OPERATOR_FRONTIER_NOT_G1_COMPLETENESS',authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',predecessor:'experiments/062/L_G1_FORMULA_OPERATOR_FRONTIER_0_1.json',governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',source_corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',extraction:'experiments/062/L_EXTRACTION_RECONCILED_0_20.json',correction:'Adds CROSS (×), omitted from v0.1; all other lexical rules are unchanged.',purpose:'Enumerate exact source-visible symbolic tokens without assigning conventional mathematical meaning; every token requires source-local adjudication.',token_kinds:specs.map(x=>x[0]),guards:['Token kinds are lexical/source-visible only.','Hyphen/minus and generic slash remain excluded because prose/names use them ambiguously; numeric fractions are recorded.','Compact named operators and juxtaposition require separate source-local review.','Identifier-internal symbols may be adjudicated NON_OPERATOR_SOURCE_TOKEN.','No token is promoted automatically; this frontier does not authorize G2.'],counts:{bodies_with_tokens:items.length,total_tokens:items.reduce((n,x)=>n+x.tokens.length,0),by_kind:byKind},items};
fs.writeFileSync('experiments/062/L_G1_FORMULA_OPERATOR_FRONTIER_0_2.json',JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({pass:true,counts:artifact.counts},null,2));
