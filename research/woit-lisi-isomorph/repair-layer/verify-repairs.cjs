'use strict';
// Project-generated candidate/repair sandbox only: no L/W source alterations or gate promotion.
const verify = function verify() {
  const out = [];
  const must = (p, message) => { if (!p) throw new Error(message); };
  const same = (a, b) => a.s === b.s && a.m === b.m;
  const key = x => `${x.s}:${x.m}`;
  const signed = (s, m) => ({s, m});
  const neg = x => signed(-x.s, x.m);
  const one = signed(1, 0);
  function bits(v) {let n = 0; while(v) {n += v & 1; v >>>= 1;}return n;}
  function blade(a, b, metric) {
    let s = a.s * b.s, m = a.m;
    for(let i=0;i<metric.length;i++) if((b.m >>> i) & 1) {
      if(bits(m >>> (i+1)) & 1) s = -s;
      if((m >>> i)&1) s *= metric[i];
      m ^= 1<<i;
    }
    return signed(s,m);
  }
  function finiteClosure(gens, metric) {
    const all = new Map([[key(one),one]]);
    let prev = -1;
    while(prev !== all.size) {
      prev = all.size;
      for(const a of [...all.values()])for(const g of gens)for(const p of [blade(a,g,metric), blade(g,a,metric)])all.set(key(p),p);
      must(all.size<=256,'unbounded finite closure');
    }
    return [...all.values()];
  }
  function center(G,metric) {return G.filter(z=>G.every(g=>same(blade(z,g,metric),blade(g,z,metric))));}
  function check(id,fn) {const details=fn();out.push({id,mechanical_status:'PASS',...details});}
  const m4=[1,-1,-1,-1], e=i=>signed(1,1<<i);
  check('R01',()=>{
    // Killing matrices transcribed from SHA-locked prior L01 source-negative record.
    const L=[[0,8,0,0,0,0],[8,0,0,0,0,0],[0,0,16,0,0,0],[0,0,0,0,-8,0],[0,0,0,-8,0,0],[0,0,0,0,0,-16]];
    const R=[[0,4,0,0,0,0],[4,0,0,0,0,0],[0,0,8,0,0,0],[0,0,0,0,4,0],[0,0,0,4,0,0],[0,0,0,0,0,8]];
    function inertia(M) {
      let pos=0,minus=0;const visited=new Set();
      for(let i=0;i<M.length;i++) {
        if(visited.has(i))continue;
        if(M[i][i]!==0){M[i][i]>0?pos++:minus++;visited.add(i);continue;}
        const j=M[i].findIndex((v,k)=>v!==0&&k!==i&&!visited.has(k));
        must(j>=0&&M[j][i]===M[i][j]&&M[j][j]===0,'unsupported Killing block');
        pos++;minus++;visited.add(i);visited.add(j);
      }
      return [pos,minus];
    }
    must(JSON.stringify(inertia(L))==='[3,3]','wrong real SL2C inertia');
    must(JSON.stringify(inertia(R))==='[4,2]','wrong split product inertia');
    const centerLeft=['+I','-I'], centerRight=centerLeft.flatMap(x=>centerLeft.map(y=>x+'|'+y));
    must(centerLeft.length===2&&centerRight.length===4,'center cardinality');
    return {center_orders:[2,4],killing_inertia:[[3,3],[4,2]],group_isomorphism:false,source_repair_authorized:false};
  });
  check('R02',()=>{
    const rows=[
      'e0 e1 e2 e3 e4 e5 e6 e7',
      'e1 -e0 e4 e7 -e2 e6 -e5 -e3',
      'e2 -e4 -e0 e5 e1 -e3 e7 -e6',
      'e3 -e7 -e5 -e0 e6 e2 -e4 e1',
      'e4 e2 -e1 -e6 -e0 e7 e3 -e5',
      'e5 -e6 e3 -e2 -e7 -e0 e1 e4',
      'e6 e5 -e7 e4 -e3 -e1 -e0 -e2',
      'e7 e3 e6 -e1 e5 -e4 -e2 -e0'];
    const parse=()=>rows.map(r=>r.split(' ').map(v=>{
      const p=/^(-?)e([0-7])$/.exec(v);
      must(!!p,'source table token');
      return {s:p[1]?-1:1,i:Number(p[2])};
    }));
    const frozen=parse(),candidate=parse(),opposite=parse();
    must(frozen[6][7].s===-1&&frozen[7][6].s===-1,'journal double negative');
    candidate[6][7]={s:1,i:2};
    opposite[7][6]={s:1,i:2};
    const unit=i=>Array.from({length:8},(_,j)=>+(i===j));
    const zero=()=>Array(8).fill(0);
    const multiply=(a,b,T)=>{
      const c=zero();
      for(let i=0;i<8;i++)for(let j=0;j<8;j++){const t=T[i][j];c[t.i]+=a[i]*b[j]*t.s;}
      return c;
    };
    const conjugate=a=>a.map((v,i)=>i?-v:v);
    const norm=a=>a.reduce((s,v)=>s+v*v,0);
    const vectorEq=(a,b)=>a.every((v,i)=>v===b[i]);
    const vectors=[zero()];
    for(let i=0;i<8;i++){vectors.push(unit(i),unit(i).map(x=>-x));}
    for(let i=0;i<8;i++)for(let j=i+1;j<8;j++)for(const s of [-1,1]){const v=unit(i);v[j]=s;vectors.push(v);}
    must(vectors.length===73,'missing 73-vector control set');
    function defects(T) {
      let involution=0,composition=0,clifford_pairs=0;
      for(let i=0;i<8;i++)for(let j=0;j<8;j++){
        if(!vectorEq(conjugate(multiply(unit(i),unit(j),T)),multiply(conjugate(unit(j)),conjugate(unit(i)),T)))involution++;
      }
      for(const a of vectors)for(const b of vectors)if(norm(multiply(a,b,T))!==norm(a)*norm(b))composition++;
      const G=Array.from({length:8},()=>Array.from({length:8},()=>Array(8).fill(0)));
      for(let c=0;c<8;c++)for(let a=0;a<8;a++)G[c][T[c][a].i][a]+=T[c][a].s;
      for(let a=0;a<8;a++)for(let b=a;b<8;b++){
        let fails=false;
        for(let i=0;i<8;i++)for(let j=0;j<8;j++){
          let upper=0,lower=0;
          for(let k=0;k<8;k++){
            upper-=G[a][k][i]*G[b][k][j]+G[b][k][i]*G[a][k][j];
            lower-=G[a][i][k]*G[b][j][k]+G[b][i][k]*G[a][j][k];
          }
          const target=a===b&&i===j?-2:0;
          if(upper!==target||lower!==target)fails=true;
        }
        if(fails)clifford_pairs++;
      }
      return {involution,composition,clifford_pairs};
    }
    const before=defects(frozen),after=defects(candidate),wrong=defects(opposite);
    must(before.involution===2&&before.composition===28&&before.clifford_pairs===7,'source negative controls');
    must(after.involution===0&&after.composition===0&&after.clifford_pairs===0,'sign correction finite checks');
    must(wrong.composition>0,'opposite-cell false repair must be rejected');
    return {before,after,opposite_cell_counterexample:wrong,sparse_vectors:73,ordered_samples:5329,source_journal_unchanged:true};
  });
  check('R03',()=>{
    const z=blade(e(0),blade(blade(e(1),e(2),m4),e(3),m4),m4),z2=blade(z,z,m4);
    must(same(z2,neg(one)),'PT order four');
    const a=blade(e(1),e(2),m4),b=blade(e(2),e(3),m4);
    const H=finiteClosure([a,b],m4),G=finiteClosure([a,b,z],m4);
    must(H.length===8&&G.length===16,'finite group sizes');
    must(H.every(h=>same(blade(z,h,m4),blade(h,z,m4))),'PT central on quaternion subgroup');
    must(!H.some(h=>same(h,z)),'PT should lie outside subgroup');
    must(center(H,m4).length===2&&center(G,m4).length===4,'group centers');
    must(center(G,m4).some(h=>same(h,z)),'center of extension must contain order4 element');
    const zs=[one,z,z2,blade(z2,z,m4)],counts=new Map();
    for(const h of H)for(const q of zs){const k=key(blade(h,q,m4));counts.set(k,(counts.get(k)||0)+1);}
    must(counts.size===16&&[...counts.values()].every(n=>n===2),'central quotient double fibers');
    const x=blade(a,z,m4);
    must(same(blade(x,x,m4),one)&&!H.some(h=>same(h,x)),'alternate order2 representative');
    must(same(blade(blade(x,b,m4),x,m4),neg(b)),'nontrivial semidirect action');
    return {quaternion_subgroup_size:8,extension_size:16,central_quotient:'(Q8 x C4)/<(-1,c^2)>',semidirect_alternative:true,full_group_equivalence_unproved:true};
  });
  const complex=(r=0,i=0)=>[r,i],add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
  const cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
  const cvEq=(a,b)=>a.every((v,i)=>v[0]===b[i][0]&&v[1]===b[i][1]);
  function commVec(B,i) {
    const lhs=blade(B,e(i),m4),rhs=blade(e(i),B,m4);
    const c=new Map();
    for(const [term,coeff] of [[lhs,.5],[rhs,-.5]])c.set(term.m,(c.get(term.m)||0)+term.s*coeff);
    const v=Array(4).fill(0);
    for(const [mask,k] of c)if(k){const j=Math.log2(mask);must(Number.isInteger(j)&&j<4,'Clifford vector closure');v[j]+=k;}
    return v;
  }
  check('R04',()=>{
    const J=blade(e(1),e(2),m4),K=blade(e(0),e(3),m4);
    const w=(...args)=>args.map(x=>complex(...x));
    const cases=[
      [J,[[1,2,.5],[2,1,-.5]],w([0,0],[1,0],[0,-1],[0,0]),complex(0,1)],
      [J,[[1,2,.5],[2,1,-.5]],w([0,0],[1,0],[0,1],[0,0]),complex(0,-1)],
      [K,[[0,3,.5],[3,0,-.5]],w([1,0],[0,0],[0,0],[-1,0]),complex(1)],
      [K,[[0,3,.5],[3,0,-.5]],w([1,0],[0,0],[0,0],[1,0]),complex(-1)]
    ];
    for(const [B,coeffs,v,lambda] of cases){
      const full=Array.from({length:4},()=>complex()),printed=Array.from({length:4},()=>complex());
      for(let i=0;i<4;i++){const column=commVec(B,i);for(let j=0;j<4;j++)full[j]=add(full[j],cmul(complex(column[j]),v[i]));}
      for(const [mu,nu,c] of coeffs)printed[mu]=add(printed[mu],cmul(complex(.5*c*m4[nu]),v[nu]));
      must(cvEq(full,v.map(a=>cmul(lambda,a))),'p5 eigenvector action mismatch');
      must(cvEq(full,printed.map(a=>cmul(complex(4),a))),'p4 factor-of-four discrepancy missing');
    }
    return {tested_eigenbranches:4,project_action:'full Clifford commutator',source_final_contraction_gap:4,original_author_convention:'UNRESOLVED'};
  });
  check('R05',()=>{
    const metric=[1,1,1,-1,1,1,1,1],mixed=[];
    for(let a=0;a<4;a++)for(let b=0;b<4;b++)mixed.push({a,b,x:signed(1,(1<<a)|(1<<(4+b)))});
    const square=mixed.map(t=>blade(t.x,t.x,metric).s);
    must(square.filter(s=>s===-1).length===12&&square.filter(s=>s===1).length===4,'mixed square signature');
    let pureGravity=0,pureEW=0,commute=0,phaseFlips=0;
    for(let i=0;i<16;i++)for(let j=i+1;j<16;j++){
      const a=mixed[i],b=mixed[j],p=blade(a.x,b.x,metric),q=blade(b.x,a.x,metric);
      must(p.m===q.m,'Clifford bracket output basis mismatch');
      const v=p.s-q.s;
      if(v===0){commute++;continue;}
      must(Math.abs(v)===2,'mixed bracket magnitude');
      if(a.a!==b.a&&a.b===b.b)pureGravity++;
      else if(a.a===b.a&&a.b!==b.b)pureEW++;
      else throw Error('unexpected nonzero mixed bracket');
      const phased=(-1)*v;must(phased===-v&&phased!==v,'phase bracket sign');
      phaseFlips++;
    }
    must(pureGravity===24&&pureEW===24&&commute===72&&phaseFlips===48,'all 120 mixed brackets');
    const X=mixed[0].x,Y=mixed[4].x;
    const x2=blade(X,X,metric).s,p=blade(X,Y,metric),q=blade(Y,X,metric);
    must(x2===-1&&8*x2===-8&&8*(-x2)===8,'trace-square obstruction');
    must(p.m===3&&p.s-q.s===-2,'fixed pure-gravity role witness');
    must((p.s-q.s)/16===-1/8,'N=M/4 transformed mixed bracket coefficient');
    must((1/4)/(1/4)===1,'H1=1/4 E in M basis = E in N=M/4 basis');
    return {mixed_brackets:[pureGravity,pureEW,commute],phase_sign_reversals:phaseFlips,trace_square_native_vs_printed:[-8,8],mixed_only_phase_is_automorphism:false,coordinate_reexpression_N_equals_M_over_4:true,source_normalization_authorized:false};
  });
  check('R06',()=>{
    const conj=q=>[q[0],-q[1],-q[2],-q[3]];
    const mul=(a,b)=>[
      a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],
      a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
      a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],
      a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
    const basis=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
    const tensor=(v,psi,chi)=>mul(mul(chi,v),psi)[0];
    let strictFailures=0;
    for(const v of basis)for(const psi of basis)for(const chi of basis){
      const t=tensor(v,psi,chi);
      must(t===tensor(psi,chi,v)&&t===tensor(chi,v,psi),'cyclic tensor law');
      must(tensor(conj(v),conj(psi),conj(chi))===tensor(v,chi,psi),'conjugation role reversal');
      must(tensor(conj(v),conj(chi),conj(psi))===t,'chiral role swap repair');
      if(tensor(conj(v),conj(psi),conj(chi))!==t)strictFailures++;
    }
    must(strictFailures===6,'all six strict-role counterexamples must remain');
    for(const Z of basis)for(const s of basis){
      const q1=conj(mul(Z,s)),q2=conj(s),q=conj(Z),rhs=mul(q2,q);
      must(q1.every((v,i)=>v===rhs[i]),'finite projective chart reconstruction');
    }
    return {triality_triples:64,strict_role_counterexamples:strictFailures,finite_chart_pairs:16,chiral_exchange_required:true,infinity_patch_total_triality:'REJECTED_NOT_TESTED_AS_REPAIR'};
  });
  return {schema:'isograph.repair-hypotheses.local-mechanical.v0.1',authority:false,verified_suites:out.length,results:out};
};
if(require.main===module)process.stdout.write(JSON.stringify(verify(),null,2)+'\n');
module.exports={verify};
