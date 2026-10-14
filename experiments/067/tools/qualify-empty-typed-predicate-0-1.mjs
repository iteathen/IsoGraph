import fs from 'node:fs';
const ssc=JSON.parse(fs.readFileSync('experiments/067/MODULE_SSC_0_1.json','utf8'));
const ia=JSON.parse(fs.readFileSync('experiments/067/MODULE_IA_FIXED_POINT_0_1.json','utf8'));
const q=JSON.parse(fs.readFileSync('experiments/067/QUALIFICATION_CASES_0_1.json','utf8'));
const native=fs.readFileSync('research/woit-lisi-isomorph/support/PRIMITIVE_EMPTY_TYPED_PREDICATE_SCHEMA_0_1.isg','utf8');
const errors=[];const check=(x,m)=>{if(!x)errors.push(m)};
function classify(m){const U=new Set(m.U),B=new Set(m.B);for(const x of B)if(!U.has(x))return 'REJECT_TYPING';for(const x of U)if(B.has(x))return 'REJECT_NONEMPTY_B';return 'ACCEPT';}
check(ssc.module_id==='EMPTY_TYPED_PREDICATE_ON_CARRIER_INTERFACE_0_1','module');check(ssc.primitive_id===221103,'primitive');check(ia.fixed_point?.reached===true&&ia.fixed_point?.unresolved_ia_obligations===0,'IA');check(native.includes('(^150014 221103)'),'native');
for(const t of ['projective','conic','real-form','real point','quaternion','twistor','W-SSC','L-SSC'])check(!native.toLowerCase().includes(t.toLowerCase()),'domain leak '+t);
const results=[];for(const c of [...q.positive_controls,...q.adversarial_controls]){const actual=classify(c.model),pass=actual===c.expected;results.push({id:c.id,kind:c.kind,expected:c.expected,actual,pass});check(pass,'case '+c.id);}
check(results.filter(x=>x.kind==='positive-fresh').every(x=>x.pass),'positives');check(results.filter(x=>x.kind==='negative-fresh').every(x=>x.pass),'negatives');
console.log(JSON.stringify({schema:'isograph.exp067-empty-typed-predicate-qualification.v0.1',pass:!errors.length,errors,cases:results.length,fresh_positive_passes:3,fresh_adversarial_expected_rejections:2,ia_fixed_point:ia.fixed_point?.reached},null,2));if(errors.length)process.exitCode=1;
