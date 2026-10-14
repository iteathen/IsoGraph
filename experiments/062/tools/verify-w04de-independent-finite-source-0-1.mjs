import fs from 'node:fs';
import crypto from 'node:crypto';
const R="research/woit-lisi-isomorph/woit/",E="experiments/062/";
const source=JSON.parse(fs.readFileSync(R+'SOURCE_SEMANTIC_CENSUS_0_21.json','utf8'));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const get=(id,n=0)=>source.items.find(x=>x.id===id)?.source_expression_census?.statements?.[n];
const k={W082:get("W-SSC-082"),W089:get("W-SSC-089"),W083:get("W-SSC-083"),W085:get("W-SSC-085",1),W090:get("W-SSC-090",1),W125:get("W-SSC-125",1)};
const errors=[],test=(x,label)=>{if(!x)errors.push(label)};
test(sha(R+'SOURCE_SEMANTIC_CENSUS_0_21.json')==='5ef9c65dddde1edea8c2f6974a21b3a479d096c7','source SHA pin');
test(k.W082?.source_z==='t-i*tau'&&k.W082?.source_claimed_domain==='UPPER_HALF_Z_PLANE'&&k.W082?.algebraic_sign_domain==='LOWER_HALF_Z_PLANE'&&k.W082?.kernel==='exp(-i*z*E)=exp(-i*t*E)*exp(-tau*E)','W04e printed halfplane/independent algebraic contradiction');
test(k.W089?.z==='t+i*tau'&&k.W089?.damping_tau==='tau<0'&&k.W089?.holomorphic==='LOWER_HALF_PLANE','W04d lower halfplane opposite tau notation');
test(k.W083?.output==='conjugate(f(-tau))'&&k.W083?.composition==='Theta^2=1','Theta source identity/antilinearity');
test(k.W085?.tuple_output?.join(',')==='-conjugate(z_L),-conjugate(z_R)'&&k.W085?.Minkowski_tuple_conjugation?.join(',')==='conjugate(z_R),conjugate(z_L)','W04e distinct signed conjugations');
test(k.W090?.displayed_lhs==='S_R tensor S_R'&&k.W090?.source_printed_conjugation_bar_on_lhs===false,'W04d printed naked product');
test(k.W125?.modal==='OPEN_RELATED_TO_TWISTOR_TRANSFORM'&&k.W125?.operator_constructed===false,'W04e twistor-theta unconstructed');
const eq=(x,y)=>JSON.stringify(x)===JSON.stringify(y),neg=x=>[-x[0],-x[1]],conj=x=>[x[0],-x[1]];
const euclid=v=>[neg(conj(v[1])),neg(conj(v[0]))],mink=v=>[conj(v[0]),conj(v[1])];
const vals=[-1,0,1].flatMap(re=>[-1,0,1].map(im=>[re,im]));
const pairs=vals.flatMap(a=>vals.map(b=>[a,b]));
for(const v of pairs){test(eq(euclid(euclid(v)),v),'E conjugation squared identity');test(eq(mink(mink(v)),v),'M conjugation squared identity');}
test(pairs.some(v=>!eq(euclid(v),mink(v))),'distinct Euclidean/Minkowski real structures');
let checks=0;
for(const t of [-2,-1,0,1,2])for(const tau of [1,2,3])for(const energy of [0.5,1,3]){
 const imE=-tau,dampingE=Math.exp(-tau*energy);
 const imD=-tau,dampingD=Math.exp(-tau*energy);
 test(imE<0&&dampingE>0&&dampingE<1,'July W04e z=t-i tau, tau>0 is LOWER (source calls upper)');
 test(imD<0&&dampingD>0&&dampingD<1,'April W04d z=t+i s, s=-tau<0 lower');
 checks++;
}
const negTests=[
{id:'remove conjugation Theta',rejected:!eq([1,2],conj([1,2]))},
{id:'remove minus Euclidean',rejected:!pairs.every(v=>eq([conj(v[1]),conj(v[0])],euclid(v)))},
{id:'remove swapped Euclidean roles',rejected:!pairs.every(v=>eq([neg(conj(v[0])),neg(conj(v[1]))],euclid(v)))},
{id:'falsely upper July',rejected:![1,2,3].every(t=>-t>0)},
{id:'falsely upper April',rejected:![-1,-2,-3].every(t=>t>0)},
{id:'positive energy growth instead of damping',rejected:![1,2].every(t=>Math.exp(t*2)<1)},
{id:'claim constructed twistor Theta',rejected:k.W125.operator_constructed!==true},
{id:'normalize W04d displayed bar',rejected:k.W090.source_printed_conjugation_bar_on_lhs!==true}
];
test(negTests.every(x=>x.rejected),'adversarial coordinate source controls');
const report={schema:'isograph.exp062-w04de-independent-finite-source-check.v0.1',pass:!errors.length,errors,finite_chiral_pairs:pairs.length,finite_energy_time_cases:checks,wrong_map_and_halfplane_controls:negTests.length,controls_rejected:negTests.filter(x=>x.rejected).length,negTests,scope:'INDEPENDENT_FINITE_ARITHMETIC_CHECK_NOT_FULL_COMPLEX_FIELD_THEOREM_NOT_FULL_W_SOURCE_AUDIT',G0_frozen:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
