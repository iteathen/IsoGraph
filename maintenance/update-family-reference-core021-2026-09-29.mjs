import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const source='IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx';
const snapshot=process.env.AUTHORITY_SNAPSHOT;
if(!snapshot) throw new Error('AUTHORITY_SNAPSHOT required');
if(!fs.existsSync(source)) throw new Error('family reference missing');

const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-core021-family-'));
execFileSync('unzip',['-q',source,'-d',tmp]);

const docPath=path.join(tmp,'word','document.xml');
let xml=fs.readFileSync(docPath,'utf8');
const oldMarker='Current Qualified Authority - 2026-09-29';
const marker='Current Qualified Authority - 2026-09-29 Core 0.21';
if(xml.includes(marker)) throw new Error('Core 0.21 authority section already present');

const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const p=(text,style=null,bold=false)=>{
  const pPr=style?'<w:pPr><w:pStyle w:val="'+style+'"/></w:pPr>':'';
  const rPr=bold?'<w:rPr><w:b/></w:rPr>':'';
  return '<w:p>'+pPr+'<w:r>'+rPr+'<w:t xml:space="preserve">'+esc(text)+'</w:t></w:r></w:p>';
};
const pageBreak='<w:p><w:r><w:br w:type="page"/></w:r></w:p>';

// Repair the known prior-generator double page break without touching unrelated layout.
const oldAt=xml.indexOf(oldMarker);
if(oldAt>=0){
  const doubleBreak=pageBreak+pageBreak;
  const breakAt=xml.indexOf(doubleBreak,oldAt);
  if(breakAt>=0) xml=xml.slice(0,breakAt)+pageBreak+xml.slice(breakAt+doubleBreak.length);
}

const parts=[
  pageBreak,
  p(marker,'Heading1'),
  p('Controlling current-status summary for the accumulated IsoGraph family reference. Older current-status sections below remain historical snapshots. Exact versioned specifications and qualification records remain authority.'),
  p('Authority snapshot represented: '+snapshot,null,true),
  p('Current effective Core','Heading2'),
  p('Core 0.17 qualified base + Core 0.18 observation-first clarification + Core 0.19 assertion-support/exact-rendering clarification + Core 0.20 primitive-logic-closure clarification + Core 0.21 rendering-conservation/schema-closure clarification.'),
  p('Core 0.21 SHA-256: f76bc94748ab5f970fe6b21ae4734919df241912c7e5e13e07177896e5f01820.'),
  p('Core 0.21 key additions','Heading2'),
  p('Core 0.21 freezes a Source Semantic Census, forbids qualification by silent scope shrinkage, requires assertion-body/support/dependency closure, defines exact Schema Closure for generative semantics without exhaustive materialization, separates unresolved termination from known step semantics, and invalidates current IA fixed points when their load-bearing representation tuple changes.'),
  p('Strict Core 0.21 qualification requires separate soundness, coverage, reconstruction, scope-integrity, and authority-routing gates plus a mechanically derived closure ledger. The ledger checker is qualification infrastructure, not semantic proof authority.'),
  p('Current qualified extensions and modules','Heading2'),
  p('QU 0.1 - SHA-256 1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc.'),
  p('NEI 0.4 - SHA-256 6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee.'),
  p('DTS 0.1 - SHA-256 9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad.'),
  p('Discovery Protocols 0.1-0.10 remain the cumulative current discovery module. DP 0.9 SHA-256: 4d6ed98288863ccd50e9cbccf2e626ff241aded3bd9fb534e0fb74ad147858ea. DP 0.10 SHA-256: 108f3998bba90aff6a386335aeb45fde663d4be0b32643a06e01fb039bff61ec.'),
  p('Experimental Inquiry 0.1 - SHA-256 b94262d7384603072d0e7a2657b84f6c427e7098cea051948702c367a440c666.'),
  p('Core 0.21 qualification evidence','Heading2'),
  p('Experiment 057 Attempt 2: C01-C25 PASS; C26 preserved as a public field-semantics ambiguity and not retroactively rescored.'),
  p('Experiment 058: fresh target-26 authority-boundary replacement, 1/1 PASS, formal QUALIFIES.'),
  p('Core 0.21 qualification: qualification/CORE_0_21_QUALIFICATION.md.'),
  p('Current expanded-family integration','Heading2'),
  p('Experiment 059 Attempt 1: I01-I15 PASS; I16 preserved as an ownership-field ambiguity and not retroactively rescored.'),
  p('Experiment 060: fresh I16 ownership replacement, 1/1 PASS; all module assessments supported.'),
  p('Current integrated stack: Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20 + Core 0.21 + QU 0.1 + NEI 0.4 + Discovery Protocols 0.1-0.10 + DTS 0.1 + Experimental Inquiry 0.1.'),
  p('Current authority record: qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_21_2026-09-29.md.'),
  p('Current routing manifest: qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md.'),
  p('Authority boundaries','Heading2'),
  p('Core owns exact semantic admission, primitive support, Source Semantic Census conservation, Schema Closure, scope-integrity obligations, and IA closure invalidation. QU owns structured unresolved possibility. NEI owns natural/domain identity. DTS owns transition anatomy. DP owns discovery/search, sufficiency/valuation, discrepancy discipline, and Experimental Warrants. EI owns active experiment construction and observation generation under a warrant.'),
  p('Schema Closure is not a new primitive, does not prove termination, and does not prove arbitrary properties over generated members. Qualified QU is not an opaque primitive leaf; known QU semantics that are load-bearing must still close to primitive support.'),
  p('Historical and cleanup status','Heading2'),
  p('Earlier qualification and integration attempts remain immutable evidence, including scorer/field-contract defects and provider infrastructure failures. The earlier 2026-09-29 authority manifest and integrated-stack record remain historical same-day predecessor snapshots.'),
  p('This DOCX is the maintained accumulated convenience/final reference product. It does not replace exact versioned specifications, qualification records, manifests, or frozen experiment evidence.')
];

const firstEnd=xml.indexOf('</w:p>');
if(firstEnd<0) throw new Error('no paragraph found in document.xml');
const insertAt=firstEnd+'</w:p>'.length;
xml=xml.slice(0,insertAt)+parts.join('')+xml.slice(insertAt);
fs.writeFileSync(docPath,xml);

const corePath=path.join(tmp,'docProps','core.xml');
if(fs.existsSync(corePath)){
  let core=fs.readFileSync(corePath,'utf8');
  const now=new Date().toISOString().replace(/\.\d{3}Z$/,'Z');
  core=core.replace(/<dcterms:modified[^>]*>[^<]*<\/dcterms:modified>/,
    '<dcterms:modified xsi:type="dcterms:W3CDTF">'+now+'</dcterms:modified>');
  fs.writeFileSync(corePath,core);
}

const out=path.resolve(source);
fs.rmSync(out,{force:true});
execFileSync('zip',['-q','-r',out,'.'],{cwd:tmp});
fs.rmSync(tmp,{recursive:true,force:true});
console.log(JSON.stringify({updated:source,authority_snapshot:snapshot,bytes:fs.statSync(source).size},null,2));
