import fs from "node:fs";
import {spawnSync} from "node:child_process";

const ledgerPath="research/woit-lisi-isomorph/lisi/CORE021_CLOSURE_LEDGER_0_19.json";
const checker="tools/core021/check-core021-ledger.mjs";
const ledger=JSON.parse(fs.readFileSync(ledgerPath,"utf8"));
const run=spawnSync(process.execPath,[checker,ledgerPath],{encoding:"utf8"});
let report;
try{report=JSON.parse(run.stdout);}catch{throw new Error("Core checker did not emit JSON\n"+run.stdout+run.stderr);}

const errors=[];
const expectedGates={
  SOUNDNESS_STRUCTURE:true,
  COVERAGE:true,
  RECONSTRUCTION:true,
  SCOPE_INTEGRITY:true,
  AUTHORITY_ROUTING_STRUCTURE:true,
  IA_FIXED_POINT_CURRENT:true,
  STRICT_CLOSURE:false
};
for(const [k,v] of Object.entries(expectedGates))if(report.gates?.[k]!==v)errors.push("gate "+k+" expected "+v+" got "+report.gates?.[k]);
if(run.status===0)errors.push("partial ledger unexpectedly qualified");
if(report.qualifies!==false)errors.push("qualifies must be false");
if((report.errors||[]).some(x=>!String(x).startsWith("STRICT_CLOSURE:")))errors.push("non-STRICT_CLOSURE checker error present");
const closed=ledger.dispositions.filter(x=>x.closure_mode!=="INCOMPLETE_UNEXPANDED");
const open=ledger.dispositions.filter(x=>x.closure_mode==="INCOMPLETE_UNEXPANDED");
if(closed.length!==1||closed[0]?.census_id!=="L-SSC-191"||closed[0]?.closure_mode!=="CLOSED_PRIMITIVE")errors.push("closed set mismatch");
if(open.length!==190)errors.push("open count mismatch");
if(ledger.inference_profile?.recursive_ia!==false)errors.push("IA prematurely enabled");
if(ledger.ia_fixed_point!==null)errors.push("IA fixed point must remain null");

const result={
  pass:errors.length===0,
  errors,
  checker_exit:run.status,
  checker_gates:report.gates,
  accepted_closed_items:closed.map(x=>x.census_id),
  incomplete_unexpanded:open.length,
  ia_authorized:false,
  dp_authorized:false
};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
