import fs from 'node:fs';
const corpus=JSON.parse(fs.readFileSync('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json','utf8'));
const extraction=JSON.parse(fs.readFileSync('experiments/062/L_EXTRACTION_RECONCILED_0_21.json','utf8'));
const bodies=new Map(corpus.items.filter(x=>x.track==='L').map(x=>[x.census_id,x.body]));
const nmap=new Map(extraction.items.map(x=>[x.census_id,x]));
const Q=(id,kind,source,rel,args,note)=>({census_id:id,kind,source_span:source,relation_span:rel,argument_spans:args,note});
const candidates=[
  {
    "census_id": "L-SSC-027",
    "kind": "PREFIX_APPLICATION",
    "source_span": "dA",
    "relation_span": "d",
    "argument_spans": [
      "A"
    ],
    "note": "Source-visible compact d application in the curvature formula."
  },
  {
    "census_id": "L-SSC-032",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 omega",
    "relation_span": "1/2 omega",
    "argument_spans": [
      "1/2",
      "omega"
    ],
    "note": "Ordered adjacency on the H1 RHS."
  },
  {
    "census_id": "L-SSC-032",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/4 e phi",
    "relation_span": "1/4 e phi",
    "argument_spans": [
      "1/4",
      "e",
      "phi"
    ],
    "note": "Ordered adjacency on the H1 RHS."
  },
  {
    "census_id": "L-SSC-039",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "e e phi^2 term",
    "relation_span": "e e phi^2",
    "argument_spans": [
      "e",
      "e",
      "phi^2"
    ],
    "note": "Ordered source term inside the gravitational contribution."
  },
  {
    "census_id": "L-SSC-039",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "e Dphi",
    "relation_span": "e Dphi",
    "argument_spans": [
      "e",
      "Dphi"
    ],
    "note": "Ordered source term in the mixed expression."
  },
  {
    "census_id": "L-SSC-039",
    "kind": "PREFIX_APPLICATION",
    "source_span": "Dphi",
    "relation_span": "D",
    "argument_spans": [
      "phi"
    ],
    "note": "Source-visible D application."
  },
  {
    "census_id": "L-SSC-040",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "xPhi xPhi contribution",
    "relation_span": "xPhi xPhi",
    "argument_spans": [
      "xPhi",
      "xPhi"
    ],
    "note": "Ordered self-juxtaposition in the F2 contribution."
  },
  {
    "census_id": "L-SSC-052",
    "kind": "PREFIX_APPLICATION",
    "source_span": "dH",
    "relation_span": "d",
    "argument_spans": [
      "H"
    ],
    "note": "Source-visible compact d application in the curvature formula."
  },
  {
    "census_id": "L-SSC-055",
    "kind": "PREFIX_APPLICATION",
    "source_span": "D*F",
    "relation_span": "D",
    "argument_spans": [
      "*F"
    ],
    "note": "Source-visible compact D application around the already-exposed star form."
  },
  {
    "census_id": "L-SSC-056",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 omega",
    "relation_span": "1/2 omega",
    "argument_spans": [
      "1/2",
      "omega"
    ],
    "note": "Ordered adjacency on the broken connection RHS."
  },
  {
    "census_id": "L-SSC-056",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/4 E",
    "relation_span": "1/4 E",
    "argument_spans": [
      "1/4",
      "E"
    ],
    "note": "Ordered adjacency on the broken connection RHS."
  },
  {
    "census_id": "L-SSC-056",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "e' phi",
    "relation_span": "e' phi",
    "argument_spans": [
      "e'",
      "phi"
    ],
    "note": "Ordered adjacency in the simple-bivector ansatz."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "SOURCE_SUBTRACTION",
    "source_span": "R-1/8 Sigma' phi^2",
    "relation_span": "-",
    "argument_spans": [
      "R",
      "1/8 Sigma' phi^2"
    ],
    "note": "Binary source subtraction in the gravitational sector."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/8 Sigma' phi^2",
    "relation_span": "1/8 Sigma' phi^2",
    "argument_spans": [
      "1/8",
      "Sigma'",
      "phi^2"
    ],
    "note": "Ordered source term following the subtraction."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "SOURCE_SUBTRACTION",
    "source_span": "T phi-e'Dphi",
    "relation_span": "-",
    "argument_spans": [
      "T phi",
      "e'Dphi"
    ],
    "note": "Binary source subtraction in the mixed sector."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "T phi",
    "relation_span": "T phi",
    "argument_spans": [
      "T",
      "phi"
    ],
    "note": "Ordered source term on the left side of the mixed subtraction."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "e'Dphi",
    "relation_span": "e'Dphi",
    "argument_spans": [
      "e'",
      "Dphi"
    ],
    "note": "Ordered source term on the right side of the mixed subtraction."
  },
  {
    "census_id": "L-SSC-058",
    "kind": "PREFIX_APPLICATION",
    "source_span": "Dphi",
    "relation_span": "D",
    "argument_spans": [
      "phi"
    ],
    "note": "Source-visible D application in the mixed term."
  },
  {
    "census_id": "L-SSC-076",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 omega",
    "relation_span": "1/2 omega",
    "argument_spans": [
      "1/2",
      "omega"
    ],
    "note": "Ordered adjacency on the spin(11,3) connection RHS."
  },
  {
    "census_id": "L-SSC-076",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/4 e phi",
    "relation_span": "1/4 e phi",
    "argument_spans": [
      "1/4",
      "e",
      "phi"
    ],
    "note": "Ordered adjacency on the spin(11,3) connection RHS."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "SOURCE_SUBTRACTION",
    "source_span": "R-1/8 ee phi^2",
    "relation_span": "-",
    "argument_spans": [
      "R",
      "1/8 ee phi^2"
    ],
    "note": "Binary source subtraction in the first curvature sector."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/8 ee phi^2",
    "relation_span": "1/8 ee phi^2",
    "argument_spans": [
      "1/8",
      "ee",
      "phi^2"
    ],
    "note": "Ordered source term following the subtraction."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "ee phi^2",
    "relation_span": "ee phi^2",
    "argument_spans": [
      "e",
      "e",
      "phi^2"
    ],
    "note": "Ordered compact source term inside the first curvature sector."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "SOURCE_SUBTRACTION",
    "source_span": "T phi-eDphi",
    "relation_span": "-",
    "argument_spans": [
      "T phi",
      "eDphi"
    ],
    "note": "Binary source subtraction in the mixed curvature sector."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "T phi",
    "relation_span": "T phi",
    "argument_spans": [
      "T",
      "phi"
    ],
    "note": "Ordered left term of the mixed subtraction."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "eDphi",
    "relation_span": "eDphi",
    "argument_spans": [
      "e",
      "Dphi"
    ],
    "note": "Ordered right term of the mixed subtraction."
  },
  {
    "census_id": "L-SSC-077",
    "kind": "PREFIX_APPLICATION",
    "source_span": "Dphi",
    "relation_span": "D",
    "argument_spans": [
      "phi"
    ],
    "note": "Source-visible D application in the mixed curvature term."
  },
  {
    "census_id": "L-SSC-089",
    "kind": "PREFIX_APPLICATION",
    "source_span": "curvature contains F, Dpsi, and a quadratic psi psi term",
    "relation_span": "Dpsi",
    "argument_spans": [
      "psi"
    ],
    "note": "First source occurrence of the compact Dpsi term."
  },
  {
    "census_id": "L-SSC-089",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "quadratic psi psi term",
    "relation_span": "psi psi",
    "argument_spans": [
      "psi",
      "psi"
    ],
    "note": "Ordered repeated-psi term marked quadratic by the source."
  },
  {
    "census_id": "L-SSC-089",
    "kind": "PREFIX_APPLICATION",
    "source_span": "with Dpsi matching the source's covariant Dirac derivative",
    "relation_span": "Dpsi",
    "argument_spans": [
      "psi"
    ],
    "note": "Second source occurrence of Dpsi in the matching statement."
  },
  {
    "census_id": "L-SSC-095",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "i gamma_0",
    "relation_span": "i gamma_0",
    "argument_spans": [
      "i",
      "gamma_0"
    ],
    "note": "Ordered source RHS for U_P."
  },
  {
    "census_id": "L-SSC-096",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "i gamma_2 K",
    "relation_span": "i gamma_2 K",
    "argument_spans": [
      "i",
      "gamma_2",
      "K"
    ],
    "note": "Ordered source RHS for U_C."
  },
  {
    "census_id": "L-SSC-096",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "gamma_13 K",
    "relation_span": "gamma_13 K",
    "argument_spans": [
      "gamma_13",
      "K"
    ],
    "note": "Ordered source RHS for U_T."
  },
  {
    "census_id": "L-SSC-109",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "-1/2(1+e1+e2+e3)",
    "relation_span": "-1/2(1+e1+e2+e3)",
    "argument_spans": [
      "-1/2",
      "(1+e1+e2+e3)"
    ],
    "note": "Ordered signed coefficient and parenthesized source expression."
  },
  {
    "census_id": "L-SSC-112",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "-i sigma_pi",
    "relation_span": "-i sigma_pi",
    "argument_spans": [
      "-i",
      "sigma_pi"
    ],
    "note": "Ordered signed source RHS in the Pauli realization."
  },
  {
    "census_id": "L-SSC-114",
    "kind": "NAMED_APPLICATION",
    "source_span": "tilde(psi_HL)",
    "relation_span": "tilde",
    "argument_spans": [
      "psi_HL"
    ],
    "note": "Named source application; conjugation semantics are not imported."
  },
  {
    "census_id": "L-SSC-114",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "tilde(psi_HL) psi_HL",
    "relation_span": "tilde(psi_HL) psi_HL",
    "argument_spans": [
      "tilde(psi_HL)",
      "psi_HL"
    ],
    "note": "Ordered source product-like invariant expression."
  },
  {
    "census_id": "L-SSC-114",
    "kind": "NAMED_APPLICATION",
    "source_span": "det(psi_QL)",
    "relation_span": "det",
    "argument_spans": [
      "psi_QL"
    ],
    "note": "Named source determinant application; external determinant semantics are not imported."
  },
  {
    "census_id": "L-SSC-114",
    "kind": "NAMED_APPLICATION",
    "source_span": "bar(Psi)",
    "relation_span": "bar",
    "argument_spans": [
      "Psi"
    ],
    "note": "Named source bar application; conjugation semantics are not imported."
  },
  {
    "census_id": "L-SSC-114",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "bar(Psi)Psi",
    "relation_span": "bar(Psi)Psi",
    "argument_spans": [
      "bar(Psi)",
      "Psi"
    ],
    "note": "Ordered source scalar expression."
  },
  {
    "census_id": "L-SSC-115",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "-K e3",
    "relation_span": "-K e3",
    "argument_spans": [
      "-K",
      "e3"
    ],
    "note": "Ordered signed source RHS for P."
  },
  {
    "census_id": "L-SSC-115",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "-K e2",
    "relation_span": "-K e2",
    "argument_spans": [
      "-K",
      "e2"
    ],
    "note": "Ordered signed source RHS for T."
  },
  {
    "census_id": "L-SSC-116",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "-1/2(1+e1+e2+e3)",
    "relation_span": "-1/2(1+e1+e2+e3)",
    "argument_spans": [
      "-1/2",
      "(1+e1+e2+e3)"
    ],
    "note": "Ordered signed coefficient and parenthesized source expression."
  },
  {
    "census_id": "L-SSC-116",
    "kind": "NAMED_APPLICATION",
    "source_span": "ad_t",
    "relation_span": "ad",
    "argument_spans": [
      "t"
    ],
    "note": "Named source ad_t construction; adjoint semantics are not imported."
  },
  {
    "census_id": "L-SSC-119",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "4 omega_S h q",
    "relation_span": "4 omega_S h q",
    "argument_spans": [
      "4",
      "omega_S",
      "h",
      "q"
    ],
    "note": "Ordered source RHS of the omega_t relation."
  },
  {
    "census_id": "L-SSC-129",
    "kind": "NAMED_APPLICATION",
    "source_span": "T(v,psi,chi)",
    "relation_span": "T",
    "argument_spans": [
      "v",
      "psi",
      "chi"
    ],
    "note": "Named triality-form application with source-visible ordered arguments."
  },
  {
    "census_id": "L-SSC-130",
    "kind": "NAMED_APPLICATION",
    "source_span": "sqrt(s_u)",
    "relation_span": "sqrt",
    "argument_spans": [
      "s_u"
    ],
    "note": "Named source sqrt application used in signature factors; external square-root semantics are not imported."
  },
  {
    "census_id": "L-SSC-139",
    "kind": "NAMED_APPLICATION",
    "source_span": "Tri(D')",
    "relation_span": "Tri",
    "argument_spans": [
      "D'"
    ],
    "note": "Named source Tri application in the magic-square decomposition."
  },
  {
    "census_id": "L-SSC-139",
    "kind": "NAMED_APPLICATION",
    "source_span": "Tri(D)",
    "relation_span": "Tri",
    "argument_spans": [
      "D"
    ],
    "note": "Named source Tri application in the magic-square decomposition."
  },
  {
    "census_id": "L-SSC-160",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 omega",
    "relation_span": "1/2 omega",
    "argument_spans": [
      "1/2",
      "omega"
    ],
    "note": "Ordered coefficient/connection term."
  },
  {
    "census_id": "L-SSC-160",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "e phi_S",
    "relation_span": "e phi_S",
    "argument_spans": [
      "e",
      "phi_S"
    ],
    "note": "Ordered source RHS of E."
  },
  {
    "census_id": "L-SSC-160",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "R+EE",
    "relation_span": "EE",
    "argument_spans": [
      "E",
      "E"
    ],
    "note": "Compact repeated-E source term inside the curvature split."
  },
  {
    "census_id": "L-SSC-168",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 omega",
    "relation_span": "1/2 omega",
    "argument_spans": [
      "1/2",
      "omega"
    ],
    "note": "Ordered coefficient/connection term."
  },
  {
    "census_id": "L-SSC-168",
    "kind": "NAMED_APPLICATION",
    "source_span": "Lie(H)",
    "relation_span": "Lie",
    "argument_spans": [
      "H"
    ],
    "note": "Named source Lie application in the component-value mapping."
  },
  {
    "census_id": "L-SSC-168",
    "kind": "NAMED_APPLICATION",
    "source_span": "Lie(G0/H)",
    "relation_span": "Lie",
    "argument_spans": [
      "G0/H"
    ],
    "note": "Named source Lie application in the component-value mapping."
  },
  {
    "census_id": "L-SSC-168",
    "kind": "NAMED_APPLICATION",
    "source_span": "Lie(G/G0)",
    "relation_span": "Lie",
    "argument_spans": [
      "G/G0"
    ],
    "note": "Named source Lie application in the component-value mapping."
  },
  {
    "census_id": "L-SSC-169",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 R",
    "relation_span": "1/2 R",
    "argument_spans": [
      "1/2",
      "R"
    ],
    "note": "Ordered source term in generalized Cartan curvature."
  },
  {
    "census_id": "L-SSC-169",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "1/2 R+EE",
    "relation_span": "EE",
    "argument_spans": [
      "E",
      "E"
    ],
    "note": "Compact repeated-E source term inside the parenthesized curvature component."
  },
  {
    "census_id": "L-SSC-169",
    "kind": "PREFIX_APPLICATION",
    "source_span": "DE",
    "relation_span": "D",
    "argument_spans": [
      "E"
    ],
    "note": "Source-visible compact D application in generalized Cartan curvature."
  },
  {
    "census_id": "L-SSC-176",
    "kind": "PREFIX_APPLICATION",
    "source_span": "covariant fermion derivative D Psi",
    "relation_span": "D",
    "argument_spans": [
      "Psi"
    ],
    "note": "Source-visible D application named a covariant fermion derivative."
  },
  {
    "census_id": "L-SSC-176",
    "kind": "ORDERED_JUXTAPOSITION",
    "source_span": "quadratic Psi Psi terms",
    "relation_span": "Psi Psi",
    "argument_spans": [
      "Psi",
      "Psi"
    ],
    "note": "Ordered repeated-Psi source term marked quadratic by the source."
  }
];
const rows=[];
for(let i=0;i<candidates.length;i++){
 const q=candidates[i],body=bodies.get(q.census_id),it=nmap.get(q.census_id);
 if(!body||!it)throw new Error('missing '+q.census_id);
 if(!body.includes(q.source_span)||body.indexOf(q.source_span)!==body.lastIndexOf(q.source_span))throw new Error('source '+q.census_id+' '+q.source_span);
 if(!q.source_span.includes(q.relation_span))throw new Error('relation '+q.census_id+' '+q.relation_span);
 for(const a of q.argument_spans)if(!q.source_span.includes(a))throw new Error('arg '+q.census_id+' '+a);
 const exact=it.occurrences.filter(o=>o.source_span===q.source_span&&o.relation_span===q.relation_span&&JSON.stringify(o.argument_spans)===JSON.stringify(q.argument_spans)).map(o=>o.occurrence_id);
 rows.push({candidate_id:'L-COP-'+String(i+1).padStart(3,'0'),...q,exact_existing_occurrence_ids:exact,review_state:exact.length?'ALREADY_EXPLICIT_RELATION':'SOURCE_LOCAL_REVIEW_REQUIRED'});
}
const artifact={schema:'isograph.exp062-l-g1-compact-operator-frontier.v0.1',date:'2026-10-06',status:'DIAGNOSTIC_SOURCE_ONLY_COMPACT_OPERATOR_FRONTIER_NOT_G1_COMPLETENESS',authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',extraction_contract:'experiments/062/OCCURRENCE_EXTRACTION_PROMPT_0_2.md',source_corpus:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json',extraction:'experiments/062/L_EXTRACTION_RECONCILED_0_21.json',purpose:'Freeze source-visible compact applications, explicit source subtraction, ordered juxtaposition, and named constructor/application forms left after the symbol-token frontier. This is diagnostic extraction evidence only; it imports no conventional mathematical semantics.',guards:['Every candidate source_span/relation_span/argument_span is an exact contiguous frozen-body substring.','PREFIX_APPLICATION and NAMED_APPLICATION preserve only the source-visible operator name and ordered argument spelling; they do not import textbook behavior.','ORDERED_JUXTAPOSITION preserves source-visible ordered incidence only; it does not assert multiplication.','SOURCE_SUBTRACTION is admitted only where a hyphen is source-locally delimited between two formula terms, not in prose, identifiers, signatures, or names.','Already explicit occurrences are recorded rather than duplicated.','This frontier does not establish G1 completeness and does not authorize G2.'],counts:{candidates:rows.length,affected_bodies:new Set(rows.map(x=>x.census_id)).size,already_explicit:rows.filter(x=>x.review_state==='ALREADY_EXPLICIT_RELATION').length,review_required:rows.filter(x=>x.review_state==='SOURCE_LOCAL_REVIEW_REQUIRED').length},candidates:rows};
fs.writeFileSync('experiments/062/L_G1_COMPACT_OPERATOR_FRONTIER_0_1.json',JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({pass:true,counts:artifact.counts},null,2));
