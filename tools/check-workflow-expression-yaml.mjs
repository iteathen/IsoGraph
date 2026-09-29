import fs from 'node:fs';
import path from 'node:path';

const root='.github/workflows';
const files=fs.readdirSync(root).filter(x=>/\.ya?ml$/i.test(x));
const bad=[];
for(const name of files){
  const full=path.join(root,name);
  const lines=fs.readFileSync(full,'utf8').split(/\r?\n/);
  lines.forEach((line,i)=>{
    if(/\benv:\s*\{[^\n]*\$\{\{/.test(line)) bad.push({file:full,line:i+1,text:line.trim()});
  });
}
if(bad.length){
  console.error('Expression-bearing env mappings must use block YAML:');
  for(const x of bad) console.error(`${x.file}:${x.line}: ${x.text}`);
  process.exit(1);
}
console.log(`workflow expression YAML guard: PASS (${files.length} workflow files)`);
