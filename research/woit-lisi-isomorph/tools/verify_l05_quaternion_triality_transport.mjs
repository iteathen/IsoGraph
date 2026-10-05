const basis = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
];

function mul(a,b) {
  const [a0,a1,a2,a3] = a;
  const [b0,b1,b2,b3] = b;
  return [
    a0*b0-a1*b1-a2*b2-a3*b3,
    a0*b1+a1*b0+a2*b3-a3*b2,
    a0*b2-a1*b3+a2*b0+a3*b1,
    a0*b3+a1*b2-a2*b1+a3*b0,
  ];
}

const kappa = a => [a[0],-a[1],-a[2],-a[3]];
const real = a => a[0];

// L05 eq. (6) in the quaternion coefficient presentation:
// T(v,psi,chi) = (tilde(chi), v psi) = Re(chi v psi).
const T = (v,psi,chi) => real(mul(mul(chi,v),psi));

const failures = {
  cyclic: [],
  conjugation_reverses_chiral_order: [],
  conjugation_plus_chiral_swap_invariance: [],
};

for (let v=0; v<4; v++) {
  for (let m=0; m<4; m++) {
    for (let p=0; p<4; p++) {
      const V=basis[v], M=basis[m], P=basis[p];
      const t=T(V,M,P);

      if (t !== T(M,P,V) || t !== T(P,V,M)) {
        failures.cyclic.push({v,m,p,t,cycle1:T(M,P,V),cycle2:T(P,V,M)});
      }

      const conjugated=T(kappa(V),kappa(M),kappa(P));
      const reversed=T(V,P,M);
      if (conjugated !== reversed) {
        failures.conjugation_reverses_chiral_order.push({v,m,p,conjugated,reversed});
      }

      const conjugatedAndSwapped=T(kappa(V),kappa(P),kappa(M));
      if (conjugatedAndSwapped !== t) {
        failures.conjugation_plus_chiral_swap_invariance.push({v,m,p,t,conjugatedAndSwapped});
      }
    }
  }
}

const result = {
  schema: "woit-lisi.u1-triality-finite-transport-falsifier.v0.1",
  carrier: "standard quaternion basis {1,i,j,k}",
  triples_tested: 64,
  formulas: {
    source_triality: "T(v,psi,chi)=Re(chi*v*psi)",
    cyclicity: "T(v,psi,chi)=T(psi,chi,v)=T(chi,v,psi)",
    conjugation_law: "T(kappa(v),kappa(psi),kappa(chi))=T(v,chi,psi)",
    conjugation_plus_chiral_swap: "T(kappa(v),kappa(chi),kappa(psi))=T(v,psi,chi)",
  },
  failures: Object.fromEntries(Object.entries(failures).map(([k,v]) => [k,v.length])),
  pass: Object.values(failures).every(v => v.length === 0),
};

process.stdout.write(JSON.stringify(result,null,2)+"\n");
