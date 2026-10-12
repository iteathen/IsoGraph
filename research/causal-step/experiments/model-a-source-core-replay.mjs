/** Experimental, source-extracted Model A Node replay and CSV recorder.
 * Original source: iteathen/IsoGraph, research/import-archived-papers-20261012,
 * research/primitive-presentation/evidence/source/supplementary/model-a-dimension-birth.html
 * Original frozen blob SHA: 4d7e6f4bb594204afa92534d697a9a32fc3ea9a0
 * Source core extracted from 'const cfg = {' through the last function before 'function project(n){'.
 * Only FOUR diagnostic-selection differences from the frozen dynamical source
 * are applied to cfg.maxNodes, cfg.internalDimCap, cfg.forceRule30 and PHYSICS.springK.
 * The HTML, JS dynamics order, integration algorithm and reset defect are preserved
 * except browser-specific rendering, object-language witness, and event controls are excluded.
 * These diagnostics are a toy-model analysis, not a physical inference.
 * Usage (Node 22+):
 *    node model-a-source-core-replay.mjs uncapped 3000 ./results
 *    node model-a-source-core-replay.mjs capped 1000 ./results
 *    node model-a-source-core-replay.mjs no-node-cap 1500 ./results
 *    node model-a-source-core-replay.mjs no-springs 950 ./results
 *    node model-a-source-core-replay.mjs rule30 1000 ./results
 * None of these variants overwrites the historical HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
const mode=process.argv[2] || 'uncapped';
if(!['capped','uncapped','no-node-cap','no-springs','rule30'].includes(mode))throw Error('Unknown controlled mode');
const horizon=Number(process.argv[3] || 1000);
if(!Number.isSafeInteger(horizon)||horizon<1)throw Error('Expected positive integer horizon');
const targetDir=path.resolve(process.argv[4] || './model-a-output');
fs.mkdirSync(targetDir,{recursive:true});
// BEGIN frozen dynamical JavaScript extraction (four labeled configuration controls).
const cfg = {
  maxNodes: mode === 'no-node-cap' ? Number.POSITIVE_INFINITY : 3000,
  maxEdges: 9000,
  targetUnit: 1.0,
  birthThreshold: 0.20,
  internalDimCap: mode === 'capped' ? 12 : Number.POSITIVE_INFINITY,
  mergeDistance: 0.055,
  qfWidth: 1024,
  stepsPerFrame: 2,
  autoView: false,
  forceRule30: mode === 'rule30',
  paused: false,
  showDormantAtOrigin: true,
  dimBirthCooldown: 20,    // min steps between dimension births
};

// ─────────────────────────────────────────────────────────────
// Toy dynamics — symplectic Euler with equal-and-opposite pairwise spring forces
// Damping is 0 by default. Press D to toggle a
// tiny viscous term for comparison, then D again to clear it.
// This is the chosen host dynamics for the visual example, not a privileged
// part of the three-carrier object language.
// ─────────────────────────────────────────────────────────────
const PHYSICS = {
  springK:  mode === 'no-springs' ? 0 : 0.55,  // spring stiffness
  mass:     1.0,   // node mass (uniform)
  dt:       0.06,  // time step  (ω·dt << 1 for stable symplectic Euler)
  damping:  0.0,   // 0 = no damping; toggle with D key
};

// ─────────────────────────────────────────────────────────────
// History ring buffers for energy / |L| plots
// ─────────────────────────────────────────────────────────────
const HLEN = 400;
const eHist  = new Float64Array(HLEN);   // total energy
const lHist  = new Float64Array(HLEN);   // |angular momentum|
const keHist = new Float64Array(HLEN);   // kinetic energy
let histIdx  = 0;
let E0 = NaN;   // initial total energy (set on first non-zero reading)

// ─────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────
let step=0, dim=0, lastGrowth=0, sourceIndex=0, qfHits=0;
let lastDimBirth=-999;
let yaw=-0.55, pitch=0.38, roll=0.0, zoom=92, viewX=0, viewY=0;
let dragging=false, lastMouseX=0, lastMouseY=0, dragMode='rotate';
let rule30 = new Uint8Array(cfg.qfWidth); rule30[cfg.qfWidth>>1]=1;
let recent=[];
let nodes=[], edges=[];
let nextNodeId=0, nextEdgeId=0;
let nodeCache = new Map();

function refreshCache(){
  nodeCache.clear();
  for(const n of nodes) nodeCache.set(n.id, n);
}
function nodeById(id){ return nodeCache.get(id); }

// ─────────────────────────────────────────────────────────────
// Deterministic sparse input source
// ─────────────────────────────────────────────────────────────
function mix32(x){ x|=0; x^=x>>>16; x=Math.imul(x,0x7feb352d); x^=x>>>15; x=Math.imul(x,0x846ca68b); x^=x>>>16; return x>>>0; }
function qfBit(i,t){ return ((mix32(i ^ Math.imul(t+1,0x9e3779b9) ^ sourceIndex) >>> ((i+t)&31)) & 1); }
function qfWord(t){ let v=0; for(let i=0;i<32;i++) v=(v<<1)|qfBit((i*37+t*13)&(cfg.qfWidth-1),t); return v>>>0; }
function rule30Advance(){
  const next = new Uint8Array(cfg.qfWidth);
  for(let i=1;i<cfg.qfWidth-1;i++){
    const l=rule30[i-1], c=rule30[i], r=rule30[i+1];
    next[i] = (l ^ (c || r)) ? 1 : 0;
  }
  rule30 = next;
}
function sourceWord(t){
  if(!cfg.forceRule30) return qfWord(t);
  rule30Advance();
  let v=0;
  const off=(t*17)&(cfg.qfWidth-1);
  for(let i=0;i<32;i++) v=(v<<1)|rule30[(off+i*13)&(cfg.qfWidth-1)];
  return v>>>0;
}

// ─────────────────────────────────────────────────────────────
// Node / edge constructors — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────
function makeNode(parent=null, qf=false){
  const p = parent ? parent.x.slice() : [];
  while(p.length < dim) p.push(0);
  const n = {
    id: nextNodeId++, born: step, parent: parent?parent.id:null, qf,
    x: p, v: new Array(Math.max(dim,1)).fill(0),
    f: new Array(Math.max(dim,1)).fill(0),
    age: 0, alive: true
  };
  nodes.push(n);
  if(nodes.length > cfg.maxNodes) nodes.shift();
  return n;
}
function makeEdge(a,b,kind='causal'){
  const e={ id:nextEdgeId++, a:a.id, b:b.id, born:step, kind, target:cfg.targetUnit };
  edges.push(e);
  if(edges.length > cfg.maxEdges) edges.shift();
  return e;
}

const origin = makeNode(null,false);
refreshCache();

// ─────────────────────────────────────────────────────────────
// grow() — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────
function grow(){
  step++;
  const active = nodes.filter(n=>n.alive);
  if(active.length===0){
    nodes=[]; edges=[]; nextNodeId=0; nextEdgeId=0; dim=0;
    nodes.push(makeNode(null,false));
    refreshCache();
    return;
  }
  const word = sourceWord(step);
  const liveCount = active.length;
  const parent = active[word % liveCount];
  const births = 1 + ((word>>>7)&3) + (cfg.forceRule30 ? ((word>>>3)&1) : 0) + (((word>>>13)&15)===0 ? 2 : 0);
  for(let k=0;k<births;k++){
    const child = makeNode(parent, true);
    makeEdge(parent, child, 'unit');
    qfHits++;
    lastGrowth=step;
    if(active.length>3 && ((word >>> (k+17)) & 3)===0){
      const other = active[(word>>>11) % active.length];
      if(other.id !== parent.id) makeEdge(other, child, 'unit');
    }
  }
  if(active.length>5 && (word&7)===3){
    const a=active[(word>>>3)%active.length], b=active[(word>>>19)%active.length];
    if(a.id!==b.id) makeEdge(a,b,'causal');
  }
  const minBorn = step - 900;
  for(const n of nodes){ n.age=step-n.born; if(n.born<minBorn && degree(n.id)<=1 && n.id!==0) n.alive=false; }
  nodes = nodes.filter(n=>n.alive || n.age<80);
  const liveIds = new Set(nodes.map(n=>n.id));
  edges = edges.filter(e=>liveIds.has(e.a)&&liveIds.has(e.b));
  refreshCache();
}
function degree(id){ let d=0; for(const e of edges) if(e.a===id||e.b===id)d++; return d; }

// ─────────────────────────────────────────────────────────────
// ensureDim() — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────
function ensureDim(d){
  if(d<=dim) return;
  dim = Math.min(d, cfg.internalDimCap);
  for(const n of nodes){
    while(n.x.length<dim){ n.x.push(0); }
    while(n.v.length<dim){ n.v.push(0); }
    while(n.f.length<dim){ n.f.push(0); }
  }
  recent.unshift(`d${dim}: constraint failure → dimension birth`);
  recent=recent.slice(0,5);
}

// ─────────────────────────────────────────────────────────────
// constraintStats() — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────
function constraintStats(){
  let totalErr=0,maxErr=0,coll=0,count=0;
  for(const e of edges){
    const a=nodeById(e.a), b=nodeById(e.b); if(!a||!b) continue;
    let d2=0; for(let i=0;i<dim;i++){ const dx=(b.x[i]||0)-(a.x[i]||0); d2+=dx*dx; }
    const d=Math.sqrt(d2); const err=Math.abs(d-e.target);
    totalErr+=err; maxErr=Math.max(maxErr,err);
    if(d<cfg.mergeDistance) coll++;
    count++;
  }
  return { mean:count?totalErr/count:0, max:maxErr, coll, count };
}

// ─────────────────────────────────────────────────────────────
// birthDimensionIfNeeded() — modified: no XPBD, cooldown added
// On birth, places collapsed node pair along new axis, v=0.
// Asymmetric topology can then create torques in this toy model without
// injecting velocity directly.
// ─────────────────────────────────────────────────────────────
function birthDimensionIfNeeded(){
  const st = constraintStats();
  if( edges.length &&
      step - lastDimBirth > cfg.dimBirthCooldown &&
      (dim===0 || st.mean>cfg.birthThreshold || st.max>0.52) &&
      dim < cfg.internalDimCap ){
    lastDimBirth = step;
    ensureDim(dim+1);
    const axis = dim-1;
    for(const e of edges){
      const a=nodeById(e.a), b=nodeById(e.b); if(!a||!b) continue;
      let d2=0;
      for(let i=0;i<dim;i++){ const dx=(b.x[i]||0)-(a.x[i]||0); d2+=dx*dx; }
      if(Math.sqrt(d2) < cfg.mergeDistance){
        // Minimum displacement to satisfy unit edge in new dimension.
        // v = 0: no artificial velocity is injected here.
        b.x[axis] = (a.x[axis]||0) + cfg.targetUnit;
        b.v[axis] = 0;
      }
    }
  }
  return st;
}

// ─────────────────────────────────────────────────────────────
// accumulateForces() — NEW
// Pairwise spring forces: equal and opposite updates on each edge.
// For each edge: F_a = +fmag*unit, F_b = -fmag*unit.
// There is no origin pull in this toy model; angular momentum is monitored as
// an internal diagnostic, not as a physical conservation claim.
// ─────────────────────────────────────────────────────────────
function accumulateForces(){
  // Zero force accumulators
  for(const n of nodes){
    if(n.f.length !== dim){
      n.f = new Array(dim).fill(0);
    } else {
      for(let i=0;i<dim;i++) n.f[i]=0;
    }
  }
  // Pairwise spring forces
  for(const e of edges){
    const a=nodeById(e.a), b=nodeById(e.b); if(!a||!b) continue;
    let d2=0;
    const delta = new Array(dim);
    for(let i=0;i<dim;i++){
      const dx=(b.x[i]||0)-(a.x[i]||0); delta[i]=dx; d2+=dx*dx;
    }
    const d=Math.sqrt(d2);
    if(d < 1e-9) continue;   // collapsed: dimension birth handles this
    const fmag = PHYSICS.springK * (d - e.target);
    for(let i=0;i<dim;i++){
      const fi = fmag * (delta[i]/d);
      a.f[i] += fi;    // force on a (toward b if stretched)
      b.f[i] -= fi;    // equal and opposite on b
    }
  }
}

// ─────────────────────────────────────────────────────────────
// integrate() — NEW: Symplectic Euler (kick-drift)
// Order: v += F/m·dt (kick with current forces), then x += v·dt (drift)
// Symplectic Euler is chosen for stable qualitative behavior in the sketch.
// PHYSICS.damping = 0.0. If toggled to >0, a tiny viscous
// term appears for comparison purposes only.
// ─────────────────────────────────────────────────────────────
function integrate(){
  const invM = 1.0 / PHYSICS.mass;
  const dt   = PHYSICS.dt;
  const damp = PHYSICS.damping;
  for(const n of nodes){
    for(let i=0;i<dim;i++){
      // Kick: update velocity from accumulated force
      n.v[i] = (n.v[i]||0) + (n.f[i]||0) * invM * dt;
      // Optional viscous damping (0 by default)
      if(damp > 0) n.v[i] *= (1.0 - damp);
      // Drift: update position using updated velocity (symplectic!)
      n.x[i] = (n.x[i]||0) + n.v[i] * dt;
    }
  }
}

// ─────────────────────────────────────────────────────────────
// computeEnergy() — NEW
// KE = Σ ½m|v|²    PE = Σ_edges ½k(d-d₀)²
// ─────────────────────────────────────────────────────────────
function computeEnergy(){
  if(dim===0) return { KE:0, PE:0, total:0 };
  let KE=0, PE=0;
  for(const n of nodes){
    let v2=0;
    for(let i=0;i<dim;i++) v2 += (n.v[i]||0)**2;
    KE += 0.5 * PHYSICS.mass * v2;
  }
  for(const e of edges){
    const a=nodeById(e.a), b=nodeById(e.b); if(!a||!b) continue;
    let d2=0;
    for(let i=0;i<dim;i++){ const dx=(b.x[i]||0)-(a.x[i]||0); d2+=dx*dx; }
    const stretch = Math.sqrt(d2) - e.target;
    PE += 0.5 * PHYSICS.springK * stretch*stretch;
  }
  return { KE, PE, total: KE+PE };
}

// ─────────────────────────────────────────────────────────────
// computeAngularMomentum() — NEW
// L = Σ m (r - r_cm) × v   using first 3 internal dimensions.
// |L| is a diagnostic for rotation-like motion in the rendered toy model.
// ─────────────────────────────────────────────────────────────
function computeAngularMomentum(){
  if(dim < 2) return { Lx:0, Ly:0, Lz:0, L:0 };
  let cx=0, cy=0, cz=0, total=0;
  for(const n of nodes){
    cx += (n.x[0]||0); cy += (n.x[1]||0); cz += (n.x[2]||0); total++;
  }
  if(!total) return { Lx:0, Ly:0, Lz:0, L:0 };
  cx/=total; cy/=total; cz/=total;
  let Lx=0, Ly=0, Lz=0;
  const m = PHYSICS.mass;
  for(const n of nodes){
    const rx=(n.x[0]||0)-cx, ry=(n.x[1]||0)-cy, rz=(n.x[2]||0)-cz;
    const vx=n.v[0]||0,       vy=n.v[1]||0,       vz=n.v[2]||0;
    // r × v  (cross product)
    Lx += m*(ry*vz - rz*vy);
    Ly += m*(rz*vx - rx*vz);
    Lz += m*(rx*vy - ry*vx);
  }
  return { Lx, Ly, Lz, L: Math.sqrt(Lx*Lx + Ly*Ly + Lz*Lz) };
}

// ─────────────────────────────────────────────────────────────
// project() — UNCHANGED from v2
// ─────────────────────────────────────────────────────────────

// END frozen dynamical JavaScript extraction.

function components(){
 const adj=new Map(nodes.map(n=>[n.id,[]]));
 for(const e of edges){if(adj.has(e.a)&&adj.has(e.b)){adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);}}
 const seen=new Set();let count=0,largest=0;
 for(const n of nodes){
  if(seen.has(n.id))continue; count++; const stack=[n.id]; seen.add(n.id);let size=0;
  while(stack.length){const id=stack.pop();size++;for(const q of adj.get(id)){if(!seen.has(q)){seen.add(q);stack.push(q)}}}
  largest=Math.max(largest,size);
 }
 return {count,largest};
}
function cm(){
 const c=new Float64Array(dim),v=new Float64Array(dim),num=nodes.length;
 for(const n of nodes)for(let k=0;k<dim;k++){c[k]+=n.x[k]||0;v[k]+=n.v[k]||0;}
 for(let k=0;k<dim;k++){c[k]/=num;v[k]/=num;}
 return {c,v};
}
function deltaAngle(a,b){let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d< -Math.PI)d+=2*Math.PI;return d;}
const prefix=path.join(targetDir,mode+'-'+horizon);
const steps=['step,dimension,nodes,edges,birth,mean_error,max_error,collapsed,n_components,largest,KE,PE,E,L3,rss_bytes,heap_bytes,update_ms'];
const births=['step,new_dimension,mean_error,max_error,collapsed,source'];
const traces=['step,node_id,x_cm,y_cm,z_cm,full_radius,full_tangential_share,angle_xy'];
const cohort=new Map(); const checkpoint=[];
let lastRecordedDim=0,totalMs=0,fixedCenter=null;
const checkpoints=new Set([1,22,43,64,85,106,127,148,169,190,200,211,232,250,300,500,750,900,950,1000,1200,1250,1500,2000,2500,3000]);
for(let i=0;i<horizon;i++){
 const begin=performance.now();
 grow(); const st=birthDimensionIfNeeded();if(dim>0){accumulateForces();integrate();}
 const ms=performance.now()-begin;totalMs+=ms;
 const didBirth=dim!==lastRecordedDim;lastRecordedDim=dim;
 if(didBirth)births.push([step,dim,st.mean,st.max,st.coll,cfg.forceRule30?'rule30':'hash'].join(','));
 const isCheckpoint=checkpoints.has(step)||step===horizon;
 let energy='', L='', cc='', largest='';
 if(isCheckpoint){
   const e=computeEnergy(),l=computeAngularMomentum(),c=components();
   energy=e;L=l.L;cc=c.count;largest=c.largest;
   let finite=true;
   for(const n of nodes)for(let k=0;k<dim;k++){if(!Number.isFinite(n.x[k])||!Number.isFinite(n.v[k]))finite=false;}
   checkpoint.push({step,dim,nodes:nodes.length,edges:edges.length,components:cc,largest,energy:e.total,L3:L,finite});
 }
 if(step===200 || (step>200&&step<=950)){
   const center=cm();
   if(step===200){
     fixedCenter={x:center.c[0]||0,y:center.c[1]||0};
     for(const n of nodes)if(n.id%5===0)cohort.set(n.id,{last:null,net:0,abs:0,radSum:0,rad2:0,n:0});
   }
   for(const [id,record] of cohort){
     const n=nodeById(id);if(!n)continue;
     let r2=0,v2=0,dot=0;
     for(let k=0;k<dim;k++){
       const r=(n.x[k]||0)-center.c[k],v=(n.v[k]||0)-center.v[k];
       r2+=r*r;v2+=v*v;dot+=r*v;
     }
     const x=(n.x[0]||0)-(center.c[0]||0),y=(n.x[1]||0)-(center.c[1]||0),z=(n.x[2]||0)-(center.c[2]||0);
     const angle=Math.atan2(y,x),radius=Math.sqrt(r2);
     const tang=Math.sqrt(Math.max(0,v2-dot*dot/Math.max(r2,1e-100)))/Math.sqrt(Math.max(v2,1e-100));
     if(record.last!==null){const d=deltaAngle(record.last,angle);record.net+=d/(2*Math.PI);record.abs+=Math.abs(d)/(2*Math.PI);}
     record.last=angle;record.n++;record.radSum+=radius;record.rad2+=radius*radius;
     traces.push([step,id,x,y,z,radius,tang,angle].join(','));
   }
 }
 const mem=(step%25===0||isCheckpoint)?process.memoryUsage():null;
 steps.push([step,dim,nodes.length,edges.length,didBirth?1:0,didBirth?st.mean:'',didBirth?st.max:'',didBirth?st.coll:'',cc,largest,energy?.KE??'',energy?.PE??'',energy?.total??'',L,mem?.rss??'',mem?.heapUsed??'',ms].join(','));
}
const orbit=[...cohort.entries()].map(([id,r])=>({id,samples:r.n,winding:r.net,absoluteCumulativeTurns:r.abs,radialCV:Math.sqrt(Math.max(0,r.rad2/r.n-(r.radSum/r.n)**2))/(r.radSum/r.n)}));
for(const [name,lines] of [['steps',steps],['births',births],['orbit-trace',traces]])fs.writeFileSync(prefix+'-'+name+'.csv',lines.join('\n')+'\n');
const report={mode,horizon,source_blob:'4d7e6f4bb594204afa92534d697a9a32fc3ea9a0',changes:'selection of 4 controlled cfg/physics parameters only',meanSourceUpdateMs:totalMs/horizon,checkpoints:checkpoint,birthCount:births.length,orbit:{selected:orbit.length,over1:orbit.filter(a=>Math.abs(a.winding)>1).length,over2:orbit.filter(a=>Math.abs(a.winding)>2).length,perNode:orbit}};
fs.writeFileSync(prefix+'-summary.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({mode,horizon,births:report.birthCount,atEnd:checkpoint.at(-1),orbitOverOne:report.orbit.over1,outputPrefix:prefix}));
