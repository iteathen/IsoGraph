// Independent ORIGINAL PDF layout re-extraction for L02 G0.
// Every frozen-source nonblank extracted line must survive in a uniquely addressed,
// SHA-verified source block, independent of existing SSC/source-ledger partitions.
// Blocks are NOT semantic occurrences, and no G0/G1 stage gate is promoted.
import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={manifest:P+'LISI_L02_FROZEN_12_PAGE_ORIGINAL_LAYOUT_ATOMIC_COVERAGE_0_1.json',
 inv:P+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_6.json',
 ssc:P+'SOURCE_SEMANTIC_CENSUS_0_62.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_12.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_13.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_100.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_101.json',
 self:E+'tools/verify-l-g0-l02-full-original-layout-inventory-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const fileSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const h=Object.fromEntries(Object.entries(F).map(([k,p])=>[k,fileSHA(p)]));
const D=Object.fromEntries(Object.entries(F).filter(([k])=>k!=='self').map(([k,p])=>[k,read(p)]));
function originalPagePartition(page,raw){
 const lines=raw.replaceAll('\r','').replace(/\f+$/g,'').split('\n');
 const blocks=[],nonempty=[],blank=[];
 let start=null,buffer=[];
 const flush=end=>{
  if(start===null)return;
  const text=buffer.join('\n'),tokens=text.match(/\S+/g)||[];
  blocks.push({atom_id:'L02-P'+String(page).padStart(2,'0')+'-B'+String(blocks.length+1).padStart(3,'0'),
   pdf_page_zero_based:page-1,within_page_block_ordinal:blocks.length+1,
   extracted_source_first_line_start:start+1,extracted_source_first_line_end:end,
   original_extracted_text_SHA256:sha(Buffer.from(text)),exact_nonblank_line_count:buffer.length,
   characters:text.length,tokens:tokens.length,
   apparent_numbered_equation_label_candidates:[...new Set([...text.matchAll(/\(\s*(?:[1-9]|[12]\d|30)\s*\)/g)].map(x=>x[0].replace(/[\s()]/g,'')))]});
  start=null;buffer=[];
 };
 for(let n=0;n<lines.length;n++){
  const line=lines[n],occupied=line.trim().length>0;
  if(occupied){nonempty.push(n+1);if(start===null)start=n;buffer.push(line);}
  else{blank.push(n+1);flush(n);}
 }
 flush(lines.length);
 return {page_zero_based:page-1,source_extracted_text_SHA256:sha(Buffer.from(raw)),
 extracted_total_lines:lines.length,nonblank_lines:nonempty.length,blank_lines:blank.length,
 original_first_blocks:blocks.length,blocks};
}
function check(d,observed){
 const bad=[],t=(yes,msg)=>{if(!yes)bad.push(msg);};
 const {manifest:m,inv:i,ssc:n,oldReg:or,reg:r,oldGate:og,gate:g}=d;
 const frozen='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a';
 t(m?.schema==='isograph.track-L.G0.L02-original-PDF-source-layout-block-first.v0.1'&&m?.track==='L'&&m?.stage==='G0','original PDF source layout structure');
 t(m?.source?.revision==='arXiv:1004.4866v2'&&m?.source?.SHA256===frozen&&m?.source?.raw_pdf_bytes===179663&&m?.source?.page_count===12,'frozen original PDF revision/binary provenance');
 t(m?.extraction_provenance?.run_id===38085924026&&m?.extraction_provenance?.head_sha==='973b49823dab3edb3f935cf01010dd61451e50c1'&&m?.extraction_provenance?.hostiles_rejected===13,'previous independently original-first source extractor CI');
 t(m?.source_first_scope?.original_L02_ownership_not_yet_refined_to_each_text_block===true&&m?.source_first_scope?.existing_original_first_inventory_blob_sha===h.inv,'page-level candidates not semantic evidence');
 t(m?.original_first_block_count===81&&m?.original_extracted_nonblank_lines===614&&m?.original_source_layout_blocks_reviewed_for_full_semantic_correspondence===0&&m?.original_source_layout_blocks_unreviewed===81,'finite source-original 81/614 denominator not artificially closed');
 t(m?.source_own_claimed_global_semantic_completeness===false&&m?.original_source_whole_PDF_cold_review_complete===false&&m?.G0_frozen===false&&m?.G1_authorized===false&&m?.W_semantics_imported===false,'no G0/G1/W promotion from source layout only');
 t(Array.isArray(m?.pages)&&m.pages.length===12&&Array.isArray(observed)&&observed.length===12,'all 12 actual original PDF pages');
 let blocks=0,nonblank=0;
 const ids=new Set,got=new Set,expectedGroups=new Set(i?.source_first_locations?.map(x=>x.source_location_id)||[]);
 const knownSSC=new Set(n?.items?.map(x=>x.id)||[]);
 t(i?.source_first_locations?.length===59&&n?.items?.length===191&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.62','original source-first and SSC frozen old authorities');
 t(expectedGroups.size===59&&knownSSC.size===191,'original source/SI distinct ID counts');
 const ownerIds=new Set;
 for(const z of i?.source_first_locations||[]){
   t(z?.pdf_pages_zero_based?.length>=1&&z?.pdf_pages_zero_based?.every(p=>Number.isInteger(p)&&p>=0&&p<12),'source group attached to frozen original source page');
   t(z?.SSC_ids?.every(id=>knownSSC.has(id)),'original source group claims valid SSC root '+z.source_location_id);
   for(const id of z.SSC_ids||[])ownerIds.add(id);
 }
 t(ownerIds.size===21,'existing 21 original L02 SSC IDs, not 191 interpreted as 21');
 for(let p=0;p<12;p++){
  const saved=m?.pages?.[p],fresh=observed[p];
  t(saved?.page_zero_based===p&&fresh?.page_zero_based===p,'source actual page order '+p);
  for(const field of ['source_extracted_text_SHA256','extracted_total_lines','nonblank_lines','blank_lines','original_first_blocks'])
    t(saved?.[field]===fresh?.[field],'fresh original PDF exact page evidence '+p+'/'+field);
  const rows=saved?.blocks||[],raw=fresh?.blocks||[];
  t(rows.length===raw.length&&rows.length===saved?.original_first_blocks,'all source page blocks present '+p);
  const expectedCandidates=(i?.source_first_locations||[]).filter(z=>z.pdf_pages_zero_based.includes(p)).map(z=>z.source_location_id);
  const key='original_pdf_page_zero_based_'+p;
  const inManifest=m?.candidate_source_first_groups_by_original_page?.[key]||[];
  t(expectedCandidates.length>0&&JSON.stringify(inManifest)===JSON.stringify(expectedCandidates),'all pre-existing page-level source candidate memberships conserved '+p);
  const covered=new Set;
  for(let j=0;j<rows.length;j++){
    const savedBlock=rows[j],observedBlock=raw[j];
    for(const field of ['atom_id','pdf_page_zero_based','within_page_block_ordinal','extracted_source_first_line_start','extracted_source_first_line_end','original_extracted_text_SHA256','exact_nonblank_line_count','characters','tokens'])
      t(savedBlock?.[field]===observedBlock?.[field],'full independent original block '+p+'/'+j+'/'+field);
    t(JSON.stringify(savedBlock?.apparent_numbered_equation_label_candidates)===JSON.stringify(observedBlock?.apparent_numbered_equation_label_candidates),'original printed label layout '+p+'/'+j);
    const sourceId='L02-P'+String(p+1).padStart(2,'0')+'-B'+String(j+1).padStart(3,'0');
    t(savedBlock?.atom_id===sourceId&&!ids.has(sourceId),'unique original-first atomic locator '+sourceId);
    ids.add(sourceId);
    t(JSON.stringify(savedBlock?.possible_source_first_ids_on_same_original_page)===JSON.stringify(expectedCandidates),'page-level source owner candidates '+sourceId);
    t(savedBlock?.source_semantic_review_disposition==='ORIGINAL_TEXT_LAYOUT_ATOM_ONLY_SEMANTIC_ADJUDICATION_PENDING'&&savedBlock?.precise_source_to_SSC_disposition_qualified===false,'not falsely semantics closed '+sourceId);
    const first=savedBlock?.extracted_source_first_line_start,last=savedBlock?.extracted_source_first_line_end;
    if(Number.isInteger(first)&&Number.isInteger(last)&&first>=1&&last>=first&&last<=saved?.extracted_total_lines){
      for(let line=first;line<=last;line++){t(!covered.has(line),'no duplicate original source nonempty text line '+sourceId);covered.add(line);}
      t(last-first+1===savedBlock?.exact_nonblank_line_count,'source original block complete line span '+sourceId);
    }else t(false,'invalid original source text line range '+sourceId);
    blocks++;nonblank+=savedBlock?.exact_nonblank_line_count||0;
    for(const id of savedBlock?.possible_source_first_ids_on_same_original_page||[])got.add(id);
  }
  t(covered.size===saved?.nonblank_lines,'complete source PDF nonblank page line coverage '+p);
 }
 t(blocks===81&&nonblank===614&&got.size===59&&ids.size===81,'all original blocks, lines and 59 page candidate source groups');
 t(or?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.12'&&r?.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.13','convergence exact predecessor and current');
 t(r?.source_first_predecessor?.git_blob_sha===h.oldReg&&r?.current_ssc?.git_blob_sha===h.ssc,'convergence current unchanged SSC');
 t(r?.L02_complete_original_pdf_layout_partition?.git_blob_sha===h.manifest&&r?.L02_complete_original_pdf_layout_partition?.original_extracted_layout_blocks===81&&r?.L02_complete_original_pdf_layout_partition?.original_nonblank_text_lines===614,'source layout exact manifest and counts');
 t(r?.per_source?.length===6&&r?.per_source?.reduce((sum,x)=>sum+x.source_first_location_units,0)===350&&r?.per_source?.every(x=>x.original_complete_cold_review_passed===false),'other five original source groups and cold statuses conserved');
 t(r?.explicit_G0_outstanding?.L02_layout_block_exact_semantic_audit?.all_original_block_semantic_dispositions_complete===false&&r?.exit_acceptance_contract?.G0_SSC_frozen===false,'no falsified source corpus G0 closure');
 t(og?.schema==='isograph.exp062-l-current-stage-gate.v0.100'&&g?.schema==='isograph.exp062-l-current-stage-gate.v0.101'&&g?.predecessor_gate?.git_blob_sha===h.oldGate,'procedural stage exact predecessor');
 t(g?.current_source_census?.git_blob_sha===h.ssc&&g?.source_layout_manifest?.git_blob_sha===h.manifest&&g?.source_layout_verifier?.git_blob_sha===h.self&&g?.current_convergence?.git_blob_sha===h.reg&&g?.source_original_first_inventory?.git_blob_sha===h.inv,'current stage source pointer all pinned');
 t(g?.prior_layout_probe_CI?.run_id===38085924026&&g?.prior_layout_probe_CI?.conclusion==='success'&&g?.prior_layout_probe_CI?.hostiles_rejected===13,'previous layout probe CI not false semantic whole-pass');
 t(g?.current_lawful_state?.G0_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.PR70_merge_authorized===false&&g?.current_lawful_state?.cross_track_synthesis_authorized===false,'stage remain G0');
 t(g?.new_source_CI?.status==='PENDING_GITHUB_ACTIONS'&&g?.new_source_CI?.whole_cold_complete===false,'new CI not preclaimed');
 return bad;
}
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'L02-full-original-atom-verify-'));
let observed=[];
try{
 const res=await fetch('https://arxiv.org/pdf/1004.4866v2',{signal:AbortSignal.timeout(35000)});
 if(res.status!==200)throw Error('FROZEN_ORIGINAL_SOURCE_HTTP_'+res.status);
 const bytes=Buffer.from(await res.arrayBuffer());
 if(sha(bytes)!=='1c2764dc498a3b118253f97447249e58a07e7c9ff4eb7fa72a48633061bfd25a')throw Error('FROZEN_ORIGINAL_PDF_SHA256_MISMATCH');
 const pdf=path.join(dir,'frozen-v2.pdf');fs.writeFileSync(pdf,bytes);
 const info=execFileSync('pdfinfo',[pdf],{encoding:'utf8',timeout:12000});
 if(!/^Pages:\s*12$/m.test(info))throw Error('ORIGINAL_PAGE_COUNT_MISMATCH');
 for(let p=1;p<=12;p++){
  const text=execFileSync('pdftotext',['-f',String(p),'-l',String(p),'-layout','-enc','UTF-8',pdf,'-'],{encoding:'utf8',timeout:12000,maxBuffer:1800000});
  observed.push(originalPagePartition(p,text));
 }
}finally{fs.rmSync(dir,{recursive:true,force:true});}
const problems=check(D,observed),mutators=[
 ['drop_page',d=>d.manifest.pages.pop()],
 ['drop_source_block',d=>d.manifest.pages[0].blocks.pop()],
 ['alter_source_block_digest',d=>d.manifest.pages[2].blocks[0].original_extracted_text_SHA256='wrong'],
 ['shift_original_block_page',d=>d.manifest.pages[3].blocks[0].pdf_page_zero_based=5],
 ['tamper_source_line_count',d=>d.manifest.pages[4].blocks[0].exact_nonblank_line_count=0],
 ['wrong_original_pdf_digest',d=>d.manifest.source.SHA256='bad'],
 ['wrong_original_pdf_revision',d=>d.manifest.source.revision='v1'],
 ['invent_source_cold_complete',d=>d.manifest.source_own_claimed_global_semantic_completeness=true],
 ['forge_source_block_completed',d=>d.manifest.pages[5].blocks[0].precise_source_to_SSC_disposition_qualified=true],
 ['delete_original_59_candidate',d=>d.manifest.candidate_source_first_groups_by_original_page.original_pdf_page_zero_based_7.pop()],
 ['invent_page_candidate_source_id',d=>d.manifest.pages[6].blocks[0].possible_source_first_ids_on_same_original_page.push('L02-S999')],
 ['alter_existing_original_source_row',d=>d.inv.source_first_locations[0].pdf_pages_zero_based=[8]],
 ['erase_original_source_SSC_owner',d=>d.inv.source_first_locations[0].SSC_ids=[]],
 ['invent_new_source_SSC_ID',d=>d.ssc.items.push({...d.ssc.items[0],id:'L-SSC-192'})],
 ['erase_other_original_cold_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_complete_cold_review_passed=true],
 ['forge_global_G0_source_frozen',d=>d.reg.exit_acceptance_contract.G0_SSC_frozen=true],
 ['alter_precise_81_count',d=>d.reg.L02_complete_original_pdf_layout_partition.original_extracted_layout_blocks=1],
 ['tamper_source_verifier_ref',d=>d.gate.source_layout_verifier.git_blob_sha='wrong'],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['premature_PR70_merge',d=>d.gate.current_lawful_state.PR70_merge_authorized=true]
];
let rejected=0;for(const [name,mutate]of mutators){
 const d=JSON.parse(JSON.stringify(D));try{mutate(d);
  if(check(d,observed).length)rejected++;else problems.push('ESCAPED_'+name);
 }catch(e){problems.push('HOSTILE_CHECK_EXCEPTION_'+name+':'+String(e));}
}
const result={schema:'isograph.exp062.L.G0.L02.frozen-all-original-layout-atom-replay.v0.1',
 pass:problems.length===0,issues:problems,source_revision:'arXiv:1004.4866v2',source_PDF_SHA256_verified:true,
 original_source_12_pages_verified:true,source_layout_blocks_pinned:81,source_text_nonblank_lines_pinned:614,
 original_source_first_group_page_candidate_ids:59,all_six_source_SSC_identities:191,
 qualified_original_source_block_semantic_correspondences:0,all_six_whole_original_cold_completed:0,
 hostiles_defined:mutators.length,hostiles_rejected:rejected,G0_complete:false,G1_authorized:false};
console.log(JSON.stringify(result,null,2));if(problems.length)process.exitCode=1;
