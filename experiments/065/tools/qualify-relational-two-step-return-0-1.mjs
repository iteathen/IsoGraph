import fs from 'node:fs';
const ssc=JSON.parse(fs.readFileSync('experiments/065/MODULE_SSC_0_1.json','utf8'));
const ia=JSON.parse(fs.readFileSync('experiments/065/MODULE_IA_FIXED_POINT_0_1.json','utf8'));
const q=JSON.parse(fs.readFileSync('experiments/065/QUALIFICATION_CASES_0_1.json','utf8'));
const native=fs.readFileSync('research/woit-lisi-isomorph/support/PRIMITIVE_RELATIONAL_TWO_STEP_RETURN_SCHEMA_0_1.isg','utf8');
const errors=[];const check=(x,m)=>{if(!x)errors.push(m)};
function classify(model){const P=new Set(model.P),edges=model.R;for(const [a,b] of edges)if(!P.has(a)||!P.has(b))return 'REJECT_TYPING';for(const [a,b] of edges)if(a===b)return 'REJECT_SELF_LOOP';for(const [a,b] of edges)for(const [c,d] of edges)if(b===c&&d!==a)return 'REJECT_NONRETURNING_TWO_STEP';return 'ACCEPT';}
check(ssc.module_id==='RELATIONAL_FIXED_POINT_FREE_TWO_STEP_RETURN_INTERFACE_0_1','module id');check(ssc.primitive_id===221101,'primitive id');check(ia.fixed_point?.reached===true&&ia.fixed_point?.unresolved_ia_obligations===0,'IA');check(native.includes('(^150014 221101)'),'native primitive');
for(const token of ['projective','quaternion','twistor','W-SSC','L-SSC'])check(!native.toLowerCase().includes(token.toLowerCase()),'native domain leak '+token);
const results=[];for(const c of [...q.adaptive_controls,...q.fresh_positive_controls,...q.fresh_adversarial_controls]){const actual=classify(c.model),pass=actual===c.expected;results.push({id:c.id,kind:c.kind,expected:c.expected,actual,pass});check(pass,'case '+c.id+' expected '+c.expected+' got '+actual);}
const fp=results.filter(x=>x.kind==='positive-fresh'),fn=results.filter(x=>x.kind==='negative-fresh');check(fp.length===4&&fp.every(x=>x.pass),'fresh positives');check(fn.length===5&&fn.every(x=>x.pass),'fresh negatives');check(results.find(x=>x.id==='P04')?.actual==='ACCEPT','multivalued nonclaim');
console.log(JSON.stringify({schema:'isograph.exp065-relational-two-step-return-qualification.v0.1',pass:!errors.length,errors,cases:results.length,fresh_positive_passes:fp.filter(x=>x.pass).length,fresh_adversarial_expected_rejections:fn.filter(x=>x.pass).length,adaptive_regressions:results.filter(x=>x.kind==='positive-adaptive').length,ia_fixed_point:ia.fixed_point?.reached,multivalued_terminal_fan_accepted:results.find(x=>x.id==='P04')?.actual==='ACCEPT'},null,2));if(errors.length)process.exitCode=1;
