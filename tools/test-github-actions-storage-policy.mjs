import assert from 'node:assert/strict';
import { checkWorkflowText } from './check-github-actions-storage-policy.mjs';

function wf(lines){ return lines.join('\n')+'\n'; }

assert.deepEqual(checkWorkflowText(wf([
  'permissions:',
  '  contents: read',
  'jobs:',
  '  t:',
  '    steps:',
  '      - run: echo ok'
])),[]);

const leaked=checkWorkflowText(wf([
  'permissions:',
  '  contents: read',
  'jobs:',
  '  t:',
  '    steps:',
  '      - uses: actions/upload-artifact@v4'
]));
assert.ok(leaked.length>=2);

const missingAlways=checkWorkflowText(wf([
  'permissions:',
  '  contents: read',
  '  actions: write',
  'jobs:',
  '  t:',
  '    steps:',
  '      - uses: actions/upload-artifact@v4',
  '      - name: Cleanup transient artifacts',
  '        run: node tools/cleanup-github-actions-storage.mjs'
]));
assert.ok(missingAlways.some(x=>x.includes('if: always()')));

const cleanupTooEarly=checkWorkflowText(wf([
  'permissions:',
  '  contents: read',
  '  actions: write',
  'jobs:',
  '  t:',
  '    steps:',
  '      - name: Cleanup transient artifacts',
  '        if: always()',
  '        run: node tools/cleanup-github-actions-storage.mjs',
  '      - uses: actions/upload-artifact@v4'
]));
assert.ok(cleanupTooEarly.some(x=>x.includes('after the final artifact action')));

assert.deepEqual(checkWorkflowText(wf([
  'permissions:',
  '  contents: read',
  '  actions: write',
  'jobs:',
  '  t:',
  '    steps:',
  '      - uses: actions/upload-artifact@v4',
  '      - uses: actions/download-artifact@v4',
  '      - name: Cleanup transient artifacts',
  '        if: always()',
  '        env:',
  '          GITHUB_TOKEN: token',
  '        run: node tools/cleanup-github-actions-storage.mjs'
])),[]);

const cache=checkWorkflowText(wf([
  'jobs:',
  '  t:',
  '    steps:',
  '      - uses: actions/cache@v4'
]));
assert.ok(cache.some(x=>x.includes('cache storage is prohibited')));

console.log('PASS: transient Actions storage policy tests');
