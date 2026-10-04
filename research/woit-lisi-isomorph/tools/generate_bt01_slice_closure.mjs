import fs from "node:fs";

const inputPath = new URL("../bridge/BT01_SLICE_CLOSURE_INPUT_0_1.json", import.meta.url);
const outputPath = new URL("../bridge/BT01_SLICE_CLOSURE_LEDGER_0_1.json", import.meta.url);

const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function category(status) {
  if (status.startsWith("CLOSED") || status.startsWith("IA_CLOSED")) return "closed";
  if (status.startsWith("PARTIAL")) return "partial";
  if (status.startsWith("OPEN")) return "open";
  if (status.includes("QUARANTINED")) return "quarantined";
  return "other";
}

const summary = {
  W: { closed: 0, partial: 0, open: 0, quarantined: 0, other: 0, total: 0 },
  L: { closed: 0, partial: 0, open: 0, quarantined: 0, other: 0, total: 0 }
};

const entries = input.entries.map((entry) => {
  const cat = category(entry.status);
  summary[entry.track][cat] += 1;
  summary[entry.track].total += 1;
  return { ...entry, category: cat };
});

const ledger = {
  schema: "woit-lisi.bt01-slice-closure-ledger.v0.1",
  generated_from: "BT01_SLICE_CLOSURE_INPUT_0_1.json",
  generated_at_research_checkpoint: "2026-10-03",
  source_branch_head: input.branch_head,
  scope: input.scope,
  pinned_support: input.pinned_support,
  summary,
  entries,
  qualification: {
    full_track_closure_claimed: false,
    bt01_slice_author_audit: "PARTIAL_PASS",
    reason: "Closed entries have native/schema witnesses; partial/open entries prevent slice-wide closure, and complete source traversal has not occurred."
  }
};

fs.writeFileSync(outputPath, JSON.stringify(ledger, null, 2) + "\n");
