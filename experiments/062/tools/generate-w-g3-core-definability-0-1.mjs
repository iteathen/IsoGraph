import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const graphPath='experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const waiverPath='experiments/062/G1_OWNER_COLD_AUDIT_WAIVER_0_1.json';
const outputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_1.json';
const methodPath='research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md';
const core17='CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md';
const core20='CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md';
const core21='CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md';
const qual20='qualification/CORE_0_20_QUALIFICATION.md';
const qual21='qualification/CORE_0_21_QUALIFICATION.md';

const extraction=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const graph=JSON.parse(fs.readFileSync(graphPath,'utf8'));
const waiver=JSON.parse(fs.readFileSync(waiverPath,'utf8'));
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();

if(extraction.track!=='W'||graph.track!=='W') throw new Error('W track mismatch');
if(extraction.items.length!==84) throw new Error('expected 84 W bodies');
if(graph.counts?.semantic_occurrence_nodes!==425) throw new Error('expected 425 W G2 occurrence nodes');
if(graph.next_stage!=='G3_QUALIFIED_CORE_DEFINABILITY_PASS') throw new Error('G2 does not route to G3');
if(waiver.gate_ruling?.G2_authorized_for_this_campaign!==true) throw new Error('campaign G2/G3 gate unavailable');

const graphNodeByOccurrence=new Map();
for(const item of graph.items||[]) for(const n of item.graph?.nodes||[]) {
  if(n.kind==='OPAQUE_SEMANTIC_OCCURRENCE') graphNodeByOccurrence.set(n.provenance?.occurrence_id,n.node_id);
}

const simpleIdentifier=s=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(s);
const exactInteger=s=>/^-?[0-9]+$/.test(s);
const primitiveLiteralAssignment=o=>
  o.relation_span==='=' &&
  o.logical_force==='EQUALITY_OR_IDENTIFICATION' &&
  (o.argument_spans||[]).length===2 &&
  simpleIdentifier(o.argument_spans[0]) &&
  exactInteger(o.argument_spans[1]);

const operationSpans=new Set([
  '+','-','*','/','^','x','×','wedge','∧','integral','∫','exp','Tr','Hom','Hom_C','H^1','Lambda^2',
  'conjugate','tensor','dot','KAPPA','exterior powers'
]);

const items=[];
let coreClosed=0, unexpanded=0;
for(const sourceItem of extraction.items){
  const outItem={census_id:sourceItem.census_id,occurrences:[]};
  for(const o of sourceItem.occurrences||[]){
    const g2NodeId=graphNodeByOccurrence.get(o.occurrence_id);
    if(!g2NodeId) throw new Error(o.occurrence_id+': missing G2 node');

    let disposition='UNEXPANDED_DEMAND';
    let closure_basis=null;
    let missing_definition_or_authority=null;
    let review_note=null;

    if(primitiveLiteralAssignment(o)){
      disposition='CORE_CLOSED';
      closure_basis='Qualified Core primitive identity/equality over one raw identifier and one exact integer literal; no domain definition is imported for this occurrence.';
      review_note='This closes only the equality occurrence. It supplies no semantics for other occurrences that may depend on the same source body.';
      coreClosed++;
    }else{
      unexpanded++;
      if(o.definition_status==='NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED'){
        missing_definition_or_authority='G1 explicitly records this occurrence as name-only/external-definition-required. No exact source-faithful lower definition is admitted under current W-only authority.';
      }else if(operationSpans.has(o.relation_span)){
        missing_definition_or_authority='The source occurrence denotes an operation with load-bearing evaluation/composition/arithmetic behavior. Core 0.20 forbids hiding that behavior in a nonlogical symbol or raw argument text; exact lower relational semantics remain unexpanded.';
      }else if(o.relation_span==='=' && o.logical_force==='EQUALITY_OR_IDENTIFICATION'){
        missing_definition_or_authority='The source notation is equality-or-identification but its arguments are not the narrow raw-identifier/exact-literal case admitted by this conservative pass. Do not collapse source identification/isomorphism conventions or structured expressions into Core/SI equality without source-faithful lower support.';
      }else{
        missing_definition_or_authority='G2 preserves this occurrence only as opaque incidence/provenance. This pass has not established that the full source-local behavior is exhausted by primitive extensional relation application, raw data, or another exact qualified-Core form.';
      }
    }

    outItem.occurrences.push({
      occurrence_id:o.occurrence_id,
      g2_node_id:g2NodeId,
      disposition,
      closure_basis,
      missing_definition_or_authority,
      source_provenance:{
        source_span:o.source_span,
        relation_span:o.relation_span,
        logical_force:o.logical_force,
        definition_status:o.definition_status,
        argument_spans:o.argument_spans,
        depends_on:o.depends_on
      },
      review_note
    });
  }
  items.push(outItem);
}

const result={
  schema:'isograph.exp062-w-g3-core-definability.v0.1',
  date:'2026-10-06',
  status:'G3_CONSERVATIVE_DEFINABILITY_PASS_OPEN',
  authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
  authority:false,
  track:'W',
  governing_method:methodPath,
  qualified_authority:{
    cumulative_core:[
      {path:core17,git_blob_sha:blob(core17)},
      {path:core20,git_blob_sha:blob(core20),qualification:qual20,qualification_git_blob_sha:blob(qual20)},
      {path:core21,git_blob_sha:blob(core21),qualification:qual21,qualification_git_blob_sha:blob(qual21)}
    ],
    rule:'Use exact qualified cumulative Core through 0.21 only. Familiar mathematics, historical primitive-demand categories, DNWF/DNIA, L evidence, and synthesis hypotheses are unavailable as definability authority.'
  },
  input:{
    extraction:{path:extractionPath,git_blob_sha:blob(extractionPath)},
    g2_graph:{path:graphPath,git_blob_sha:blob(graphPath)},
    campaign_waiver:{path:waiverPath,git_blob_sha:blob(waiverPath)}
  },
  semantics:{
    disposition_vocabulary:[
      'CORE_CLOSED',
      'CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION',
      'QUALIFIED_QU_BOUNDARY_CANDIDATE',
      'UNEXPANDED_DEMAND'
    ],
    conservative_rule:'Only unambiguous primitive literal assignments identifier=integer close automatically in 0.1. Every other occurrence remains unresolved unless exact W-only source-faithful lower support is positively established in a later adjudication pass.',
    nonimplications:[
      'UNEXPANDED_DEMAND does not prove that a new primitive is required.',
      'UNEXPANDED_DEMAND does not authorize QU by itself.',
      'Shared disposition does not create a G4 quotient class.',
      'Source relation spelling does not create a primitive/category class.',
      'CORE_CLOSED here closes only the named occurrence under the stated basis; it does not close dependencies or the enclosing W body.'
    ]
  },
  counts:{
    bodies:84,
    occurrences:425,
    CORE_CLOSED:coreClosed,
    CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,
    QUALIFIED_QU_BOUNDARY_CANDIDATE:0,
    UNEXPANDED_DEMAND:unexpanded
  },
  items,
  fixed_point:{
    G3_complete:false,
    reason:'The 0.1 pass is intentionally conservative. All nontrivial/ambiguous occurrences remain UNEXPANDED_DEMAND pending source-local definability adjudication under exact qualified Core.',
    G4_authorized:false
  },
  next_required_steps:[
    'Adjudicate the remaining W UNEXPANDED_DEMAND occurrences source-locally against exact qualified Core, without L evidence or historical candidate-basis categories.',
    'Promote an occurrence to CORE_CLOSED only when its full load-bearing behavior is represented by primitive logic/raw incidence and exact reconstruction is preserved.',
    'Use CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION only for an all-and-only finite generating schema that still requires qualification.',
    'Use QUALIFIED_QU_BOUNDARY_CANDIDATE only when the frozen W source itself contains genuinely unresolved structured possibility and qualified QU semantics are applicable.',
    'Do not begin G4 until a complete W G3 pass has no unreviewed definability question.'
  ]
};

fs.writeFileSync(outputPath,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:result.counts},null,2));
