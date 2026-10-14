import fs from 'node:fs';
import crypto from 'node:crypto';
const H={"oldS":"85ce3cab9cd2a4f77c0bc2d49ab8c28214754607","S":"1fb691f7dcbf578b01cae1df78760d2789a09b48","oldD":"66760bb8f58cbe50cb334dd1a653e3c89924cf05","D":"ff06cb6cef785ac1328fad4ad274b618547252b5","oldReg":"be674f1e8246db4355d509f8aa7d3dcf905bfff4","Reg":"3bfb8812f892bd3003324e2b0ea66592fd13b3c8","oldCov":"fa0ea8de18df82f888a8de96e305c9f22b787cae","Cov":"016118678a6d3fe5d45af7dcb82875ac469e9a6d","review":"6427cebc194754983d21616d539729c71b964577","oracle":"b84093d70a30dbab47d0ea24b3c59f553c0f7364","defect":"2409daa041c12e4fde79c4eff09a58886805b0a7"};
const PATHS={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_17.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_18.json","oldD":"experiments/062/W_G0_MULTISOURCE_SOURCE_DEMAND_PROJECTION_0_6.json","D":"experiments/062/W_G0_W01_SOURCE_DEMAND_PROJECTION_0_7.json","oldReg":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_3.json","Reg":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_4.json","oldCov":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_2.json","Cov":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_3.json","review":"experiments/062/W_G0_W01_44_EXISTING_SOURCE_DIRECT_REVIEW_0_1.json","oracle":"experiments/062/W01_G0_INDEPENDENT_SOURCE_LITERAL_EXPECTATIONS_0_1.json","defect":"experiments/062/W01_G0_SOURCE_EXPRESSION_AND_ORBIT_COUNT_DEFECT_0_1.json"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const obj=Object.fromEntries(Object.entries(PATHS).map(([k,path])=>[k,read(path)]));
const clone=x=>JSON.parse(JSON.stringify(x)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const IDS=["W-SSC-026","W-SSC-028","W-SSC-029","W-SSC-030","W-SSC-031","W-SSC-034","W-SSC-036","W-SSC-037","W-SSC-048","W-SSC-049","W-SSC-050","W-SSC-052","W-SSC-053","W-SSC-054","W-SSC-056"];
const TAILS={"W-SSC-026":" W01 §2.1 prints the exact Euclidean matrix model x=x0*1-i(x1*sigma1+x2*sigma2+x3*sigma3), |x|^2=det(x), and the quaternion coordinate model x=x0*1+x1*i+x2*j+x3*k with |x|^2=x*conjugate(x). The preceding token KAPPA(x) is NOT the source-printed quaternion conjugate and is superseded here, not treated as a new operation.","W-SSC-028":" W01 separately prints the Minkowski embedding x=-i(x0*1+x1*sigma1+x2*sigma2+x3*sigma3) with determinant -x0^2+x1^2+x2^2+x3^2; the split E(2,2) model consists of REAL 2x2 matrices [[x0+x3,x1+x2],[x1-x2,x0-x3]] with determinant x0^2-x1^2+x2^2-x3^2. All three real spaces complexify to M(2,C), but they do not carry the same real-form constraint. The printed Minkowski Lorentz action is x maps to inverse(adjoint(g)) * x * inverse(g) for g in SL(2,C); the split-signature Spin(2,2)=SL(2,R)_L x SL(2,R)_R action is x maps to g_L*x*inverse(g_R). These typed group actions differ from the Euclidean Spin(4) real-form action, even though complexification is shared.","W-SSC-029":" Its printed source action is precisely integral_M epsilon_ABCD e^A wedge e^B wedge Omega^CD(omega), where Omega(omega) denotes curvature of the spin connection, not an independent arbitrary field. Varying omega^AB gives the source-printed torsion equation de^A+omega^A_B wedge e^B=0; varying e^A separately gives Einstein equations. No generic zero-stationarity operator or variation-direction carrier is claimed.","W-SSC-030":" The printed chiral decomposition is spin(4)=su(2)_R direct-sum su(2)_L; omega=omega_R+omega_L; Omega=Omega_R(omega_R)+Omega_L(omega_L); two-forms split Lambda^2(M)=Lambda^2_+(M) direct-sum Lambda^2_-(M), with Lambda^2_+ subset Hom(S_R,S_R) and Lambda^2_- subset Hom(S_L,S_L). Finally Omega(omega)=Omega_(+,R)(omega)+Omega_(+,L)(omega)+Omega_(-,R)(omega)+Omega_(-,L)(omega). Each sign/chiral subscript is a source role, not an interchangeable normalization.","W-SSC-031":" W01's exact torsion-free vacuum Einstein condition is Omega_(-,R)(omega)=0, and W01 separately prints its implication Omega_(+,L)(omega)=0. A third distinct source statement says solutions with Omega_(-,L)=0 will be self-dual/half-flat. These are not three interchangeable vanishing conditions and the first is conditional on torsion freedom. Chiral gravitational action replaces Omega by Omega_R, with the omitted omega_L left unconstrained only if torsion is allowed.","W-SSC-034":" W01 Eq.(4.1) retains the half-determinant-line factor: S_R direct-sum S_L = Lambda^*(C2) tensor (Lambda^2(conjugate(C2)))^(1/2); S_R=(Lambda^0(C2) direct-sum Lambda^2(C2)) tensor that factor; S_L=Lambda^1(C2) tensor that factor. The determinant line is CONJUGATED in the author's display and the exponent is exactly 1/2. Its U(2) stabilizer lifts to SU(2)_L x U(1), U(1) inside SU(2)_R.","W-SSC-036":" W01 §4.2 prints PT=U(4)/(U(1)xU(3))=SU(4)/S(U(1)xU(3))=SU(4)/U(3). It defines l^perp as the QUOTIENT C4/l, not an orthogonal complement in the fiber. If U(1) acts with weight +1 on l, the determinant-one relative weight on C4/l is exactly -1/3; this is separate from the tangent Hom_C(l,S_L) role.","W-SSC-037":" The printed one-generation representation is (C_-1 direct-sum C3_(+1/3)) tensor (C2_0 direct-sum C_-1 direct-sum C_+1) with six displayed components C2_-1, C_-2, C_0, (C3 tensor C2)_(+1/3), C3_(-2/3), C3_(+4/3), in that order. The author maps these respectively to the left lepton doublet, e_R, right neutrino, left quark doublet, u_R, d_R; the source's printed component order and signed U(1) weights are retained without reinterpretation.","W-SSC-048":" The source A.2 incidence is s^perp=Zs with Z the local 2x2 complex-matrix chart and T=S0 direct-sum S0^perp. For a block SL(4,C) element [[A,B],[C,D]], the induced local action is Z maps to (C+DZ)(A+BZ)^(-1), where the inverse is of the entire right-hand factor A+BZ. This is chart-scoped and is not a global fractional formula at singular denominator.","W-SSC-049":" Appendix A.1's nullness deduction is explicitly (Z1-Z2)s=0 for nonzero incidence spinor s, hence Z1-Z2 is non-invertible and det(Z1-Z2)=0. Null separation belongs to TWO complex-spacetime points incident with the same projective-twistor point, not a blanket equivalence between any two points.","W-SSC-050":" Appendix A.2 prints the Penrose-transform relation between helicity k/2 holomorphic massless equations on U subset M and H^1(Uhat,O(-k-2)) for corresponding Uhat=mu(nu^(-1)(U)); the Ward correspondence separately demands an anti-self-dual GL(n,C) connection with *F_A=-F_A and a holomorphic rank-n bundle trivial on each CP1 corresponding to m in U. The open-set and trivial-on-lines restrictions are mandatory, not universalized away.","W-SSC-052":" The source's App. A.3.2 states that SU(2,2) has 'six orbits' on M, then visibly lists ONLY FIVE named entries M_(++), M_(--), M_(+0), M_(-0), M_(00). Preserve the author's printed count FIVE-LISTED versus SIX-CLAIMED as an unresolved source inconsistency, without adding an imagined sixth orbit. The projective twistor PT partition is separately the three named orbits PT_+, PT_-, PT_0 with PT_0 a closed five-real-dimensional orbit; do not conflate the two orbit carriers.","W-SSC-053":" Appendix A.3.3 prints the source pseudoreal map sigma on four complex twistor coordinates as ordered (-bar(s2),bar(s1),-bar(s2^perp),bar(s1^perp)); sigma squared is -identity on T=C4 but +identity projectively on PT, with NO fixed twistor points; the induced quaternionic-line map fixes HP1 base points and acts antipodally on CP1 fibers. This map is a distinct typed instance from W05's rho_tw even when their fiber behaviors correspond.","W-SSC-054":" Appendix B's source-specific Osterwalder-Schrader convention chooses the imaginary-time coordinate tau and the subspace E1^+ consisting of functions supported at tau<0, defines time reflection Theta f(tau,x)=f(-tau,x), then H1 as the quotient by the OS-null space; a different source's positive-time convention must not be silently substituted. The full Euclidean SO(4) rotations fail to preserve this selected half-space even when Schwinger functions are invariant.","W-SSC-056":" Appendix C defines a real-line hyperfunction as the class [Phi_+,Phi_-] of upper-/lower-half-plane holomorphic functions, with (Phi_+,Phi_-)~(Phi_++psi,Phi_-+psi) for one GLOBALLY holomorphic psi; a boundary-value difference produces the functional. Its source's positive/negative energy and two analytic-half-plane components remain distinct, not an unconstrained identification of Fourier pieces."};
const STMT_IDS={"W-SSC-026":["W01-026-EUCLID-01","W01-026-NORM-02","W01-026-QUAT-03","W01-026-QUATNORM-04"],"W-SSC-028":["W01-028-MINK-01","W01-028-SPLIT-02","W01-028-CMPLX-03","W01-028-MINKACT-04","W01-028-SPLITACT-05"],"W-SSC-029":["W01-029-PALATINI-01","W01-029-VAR-02","W01-029-VAR-03"],"W-SSC-030":["W01-030-SPIN-01","W01-030-CONN-02","W01-030-HODGE-03","W01-030-CURV-04"],"W-SSC-031":["W01-031-EINSTEIN-01","W01-031-EINSTEIN-02","W01-031-HALFFLAT-03","W01-031-CHIRAL-04"],"W-SSC-034":["W01-034-SPINOR-01","W01-034-SPINOR-02","W01-034-SPINOR-03","W01-034-STABILIZER-04"],"W-SSC-036":["W01-036-PT-01","W01-036-QUOT-02","W01-036-WEIGHT-03","W01-036-COLOR-04"],"W-SSC-037":["W01-037-REP-01","W01-037-REP-02","W01-037-PART-03"],"W-SSC-048":["W01-048-INC-01","W01-048-ACTION-02"],"W-SSC-049":["W01-049-NULL-01"],"W-SSC-050":["W01-050-PENROSE-01","W01-050-WARD-02","W01-050-TRIV-03"],"W-SSC-052":["W01-052-ORB-M-01","W01-052-ORB-PT-02"],"W-SSC-053":["W01-053-QUAT-01","W01-053-SQ-02","W01-053-FIBER-03"],"W-SSC-054":["W01-054-SUPPORT-01","W01-054-THETA-02","W01-054-QUOT-03","W01-054-SYMM-04"],"W-SSC-056":["W01-056-HYPER-01","W01-056-GLUE-02","W01-056-BOUND-03","W01-056-PHASE-04"]};
const sourceInitialBaseW026="W01 fixes the Euclidean vector real form inside M(2,C) by the Pauli-matrix map, with determinant equal to positive Euclidean norm squared and an equivalent quaternion presentation with the quaternion norm x conjugate(x), with x a quaternion here rather than the distinct matrix carrier.";
const sourceId=(x,id)=>x?.items?.find(a=>a.id===id),demandId=(x,id)=>x?.items?.find(a=>a.census_id===id);
const PRED=[
["W-SSC-026",o=>o[3]?.lhs==="|x|^2"&&equal(o[3]?.rhs?.ordered_factors,["x","CONJUGATE(x)"])&&o[3]?.source_latex===String.raw`|x|^2=x\overline x`&&o[2]?.source_variable==="x"&&o[2]?.carrier==="QUATERNION_H_NOT_PAULI_MATRIX_REAL_FORM"&&o[1]?.rhs==="det(x)","quaternion binder/norm"],
["W-SSC-028",o=>o[0]?.matrix==="-i*(x0*I+x1*sigma1+x2*sigma2+x3*sigma3)"&&equal(o[1]?.matrix,[["x0+x3","x1+x2"],["x1-x2","x0-x3"]])&&o[1]?.norm==="x0^2-x1^2+x2^2-x3^2"&&equal(o[3]?.output?.ordered_factors,["INVERSE(ADJOINT(g))","x","INVERSE(g)"])&&o[3]?.group==="SL(2,C)"&&equal(o[4]?.output?.ordered_factors,["g_L","x","INVERSE(g_R)"])&&o[4]?.group==="SL(2,R)_L TIMES SL(2,R)_R","Mink/split action"],
["W-SSC-029",o=>equal(o[0]?.ordered_factors,["epsilon_ABCD","e^A","WEDGE","e^B","WEDGE","Omega^CD(omega)"])&&o[0]?.curvature_dependency==="Omega(omega)"&&o[1]?.result==="de^A+omega^A_B wedge e^B=0"&&o[1]?.varied==="omega^AB"&&o[2]?.varied==="e^A","Palatini roles"],
["W-SSC-030",o=>equal(o[0]?.rhs,["su(2)_R","su(2)_L"])&&equal(o[2]?.spinor_roles,[{side:"+",carrier:"Hom(S_R,S_R)"},{side:"-",carrier:"Hom(S_L,S_L)"}])&&equal(o[3]?.rhs,["Omega_(+,R)(omega)","Omega_(+,L)(omega)","Omega_(-,R)(omega)","Omega_(-,L)(omega)"]),"curvature component order"],
["W-SSC-031",o=>o[0]?.premise==="omega_TORSION_FREE"&&o[0]?.required_equation==="Omega_(-,R)(omega)=0"&&o[1]?.consequence==="Omega_(+,L)(omega)=0"&&o[2]?.premise==="Omega_(-,L)=0"&&o[2]?.consequence==="SELF_DUAL_OR_HALF_FLAT"&&o[3]?.torsion_permitted_case==="omega_L_ARBITRARY_IF_TORSION_ALLOWED","Einstein and half-flat"],
["W-SSC-034",o=>o[0]?.rhs?.right==="(Lambda^2(CONJUGATE(C^2)))^(1/2)"&&o[1]?.rhs?.right==="(Lambda^2(CONJUGATE(C2)))^(1/2)"&&o[2]?.lhs==="S_L"&&o[3]?.U1_inside==="SU(2)_R","determinant half-line"],
["W-SSC-036",o=>o[0]?.terms?.length===3&&o[1]?.quotient==="l^perp = C4/l"&&o[1]?.rank===3&&o[2]?.on_quotient==="-1/3"&&o[2]?.on_l==="1","quotient weight"],
["W-SSC-037",o=>equal(o[0]?.first,["C_(-1)","C3_(+1/3)"])&&equal(o[1]?.rhs,["C2_(-1)","C_(-2)","C_0","(C3 tensor C2)_(+1/3)","C3_(-2/3)","C3_(+4/3)"])&&equal(o[2]?.particles,["(nu_e,e)_L","e_R","(nu_e)_R","(u,d)_L","u_R","d_R"]),"hypercharge ordered"],
["W-SSC-048",o=>o[0]?.lhs==="s^perp"&&o[0]?.rhs==="Z*s"&&equal(o[1]?.output?.product,["C+D*Z","INVERSE(A+B*Z)"])&&o[1]?.guard==="A+BZ_INVERTIBLE_ON_CHART","incidence+inverse"],
["W-SSC-049",o=>o[0]?.equation==="(Z1-Z2)*s=0"&&o[0]?.consequence==="det(Z1-Z2)=0"&&o[0]?.premise==="Z1,Z2_BOTH_INCIDENT_WITH_SAME_PROJECTIVE_TWISTOR_POINT","conditional nullness"],
["W-SSC-050",o=>o[0]?.cohomology==="H^1(Uhat,O(-k-2))"&&o[0]?.helicity==="k/2"&&o[1]?.rhs==="-F_A"&&o[2]?.must_be_trivial==="E_RESTRICTED_TO_CP1_LINE_FOR_EACH_m_IN_U"&&o[2]?.open_set_restrictions.includes("ADDITIONAL"),"Ward side-conditions"],
["W-SSC-052",o=>o[0]?.source_claimed_orbits===6&&o[0]?.listed_count===5&&equal(o[0]?.source_explicitly_listed_orbits,["M_++","M_--","M_+0","M_-0","M_00"])&&o[0]?.source_conflict.includes("NO_SIXTH_INFERRED")&&equal(o[1]?.orbits,["PT_+","PT_-","PT_0"]),"six claimed five listed"],
["W-SSC-053",o=>equal(o[0]?.output,["-conjugate(s2)","conjugate(s1)","-conjugate(s2_perp)","conjugate(s1_perp)"])&&o[1]?.on_T==="sigma^2=-1"&&o[1]?.on_PT==="sigma^2=+1"&&o[1]?.source_negative==="NO_FIXED_PT_POINTS"&&o[2]?.action_on==="CP1_FIBER_ANTIPODAL","sigma map"],
["W-SSC-054",o=>o[0]?.support_condition==="tau<0"&&o[1]?.output==="f(-tau,x)"&&o[2]?.denominator==="(f,f)_OS=0"&&o[3]?.negative==="FULL_SO4_DOES_NOT_PRESERVE_E1_PLUS","OS negative time"],
["W-SSC-056",o=>equal(o[0]?.domains,["UPPER_HALF_PLANE","LOWER_HALF_PLANE"])&&equal(o[1]?.rhs,["Phi_+ + psi","Phi_- + psi"])&&o[1]?.psi_domain==="GLOBALLY_HOLOMORPHIC"&&equal(o[2]?.orientation,["UPPER_PLUS","LOWER_MINUS"])&&equal(o[3]?.energy_parts,["POSITIVE","NEGATIVE"]),"hyperfunction"]
];
function check(c){
 const errors=[],ck=(ok,m)=>{if(!ok)errors.push(m)};
 const {oldS,S,oldD,D,oldReg,Reg,oldCov,Cov,review,oracle,defect}=c;
 ck(S?.schema==="woit.source-semantic-census.v0.18"&&S?.status==="W01_44_ROW_SOURCE_DIRECT_REVIEW_15_EXPRESSION_CORRECTIONS_G0_UNFROZEN","source G0 version");
 ck(S?.predecessor?.git_blob_sha===H.oldS&&S?.correction?.cause?.git_blob_sha===H.defect&&S?.correction?.G1_authorized===false&&S?.closure_claims?.sealed===false,"source predecessor/cause/close");
 ck(S?.correction?.inline_source_error_fixed?.startsWith("W026")===true&&S?.correction?.affected_typed_formulas_stated===50,"W026 binder repair indicated");
 ck(S?.items?.length===151&&oldS?.items?.length===151&&D?.items?.length===86&&oldD?.items?.length===86&&Reg?.rows?.length===151&&Cov?.rows?.length===151&&review?.rows?.length===44&&oldReg?.rows?.length===151&&oldCov?.rows?.length===151,"all shapes");
 if(S?.items?.length!==151||oldS?.items?.length!==151||D?.items?.length!==86||oldD?.items?.length!==86||Reg?.rows?.length!==151||Cov?.rows?.length!==151||review?.rows?.length!==44||oldReg?.rows?.length!==151||oldCov?.rows?.length!==151)return errors;
 ck(equal(S.items.map(x=>x.id),oldS.items.map(x=>x.id))&&equal(S.correction.changed_W_census_ids,IDS),"151 IDs exact");
 ck(equal(oracle?.expected_changed_ids,IDS)&&oracle?.status?.startsWith("SOURCE_LOCAL_INDEPENDENT_EXPECTATIONS")&&oracle?.qualification?.full_W01_assertion_exhaustiveness===false&&oracle?.source?.revision==="arXiv:2104.05099v2","oracle frozen revision");
 const WI=oldS.items.filter(x=>/^W01/.test(x.source)).map(x=>x.id);
 ck(WI.length===44&&equal(WI,review.rows.map(x=>x.census_id)),"44 W01 exact coverage IDs");
 for(let i=0;i<151;i++)if(!IDS.includes(oldS.items[i].id))ck(equal(oldS.items[i],S.items[i]),"other 136 source "+oldS.items[i].id);
 let count=0;
 for(const id of IDS){const orig=sourceId(oldS,id),cur=sourceId(S,id);const base=id==="W-SSC-026"?sourceInitialBaseW026:orig.obligation;
  ck(cur?.source===orig?.source&&cur?.state===orig?.state&&cur?.obligation===base+TAILS[id],"no unrelated W01 source body rewrite "+id);
  const f=cur?.source_expression_census?.statements||[];
  ck(f.length===oracle?.expected_count_of_source_statement_incidences_by_id?.[id]&&equal(f.map(x=>x.id),STMT_IDS[id])&&cur?.source_expression_census?.source_revision==="arXiv:2104.05099v2","source formula IDs and typed revision "+id);
  count+=f.length;
 }
 ck(count===50&&oracle?.frozen_literal_witnesses?.length===20,"50 source statements 20 source witnesses");
 ck(!sourceId(S,"W-SSC-026")?.obligation.includes("with x KAPPA(x)")&&sourceId(S,"W-SSC-026")?.obligation.includes("quaternion norm x conjugate(x)")&&!sourceId(S,"W-SSC-026")?.obligation.includes("quaternion norm q"),"no invented quaternion binder/source norm");
 for(const [id,pred,lab] of PRED)ck(!!pred(sourceId(S,id)?.source_expression_census?.statements||[]),"frozen primary-source role "+lab);
 const WIT=oracle?.frozen_literal_witnesses||[],wi=new Map(WIT.map(z=>[z.id,z]));
 ck(WIT.length===20&&new Set(WIT.map(x=>x.id)).size===20,"source witness unique list");
 ck(wi.get("W01-026-QUATNORM-04")?.binder==="x"&&wi.get("W01-028-MINKACT-04")?.group==="SL(2,C)"&&wi.get("W01-052-ORB-M-01")?.listed?.length===5&&wi.get("W01-054-SUPPORT-01")?.source_display==="E1_plus supported tau<0"&&wi.get("W01-056-GLUE-02")?.requirement?.includes("same globally holomorphic"),"independent source anchors preserved");
 ck(defect?.status==="FROZEN_W01_V2_DIRECT_SOURCE_44_ITEM_REVIEW_FOUND_15_SOURCE_EXPRESSION_GAPS_G0_REOPENED"&&equal(defect?.affected_ids,IDS)&&defect?.source?.author_pdf_arxiv_pdf_byte_identity==="UNVERIFIED","source defect persists");
 ck(D?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.7"&&D?.current_source?.git_blob_sha===H.S&&D?.predecessor_W_only_demand?.git_blob_sha===H.oldD&&D?.replay_policy?.G1_authorized===false&&D?.replay_policy?.source_census_frozen===false&&D?.replay_policy?.L_members==="NOT_ACCESSED_OR_REWRITTEN","W86 historical-only source projection");
 ck(D?.counts?.changed_W_members===15&&D?.counts?.unchanged_W_members===71&&D?.counts?.W_historical_demand_members===86&&equal(D.items.map(x=>x.census_id),oldD.items.map(x=>x.census_id)),"86 exact member order and change count");
 for(let i=0;i<86;i++){const p=oldD.items[i],v=D.items[i];ck(v?.census_id===p.census_id&&v?.body===sourceId(S,v.census_id)?.obligation&&v?.track==="W","source-to-demand exact W "+p.census_id);
  if(!IDS.includes(p.census_id))ck(equal(v,p),"other 71 demand object "+p.census_id);
  else ck(equal(v?.source_formula_incidences,sourceId(S,v.census_id)?.source_expression_census?.statements),"changed demand formula projection "+v.census_id);
 }
 ck(Reg?.schema==="isograph.exp062-w-g0-all-151-conservation-register.v0.4"&&Reg?.source_census?.git_blob_sha===H.S&&Reg?.historical_86_projection?.git_blob_sha===H.D&&Reg?.predecessor_register?.git_blob_sha===H.oldReg&&Reg?.source_W01_review?.git_blob_sha===H.review,"151 register hash dependency pins");
 ck(Reg?.counts?.source_items===151&&Reg?.counts?.direct_author_current_source_rows_evidenced===82&&Reg?.counts?.remaining_source_rows_not_directly_reviewed===69&&Reg?.counts?.historical_nonmembers===65,"current source reviews 82/69 and old 65 nonmembers");
 ck(Reg?.counts?.historical_modes_by_membership?.OUT__INCOMPLETE_UNEXPANDED===52&&Reg?.counts?.historical_modes_by_membership?.IN__CLOSED_SCHEMA===8,"old 52 excluded / 8 included old closure");
 for(let i=0;i<151;i++){const item=S.items[i],row=Reg.rows[i],before=oldReg.rows[i];
  ck(row?.census_id===item.id&&row?.ordinal===i+1&&row?.source_body_exact===item.obligation&&row?.source_expression_statement_count===(item.source_expression_census?.statements?.length||0),"register 151 bodies "+item.id);
  ck(row?.historical_86_member===before.historical_86_member&&row?.historical_ledger_0_19_mode===before.historical_ledger_0_19_mode&&row?.G0_status==="SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING"&&row?.historical_closure_accepted_as_current===false,"historical ledger not authority "+item.id);
  if(WI.includes(item.id))ck(row.source_revision_cold_review_status==="W01_ARXIV2104_05099V2_EXISTING_ASSERTION_DIRECT_PRIMARY_SOURCE_REVIEW_NOT_FULL_COMPLETENESS"&&row.source_locator===review.rows.find(x=>x.census_id===item.id)?.source_locator,"W01 row source-revision review "+item.id);
 }
 ck(Cov?.schema==="isograph.exp062-w-g0-line-by-line-151-source-coverage.v0.3"&&Cov?.source_census?.git_blob_sha===H.S&&Cov?.reconstructed_register?.git_blob_sha===H.Reg&&Cov?.predecessor_coverage?.git_blob_sha===H.oldCov&&Cov?.source_W01_review?.git_blob_sha===H.review,"151 coverage pins");
 ck(Cov?.counts?.total_direct_current_source_source_semantic_body_reviews===82&&Cov?.counts?.source_rows_remaining_cold_audit===69&&Cov?.counts?.G0_closed===0&&Cov?.by_unit?.W01?.direct_author_source_review===44&&Cov?.by_unit?.W01?.source_expression_statements===50,"coverage 82 reviewed and 69 unreviewed");
 const pending=Object.fromEntries(Object.entries(Cov.by_unit).filter(([k,v])=>v.not_direct_source_reviewed>0).map(([k,v])=>[k,v.not_direct_source_reviewed]));
 ck(equal(pending,{W02:30,W04d:12,W04e:11,W05:16}),"other 69 source units still pending");
 let wcnt=0;for(let i=0;i<151;i++){const item=S.items[i],row=Cov.rows[i],prior=oldCov.rows[i];
  ck(row?.census_id===item.id&&row?.ordinal===i+1&&row?.body_length_chars===item.obligation.length&&row?.source_expression_statement_count===(item.source_expression_census?.statements?.length||0)&&row?.stage_authority===false,"151 line by line coverage row "+item.id);
  if(WI.includes(item.id)){wcnt++;ck(row?.source_fidelity_this_cycle==="DIRECT_W01_ARXIV_V2_EXISTING_ITEM_PRIMARY_SOURCE_REVIEW"&&row?.source_locator_this_review===review.rows.find(x=>x.census_id===item.id)?.source_locator&&row?.source_revision_bytes_equal_to_oct3_freeze==="NOT_ESTABLISHED","W01 44 reviewed rows "+item.id)}
  else ck(equal(row,prior),"other 107 coverage row untouched "+item.id);
 }
 ck(wcnt===44&&review?.counts?.existing_W01_items_source_compared===44&&review?.counts?.structured_source_expression_incidents_added===50&&review?.counts?.other_W_source_rows_still_pending===69&&review?.counts?.full_source_W01_exhaustiveness_certified===false,"44 review record no false full source completeness");
 for(let i=0;i<44;i++){const row=review.rows[i],v=sourceId(S,row.census_id);
  ck(row.frozen_current_body_exact===v.obligation&&row.source_locator?.includes("printed")&&equal(row?.source_expression_statement_ids,v?.source_expression_census?.statements?.map(z=>z.id)||[])&&row.G0_closed===false&&row.qualification.includes("NOT_SOURCE_WIDE_ASSERTION_COMPLETENESS"),"44 individual direct review rows "+row.census_id);
 }
 return errors;
}
const tests=[
["drop source member",c=>c.S.items.pop()],
["drop old demand member",c=>c.D.items.pop()],
["drop register member",c=>c.Reg.rows.pop()],
["drop coverage member",c=>c.Cov.rows.pop()],
["drop W01 review member",c=>c.review.rows.pop()],
["source item reorder",c=>c.S.items.reverse()],
["false SSC seal",c=>c.S.closure_claims.sealed=true],
["G1 premature",c=>c.S.correction.G1_authorized=true],
["wrong predecessor source blob",c=>c.S.predecessor.git_blob_sha="BAD"],
["wrong correction source scope",c=>c.S.correction.changed_W_census_ids.pop()],
["wrong one non-W01 source",c=>sourceId(c.S,"W-SSC-097").obligation+="BAD"],
["replace W026 q binder",c=>sourceId(c.S,"W-SSC-026").source_expression_census.statements[3].lhs="|q|^2"],
["replace W026 conjugation",c=>sourceId(c.S,"W-SSC-026").source_expression_census.statements[3].rhs.ordered_factors[1]="KAPPA(x)"],
["restore W026 false positive prose",c=>sourceId(c.S,"W-SSC-026").obligation=sourceId(c.S,"W-SSC-026").obligation.replace("quaternion norm x conjugate(x)","x KAPPA(x)")],
["Mink norm sign",c=>sourceId(c.S,"W-SSC-028").source_expression_census.statements[0].norm="x0^2-x1^2"],
["split matrix row sign",c=>sourceId(c.S,"W-SSC-028").source_expression_census.statements[1].matrix[1][0]="x1+x2"],
["Mink adjoint omitted",c=>sourceId(c.S,"W-SSC-028").source_expression_census.statements[3].output.ordered_factors[0]="INVERSE(g)"],
["split source right inverse removed",c=>sourceId(c.S,"W-SSC-028").source_expression_census.statements[4].output.ordered_factors[2]="g_R"],
["Palatini wedge order",c=>sourceId(c.S,"W-SSC-029").source_expression_census.statements[0].ordered_factors[4]="TENSOR"],
["Palatini variation swapped",c=>sourceId(c.S,"W-SSC-029").source_expression_census.statements[1].varied="e^A"],
["chiral Hodge R/L swapped",c=>sourceId(c.S,"W-SSC-030").source_expression_census.statements[2].spinor_roles[0].carrier="Hom(S_L,S_L)"],
["chiral curvature component omitted",c=>sourceId(c.S,"W-SSC-030").source_expression_census.statements[3].rhs.pop()],
["Einstein primary - R to - L",c=>sourceId(c.S,"W-SSC-031").source_expression_census.statements[0].required_equation="Omega_(-,L)(omega)=0"],
["Einstein implied +L to +R",c=>sourceId(c.S,"W-SSC-031").source_expression_census.statements[1].consequence="Omega_(+,R)=0"],
["half-flat conflated with vacuum",c=>sourceId(c.S,"W-SSC-031").source_expression_census.statements[2].consequence="VACUUM_EINSTEIN"],
["spinor determinant conjugation removed",c=>sourceId(c.S,"W-SSC-034").source_expression_census.statements[0].rhs.right="(Lambda^2(C^2))^(1/2)"],
["spinor determinant half exponent changed",c=>sourceId(c.S,"W-SSC-034").source_expression_census.statements[1].rhs.right="(Lambda^2(CONJUGATE(C2)))^1"],
["rank3 quotient recast as tangent",c=>sourceId(c.S,"W-SSC-036").source_expression_census.statements[1].quotient="TANGENT"],
["U1 quotient weight sign",c=>sourceId(c.S,"W-SSC-036").source_expression_census.statements[2].on_quotient="+1/3"],
["quark hypercharge order",c=>sourceId(c.S,"W-SSC-037").source_expression_census.statements[1].rhs.reverse()],
["quark uR dR source role swapped",c=>sourceId(c.S,"W-SSC-037").source_expression_census.statements[2].particles.reverse()],
["fraction action denominator wrong",c=>sourceId(c.S,"W-SSC-048").source_expression_census.statements[1].output.product[1]="INVERSE(B*Z)"],
["nullness unconditional",c=>sourceId(c.S,"W-SSC-049").source_expression_census.statements[0].premise="NONE"],
["Ward duality sign wrong",c=>sourceId(c.S,"W-SSC-050").source_expression_census.statements[1].rhs="+F_A"],
["Ward trivial-on-lines removed",c=>sourceId(c.S,"W-SSC-050").source_expression_census.statements[2].must_be_trivial="NONE"],
["source six-orbit normalized five",c=>sourceId(c.S,"W-SSC-052").source_expression_census.statements[0].source_claimed_orbits=5],
["invent sixth source orbit",c=>sourceId(c.S,"W-SSC-052").source_expression_census.statements[0].source_explicitly_listed_orbits.push("M_+-")],
["projective pseudoreal map conjugation dropped",c=>sourceId(c.S,"W-SSC-053").source_expression_census.statements[0].output[0]="-s2"],
["projective pseudoreal vector sign normalized",c=>sourceId(c.S,"W-SSC-053").source_expression_census.statements[1].on_T="sigma^2=+1"],
["OS tau sign changed",c=>sourceId(c.S,"W-SSC-054").source_expression_census.statements[0].support_condition="tau>0"],
["OS null quotient altered",c=>sourceId(c.S,"W-SSC-054").source_expression_census.statements[2].denominator="ALL_F"],
["hyperfunction global psi weakened",c=>sourceId(c.S,"W-SSC-056").source_expression_census.statements[1].psi_domain="LOCAL_HOLOMORPHIC"],
["hyperfunction boundary plus/minus swapped",c=>sourceId(c.S,"W-SSC-056").source_expression_census.statements[2].orientation.reverse()],
["old demand unrelated edited",c=>demandId(c.D,"W-SSC-103").body+="BAD"],
["old source-dmd concurrently altered",c=>{sourceId(c.S,"W-SSC-031").obligation+="BAD";demandId(c.D,"W-SSC-031").body+="BAD";c.Reg.rows.find(x=>x.census_id==="W-SSC-031").source_body_exact+="BAD"}],
["changed demand source formula omitted",c=>demandId(c.D,"W-SSC-031").source_formula_incidences.pop()],
["source-to-demand revision pin altered",c=>c.D.current_source.git_blob_sha="BAD"],
["register G0 premature closure",c=>c.Reg.rows.find(x=>x.census_id==="W-SSC-026").historical_closure_accepted_as_current=true],
["register 52 old incompletes ignored",c=>c.Reg.counts.historical_modes_by_membership.OUT__INCOMPLETE_UNEXPANDED=0],
["register source body faked",c=>c.Reg.rows.find(x=>x.census_id==="W-SSC-026").source_body_exact="BAD"],
["review W01 row omitted",c=>c.review.rows=c.review.rows.filter(x=>x.census_id!=="W-SSC-052")],
["review source page locator shifted",c=>c.review.rows.find(x=>x.census_id==="W-SSC-052").source_locator="printed p.1"],
["coverage direct review exaggerated to 151",c=>c.Cov.counts.total_direct_current_source_source_semantic_body_reviews=151],
["coverage source pending zero",c=>c.Cov.counts.source_rows_remaining_cold_audit=0],
["W02 row marked reviewed without source",c=>c.Cov.rows.find(x=>x.census_id==="W-SSC-151").source_fidelity_this_cycle="PASS_SOURCE"],
["source Oracle version false",c=>c.oracle.source.revision="arXiv:2104.05099v1"],
["independent oracle altered orbit assertion",c=>c.oracle.frozen_literal_witnesses.find(x=>x.id==="W01-052-ORB-M-01").listed.push("M_+-")],
["independent oracle changed x binder",c=>c.oracle.frozen_literal_witnesses.find(x=>x.id==="W01-026-QUATNORM-04").binder="q"],
["review falsely claims full W01 source corpus done",c=>c.review.counts.full_source_W01_exhaustiveness_certified=true],
["review drops existing W01 statement",c=>c.review.rows.find(x=>x.census_id==="W-SSC-028").source_expression_statement_ids.pop()],
["old W01 not in 86 roster",c=>c.D.items.find(x=>x.census_id==="W-SSC-028").census_id="W-SSC-066"],
["L leak into W only demand",c=>c.D.items[0].track="L"]
];
const errors=check(obj),rejected=[],escaped=[];
for(const [label,fn] of tests){try{const v=clone(obj);fn(v);if(check(v).length)rejected.push(label);else escaped.push(label)}catch(e){escaped.push('THREW_'+label+' '+String(e))}}
for(const [key,path] of Object.entries(PATHS))if(sha(path)!==H[key])errors.push('SOURCE_BLOB_SHA_MISMATCH '+key);
errors.push(...escaped.map(x=>'ESCAPED_MUTATION '+x));
console.log(JSON.stringify({schema:'isograph.exp062-w01-g0-44-source-review-verifier.v0.1',pass:errors.length===0,errors,current_source:'arXiv:2104.05099v2',source_items:151,W01_existing_items_direct_source_reviewed:44,W01_changed:15,W01_source_expression_statements:50,nonW01_source_items_untouched:107,all_other_source_items_untouched:136,historical_W86_members:86,W86_demand_other_unchanged:71,cumulative_existing_item_source_reviewed:82,other_existing_source_items_pending:69,G0_frozen:false,G1_to_G7_authorized:false,mutations_total:tests.length,mutations_rejected:rejected.length,rejected,third_party:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(errors.length)process.exitCode=1;
