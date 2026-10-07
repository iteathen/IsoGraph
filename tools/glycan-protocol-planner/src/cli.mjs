#!/usr/bin/env node
import fs from 'node:fs/promises';
import { exampleCatalog, runExample } from './examples/catalog.mjs';
import { planCleavage } from './adapters/idealized-cleavage.mjs';
import { planFiniteState } from './adapters/finite-state.mjs';

function usage() {
  console.log(`\nGlycan Protocol Planner\n\nCommands:\n  examples\n  demo <example-id>\n  cleavage <scenario.json> [objective.json]\n  transition <scenario.json>\n`);
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (!cmd || cmd === 'help' || cmd === '--help') {
    usage();
  } else if (cmd === 'examples') {
    for (const x of exampleCatalog) console.log(`${x.id}\t${x.title}\t${x.description}`);
  } else if (cmd === 'demo') {
    console.log(JSON.stringify(runExample(args[0] ?? exampleCatalog[0].id), null, 2));
  } else if (cmd === 'cleavage') {
    if (!args[0]) throw new Error('cleavage requires a scenario JSON file.');
    const scenario = await readJson(args[0]);
    const objective = args[1] ? await readJson(args[1]) : { remove: 'all-nontarget' };
    console.log(JSON.stringify(planCleavage(scenario, objective), null, 2));
  } else if (cmd === 'transition') {
    if (!args[0]) throw new Error('transition requires a scenario JSON file.');
    console.log(JSON.stringify(planFiniteState(await readJson(args[0])), null, 2));
  } else {
    throw new Error(`Unknown command ${cmd}.`);
  }
} catch (error) {
  console.error(error?.stack ?? String(error));
  process.exitCode = 1;
}
