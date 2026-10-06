import fs from "node:fs";
const e=JSON.parse(fs.readFileSync("experiments/062/L_EXTRACTION_RECONCILED_0_1.json","utf8"));
const c=JSON.parse(fs.readFileSync("research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json","utf8"));
const selected=c.items.filter(x=>x.track==="L"),src=new Map(selected.map(x=>[x.census_id,x])),errors=[];
if(e.track!=="L")errors.push("track");
if(e.items.length!==151)errors.push("count");
if(JSON.stringify(e.items.map(x=>x.census_id))!==JSON.stringify(selected.map(x=>x.census_id)))errors.push("order");
const forbidden=/\b(PD-[A-Z0-9-]+|B-[A-Z0-9-]+|DNWF|DNIA)\b/i;
for(const item of e.items){
 const s=src.get(item.census_id);if(!s){errors.push("unknown "+item.census_id);continue;}
 const seen=new Set();
 for(const o of item.occurrences||[]){
  if(seen.has(o.occurrence_id))errors.push(o.occurrence_id+":dup");seen.add(o.occurrence_id);
  if(typeof o.source_span!=="string"||!s.body.includes(o.source_span))errors.push(o.occurrence_id+":source");
  if(typeof o.relation_span!=="string"||!o.source_span?.includes(o.relation_span)||!s.body.includes(o.relation_span))errors.push(o.occurrence_id+":relation");
  if(!Array.isArray(o.argument_spans)||o.argument_spans.some(a=>typeof a!=="string"||!s.body.includes(a)))errors.push(o.occurrence_id+":args");
  if(!["ASSERTED","NEGATED","CONDITIONAL","EQUALITY_OR_IDENTIFICATION","EXISTENCE","COMPARISON","OTHER"].includes(o.logical_force))errors.push(o.occurrence_id+":force");
  if(!["EXPLICIT_IN_BODY","PARTIAL_IN_BODY","NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED"].includes(o.definition_status))errors.push(o.occurrence_id+":def");
  if(!Array.isArray(o.depends_on))errors.push(o.occurrence_id+":deps");
  if(forbidden.test(JSON.stringify({id:o.occurrence_id,lf:o.logical_force,ds:o.definition_status,deps:o.depends_on,note:o.load_bearing_note})))errors.push(o.occurrence_id+":forbidden");
 }
 if(!["COMPLETE","INCOMPLETE_AMBIGUOUS_BOUNDARY"].includes(item.extraction_status))errors.push(item.census_id+":status");
}
const result={pass:errors.length===0,errors,item_count:e.items.length,authority:false,semantic_completeness_audit:"NOT_COVERED_BY_THIS_VERIFIER"};
console.log(JSON.stringify(result,null,2));if(!result.pass)process.exitCode=1;
