import fs from 'node:fs';
import path from 'node:path';

const ROOT='research';
const INDEX=path.join(ROOT,'README.md');
const errors=[];

const fail=(msg)=>errors.push(msg);
if(!fs.existsSync(INDEX) || !fs.statSync(INDEX).isFile() || fs.statSync(INDEX).size===0){
  fail('research/README.md is missing or empty');
}

const entries=fs.readdirSync(ROOT,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name));
const rootFiles=entries.filter(e=>e.isFile()).map(e=>e.name);
const illegalRootFiles=rootFiles.filter(name=>name!=='README.md');
for(const name of illegalRootFiles) fail('loose research-root file is not allowed: research/'+name);

const projectDirs=entries.filter(e=>e.isDirectory() && !e.name.startsWith('.')).map(e=>e.name);
const indexText=fs.existsSync(INDEX)?fs.readFileSync(INDEX,'utf8'):'';

for(const project of projectDirs){
  const readme=path.join(ROOT,project,'README.md');
  if(!fs.existsSync(readme) || !fs.statSync(readme).isFile() || fs.statSync(readme).size===0){
    fail('research project lacks nonempty README dossier: '+readme);
    continue;
  }
  const text=fs.readFileSync(readme,'utf8');
  if(!/^#\s+\S/m.test(text)) fail(readme+' lacks an H1 title');
  if(!text.includes('**Current research dossier:** this README')){
    fail(readme+' must declare itself the current research dossier');
  }
  if(!/\*\*(?:Research status|Status|Collection status):\*\*/.test(text)){
    fail(readme+' must state research/status disposition');
  }
  const link='('+project+'/README.md)';
  if(!indexText.includes(link)){
    fail('research/README.md does not index '+readme);
  }
}

const indexed=[...indexText.matchAll(/\(([^()\/]+)\/README\.md\)/g)].map(m=>m[1]);
for(const project of new Set(indexed)){
  if(!projectDirs.includes(project)) fail('research/README.md indexes missing first-level project: '+project);
}

const result={
  research_layout:errors.length?'FAIL':'PASS',
  project_count:projectDirs.length,
  projects:projectDirs,
  loose_root_files:illegalRootFiles,
  errors
};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exitCode=1;
