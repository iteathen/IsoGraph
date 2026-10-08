import fs from 'node:fs';

const corpusPath='research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const inputs={
  W:'experiments/062/W_EXTRACTION_RECONCILED_0_5.json',
  L:'experiments/062/L_EXTRACTION_RECONCILED_0_13.json'
};
const expectedCounts={W:{items:84,occurrences:177},L:{items:151,occurrences:319}};
const allowedForces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const allowedDefinitions=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const allowedOccurrenceKeys=new Set([
  'occurrence_id','source_span','relation_span','argument_spans',
  'logical_force','definition_status','depends_on','load_bearing_note'
]);

const corpus=JSON.parse(fs.readFileSync(corpusPath,'utf8'));
const errors=[];
const warnings=[];
const summary={method:methodPath,corpus:corpusPath,tracks:{}};

if(!fs.existsSync(methodPath)) errors.push('missing graph-first method '+methodPath);

function countSubstring(haystack,needle){
  if(typeof needle!=='string'||needle.length===0) return 0;
  let count=0,pos=0;
  while((pos=haystack.indexOf(needle,pos))!==-1){count++;pos+=needle.length;}
  return count;
}

function forbiddenKeyPaths(value,path='$',out=[]){
  if(Array.isArray(value)){
    value.forEach((v,i)=>forbiddenKeyPaths(v,path+'['+i+']',out));
    return out;
  }
  if(value && typeof value==='object'){
    for(const [k,v] of Object.entries(value)){
      if(/^(?:requires|candidate_basis|candidate_basis_id|candidate_primitive|primitive_class|primitive_id)$/i.test(k)) out.push(path+'.'+k);
      forbiddenKeyPaths(v,path+'.'+k,out);
    }
  }
  return out;
}

for(const track of ['W','L']){
  const extraction=JSON.parse(fs.readFileSync(inputs[track],'utf8'));
  const expectedItems=corpus.items.filter(x=>x.track===track);
  const bodies=new Map(expectedItems.map(x=>[x.census_id,x.body]));
  const expectedIds=expectedItems.map(x=>x.census_id);
  const actualIds=(extraction.items||[]).map(x=>x.census_id);
  let occurrenceCount=0;
  const globalIds=new Set();
  const semanticSignatures=new Map();
  const relationSpanAmbiguities=[];

  if(extraction.track!==track) errors.push(track+': track mismatch '+String(extraction.track));
  if((extraction.items||[]).length!==expectedCounts[track].items) errors.push(track+': item count '+(extraction.items||[]).length);
  if(JSON.stringify(actualIds)!==JSON.stringify(expectedIds)) errors.push(track+': census ids/order mismatch');

  const forbiddenKeys=forbiddenKeyPaths(extraction);
  for(const p of forbiddenKeys) errors.push(track+': forbidden pre-G5 key '+p);

  for(const item of extraction.items||[]){
    const body=bodies.get(item.census_id);
    if(typeof body!=='string'){errors.push(track+': unknown census item '+item.census_id);continue;}
    if(item.extraction_status!=='COMPLETE') errors.push(track+': incomplete item '+item.census_id);

    const priorIds=new Set();
    for(const occurrence of item.occurrences||[]){
      occurrenceCount++;
      const id=occurrence.occurrence_id;

      if(typeof id!=='string'||id.length===0) errors.push(track+': missing occurrence id in '+item.census_id);
      else if(globalIds.has(id)) errors.push(track+': duplicate occurrence id '+id);
      else globalIds.add(id);

      const extraKeys=Object.keys(occurrence).filter(k=>!allowedOccurrenceKeys.has(k));
      if(extraKeys.length) errors.push(track+': undeclared occurrence fields '+id+' '+JSON.stringify(extraKeys));

      if(typeof occurrence.source_span!=='string'||occurrence.source_span.length===0||!body.includes(occurrence.source_span)){
        errors.push(track+': invalid source span '+id);
      }else{
        const sourceCopies=countSubstring(body,occurrence.source_span);
        if(sourceCopies!==1) errors.push(track+': non-reversible source span '+id+' copies='+sourceCopies);
      }

      if(typeof occurrence.relation_span!=='string'||occurrence.relation_span.length===0||!occurrence.source_span?.includes(occurrence.relation_span)){
        errors.push(track+': relation span enclosure '+id);
      }else{
        const relationCopies=countSubstring(occurrence.source_span,occurrence.relation_span);
        if(relationCopies!==1) relationSpanAmbiguities.push({occurrence_id:id,copies:relationCopies});
      }

      if(!Array.isArray(occurrence.argument_spans)) errors.push(track+': argument_spans not array '+id);
      else for(const span of occurrence.argument_spans){
        if(typeof span!=='string'||span.length===0||!occurrence.source_span?.includes(span)) errors.push(track+': argument span enclosure '+id);
      }

      if(!allowedForces.has(occurrence.logical_force)) errors.push(track+': logical_force '+id+' '+String(occurrence.logical_force));
      if(!allowedDefinitions.has(occurrence.definition_status)) errors.push(track+': definition_status '+id+' '+String(occurrence.definition_status));

      if(!Array.isArray(occurrence.depends_on)) errors.push(track+': depends_on not array '+id);
      else for(const dependency of occurrence.depends_on){
        if(!priorIds.has(dependency)) errors.push(track+': dependency not prior/same-item '+id+' -> '+dependency);
      }
      if(typeof id==='string') priorIds.add(id);

      if(typeof occurrence.load_bearing_note!=='string'||occurrence.load_bearing_note.length===0) errors.push(track+': missing load-bearing note '+id);
      const nonSource=JSON.stringify({
        logical_force:occurrence.logical_force,
        definition_status:occurrence.definition_status,
        depends_on:occurrence.depends_on,
        load_bearing_note:occurrence.load_bearing_note
      });
      if(/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA)\b/i.test(nonSource)) errors.push(track+': forbidden historical/basis token '+id);

      const signature=JSON.stringify([
        item.census_id,occurrence.source_span,occurrence.relation_span,
        occurrence.argument_spans,occurrence.logical_force,
        occurrence.definition_status,occurrence.depends_on
      ]);
      if(semanticSignatures.has(signature)) errors.push(track+': exact duplicate semantic occurrence '+semanticSignatures.get(signature)+' / '+id);
      else semanticSignatures.set(signature,id);
    }
  }

  if(occurrenceCount!==expectedCounts[track].occurrences) errors.push(track+': occurrence count '+occurrenceCount);
  if(relationSpanAmbiguities.length) warnings.push(track+': relation_span text is non-unique inside '+relationSpanAmbiguities.length+' source spans; source_span itself remains unique and reversible');

  summary.tracks[track]={
    input:inputs[track],
    item_count:(extraction.items||[]).length,
    occurrence_count:occurrenceCount,
    all_complete:(extraction.items||[]).every(x=>x.extraction_status==='COMPLETE'),
    unique_source_spans_within_body:true,
    exact_duplicate_semantic_occurrences:0,
    forbidden_pre_G5_keys:forbiddenKeys.length,
    relation_span_text_ambiguities:relationSpanAmbiguities,
    side_condition_note:'Semantic completeness of explicit side conditions is governed by the extraction contract and independent cold audit; it is not inferred from a dedicated side-condition field because the frozen 0.2 serialization has none.'
  };
}

const result={
  schema:'isograph.exp062-current-g1-mechanical-guard.v0.1',
  pass:errors.length===0,
  errors,
  warnings,
  summary,
  gate_effect:'DETERMINISTIC_GUARD_ONLY_DOES_NOT_CLOSE_G1_OR_AUTHORIZE_G2'
};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exitCode=1;
