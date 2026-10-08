import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
const ps='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_19.json';
const pr='experiments/062/W02_G0_SOURCE_MATRIX_DETERMINANT_INDEPENDENT_REPLAY_0_1.json';
const s=read(ps),r=read(pr),src=s.items.find(x=>x.id==='W-SSC-128')?.source_expression_census?.statements||[];
ck(sha(ps)==='0df0ba471a7fe6b2c2abb0969ba09e630f36039c'&&sha(pr)==='40f40ff951feb5821dd1f0f3a5c3fc04ec97f54e','input source/replay git SHA');
const matrix=[['x0+x3','x1-i*x2'],['x1+i*x2','x0-x3']];
ck(JSON.stringify(src[0]?.matrix)===JSON.stringify(matrix),'literal ordered matrix W02 Eq1');
ck(src[1]?.operation==='DETERMINANT_EQUALS_MINUS_MINKOWSKI_LENGTH_SQUARED'&&src[1]?.source_printed_minkowski_length_squared==='-x0^2+x1^2+x2^2+x3^2','source determinant versus negative Minkowski norm');
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const det=M=>{const ad=mul(M[0][0],M[1][1]),bc=mul(M[0][1],M[1][0]);return [ad[0]-bc[0],ad[1]-bc[1]]};
const raw=(a,b,c,d)=>[[[a+d,0],[b,-c]],[[b,c],[a-d,0]]];
const mut={
upper_imaginary_sign:M=>{M[0][1][1]*=-1;return M},
lower_imaginary_sign:M=>{M[1][0][1]*=-1;return M},
lower_diagonal_equal_upper:M=>{M[1][1][0]=M[0][0][0];return M},
omit_x2_in_upper:M=>{M[0][1][1]=0;return M},
swap_two_diagonal_entries:M=>{const x=M[0][0];M[0][0]=M[1][1];M[1][1]=x;return M},
swap_x1_x2:(M,v)=>{const [a,b,c,d]=v;M[0][1]=[c,-b];M[1][0]=[c,b];return M}
};
const mutated={
upper_imaginary_sign:[['x0+x3','x1+i*x2'],['x1+i*x2','x0-x3']],
lower_imaginary_sign:[['x0+x3','x1-i*x2'],['x1-i*x2','x0-x3']],
lower_diagonal_equal_upper:[['x0+x3','x1-i*x2'],['x1+i*x2','x0+x3']],
omit_x2_in_upper:[['x0+x3','x1'],['x1+i*x2','x0-x3']],
swap_two_diagonal_entries:[['x0-x3','x1-i*x2'],['x1+i*x2','x0+x3']],
swap_x1_x2:[['x0+x3','x2-i*x1'],['x2+i*x1','x0-x3']]
};
const Z=[-2,-1,0,1,2],V=Z.flatMap(a=>Z.flatMap(b=>Z.flatMap(c=>Z.map(d=>[a,b,c,d]))));
const norm=v=>-v[0]*v[0]+v[1]*v[1]+v[2]*v[2]+v[3]*v[3];
const satisfies=f=>V.every(v=>{const m=f(raw(...v),v),d=det(m);return d[0]===-norm(v)&&d[1]===0});
const results={cases:V.length,source_expression_correct:satisfies(M=>M),mutations:Object.entries(mut).map(([name,f])=>({name,source_formula_literal_equal:JSON.stringify(mutated[name])===JSON.stringify(matrix),same_negative_minkowski_det:satisfies(f)}))};
ck(JSON.stringify(results)===JSON.stringify(r.verification),'independent arithmetic/replay equality');
ck(results.cases===625&&results.source_expression_correct===true,'625 correct determinant cases');
ck(results.mutations.every(x=>x.source_formula_literal_equal===false),'six literal W02 source matrix mutants all rejected');
ck(results.mutations.filter(x=>!x.same_negative_minkowski_det).length===4,'exactly four determinant-disrupting mutations');
ck(results.mutations.filter(x=>x.same_negative_minkowski_det).map(x=>x.name).join(',')==='swap_two_diagonal_entries,swap_x1_x2','two determinant-preserving but SOURCE-UNFAITHFUL mutants retained');
console.log(JSON.stringify({schema:'isograph.exp062-w02-source-det-independent-verifier.v0.1',pass:errors.length===0,errors,source_equation:'W02 §I Eq1',input_revision:'arXiv:2311.00608v2',integer_samples:V.length,determinant_disruptions:4,determinant_preserving_but_literal_invalid:2,source_literal_required:true,does_not_qualify_G0:true},null,2));
if(errors.length)process.exitCode=1;
