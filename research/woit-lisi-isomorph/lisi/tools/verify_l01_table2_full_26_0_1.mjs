// L01 G0 assisted Table2 (26 rows) exact rational source projection verifier.
// Run: node research/woit-lisi-isomorph/lisi/tools/verify_l01_table2_full_26_0_1.mjs
// No original PDF acquisition or cold semantic review. Never promote a source graph.
import { readFileSync } from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('./l01_table2_full_26_assisted_0_1.json',import.meta.url),'utf8'));
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b){let t=a%b;a=b;b=t;}return a;};
function rat(x){const s=String(x).trim().split("/");let n=BigInt(s[0]),d=s[1]===undefined?1n:BigInt(s[1]);if(!d)throw Error("Zero denom");if(d<0n){n=-n;d=-d;}let g=gcd(n,d);return [n/g,d/g];};
function frac(n,d){if(d<0n){n=-n;d=-d}let g=gcd(n,d);return [n/g,d/g];};
function add(a,b){return frac(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);};
function neg(a){return [-a[0],a[1]];};
function sub(a,b){return add(a,neg(b));};
function mul(a,b){return frac(a[0]*b[0],a[1]*b[1]);};
function div(a,b){return frac(a[0]*b[1],a[1]*b[0]);};
function same(a,b){return a[0]===b[0]&&a[1]===b[1];};
function fmt(a){return a[1]===1n?String(a[0]):String(a[0])+"/"+String(a[1]);};
function g8val(s){const c={"0":"0","sqrt(3)/2":"3/2","-sqrt(3)/2":"-3/2","1/(2sqrt(3))":"1/2","-1/(2sqrt(3))":"-1/2","1/sqrt(3)":"1","-1/sqrt(3)":"-1"};if(!Object.hasOwn(c,s))throw Error("UNSUPPORTED_SOURCE_RADICAL_"+s);return rat(c[s]);};
function audit(f){
 let problems=[];const require=(x,s)=>{if(!x)problems.push(s);};
 require(f.track==="L"&&f.stage==="G0"&&f.semantic_authority===false,"TRACK_G0_UNQUALIFIED");
 const guard=f.interpretation_guards;
 for(const k of ["all_26_exact_source_cells_cold_verified","independent_cold_review_complete","projection_implies_natural_identity","projected_su4_to_g2_Lie_quotient_qualified","composited_image_graph_roles_qualified","G0_frozen","G1_authorized","W_semantics_imported","PR70_merge_authorized"])require(guard[k]===false,"GUARD_"+k);
 require(f.rows.length===26,"ROW_COUNT_26");
 require(f.rows.filter(x=>x.panel==="left").length===14&&f.rows.filter(x=>x.panel==="right").length===12,"PANEL_COUNT_14_12");
 require(new Set(f.rows.map(x=>x.marker)).size===26,"UNIQUE_SOURCE_MARKERS");
 const kinds={gluon:0,quark:0,antiquark:0,lepton:0,antilepton:0};
 const seenXYZ=new Set(),fibers=new Map(),grades=new Set(),groups=new Map();
 f.rows.forEach((r,i)=>{
  if(!(r.kind in kinds)){problems.push("INVALID_KIND_"+i);return;}kinds[r.kind]++;
  const xyz=r.xyz.map(rat);
  const projection=[div(neg(add(add(xyz[0],xyz[1]),xyz[2])),rat("3")),div(sub(xyz[1],xyz[0]),rat("2")),div(add(sub(xyz[2],xyz[0]),sub(xyz[2],xyz[1])),rat("2"))];
  const actual=[rat(r.scaled_B2),rat(r.g3),g8val(r.g8)];
  for(let j=0;j<3;j++)require(same(projection[j],actual[j]),"MISMATCH_"+r.marker+"_AXIS_"+j);
  const xyzKey=xyz.map(fmt).join(","); require(!seenXYZ.has(xyzKey),"DUP_3D_"+r.marker);seenXYZ.add(xyzKey);
  const key=actual.slice(1).map(fmt).join(",");if(!fibers.has(key))fibers.set(key,[]);fibers.get(key).push(r);
  grades.add(fmt(actual[0]));
  if(r.kind==="quark"||r.kind==="antiquark"){const group=r.kind+"_"+r.color;
   if(!groups.has(group))groups.set(group,[]);groups.get(group).push(r);}
  if(r.panel==="left")require(r.printed_row>=1&&r.printed_row<=14,"LEFT_ROW_RANGE");
  else require(r.printed_row>=1&&r.printed_row<=12,"RIGHT_ROW_RANGE");
 });
 require(Object.entries(kinds).every(([k,count])=>count===({gluon:6,quark:9,antiquark:9,lepton:1,antilepton:1})[k]),"KIND_COUNTS");
 require(seenXYZ.size===26,"UNIQUE_3D_26");
 require(fibers.size===13,"PROJECTED_POSITIONS_13");
 let mult={};for(const a of fibers.values())mult[a.length]=(mult[a.length]||0)+1;
 require(mult[1]===6&&mult[2]===1&&mult[3]===6&&Object.values(mult).reduce((a,b)=>a+b,0)===13,"FIBER_MULTIPLICITIES");
 require(grades.size===9,"NINE_B2_GRADES");
 require(groups.size===6,"COLOR_CARRIER_SIX_GROUPS");
 for(const [g,a] of groups){require(a.length===3&&new Set(a.map(z=>z.series)).size===3,"THREE_SERIES_"+g);
   require(new Set(a.map(z=>z.g3+"|"+z.g8)).size===1,"SAME_PROJECTED_COLOR_"+g);
   require(new Set(a.map(z=>z.scaled_B2)).size===3,"DIFFERENT_GRADES_"+g);}
 const origin=fibers.get("0,0")||[];require(origin.length===2&&origin.some(x=>x.kind==="lepton")&&origin.some(x=>x.kind==="antilepton"),"TWO_LEPTONS_ORIGIN");
 // Permissible source root projection is a map of weights; no stronger equality/quotion semantics.
 const finish={row_count:f.rows.length,distinct_3d_points:seenXYZ.size,distinct_projected_2d_points:fibers.size,
 kind_counts:kinds,projection_fiber_multiplicities:mult,distinct_scaled_B2_grades:[...grades].sort(),color_carrier_fibers:groups.size,
 provenance:"SOURCE_ASSISTED_ORIGINAL_PDF_PAGE7_NOT_INDEPENDENT_COLD",Lie_algebra_quotient_qualified:false,natural_identity_qualified:false};
 return {problems,summary:finish};
};
const mutants=["flip_qI_r_g3","change_qIII_b_xyz","wrong_lepton_grade","remove_anti_lepton","misclass_anti_quark","duplicate_full_coordinate","promote_false_identity","promote_false_cold","promote_G1","invent_algebra_quotient","change_g8_radical","swapped_color_series_marker"];
function mutate(d,name){switch(name){
case 'flip_qI_r_g3':d.rows[6].g3='-1/2';break;
case 'change_qIII_b_xyz':d.rows[22].xyz[1]='0';break;
case 'wrong_lepton_grade':d.rows[12].scaled_B2='-1/2';break;
case 'remove_anti_lepton':d.rows.splice(13,1);break;
case 'misclass_anti_quark':d.rows[17].kind='quark';break;
case 'duplicate_full_coordinate':d.rows[24].xyz=[...d.rows[23].xyz];break;
case 'promote_false_identity':d.interpretation_guards.projection_implies_natural_identity=true;break;
case 'promote_false_cold':d.interpretation_guards.independent_cold_review_complete=true;break;
case 'promote_G1':d.interpretation_guards.G1_authorized=true;break;
case 'invent_algebra_quotient':d.interpretation_guards.projected_su4_to_g2_Lie_quotient_qualified=true;break;
case 'change_g8_radical':d.rows[2].g8='1/(2sqrt(3))';break;
case 'swapped_color_series_marker':d.rows[21].marker=d.rows[22].marker;break;
default:throw Error('UNKNOWN_MUTATION_'+name);}}
const result=audit(fixture);if(result.problems.length)throw Error('SOURCE_ASSISTED_BASELINE_FAILED '+JSON.stringify(result.problems));
const trials=mutants.map(name=>{const d=JSON.parse(JSON.stringify(fixture));mutate(d,name);const v=audit(d);return {name,rejected:v.problems.length>0,diagnostic:v.problems.slice(0,4)}});
if(trials.some(t=>!t.rejected))throw Error('SOURCE_ASSISTED_MUTATION_ESCAPE '+JSON.stringify(trials));
console.log(JSON.stringify({schema:'isograph.track-L.G0.L01.Table2-full26-local-math.v0.1',baseline:'PASS',
exact_rational_input:true,source_PDF_rehashed_this_run:false,cold_semantic_review_complete:false,
qualifies_L01_S016_exact_visual:false,G0_frozen:false,...result.summary,
negative_controls:trials,negative_controls_defined:trials.length,negative_controls_rejected:trials.filter(t=>t.rejected).length},null,2));
