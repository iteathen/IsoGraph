const A=[
  ["M","-kv","psi"],
  ["v","P","-kchi"],
  ["-kpsi","chi","V"],
];

// Source g_t = [[0,0,1],[1,0,0],[0,1,0]]
const g=[
  [0,0,1],
  [1,0,0],
  [0,1,0],
];
const gi=[
  [0,1,0],
  [0,0,1],
  [1,0,0],
];

function mm(X,Y){
  return X.map((row,i)=>Y[0].map((_,j)=>{
    const terms=[];
    for(let k=0;k<Y.length;k++) if(X[i][k]!==0 && Y[k][j]!==0) {
      const a=X[i][k],b=Y[k][j];
      if(a===1) terms.push(b);
      else if(b===1) terms.push(a);
      else terms.push(a+"*"+b);
    }
    return terms.length===0?0:(terms.length===1?terms[0]:terms.join("+"));
  }));
}

const gp=mm(mm(g,A),gi);
const expectedTextual=[
  ["P","-kchi","v"],
  ["chi","V","-kpsi"],
  ["-kv","psi","M"],
]; // basis direction gamma->Qminus->Qplus, TM->TV->TP

const expectedInverse=[
  ["V","-kpsi","chi"],
  ["psi","M","-kv"],
  ["-kchi","v","P"],
];

const same=(X,Y)=>JSON.stringify(X)===JSON.stringify(Y);
const result={
  schema:"woit-lisi.l134-inner-triality-matrix-orientation.v0.1",
  source_matrix_layout:A,
  source_gt:g,
  computed_gAg_inverse:gp,
  source_textual_cycle_matrix:expectedTextual,
  inverse_cycle_matrix:expectedInverse,
  matches_textual_cycle:same(gp,expectedTextual),
  matches_inverse_cycle:same(gp,expectedInverse),
  order3_matrix:true,
  conclusion:same(gp,expectedInverse)&&!same(gp,expectedTextual)
    ?"PRINTED_G_T_REALIZES_INVERSE_OF_STATED_BASIS_CYCLE"
    :"UNRESOLVED"
};
console.log(JSON.stringify(result,null,2));
if(result.conclusion!=="PRINTED_G_T_REALIZES_INVERSE_OF_STATED_BASIS_CYCLE")process.exitCode=1;
