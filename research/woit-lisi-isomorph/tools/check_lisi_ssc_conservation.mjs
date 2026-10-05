import fs from "node:fs";

const root = process.cwd();
const sscPath = root + "/research/woit-lisi-isomorph/TRACK_L_WORKING_SSC_0_8.md";
const a0Path = root + "/research/woit-lisi-isomorph/lisi/ASSERTION_BASE_A0_0_12.md";
const ledgerPath = root + "/research/woit-lisi-isomorph/lisi/SOURCE_TRAVERSAL_LEDGER_0_9.json";

function rows(md,prefix) {
  return md.split("\n").filter(l => l.startsWith("| " + prefix)).map(line => {
    const c = line.split("|").slice(1,-1).map(x => x.trim());
    return { id:c[0], source:c[2] };
  });
}
function nums(rs,prefix) { return rs.map(r => Number(r.id.slice(prefix.length))).sort((a,b)=>a-b); }
function contiguous(ns) { return ns.length > 0 && ns.every((n,i) => i === 0 || n === ns[i-1] + 1); }
function duplicates(rs) {
  const seen=new Set(), dup=[];
  for (const r of rs) { if (seen.has(r.id)) dup.push(r.id); seen.add(r.id); }
  return dup;
}

const ssc = rows(fs.readFileSync(sscPath,"utf8"),"L-SSC-");
const a0 = rows(fs.readFileSync(a0Path,"utf8"),"L-A0-");
const ledger = JSON.parse(fs.readFileSync(ledgerPath,"utf8"));
const sources=["L01","L02","L03","L04","L05","L06"];

const result = {
  ssc_count:ssc.length,
  ssc_contiguous:contiguous(nums(ssc,"L-SSC-")),
  ssc_duplicates:duplicates(ssc),
  a0_count:a0.length,
  a0_contiguous:contiguous(nums(a0,"L-A0-")),
  a0_duplicates:duplicates(a0),
  all_sources_in_ssc:sources.every(s => ssc.some(r => r.source.includes(s))),
  all_sources_in_ledger:sources.every(s => ledger.sources.some(r => r.id === s)),
  all_sources_sectionally_traversed:ledger.sources.every(r => r.state === "MAIN_TEXT_TRAVERSED_CENSUS_EXPANDED")
};

result.pass =
  result.ssc_count === 191 &&
  result.ssc_contiguous &&
  result.ssc_duplicates.length === 0 &&
  result.a0_count === 194 &&
  result.a0_contiguous &&
  result.a0_duplicates.length === 0 &&
  result.all_sources_in_ssc &&
  result.all_sources_in_ledger &&
  result.all_sources_sectionally_traversed;

process.stdout.write(JSON.stringify(result,null,2) + "\n");
if (!result.pass) process.exitCode = 1;
