import fs from 'node:fs';
import path from 'node:path';

const root='.github/workflows';
const forbidden=[
  'actions/upload-artifact@',
  'actions/download-artifact@',
  'actions/cache@'
];

const failures=[];
for(const name of fs.readdirSync(root)){
  if(!/\.ya?ml$/i.test(name)) continue;
  const p=path.join(root,name);
  const lines=fs.readFileSync(p,'utf8').split(/\r?\n/);
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    const trimmed=line.trimStart();
    if(trimmed.startsWith('#')) continue;
    for(const token of forbidden){
      if(line.includes(token)) failures.push(`${p}:${i+1}: forbidden GitHub Actions storage action: ${token}`);
    }
    if(/^\s+cache\s*:/.test(line)) failures.push(`${p}:${i+1}: workflow cache input is prohibited`);
  }
}
if(failures.length){
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS: no GitHub Actions artifact/cache storage paths found.');
