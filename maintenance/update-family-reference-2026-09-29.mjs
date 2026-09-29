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
const marker='Current Qualified Authority - 2026-09-29';
if(xml.includes(marker)) throw new Error('2026-09-29 authority section already present');

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
  p('Controlling current-status summary for the accumulated IsoGraph family reference. Older current-status sections below are historical snapshots. Exact versioned specifications and qualification records remain authority.'),
  p('Authority snapshot represented: '+snapshot,null,true),
  p('Current effective Core','Heading2'),
  p('Core 0.17 qualified base + Core 0.18 observation-first clarification + Core 0.19 assertion-support/exact-rendering clarification + Core 0.20 primitive-logic-closure clarification.'),
  p('Core 0.20 SHA-256: 9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7.'),
  p('Current qualified extensions and modules','Heading2'),
  p('QU 0.1 - SHA-256 1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc.'),
  p('NEI 0.4 - SHA-256 6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee.'),
  p('DTS 0.1 - SHA-256 9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad.'),
  p('Discovery Protocols 0.1-0.10 are the cumulative current discovery module. DP 0.9 Minimum Sufficient Support / Valuation SHA-256: 4d6ed98288863ccd50e9cbccf2e626ff241aded3bd9fb534e0fb74ad147858ea. DP 0.10 Experimental Warrant SHA-256: 108f3998bba90aff6a386335aeb45fde663d4be0b32643a06e01fb039bff61ec.'),
  p('Experimental Inquiry 0.1 - SHA-256 b94262d7384603072d0e7a2657b84f6c427e7098cea051948702c367a440c666.'),
  p('Current qualification evidence','Heading2'),
  p('Experiment 053: DP 0.9, 20/20 fresh cases PASS, formal QUALIFIES.'),
  p('Experiment 054: DP 0.10 Experimental Warrant, 18/18 fresh cases PASS, formal QUALIFIES.'),
  p('Experiment 055: Experimental Inquiry 0.1, 18/18 fresh cases PASS, formal QUALIFIES.'),
  p('Experiment 056: expanded-family integration, 16/16 fresh cases PASS; all guards true; all module assessments SUPPORTED; formal QUALIFIES.'),
  p('Current integrated stack','Heading2'),
  p('Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20 + QU 0.1 + NEI 0.4 + Discovery Protocols 0.1-0.10 + DTS 0.1 + Experimental Inquiry 0.1.'),
  p('Current authority record: qualification/CURRENT_INTEGRATED_STACK_WITH_DP_0_10_EI_0_1_2026-09-29.md.'),
  p('Current routing manifest: qualification/QUALIFIED_MODULES_2026-09-29.md.'),
  p('Authority boundaries','Heading2'),
  p('Core owns exact semantic admission and primitive support. QU owns represented structured known-unknown possibility. NEI owns natural/domain identity. DTS owns transition anatomy. DP owns discovery/search, sufficiency/valuation and Experimental Warrants. EI owns active experiment construction and observation generation under a warrant.'),
  p('An Experimental Warrant is permission to inquire, not support for a hypothesis. EI observations are evidence, not truth by themselves. Open-world model incompleteness is separate from QU and supplies no semantic premise. Adaptive and post-hoc evidence retains its provenance. Negative experimental results are limited to demonstrated coverage.'),
  p('Historical and cleanup status','Heading2'),
  p('Earlier failed and infrastructure-only qualification attempts remain immutable evidence. The Core 0.19 qualification archive and externally referenced Navier-Stokes compatibility branch remain intentionally retained; stale development branches were retired under the 2026-09-29 cleanup record.'),
  p('This DOCX is the maintained accumulated convenience/final reference product. It does not replace exact versioned specifications, qualification records, manifests, or frozen experiment evidence.'),
  pageBreak
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
