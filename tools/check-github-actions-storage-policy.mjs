import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function checkWorkflowText(text, file='<memory>'){
  const failures=[];
  const upload='actions/upload-artifact@';
  const download='actions/download-artifact@';
  const cleanup='node tools/cleanup-github-actions-storage.mjs';
  const uploadPos=text.indexOf(upload);
  const downloadPos=text.indexOf(download);
  const lastArtifactPos=Math.max(text.lastIndexOf(upload),text.lastIndexOf(download));
  const cleanupPos=text.lastIndexOf(cleanup);
  const usesArtifacts=uploadPos>=0 || downloadPos>=0;
  const usesCache=text.includes('actions/cache@') || /^\\s+cache\\s*:/m.test(text);

  if(usesCache){
    failures.push(file+': GitHub Actions cache storage is prohibited because it is not reliably owned and deleted by one workflow run.');
  }

  if(usesArtifacts){
    if(!/\\bactions:\\s*write\\b/.test(text)){
      failures.push(file+': transient artifact use requires Actions write permission for cleanup.');
    }
    if(cleanupPos<0 || cleanupPos<lastArtifactPos){
      failures.push(file+': transient artifact use requires a cleanup step after the final artifact action.');
    } else {
      const before=text.slice(Math.max(0,text.lastIndexOf('- name:',cleanupPos)),cleanupPos);
      if(!/if:\\s*(?:\\$\\{\\{\\s*)?always\\(\\)(?:\\s*\\}\\})?/.test(before)){
        failures.push(file+': transient artifact cleanup must run with if: always().');
      }
    }
  }

  return failures;
}

export function scanWorkflowDirectory(root='.github/workflows'){
  const failures=[];
  for(const name of fs.readdirSync(root)){
    if(!/\\.ya?ml$/i.test(name)) continue;
    const p=path.join(root,name);
    failures.push(...checkWorkflowText(fs.readFileSync(p,'utf8'),p));
  }
  return failures;
}

const invoked=process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href;
if(invoked){
  const failures=scanWorkflowDirectory();
  if(failures.length){
    console.error(failures.join('\\n'));
    process.exit(1);
  }
  console.log('PASS: Actions storage is absent or explicitly transient and self-cleaning.');
}
