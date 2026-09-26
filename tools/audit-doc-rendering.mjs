import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const exts=new Set(['.md','.markdown','.txt']);
const findings=[];

function classification(p){
  if(/^CORE_SPEC_DRAFT_/.test(p)) return 'qualified-or-versioned-spec';
  if(/^experiments\//.test(p)) return 'frozen-experiment-evidence';
  if(/^historical\//.test(p)) return 'historical-archive';
  if(/^evidence\//.test(p)) return 'evidence-registry';
  if(/^extensions\/(qu|nei|discovery|dts)\//.test(p)) return 'qualified-extension-surface';
  if(/\/evidence\//.test(p)) return 'frozen-evidence';
  if(/(?:SOURCE_FREEZE|COLD_REPORT|VERIFIER_|HIDDEN_ORACLE|ASSERTIONS|PACKET)/.test(p)) return 'frozen-or-source-evidence';
  if(/^qualification\//.test(p) && /(?:_CANDIDATE|QUALIFIED_MODULES_2026-09-(18|25)|CURRENT_INTEGRATED_STACK_2026-09-25|WITH_DTS_2026-09-25)/.test(p)) return 'authority-or-historical-qualification';
  return 'mutable-documentation';
}

function walk(dir){
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','out'].includes(ent.name)) continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walk(full));
    else if(exts.has(path.extname(ent.name).toLowerCase())) out.push(full);
  }
  return out;
}

function stripInlineMath(line){
  let out=''; let i=0; let inMath=false;
  while(i<line.length){
    if(line[i]==='\\\\' && i+1<line.length){ out+=line.slice(i,i+2); i+=2; continue; }
    if(line[i]==='$'){
      if(line[i+1]==='$'){ out+='  '; i+=2; continue; }
      inMath=!inMath; out+=' '; i++; continue;
    }
    out+=inMath?' ':line[i];
    i++;
  }
  return out;
}

const texCommand=/\\\\(?:boxed|text|frac|sqrt|forall|exists|infty|sum|prod|int|left|right|begin|end|mathbb|mathbf|mathrm|operatorname|subseteq|subset|cup|cap|to|mapsto|equiv|neq|leq|geq|wedge|vee|neg)\\b/;
const mojibake=/(?:Ã.|Â.|â€|â€™|â€œ|â€�|â†|â‰|ï»¿)/;
const allFiles=walk(ROOT);

for(const file of allFiles){
  const rel=path.relative(ROOT,file).replaceAll(path.sep,'/');
  const text=fs.readFileSync(file,'utf8');
  const cls=classification(rel);
  const lines=text.split(/\\r?\\n/);
  let inFence=false, fenceChar=null, inDollarBlock=false;
  for(let n=0;n<lines.length;n++){
    const raw=lines[n];
    const trimmed=raw.trim();
    const fence=trimmed.match(/^(\\x60\\x60\\x60+|~~~+)/);
    if(fence){
      const ch=fence[1][0];
      if(!inFence){inFence=true;fenceChar=ch;}
      else if(ch===fenceChar){inFence=false;fenceChar=null;}
      continue;
    }
    if(inFence) continue;
    if(trimmed==='$$'){inDollarBlock=!inDollarBlock;continue;}
    if(inDollarBlock) continue;

    const add=(kind,index,detail='')=>findings.push({
      path:rel,line:n+1,column:index+1,kind,classification:cls,
      excerpt:raw.slice(Math.max(0,index-40),Math.min(raw.length,index+180)),
      detail
    });

    const open=raw.indexOf('\\\\[');
    if(open>=0) add('unsupported-tex-display-delimiter',open,'Use GitHub-supported $$ display math or plain text.');
    const close=raw.indexOf('\\\\]');
    if(close>=0) add('unsupported-tex-display-delimiter',close,'Use GitHub-supported $$ display math or plain text.');

    const outsideMath=stripInlineMath(raw);
    const cmd=outsideMath.match(texCommand);
    if(cmd) add('raw-tex-command-outside-math',cmd.index??0,cmd[0]);

    const rep=raw.indexOf('\\uFFFD');
    if(rep>=0) add('unicode-replacement-character',rep,'U+FFFD');
    const ff1=raw.indexOf('\\uFFFE'), ff2=raw.indexOf('\\uFFFF');
    const nonchar=ff1>=0?ff1:ff2;
    if(nonchar>=0) add('unicode-noncharacter',nonchar,'U+FFFE/U+FFFF');
    const bom=raw.indexOf('\\uFEFF');
    if(bom>=0 && !(n===0&&bom===0)) add('unexpected-bom',bom,'U+FEFF');
    const moj=raw.match(mojibake);
    if(moj) add('probable-mojibake',moj.index??0,moj[0]);
    for(let i=0;i<raw.length;i++){
      const code=raw.charCodeAt(i);
      if((code>=0&&code<=8)||code===11||code===12||(code>=14&&code<=31)){
        add('control-character',i,'U+'+code.toString(16).padStart(4,'0').toUpperCase()); break;
      }
    }
  }
}

const counts={}, classCounts={};
for(const f of findings){
  counts[f.kind]=(counts[f.kind]||0)+1;
  classCounts[f.classification]=(classCounts[f.classification]||0)+1;
}
const mutable=findings.filter(f=>f.classification==='mutable-documentation');
const report={scanned_at:new Date().toISOString(),files_scanned:allFiles.length,total_findings:findings.length,counts,class_counts:classCounts,mutable_findings:mutable.length,findings};
fs.mkdirSync('out',{recursive:true});
fs.writeFileSync('out/doc-rendering-audit.json',JSON.stringify(report,null,2)+'\\n');
console.log(JSON.stringify({files_scanned:report.files_scanned,total_findings:report.total_findings,counts,class_counts:classCounts,mutable_findings:mutable.length},null,2));
for(const f of mutable.slice(0,250)) console.log('HIT '+f.path+':'+f.line+':'+f.column+' ['+f.kind+'] '+JSON.stringify(f.excerpt));
if(mutable.length>250) console.log('... '+(mutable.length-250)+' more mutable findings omitted from log');
