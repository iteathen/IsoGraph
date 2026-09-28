import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const source='IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx';
const snapshot=process.env.AUTHORITY_SNAPSHOT;
if(!snapshot) throw new Error('AUTHORITY_SNAPSHOT required');
if(!fs.existsSync(source)) throw new Error('family reference missing');

const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-family-'));
execFileSync('unzip',['-q',source,'-d',tmp]);

const docPath=path.join(tmp,'word','document.xml');
let xml=fs.readFileSync(docPath,'utf8');
const marker='Current Qualified Authority - 2026-09-28';
if(xml.includes(marker)) throw new Error('2026-09-28 authority section already present');

const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const p=(text,style=null,bold=false)=>{
  const pPr=style?'<w:pPr><w:pStyle w:val="'+style+'"/></w:pPr>':'';
  const rPr=bold?'<w:rPr><w:b/></w:rPr>':'';
  return '<w:p>'+pPr+'<w:r>'+rPr+'<w:t xml:space="preserve">'+esc(text)+'</w:t></w:r></w:p>';
};
const pageBreak='<w:p><w:r><w:br w:type="page"/></w:r></w:p>';

const parts=[
  pageBreak,
  p(marker,'Heading1'),
  p('Controlling current-status summary for the accumulated IsoGraph family reference. Where an older section below uses the word "current" and conflicts with this section, treat the older wording as a historical snapshot. Exact versioned specifications and qualification records remain semantic authority.'),
  p('Authority snapshot represented: '+snapshot,null,true),
  p('Current effective Core','Heading2'),
  p('Core 0.17 qualified base + Core 0.18 qualified observation-first clarification + Core 0.19 qualified assertion-support/exact-rendering clarification + Core 0.20 qualified primitive-logic-closure clarification.'),
  p('Core 0.20 SHA-256: 9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7'),
  p('Core 0.20 qualification: qualification/CORE_0_20_QUALIFICATION.md; Experiment 048 run 36364086659; 18/18 fresh cases PASS.'),
  p('Current qualified semantic extensions','Heading2'),
  p('QU 0.1 - SHA-256 1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc.'),
  p('NEI 0.4 - SHA-256 6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee.'),
  p('Discovery Protocols 0.1-0.8 cumulative current module. DP 0.8 SHA-256 74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96. Qualification: qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_8_QUALIFICATION_REVIEW.md; Experiments 050 and 051.'),
  p('DTS 0.1 - SHA-256 9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad.'),
  p('Current integrated stack','Heading2'),
  p('Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20 + QU 0.1 + NEI 0.4 + Discovery Protocols 0.1-0.8 + DTS 0.1.'),
  p('Direct integration qualification: Experiment 052 run 36365347906; 16/16 fresh integration cases PASS; all scoring guards true; all module assessments SUPPORTED.'),
  p('Authority record: qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md.'),
  p('Current routing manifest: qualification/QUALIFIED_MODULES_2026-09-28.md.'),
  p('Important boundaries','Heading2'),
  p('DP remains discovery/search/discrepancy guidance and is not proof authority. QU, NEI, DTS, and Core retain their separate semantic ownership.'),
  p('Core 0.20 does not retroactively invalidate artifacts that were correctly qualified under earlier Core revisions; it changes the closure standard for claims of Core-0.20 primitive completeness.'),
  p('The historical _CANDIDATE filename suffix does not indicate current qualification status; use exact hashes and the current authority manifest.'),
  p('Transition Structural Signatures and DTS mechanism/cost/concurrency/optimization profiles remain separately versioned successor research.'),
  p('Qualification evidence notes','Heading2'),
  p('Earlier failed/partial qualification attempts remain immutable evidence. Core 0.20 qualification preserved public-schema and provider-truncation failures before the successful run. DP 0.8 qualification preserved an over-constrained bookkeeping-label oracle and an underdetermined control rather than rewriting them.'),
  p('This DOCX is a maintained convenience/final reference product. It does not replace the exact versioned semantic specifications, qualification records, manifests, and frozen experiment evidence.'),
  pageBreak
];

const firstEnd=xml.indexOf('</w:p>');
if(firstEnd<0) throw new Error('no paragraph found in document.xml');
const insertAt=firstEnd+'</w:p>'.length;
xml=xml.slice(0,insertAt)+parts.join('')+xml.slice(insertAt);
fs.writeFileSync(docPath,xml);

// Update modified timestamp if core properties are present.
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
