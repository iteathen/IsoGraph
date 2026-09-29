const fs=require('fs');
const path=require('path');
const katex=require('katex');

const ROOT=process.cwd();
const exts=new Set(['.md','.markdown']);
const errors=[];
const stats={files:0,expressions:0,inline:0,display:0};

function classification(p){
  if(/^CORE_SPEC_DRAFT_/.test(p)) return 'protected';
  if(/^experiments\//.test(p)) return 'protected';
  if(/^historical\//.test(p)) return 'protected';
  if(/^evidence\//.test(p)) return 'protected';
  if(/^extensions\/(qu|nei|discovery|dts|experimental)\//.test(p)) return 'protected';
  if(/\/evidence\//.test(p)) return 'protected';
  if(/(?:SOURCE_FREEZE|COLD_REPORT|VERIFIER_|HIDDEN_ORACLE|ASSERTIONS|PACKET)/.test(p)) return 'protected';
  return 'mutable';
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
  let out='';
  for(let i=0;i<line.length;){
    if(line[i]!=='`'){ out+=line[i++]; continue; }
    let j=i;
    while(j<line.length&&line[j]==='`') j++;
    const fence=line.slice(i,j);
    const end=line.indexOf(fence,j);
    if(end<0){ out+=line.slice(i); break; }
    out+=' '.repeat(end+fence.length-i);
    i=end+fence.length;
  }
  return out;
}

function validate(expr,meta){
  stats.expressions++;
  stats[meta.kind]++;
  try{
    katex.renderToString(expr,{throwOnError:true,strict:'ignore',output:'html'});
  }catch(error){
    errors.push({...meta,error:String(error.message||error),expr});
  }
}

for(const file of walk(ROOT)){
  const rel=path.relative(ROOT,file).replaceAll(path.sep,'/');
  if(classification(rel)!=='mutable') continue;
  stats.files++;
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  let inFence=false,fenceChar=null;
  let display=null;

  for(let n=0;n<lines.length;n++){
    const raw=lines[n];
    const trimmed=raw.trim();
    const fence=trimmed.match(/^(\`\`\`+|~~~+)/);
    if(fence){
      const ch=fence[1][0];
      if(!inFence){inFence=true;fenceChar=ch;}
      else if(ch===fenceChar){inFence=false;fenceChar=null;}
      continue;
    }
    if(inFence) continue;

    const line=stripInlineCode(raw);

    if(display){
      const at=line.indexOf('$$');
      if(at>=0){
        display.parts.push(line.slice(0,at));
        validate(display.parts.join('\n'),{path:rel,line:display.line,kind:'display'});
        display=null;
        const rest=line.slice(at+2);
        if(rest.trim()) errors.push({path:rel,line:n+1,kind:'delimiter',error:'text after closing $$ on same line',expr:rest});
      }else{
        display.parts.push(line);
      }
      continue;
    }

    const displayAt=line.indexOf('$$');
    if(displayAt>=0){
      const rest=line.slice(displayAt+2);
      const close=rest.indexOf('$$');
      if(close>=0){
        validate(rest.slice(0,close),{path:rel,line:n+1,kind:'display'});
        if(rest.slice(close+2).trim()) errors.push({path:rel,line:n+1,kind:'delimiter',error:'text after closing $$ on same line',expr:rest.slice(close+2)});
      }else{
        display={line:n+1,parts:[rest]};
      }
      continue;
    }

    let i=0;
    while(i<line.length){
      const open=line.indexOf('$',i);
      if(open<0) break;
      if(open>0&&line[open-1]==='\\'){i=open+1;continue;}
      if(/[0-9]/.test(line[open+1]||'')){i=open+1;continue;}
      const close=line.indexOf('$',open+1);
      if(close<0){
        errors.push({path:rel,line:n+1,kind:'delimiter',error:'unclosed inline $ delimiter',expr:line.slice(open)});
        break;
      }
      validate(line.slice(open+1,close),{path:rel,line:n+1,kind:'inline'});
      i=close+1;
    }
  }
  if(display) errors.push({path:rel,line:display.line,kind:'delimiter',error:'unclosed $$ display block',expr:display.parts.join('\n')});
}

const report={stats,error_count:errors.length,errors};
fs.mkdirSync('out',{recursive:true});
fs.writeFileSync('out/doc-math-katex-report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(errors.length) process.exitCode=1;
