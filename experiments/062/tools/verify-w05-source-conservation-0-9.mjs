import fs from 'node:fs';
import crypto from 'node:crypto';
const file={
  pssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_8.json',
  ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_9.json',
  pd:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_7.json',
  demand:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_8.json',
  manifest:'research/woit-lisi-isomorph/woit/WOIT_NATIVE_COMPILATION_MANIFEST_REGROUNDED_0_24.json',
  audit1:'experiments/062/W05_MULTI_BODY_SOURCE_CONSERVATION_DEFECT_AUDIT_0_1.json',
  audit2:'experiments/062/W05_SECTIONS5_TO7_SOURCE_TABLE_AND_OPERATOR_AUDIT_0_1.json',
  gate:'experiments/062/W_CURRENT_STAGE_GATE_0_34.json'
};
const raw=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(raw(p));
const blob=p=>{const b=Buffer.from(raw(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const copy=o=>JSON.parse(JSON.stringify(o));
const orig=json(file.pssc),ssc=json(file.ssc),prior=json(file.pd),demand=json(file.demand),manifest=json(file.manifest),gate=json(file.gate);
const id=n=>'W-SSC-'+String(n).padStart(3,'0');
const get=(x,n)=>x.items.find(y=>y.id===id(n));
const dem=(x,n)=>x.items.find(y=>y.track==='W'&&y.census_id===id(n));
const changed=Array.from({length:12},(_,i)=>id(i+98));
const patterns={
  98:['x0+x1i+x2j+x3k','q=z1+z2j','j(z1+z2j)','-bar(z2)+bar(z1)j'],
  99:['rho([z1,z2,z3,z4])=','rho_tw([z1,z2,z3,z4])=','RP3','q=(q2)^-1 q1','pi:[z1,z2,z3,z4]','z1+z2j,z3+z4j','fibers'],
  100:['only two inequivalent','SL(2,C)','not commuting','SL(2,H)=Spin(5,1)','dual PT*','chiralities'],
  101:['x1i+x2j+x3k','projection to the second factor','identity on R4','rho_tw on CP1','x1 sigma1+x2 sigma2+x3 sigma3','+1 eigenspace','2d copies'],
  102:['4k','IJ=K','aI+bJ+cK','one direction','two directions','three directions'],
  103:['H^n(M,C)','F^p','conjugate(F^(n-p+1))','O_(P1_tw)(w/2)','rank two for odd','rank one for even','lambda=1/z','E1=V tensor_R','U(1)'],
  104:['M=H^1(X,GL(n,C))','set, not a vector space','higher-degree','lambda=1','lambda=0'],
  105:['|x|_p=p^(-a)','ij=-ji=k','i^2=a','j^2=b','H=(-1,-1/R)','M(2,C)','(p,u/Qp)','+1 exactly','-1 otherwise'],
  106:['-a x^2-b y^2+ab z^2=0','(a,b)_F=+1','-1','-p x^2-u y^2+up z^2=0','no Qp points','without fixed points','Gal(K/Qp)=Z/2Z','without fixed points'],
  107:['A~B','[A][B]=[A tensor B]','Br(R)=Z/2Z','Br(Qp)=Q/Z','H^1(Gal(Fbar/F),PGL2(Fbar))','I^2/I^3','SBr(R)=Z/8Z','even r+s=2n','odd r+s=2n+1'],
  108:['[Q,P]=i1','W_(a,b)=(F directsum F*) tensor V','product_over_all_primes (a,b)_p=1','adelic','Howe-duality','Sp(U) x O(V)'],
  109:['[W05-T01]','[W05-T02]','[W05-T03]','[W05-T04]','[W05-T05]','[W05-T06]','[W05-T07]','[W05-T08]','[W05-T09]','[W05-T10]','[W05-T11]','analogy','does not claim expertise']
};
function verify(s=ssc,d=demand){
 const errors=[],ck=(b,m)=>{if(!b)errors.push(m);};
 ck(s.items.length===151&&new Set(s.items.map(x=>x.id)).size===151,'SSC completeness 151');
 ck(s.source_count===9,'no source-expansion count');
 const cs=s.items.filter((x,i)=>JSON.stringify(x)!==JSON.stringify(orig.items[i])).map(x=>x.id);
 ck(JSON.stringify(cs)===JSON.stringify(changed),'exact 12 semantic census deltas '+JSON.stringify(cs));
 ck(JSON.stringify(get(s,97))===JSON.stringify(get(orig,97)),'W097 correction must remain byte-equal');
 ck(JSON.stringify(get(s,110))===JSON.stringify(get(orig,110)),'W110 speculative scope must remain byte-equal');
 for(let n=98;n<=109;n++){
   const w=get(s,n),old=get(orig,n),v=dem(d,n);
   ck(w?.obligation?.startsWith(old?.obligation+' '),'source original-body prefix preserved '+n);
   ck(v?.body===w?.obligation,'demand/source exact body '+n);
   for(const text of patterns[n])ck(w?.obligation?.includes(text),'W'+n+' source semantic missing '+text);
 }
 ck(d.counts?.W===85&&d.counts?.L===151&&d.counts?.total===236&&d.items.length===236,'correct 85 W+151 L demand');
 ck(d.pinned_inputs?.W?.ssc_blob===blob(file.ssc),'pinned W SSC hash');
 ck(d.pinned_inputs?.W?.unresolved===85&&d.pinned_inputs?.W?.closed===66,'W109 reopening count');
 ck(JSON.stringify(d.items.filter(x=>x.track==='L'))===JSON.stringify(prior.items.filter(x=>x.track==='L')),'L bodies exact');
 const oldW=prior.items.filter(x=>x.track==='W'),nW=d.items.filter(x=>x.track==='W');
 ck(nW.length===85,'85 W demand members');
 for(const w of oldW)if(!changed.includes(w.census_id))ck(JSON.stringify(w)===JSON.stringify(nW.find(x=>x.census_id===w.census_id)),'old W unchanged '+w.census_id);
 ck(!dem(prior,109)&&dem(d,109)?.state==='OPEN_ANALOGY_GUARD_UNEXPANDED','W109 genuinely reopened');
 ck(manifest.items.find(x=>x.census_id===id(109))?.closure_mode==='CLOSED_PRIMITIVE','historical W109 predecessor classified closed');
 const rows=get(s,109)?.source_comparison_rows,dr=dem(d,109)?.source_comparison_rows;
 ck(rows?.length===11&&dr?.length===11&&JSON.stringify(rows)===JSON.stringify(dr),'W109 exact row ledger');
 for(let i=0;i<11;i++){
   const row=rows?.[i];
   ck(row?.ordinal===i+1&&row?.row_id==='W05-T'+String(i+1).padStart(2,'0'),'W109 table row order '+i);
   ck(!!row?.finite_prime&&!!row?.infinite_prime&&row?.source_modality==='EXPLICIT_AUTHOR_COMPARISON_TABLE_ANALOGY_ONLY'&&row?.semantic_isomorphism_asserted===false,'W109 modality '+i);
 }
 ck(s.correction_basis?.audits?.[0]?.git_blob_sha===blob(file.audit1)&&s.correction_basis?.audits?.[1]?.git_blob_sha===blob(file.audit2),'source audit pins');
 ck(d.correction_basis?.source_semantic_census?.git_blob_sha===blob(file.ssc),'demand correct SSC pin');
 ck(gate.current_lawful_state?.G0_reopened===true&&gate.current_lawful_state?.G1_rebuild_authorized===false,'G0-only gate');
 ck(s.closure_claims?.primitive_closure===false&&s.closure_claims?.ia_fixed_point===false,'no primitive or IA closure claim');
 ck(!JSON.stringify(s.items.filter(x=>changed.includes(x.id))).includes('L-SSC-'),'no L source leakage');
 return errors;
}
const errors=verify();
const changes=[
 ['delete_one_source_claim',(s,d)=>{get(s,98).obligation=get(s,98).obligation.replace('j(z1+z2j)','j(x)');dem(d,98).body=get(s,98).obligation;}],
 ['drop_cp3_real_structure',(s,d)=>{get(s,99).obligation=get(s,99).obligation.replace('rho_tw([z1,z2,z3,z4])=','rho_tw(name)=');dem(d,99).body=get(s,99).obligation;}],
 ['lose_quaternion_quotient_order',(s,d)=>{get(s,99).obligation=get(s,99).obligation.replace('q=(q2)^-1 q1','q=q1*(q2)^-1');dem(d,99).body=get(s,99).obligation;}],
 ['remove_noncommuting_role',(s,d)=>{get(s,100).obligation=get(s,100).obligation.replaceAll('not commuting','commuting');dem(d,100).body=get(s,100).obligation;}],
 ['remove_Pauli_eigenspace',(s,d)=>{get(s,101).obligation=get(s,101).obligation.replace('+1 eigenspace','eigenspace');dem(d,101).body=get(s,101).obligation;}],
 ['remove_hyperkahler_relation',(s,d)=>{get(s,102).obligation=get(s,102).obligation.replace('IJ=K','IJ=L');dem(d,102).body=get(s,102).obligation;}],
 ['drop_Hodge_conjugate_complement',(s,d)=>{get(s,103).obligation=get(s,103).obligation.replace('conjugate(F^(n-p+1))','F^(n-p+1)');dem(d,103).body=get(s,103).obligation;}],
 ['promote_nonabelian_H1_to_vector',(s,d)=>{get(s,104).obligation=get(s,104).obligation.replace('set, not a vector space','vector space');dem(d,104).body=get(s,104).obligation;}],
 ['drop_Hilbert_negative_case',(s,d)=>{get(s,105).obligation=get(s,105).obligation.replace('-1 otherwise','0 otherwise');dem(d,105).body=get(s,105).obligation;}],
 ['erase_conic_negation',(s,d)=>{get(s,106).obligation=get(s,106).obligation.replace('no Qp points','Qp points');dem(d,106).body=get(s,106).obligation;}],
 ['drop_Brauer_class_product',(s,d)=>{get(s,107).obligation=get(s,107).obligation.replace('[A][B]=[A tensor B]','A+B');dem(d,107).body=get(s,107).obligation;}],
 ['drop_Heisenberg_commutator',(s,d)=>{get(s,108).obligation=get(s,108).obligation.replace('[Q,P]=i1','[Q,P]=0');dem(d,108).body=get(s,108).obligation;}],
 ['collapse_comparison_table_row',(s,d)=>{get(s,109).source_comparison_rows.splice(4,1);dem(d,109).source_comparison_rows.splice(4,1);}],
 ['change_analogy_to_semantic_isomorphism',(s,d)=>{get(s,109).source_comparison_rows[0].semantic_isomorphism_asserted=true;dem(d,109).source_comparison_rows[0].semantic_isomorphism_asserted=true;}],
 ['remove_W109_demand',(s,d)=>{d.items=d.items.filter(x=>x.census_id!==id(109));}],
 ['change_L_demand',(s,d)=>{d.items.find(x=>x.track==='L').body='modified by W';}],
];
for(const [name,mutate] of changes){const s=copy(ssc),d=copy(demand);mutate(s,d);if(verify(s,d).length===0)errors.push('mutation escaped '+name);}
const report={schema:'isograph.exp062-verify-w05-source-conservation-0-9.v0.1',pass:errors.length===0,errors,source_census:151,source_W05_modified_items:changed,W_demand:85,L_demand:151,W109_rows:11,adversarial_mutations_rejected:16,stage:'G0',G1_authorized:false,external_semantic_verification_claimed:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
