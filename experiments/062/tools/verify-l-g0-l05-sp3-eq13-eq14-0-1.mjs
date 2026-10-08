import fs from 'node:fs';
const base='research/woit-lisi-isomorph/lisi/';
const source=JSON.parse(fs.readFileSync(base+'LISI_L05_SP3_EQ13_EQ14_SOURCE_G0_0_1.json','utf8'));
const old=JSON.parse(fs.readFileSync(base+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json','utf8'));
const clone=x=>JSON.parse(JSON.stringify(x)),j=x=>JSON.stringify(x);
const expected=[
 ['[T^M_A,T^M_B]','T^M_C*(2*M_[AB]^C)'],
 ['[T^P_A,T^P_B]','T^P_C*(2*M_[AB]^C)'],
 ['[T^V_A,T^V_B]','T^V_C*(2*M_[AB]^C)'],
 ['[T^M_A,gamma_b]','gamma_c*(-M_{bA}^c)'],
 ['[T^P_A,gamma_b]','gamma_c*(M_{Ab}^c)'],
 ['[T^V_A,Qminus_b]','Qminus_c*(-M_{bA}^c)'],
 ['[T^M_A,Qminus_b]','Qminus_c*(M_{Ab}^c)'],
 ['[T^P_A,Qplus_b]','Qplus_c*(-M_{bA}^c)'],
 ['[T^V_A,Qplus_b]','Qplus_c*(M_{Ab}^c)'],
 ['[gamma_a,Qminus_b]','Qplus_c*(-M_{tilde(b)tilde(a)}^c/sqrt(2))'],
 ['[gamma_a,Qplus_b]','Qminus_c*(M_{tilde(a)tilde(b)}^c/sqrt(2))'],
 ['[Qminus_a,Qplus_b]','gamma_c*(-M_{tilde(b)tilde(a)}^c/sqrt(2))'],
 ['[gamma_a,gamma_b]','T^M_C*(M_{tilde(b)a}^C-M_{tilde(a)b}^C)/2+T^P_C*(M_{btilde(a)}^C-M_{atilde(b)}^C)/2'],
 ['[Qminus_a,Qminus_b]','T^V_C*(M_{tilde(b)a}^C-M_{tilde(a)b}^C)/2+T^M_C*(M_{btilde(a)}^C-M_{atilde(b)}^C)/2'],
 ['[Qplus_a,Qplus_b]','T^P_C*(M_{tilde(b)a}^C-M_{tilde(a)b}^C)/2+T^V_C*(M_{btilde(a)}^C-M_{atilde(b)}^C)/2']
];
const HSource=[['e0','e1','e2','e3'],['e1','-e0','e3','-e2'],['e2','-e3','-e0','e1'],['e3','e2','-e1','-e0']];
const basisSource=[
 ['M^A*e_A','-v^a*tilde(e_a)/sqrt(2)','psi^a*e_a/sqrt(2)'],
 ['v^a*e_a/sqrt(2)','P^A*e_A','-chi^a*tilde(e_a)/sqrt(2)'],
 ['-psi^a*tilde(e_a)/sqrt(2)','chi^a*e_a/sqrt(2)','V^A*e_A']
];
const reflectionSource={input:'A(M,P,V,v,psi,chi)',output:'A(M,V,P,tilde(psi),tilde(v),-tilde(chi))',gR:[[-1,0,0],[0,0,1],[0,1,0]],asserted:'gR*A*gR_inverse'};
function audit(P=source,L=old){
 const fail=[],ck=(yes,s)=>{if(!yes)fail.push(s)};
 ck(P.track==='L'&&P.stage==='G0'&&P.authority===false&&P.source_complete===false&&P.G1_authorized===false,'L G0 only');
 ck(P.source?.source_id==='L05'&&P.source?.section==='4.2'&&P.source?.printed_page===15&&P.source?.revision==='2026-08-29 version of record','source provenance');
 ck(P.scope?.algebra==='H'&&P.scope?.real_form==='ordinary quaternion'&&P.scope?.matrix_dim===3,'scope');
 ck(P.indices?.uppercase==='A,B,C range 1..3, imaginary quaternion basis'&&P.indices?.lowercase==='a,b,c range 0..3, quaternion basis'&&P.indices?.summation==='repeated c and C summed, no reordering of noncommutative operands','index/binder roles');
 ck(P.brackets?.length===15&&P.brackets.every((x,i)=>x.id==='L4-SP3-EQ13-'+String(i+1).padStart(2,'0')&&j([x.lhs,x.rhs])===j(expected[i])&&x.modality==='SOURCE_ASSERTED_EXPLICIT_LIE_BRACKET'),'15 exact author rows');
 ck(j(P.matrix_basis?.entries)===j(basisSource)&&P.matrix_basis?.normalization==='orthogonal Killing-normalized 1/sqrt(2) offdiagonal, distinct from Eq12 unnormalized coordinates','Eq13 normalized 3x3');
 ck(j(P.eq14?.reflection)===j(reflectionSource)&&P.eq14?.matrix_is_involutive===true,'Eq14 source signed reflection');
 ck(P.eq14?.phase_completeness==='NOT_SPECIFIED_BY_ROOT_REFLECTION_OR_ROTATION'&&P.eq14?.automorphism_scope==='SOURCE_ASSERTION_NOT_INDEPENDENT_UNIVERSAL_THEOREM','negative source phase');
 ck(P.outstanding?.includes('§4.3 full f4 and split-octonionic cases')&&P.outstanding?.includes('§4.1 split-complex and full root/Cartan phase tables')&&P.outstanding?.includes('L01-L06 entire source assertion census')&&P.outstanding?.includes('L05 §2 Eq5 exact Gamma/M matrix-index equalities'),'do not launder missing source');
 ck(P.no_cross_track_import===true&&P.external_cold_review_passed===false&&P.source_formulas_not_mathematical_authority===true,'research/external review boundary');
 ck(j(L.basis_multiplication_tables?.find(t=>t.carrier==='H')?.entries)===j(HSource),'printed H multiplication independent source oracle');
 return fail;
}
const table=old.basis_multiplication_tables.find(t=>t.carrier==='H').entries;
const sqrtHalf=1/Math.sqrt(2),z=()=>[0,0,0,0],basisVector=i=>[0,1,2,3].map(q=>+(q===i)),sign=i=>i===0?1:-1;
function mul(x,y){
 const out=z();for(let a=0;a<4;a++)for(let b=0;b<4;b++){const s=table[a][b];if(!/^-?e[0-3]$/.test(s))throw Error('not source basis cell');out[Number(s.slice(-1))]+=x[a]*y[b]*(s[0]==='-'?-1:1)}return out;
}
const tilde=x=>x.map((v,i)=>i?-v:v),mc=(a,b,c)=>mul(basisVector(a),basisVector(b))[c];
function basis(name,i){
 const v=Array.from({length:9},z),put=(r,c,x,m=1)=>v[r*3+c]=x.map(q=>q*m),e=basisVector(i);
 if(name==='TM')put(0,0,e);if(name==='TP')put(1,1,e);if(name==='TV')put(2,2,e);
 if(name==='G'){put(0,1,tilde(e),-sqrtHalf);put(1,0,e,sqrtHalf)}
 if(name==='Qm'){put(0,2,e,sqrtHalf);put(2,0,tilde(e),-sqrtHalf)}
 if(name==='Qp'){put(1,2,tilde(e),-sqrtHalf);put(2,1,e,sqrtHalf)}
 return v;
}
function product(A,B){return Array.from({length:9},(_,n)=>{
 const r=Math.floor(n/3),c=n%3,x=z();
 for(let t=0;t<3;t++){const q=mul(A[r*3+t],B[t*3+c]);for(let k=0;k<4;k++)x[k]+=q[k]}
 return x;});}
function diff(A,B){const a=product(A,B),b=product(B,A);return a.map((q,i)=>q.map((v,j)=>v-b[i][j]))}
const rows=[
 ['TM','TM',(a,b,c)=>[['TM',mc(a,b,c)-mc(b,a,c)]],1,1],
 ['TP','TP',(a,b,c)=>[['TP',mc(a,b,c)-mc(b,a,c)]],1,1],
 ['TV','TV',(a,b,c)=>[['TV',mc(a,b,c)-mc(b,a,c)]],1,1],
 ['TM','G',(a,b,c)=>[['G',-mc(b,a,c)]],1,0],
 ['TP','G',(a,b,c)=>[['G',mc(a,b,c)]],1,0],
 ['TV','Qm',(a,b,c)=>[['Qm',-mc(b,a,c)]],1,0],
 ['TM','Qm',(a,b,c)=>[['Qm',mc(a,b,c)]],1,0],
 ['TP','Qp',(a,b,c)=>[['Qp',-mc(b,a,c)]],1,0],
 ['TV','Qp',(a,b,c)=>[['Qp',mc(a,b,c)]],1,0],
 ['G','Qm',(a,b,c)=>[['Qp',-sqrtHalf*sign(b)*sign(a)*mc(b,a,c)]],0,0],
 ['G','Qp',(a,b,c)=>[['Qm',sqrtHalf*sign(a)*sign(b)*mc(a,b,c)]],0,0],
 ['Qm','Qp',(a,b,c)=>[['G',-sqrtHalf*sign(b)*sign(a)*mc(b,a,c)]],0,0],
 ['G','G',(a,b,c)=>[['TM',(sign(b)*mc(b,a,c)-sign(a)*mc(a,b,c))/2],['TP',(sign(a)*mc(b,a,c)-sign(b)*mc(a,b,c))/2]],0,0],
 ['Qm','Qm',(a,b,c)=>[['TV',(sign(b)*mc(b,a,c)-sign(a)*mc(a,b,c))/2],['TM',(sign(a)*mc(b,a,c)-sign(b)*mc(a,b,c))/2]],0,0],
 ['Qp','Qp',(a,b,c)=>[['TP',(sign(b)*mc(b,a,c)-sign(a)*mc(a,b,c))/2],['TV',(sign(a)*mc(b,a,c)-sign(b)*mc(a,b,c))/2]],0,0]
];
function maxdiff(a,b){let max=0;for(let i=0;i<9;i++)for(let q=0;q<4;q++)max=Math.max(max,Math.abs(a[i][q]-b[i][q]));return max;}
function basisChecks(){
 let count=0,failed=[];
 for(let i=0;i<rows.length;i++){
 const [L,R,f,minA,minB]=rows[i];
 for(let a=minA;a<4;a++)for(let b=minB;b<4;b++){
 const lhs=diff(basis(L,a),basis(R,b)),rhs=Array.from({length:9},z);
 for(let c=0;c<4;c++)for(const [name,coef]of f(a,b,c)){
 const x=basis(name,c);for(let m=0;m<9;m++)for(let v=0;v<4;v++)rhs[m][v]+=coef*x[m][v];}
 const error=maxdiff(lhs,rhs);count++;if(error>1e-12)failed.push({row:i+1,a,b,error});
 }}
 const g=Array.from({length:9},z);g[0]=[-1,0,0,0];g[5]=basisVector(0);g[7]=basisVector(0);
 for(const t of ['TM','TP','TV','G','Qm','Qp'])for(let a=t[0]==='T'?1:0;a<4;a++){
 const lhs=product(product(g,basis(t,a)),g),rhs=Array.from({length:9},z);
 const target=t==='TP'?'TV':t==='TV'?'TP':t==='G'?'Qm':t==='Qm'?'G':t;
 const signOf=t==='G'||t==='Qm'?sign(a):t==='Qp'?-sign(a):1;
 const x=basis(target,a);for(let m=0;m<9;m++)for(let q=0;q<4;q++)rhs[m][q]=signOf*x[m][q];
 const error=maxdiff(lhs,rhs);count++;if(error>1e-12)failed.push({reflection:t,a,error});
 }
 return{count,failed};
}
const issues=audit(),finite=basisChecks();
const expectedCaseCount=3*3*3+6*3*4+6*4*4+9+12; // 216, all Eq13 index pairs and 21 Eq14 generators
if(finite.count!==expectedCaseCount||finite.failed.length)issues.push('finite matrix source reconstruction');
const mutations=[];
for(let i=0;i<15;i++)mutations.push(['Eq13 row '+(i+1),(p,l)=>{p.brackets[i].rhs+=' + WRONG'}]);
mutations.push(
 ['Eq14 negative tilde chi',(p,l)=>{p.eq14.reflection.output=p.eq14.reflection.output.replace('-tilde(chi)','tilde(chi)')}],
 ['Eq14 swap',(p,l)=>{p.eq14.reflection.gR[1][2]=0}],
 ['Killing basis normalization',(p,l)=>{p.matrix_basis.entries[0][1]='-v^a*tilde(e_a)'}],
 ['index binder',(p,l)=>{p.indices.uppercase='A,B,C range 0..3'}],
 ['source quaternion table',(p,l)=>{l.basis_multiplication_tables.find(t=>t.carrier==='H').entries[1][2]='-e3'}],
 ['G1 premature',(p,l)=>{p.G1_authorized=true}],
 ['phase invented',(p,l)=>{p.eq14.phase_completeness='COMPLETE'}],
 ['missing Eq5 erased',(p,l)=>{p.outstanding=p.outstanding.filter(x=>!x.includes('Eq5'))}],
 ['source mathematical authority invented',(p,l)=>{p.source_formulas_not_mathematical_authority=false}]
);
for(const [name,f]of mutations){const p=clone(source),l=clone(old);f(p,l);if(audit(p,l).length===0)issues.push('mutation escaped: '+name);}
const report={schema:'isograph.exp062-l-eq13-eq14-source-check.v0.1',pass:issues.length===0,issues,source_eq13_rows:15,finite_basis_cases:finite.count,finite_failures:finite.failed.length,adversarial_mutations_rejected:mutations.length,source_frozen:false,G1_authorized:false,external_review_passed:false};
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
