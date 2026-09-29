import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const D=String.fromCharCode(36);
const DD=D+D;
const exts=new Set(['.md','.markdown']);
const errors=[];

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
    if(line.charCodeAt(i)!==96){out+=line[i++];continue;}
    let j=i;
    while(j<line.length&&line.charCodeAt(j)===96) j++;
    const fence=line.slice(i,j);
    const end=line.indexOf(fence,j);
    if(end<0){out+=line.slice(i);break;}
    out+=' '.repeat(end+fence.length-i);
    i=end+fence.length;
  }
  return out;
}
function nextUnescaped(text,needle,start){
  let at=start;
  while(true){
    at=text.indexOf(needle,at);
    if(at<0) return -1;
    if(at===0||text[at-1]!=='\\') return at;
    at+=needle.length;
  }
}
function checkMath(expr,meta){
  let depth=0;
  for(let i=0;i<expr.length;i++){
    if(expr[i]==='\\'){i++;continue;}
    if(expr[i]==='{') depth++;
    else if(expr[i]==='}'){
      depth--;
      if(depth<0){
        errors.push({...meta,kind:'unbalanced-brace',detail:'closing brace without matching opening brace'});
        break;
      }
    }
  }
  if(depth!==0) errors.push({...meta,kind:'unbalanced-brace',detail:'math expression has unmatched braces: '+depth});

  const stack=[];
  const re=/\\(begin|end)\{([^{}]+)\}/g;
  for(const m of expr.matchAll(re)){
    const [,kind,env]=m;
    if(kind==='begin') stack.push(env);
    else{
      const open=stack.pop();
      if(open!==env) errors.push({...meta,kind:'environment-mismatch',detail:'expected end of '+String(open)+' but found '+env});
    }
  }
  if(stack.length) errors.push({...meta,kind:'unclosed-environment',detail:'unclosed environment(s): '+stack.join(', ')});

  if(expr.includes('\\'+DD)) errors.push({...meta,kind:'corrupted-row-separator',detail:'backslash immediately followed by display delimiter'});
}

for(const file of walk(ROOT)){
  const rel=path.relative(ROOT,file).replaceAll(path.sep,'/');
  if(classification(rel)!=='mutable') continue;
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  let inFence=false,fenceChar=null,display=null;

  for(let n=0;n<lines.length;n++){
    const raw=lines[n],trimmed=raw.trim();
    const fence=trimmed.match(/^(\x60\x60\x60+|~~~+)/);
    if(fence){
      const ch=fence[1][0];
      if(!inFence){inFence=true;fenceChar=ch;}
      else if(ch===fenceChar){inFence=false;fenceChar=null;}
      continue;
    }
    if(inFence) continue;
    const line=stripInlineCode(raw);

    if(display){
      const close=line.indexOf(DD);
      if(close>=0){
        display.parts.push(line.slice(0,close));
        checkMath(display.parts.join('\n'),{path:rel,line:display.line,kind:'display'});
        if(line.slice(close+2).trim()) errors.push({path:rel,line:n+1,kind:'display-tail',detail:'text follows closing display delimiter'});
        display=null;
      }else display.parts.push(line);
      continue;
    }

    const dAt=line.indexOf(DD);
    if(dAt>=0){
      const rest=line.slice(dAt+2);
      const close=rest.indexOf(DD);
      if(close>=0){
        checkMath(rest.slice(0,close),{path:rel,line:n+1,kind:'display'});
        if(rest.slice(close+2).trim()) errors.push({path:rel,line:n+1,kind:'display-tail',detail:'text follows closing display delimiter'});
      }else display={line:n+1,parts:[rest]};
      continue;
    }

    let i=0;
    while(i<line.length){
      const open=nextUnescaped(line,D,i);
      if(open<0) break;
      const close=nextUnescaped(line,D,open+1);
      if(close<0){
        if(/[0-9]/.test(line[open+1]||'')){i=open+1;continue;}
        errors.push({path:rel,line:n+1,kind:'unclosed-inline-math',detail:line.slice(open)});
        break;
      }
      checkMath(line.slice(open+1,close),{path:rel,line:n+1,kind:'inline'});
      i=close+1;
    }
  }
  if(display) errors.push({path:rel,line:display.line,kind:'unclosed-display-math',detail:'display delimiter not closed'});
}

console.log(JSON.stringify({files_checked:walk(ROOT).filter(f=>classification(path.relative(ROOT,f).replaceAll(path.sep,'/'))==='mutable').length,error_count:errors.length,errors},null,2));
if(errors.length) process.exitCode=1;
