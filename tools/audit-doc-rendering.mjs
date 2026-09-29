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
  if(/^extensions\/(qu|nei|discovery|dts|experimental)\//.test(p)) return 'qualified-extension-surface';
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

function stripInlineCode(line){
  const chars=[...line];
  let i=0;
  while(i<line.length){
    if(line[i]!=='\x60'){ i++; continue; }
    let j=i;
    while(j<line.length && line[j]==='\x60') j++;
    const fence=line.slice(i,j);
    const end=line.indexOf(fence,j);
    if(end<0){ i=j; continue; }
    for(let k=i;k<end+fence.length;k++) chars[k]=' ';
    i=end+fence.length;
  }
  return chars.join('');
}

function firstUnescapedDollar(line){
  for(let i=0;i<line.length;i++){
    if(line[i]!=='$') continue;
    if(i>0&&line[i-1]==='\\') continue;
    if(line[i+1]==='$') return {index:i,kind:'latex-display-math-delimiter'};
    if(i>0&&line[i-1]==='$') continue;
    // Avoid ordinary currency such as $5 or $12.50.
    if(/[0-9]/.test(line[i+1]||'')) continue;
    return {index:i,kind:'latex-inline-math-delimiter'};
  }
  return null;
}

const rawTexCommand=/\\[A-Za-z]+\*?/g;
const mojibake=/(?:Ã.|Â.|â€|â€™|â€œ|â€�|â†|â‰|ï»¿)/;
const allFiles=walk(ROOT);

for(const file of allFiles){
  const rel=path.relative(ROOT,file).replaceAll(path.sep,'/');
  const text=fs.readFileSync(file,'utf8');
  const cls=classification(rel);
  const lines=text.split(/\r?\n/);
  let inFence=false;
  let fenceChar=null;

  for(let n=0;n<lines.length;n++){
    const raw=lines[n];
    const trimmed=raw.trim();
    const fence=trimmed.match(/^(\x60\x60\x60+|~~~+)/);
    if(fence){
      const ch=fence[1][0];
      if(!inFence){ inFence=true; fenceChar=ch; }
      else if(ch===fenceChar){ inFence=false; fenceChar=null; }
      continue;
    }
    if(inFence) continue;

    const add=(kind,index,detail='')=>findings.push({
      path:rel,
      line:n+1,
      column:index+1,
      kind,
      classification:cls,
      excerpt:raw.slice(Math.max(0,index-50),Math.min(raw.length,index+200)),
      detail
    });

    const rendered=stripInlineCode(raw);

    for(const [needle,kind,detail] of [
      ['\\[','unsupported-tex-display-delimiter','Use Unicode/plain text or a fenced text block in mutable docs.'],
      ['\\]','unsupported-tex-display-delimiter','Use Unicode/plain text or a fenced text block in mutable docs.'],
      ['\\(','unsupported-tex-inline-delimiter','Use Unicode/plain text in mutable docs.'],
      ['\\)','unsupported-tex-inline-delimiter','Use Unicode/plain text in mutable docs.']
    ]){
      const at=rendered.indexOf(needle);
      if(at>=0) add(kind,at,detail);
    }

    const dollar=firstUnescapedDollar(rendered);
    if(dollar) add(dollar.kind,dollar.index,'Mutable documentation must not depend on LaTeX/math delimiters.');

    rawTexCommand.lastIndex=0;
    const cmd=rawTexCommand.exec(rendered);
    if(cmd) add('raw-tex-command',cmd.index,cmd[0]);

    const rep=raw.indexOf('\uFFFD');
    if(rep>=0) add('unicode-replacement-character',rep,'U+FFFD');

    const ff1=raw.indexOf('\uFFFE');
    const ff2=raw.indexOf('\uFFFF');
    const nonchar=ff1>=0?ff1:ff2;
    if(nonchar>=0) add('unicode-noncharacter',nonchar,'U+FFFE/U+FFFF');

    const bom=raw.indexOf('\uFEFF');
    if(bom>=0 && !(n===0&&bom===0)) add('unexpected-bom',bom,'U+FEFF');

    const moj=raw.match(mojibake);
    if(moj) add('probable-mojibake',moj.index??0,moj[0]);

    for(let i=0;i<raw.length;i++){
      const code=raw.charCodeAt(i);
      if((code>=0&&code<=8)||code===11||code===12||(code>=14&&code<=31)){
        add('control-character',i,'U+'+code.toString(16).padStart(4,'0').toUpperCase());
        break;
      }
    }
  }
}

const counts={},classCounts={};
for(const item of findings){
  counts[item.kind]=(counts[item.kind]||0)+1;
  classCounts[item.classification]=(classCounts[item.classification]||0)+1;
}
const mutable=findings.filter(item=>item.classification==='mutable-documentation');
const protectedFindings=findings.filter(item=>item.classification!=='mutable-documentation');

const summarize=items=>{
  const byPath={};
  for(const item of items){
    byPath[item.path]??={total:0,kinds:{}};
    byPath[item.path].total++;
    byPath[item.path].kinds[item.kind]=(byPath[item.path].kinds[item.kind]||0)+1;
  }
  return byPath;
};

const report={
  scanned_at:new Date().toISOString(),
  policy:'mutable Markdown/TXT is renderer-independent: no LaTeX delimiters or raw TeX commands outside literal code',
  files_scanned:allFiles.length,
  total_findings:findings.length,
  counts,
  class_counts:classCounts,
  mutable_findings:mutable.length,
  findings
};

fs.mkdirSync('out',{recursive:true});
fs.writeFileSync('out/doc-rendering-audit.json',JSON.stringify(report,null,2)+'\n');

console.log(JSON.stringify({
  files_scanned:report.files_scanned,
  total_findings:report.total_findings,
  counts,
  class_counts:classCounts,
  mutable_findings:mutable.length
},null,2));
console.log('MUTABLE_BY_PATH '+JSON.stringify(Object.entries(summarize(mutable)).sort((a,b)=>b[1].total-a[1].total)));
console.log('PROTECTED_BY_PATH '+JSON.stringify(Object.entries(summarize(protectedFindings)).sort((a,b)=>b[1].total-a[1].total)));

for(const item of mutable.slice(0,800)){
  console.log('HIT '+item.path+':'+item.line+':'+item.column+' ['+item.kind+'] '+JSON.stringify(item.excerpt));
}
if(mutable.length>800) console.log('... '+(mutable.length-800)+' more mutable findings omitted from log');

if(process.argv.includes('--enforce-mutable') && mutable.length!==0){
  console.error('mutable documentation rendering findings remain: '+mutable.length);
  process.exitCode=2;
}
