import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const FINAL_PRODUCT='IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx';

function git(args){
  return execFileSync('git',args,{encoding:'utf8'}).trim();
}

function existsRef(ref){
  try{ execFileSync('git',['rev-parse','--verify',ref],{stdio:'ignore'}); return true; }
  catch{return false;}
}

function mergeBase(a,b){
  return git(['merge-base',a,b]);
}

function familyAffecting(path){
  if(path===FINAL_PRODUCT)return false;

  return (
    /^CORE_SPEC_.*\.md$/.test(path) ||
    /^extensions\//.test(path) ||
    /^qualification\/[^/]+\.md$/.test(path) ||
    /^research\/discovery\/[^/]+\.md$/.test(path) ||
    [
      'README.md',
      'STATUS.md',
      'AGENTS.md',
      'DESIGN_IDEALS.md',
      'FINAL_PRODUCT_MAINTENANCE.md',
      'NATIVE_FORMAT.md',
    ].includes(path)
  );
}

function resolveBase(){
  const explicit=process.argv.find(x=>x.startsWith('--base='));
  if(explicit)return explicit.slice('--base='.length);

  const baseRef=process.env.GITHUB_BASE_REF;
  if(baseRef && existsRef('origin/'+baseRef))return mergeBase('HEAD','origin/'+baseRef);

  const refName=process.env.GITHUB_REF_NAME;
  if(refName && refName!=='main' && existsRef('origin/main'))return mergeBase('HEAD','origin/main');

  if(existsRef('HEAD^'))return git(['rev-parse','HEAD^']);

  return null;
}

const base=resolveBase();
if(!base){
  console.log('family-reference-sync: no comparison base available; nothing to enforce');
  process.exit(0);
}

const changedRaw=git(['diff','--name-only',base+'..HEAD']);
const changed=changedRaw?changedRaw.split(/\r?\n/).filter(Boolean):[];
const triggers=changed.filter(familyAffecting);
const docChanged=changed.includes(FINAL_PRODUCT);

console.log('family-reference-sync base='+base);
console.log('family-reference-sync changed='+changed.length);
console.log('family-reference-sync triggering_paths='+triggers.length);
for(const path of triggers)console.log('family-reference-sync trigger '+path);
console.log('family-reference-sync final_product_changed='+(docChanged?'yes':'no'));

if(triggers.length && !docChanged){
  console.error('\nFamily reference is stale for this branch.');
  console.error('One or more family-affecting files differ from the comparison base,');
  console.error('but '+FINAL_PRODUCT+' does not.');
  console.error('Refresh and QA the repository-root accumulated family reference in the same branch.');
  process.exit(2);
}

if(!fs.existsSync(FINAL_PRODUCT) || fs.statSync(FINAL_PRODUCT).size===0){
  console.error('required accumulated family reference missing or empty: '+FINAL_PRODUCT);
  process.exit(3);
}

console.log('family-reference-sync: PASS');
