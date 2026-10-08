import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const SSC=json('experiments/064/MODULE_SSC_0_1.json'),IA=json('experiments/064/MODULE_IA_FIXED_POINT_0_1.json'),CASES=json('experiments/064/QUALIFICATION_CASES_0_1.json'),H=json('experiments/062/W_G5H_FIXED_POINT_FREE_INVOLUTION_0_1.json');
const native=read('research/woit-lisi-isomorph/support/PRIMITIVE_FIXED_POINT_FREE_INVOLUTION_SCHEMA_0_1.isg');
const errors=[],check=(x,m)=>{if(!x)errors.push(m)};
const models={
 two_point_swap:{P:['a','b'],edges:[['a','b'],['b','a']]},
 four_point_disjoint_swaps:{P:['a','b','c','d'],edges:[['a','b'],['b','a'],['c','d'],['d','c']]},
 empty_carrier:{P:[],edges:[]},
 identity_map:{P:['a','b'],edges:[['a','a'],['b','b']]},
 three_cycle:{P:['a','b','c'],edges:[['a','b'],['b','c'],['c','a']]},
 partial_map:{P:['a','b'],edges:[['a','b']]},
 multivalued_relation:{P:['a','b'],edges:[['a','b'],['a','a'],['b','a']]},
 codomain_leakage:{P:['a','b'],edges:[['a','c'],['b','a']]},
 swap_plus_fixed_point:{P:['a','b','c'],edges:[['a','b'],['b','a'],['c','c']]}
};
function evaluate(m){
 const P=new Set(m.P),outs=new Map();
 for(const [x,y] of m.edges){if(!P.has(x)||!P.has(y))return {ok:false,failure:'typing'};if(!outs.has(x))outs.set(x,[]);outs.get(x).push(y);}
 for(const x of P){const ys=outs.get(x)||[];if(ys.length===0)return {ok:false,failure:'totality'};if(ys.length!==1)return {ok:false,failure:'single_valuedness'};}
 for(const x of P){const y=outs.get(x)[0],z=outs.get(y)?.[0];if(z!==x)return {ok:false,failure:'involution'};if(y===x)return {ok:false,failure:'fixed_point_free'};}
 return {ok:true,failure:null};
}
const results=[];
for(const q of CASES.cases){
 let actual='PASS',failure=null;
 if(q.model){const r=evaluate(models[q.model]);actual=r.ok?'PASS':'REJECT_MODEL';failure=r.failure;}
 else if(q.id==='Q10'){actual=(native.includes('(^150014 221100)')&&native.includes('(^150010 182001 ?F ?P ?P)')&&!/W-SSC-|L-SSC-|twistor|quaternion|projective|rho_tw/i.test(native))?'PASS':'FAIL';}
 else if(q.id==='Q11'){actual=(IA.fixed_point?.reached===true&&IA.fixed_point?.open_module_local_ia===0)?'PASS':'FAIL';}
 else if(q.id==='Q12'){actual=(H.confirmation_status==='PENDING_FRESH_SOURCE_NEUTRAL_DETERMINISTIC_CONTROLS'&&CASES.source_neutral===true)?'PASS':'FAIL';}
 check(actual===q.expected,q.id+' expected '+q.expected+' got '+actual);
 if(q.expected_failure)check(failure===q.expected_failure,q.id+' expected failure '+q.expected_failure+' got '+failure);
 results.push({id:q.id,actual,failure});
}
check(SSC.primitive_id===221100,'primitive id');
check(SSC.qualification_target==='CORE_DEFINABLE_SCHEMA_WITH_EXPLICIT_SCOPE','target');
check(IA.fixed_point?.profile_complete_for_declared_scope===true,'IA scope');
check(CASES.cases.length===12,'case count');
console.log(JSON.stringify({schema:'isograph.exp064-fixed-point-free-involution-deterministic-qualification.v0.1',pass:errors.length===0,errors,results,summary:{passed:results.filter(r=>r.actual==='PASS').length,rejected_as_expected:results.filter(r=>r.actual==='REJECT_MODEL').length,total:results.length},candidate:'FIXED_POINT_FREE_INVOLUTION_INTERFACE_0_1',primitive_id:221100},null,2));
if(errors.length)process.exitCode=1;
