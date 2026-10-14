import fs from "node:fs";
const root="research/primitive-demand-qualification";
const source=JSON.parse(fs.readFileSync(root+"/SOURCE_DEMAND_CENSUS_0_1.json","utf8"));
const profile=JSON.parse(fs.readFileSync(root+"/SEMANTIC_OCCURRENCE_EXTRACTION_PROFILE_0_1.json","utf8"));
const census=JSON.parse(fs.readFileSync(root+"/SEMANTIC_OCCURRENCE_CENSUS_WORKING_0_1.json","utf8"));
const errors=[],forbidden=new Set(["requires","candidate_basis","candidate_basis_ids","basis_id","demand_type","quotient_class"]);
function keys(v,p="root"){if(Array.isArray(v)){v.forEach((x,i)=>keys(x,p+"["+i+"]"));return;}if(v&&typeof v==="object")for(const [k,x] of Object.entries(v)){if(forbidden.has(k))errors.push("forbidden key "+p+"."+k);keys(x,p+"."+k);}}
keys(census);
if(census.status!=="G1_WORKING_SURFACE_LOCATOR_PASS_NOT_SEMANTICALLY_COMPLETE")errors.push("status");
if(census.authority?.g1_complete!==false||census.authority?.g4_structural_quotient_authorized!==false)errors.push("authority flags");
if(census.items.length!==source.items.length||census.items.length!==235)errors.push("body count");
const ids=new Set();
for(let i=0;i<source.items.length;i++){const s=source.items[i],x=census.items[i];if(ids.has(x.census_id))errors.push("duplicate "+x.census_id);ids.add(x.census_id);if(s.census_id!==x.census_id||s.track!==x.track||s.body!==x.exact_body)errors.push("source mismatch "+s.census_id);if(x.g1_state!=="G1_REVIEW_REQUIRED")errors.push("premature G1 completion "+x.census_id);for(const c of x.clauses){if(x.exact_body.slice(c.body_start,c.body_end)!==c.exact_text)errors.push("clause span "+c.clause_id);if(c.semantic_review_required!==true)errors.push("review guard "+c.clause_id);for(const h of c.surface_relation_heads){if(x.exact_body.slice(h.body_start,h.body_end)!==h.exact_text)errors.push("head span "+h.occurrence_id);if(h.semantic_state!=="UNEXPANDED_SEMANTIC_OCCURRENCE")errors.push("head state "+h.occurrence_id);if(!profile.surface_relation_heads.includes(h.normalized_head))errors.push("unprofiled head "+h.occurrence_id);}}}
if(census.items.filter(x=>x.track==="W").length!==84||census.items.filter(x=>x.track==="L").length!==151)errors.push("track counts");
const result={pass:errors.length===0,errors,counts:census.counts,g1_complete:false,g4_authorized:false};console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;