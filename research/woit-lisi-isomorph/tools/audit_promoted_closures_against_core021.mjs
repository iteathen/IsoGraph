import fs from "node:fs";

function audit(path){
  const ledger=JSON.parse(fs.readFileSync(path,"utf8"));
  const nodes=new Map(ledger.nodes.map(n=>[n.id,n]));
  const retained=[],review=[];
  for(const d of ledger.dispositions){
    if(d.closure_mode==="INCOMPLETE_UNEXPANDED") continue;
    const seen=new Set();
    const stack=[...(d.body_roots||[]),...(d.support_roots||[]),...(d.dependency_roots||[])];
    const local=[];
    while(stack.length){
      const id=stack.pop();
      if(seen.has(id)) continue;
      seen.add(id);
      const n=nodes.get(id);
      if(!n) continue;
      if(n.authority_owner==="RESEARCH_LOCAL_SCHEMA") local.push(id);
      for(const c of n.children||[]) stack.push(c);
    }
    const row={census_id:d.census_id,prior_closure_mode:d.closure_mode,research_local_schema_nodes:[...new Set(local)].sort()};
    (local.length?review:retained).push(row);
  }
  return {
    prior_closed_count:retained.length+review.length,
    provisional_retained_count:retained.length,
    requires_derivation_audit_count:review.length,
    provisional_retained:retained,
    requires_derivation_audit:review
  };
}

const result={
  W:audit("research/woit-lisi-isomorph/woit/CORE021_CLOSURE_LEDGER_0_47.json"),
  L:audit("research/woit-lisi-isomorph/lisi/CORE021_CLOSURE_LEDGER_0_16.json")
};
console.log(JSON.stringify(result,null,2));
