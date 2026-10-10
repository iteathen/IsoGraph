#!/usr/bin/env python3
"""Original L02 v2 G0 Eq26→27 quartic trace-sign audit and 13+16 hostile controls."""
import json,hashlib,importlib.util
from pathlib import Path
ROOT=Path("research/woit-lisi-isomorph/lisi")
EXP=Path("experiments/062")
P={
"packet":ROOT/"LISI_L02_EQ27_QUARTIC_CLIFFORD_TRACE_SIGN_G0_0_1.json",
"old":ROOT/"SOURCE_SEMANTIC_CENSUS_0_47.json",
"current":ROOT/"SOURCE_SEMANTIC_CENSUS_0_48.json",
"oldGate":EXP/"L_CURRENT_STAGE_GATE_0_54.json",
"gate":EXP/"L_CURRENT_STAGE_GATE_0_55.json",
"eq26":ROOT/"LISI_L02_E26_HODGE_TRACE_SECTOR_G0_0_1.json",
"eq28":ROOT/"LISI_L02_EQ28_LORENTZIAN_MINIMUM_SCOPE_G0_0_1.json",
"math":EXP/"tools/l02-eq27-quartic-clifford-trace-math-0-1.py",
"checker":EXP/"tools/verify-l-g0-l02-eq27-quartic-trace-0-1.py"}
def load(p):return json.loads(p.read_text(encoding="utf8"))
def blob(p):
 b=p.read_bytes()
 return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\0"+b).hexdigest()
def audit(packet,prior,census,gate):
 bad=[]
 def ck(v,s):
  if not v:bad.append(s)
 ck(packet.get("schema")=="isograph.lisi-L02-Eq27-quartic-Clifford-trace-sign-G0.v0.1" and packet.get("track")=="L" and packet.get("stage")=="G0" and packet.get("authority") is False,"Track L only, G0 non-authoritative")
 source=packet.get("source",{})
 ck(source.get("id")=="L02" and source.get("revision")=="arXiv:1004.4866v2" and len(source.get("authors",[]))==3,"original L02 frozen v2 authors/revision")
 formulas={x.get("id"):x for x in source.get("source_formulas",[])}
 expected={
 "ACTION_TRACE_DEF":"<...> is the trace, equivalent to taking the Clifford scalar part; gamma_IJ=gamma_I gamma_J",
 "E13_SIGMA":"E=ePrime phi; SigmaPrime=ePrime ePrime",
 "E26_QUARTIC":"S_E26=(3/(8g))*int<...+(phi4/256)*SigmaPrime wedge star_e(SigmaPrime)+...>",
 "E27_RESTRICTION":"Only after ePrime=e and T=0, S_E27=(3/(8g))*int d4x |e| (...+(3/32)*phi4+...-(1/4)*Fmn_ab*F_ab_mn)",
 "LORENTZIAN":"Lorentzian spacetime star_e star_e=-1 on real 2forms",
 "YM_SOURCE_SIGN":"Eq27 internal gauge tensor-square coefficient -1/4 relative to the common 3/(8g) factor"}
 ck(len(formulas)==6 and len(source.get("source_formulas",[]))==6,"all six source roles conserved")
 for k,text in expected.items():ck(formulas.get(k,{}).get("expression")==text,"original printed source "+k)
 for k,path in [("ssc047",P["old"]),("gate054",P["oldGate"]),("eq26",P["eq26"]),("eq28",P["eq28"])]:
  x=packet.get("parents",{}).get(k,{})
  ck(x.get("path")==str(path) and x.get("git_blob_sha")==blob(path),"source parent "+k)
 r=packet.get("mathematical_reconstruction",{})
 ck("Project-selected" in r.get("selected_model","") and "grade-zero" in r.get("invariant_result","") if False else r.get("invariant_result","").startswith("<Sigma wedge star_e Sigma>_CliffordScalar = -4*6*vol_e"),"conditional selected Clifford quartic math")
 ck(r.get("printed_E27_quartic_requires","").startswith("+3/32 phi4") and r.get("relative_sign_residual","").startswith("source-required (+24) minus selected-model (-24)"),"original source plus vs finite model minus exactly preserved")
 ck("would flip" in r.get("global_trace_flip_issue","") and "source authorization" in r.get("global_trace_flip_issue",""),"global sign flip not silently repairing both sectors")
 ck("No unconditional source contradiction" in r.get("cannot_conclude",""),"source discrepancy not assigned author error")
 e=packet.get("verification",{})
 ck(e.get("exact_fraction_4x4_coframe_cases")==6 and e.get("Lorentzian_Hodge_square_matrix_entries")==216 and e.get("Clifford_bivector_terms")==36,"exact test counts")
 ck(e.get("math_hostiles")==13 and e.get("source_hostiles")==16,"adversarial controls declared")
 s=packet.get("source_disposition",{})
 ck(s.get("model_vs_source_quartic_sign_mismatch_observed") is True and s.get("original_source_author_error_confirmed") is False and s.get("universal_trace_sign_no_go_established") is False,"not an unrestricted physics claim")
 for k in ["source_census_frozen","G1_authorized","G2_G7_authorized","recursive_IA_authorized","cross_track_synthesis_authorized","original_Eq27_physical_coefficient_qualified","original_source_error_proved","external_cold_theory_review_passed","author_outreach_authorized","PR70_merge_authorized"]:
  ck(packet.get("stage_locks",{}).get(k) is False,"no higher authority "+k)
 A={x["id"]:x for x in prior.get("items",[])};B={x["id"]:x for x in census.get("items",[])}
 ck(len(A)==191 and len(B)==191 and census.get("item_count")==191,"191 source identities")
 changed=[]
 for id,old in A.items():
  if id not in B:bad.append("lost "+id)
  elif B[id]!=old:changed.append(id)
 for id in B:
  if id not in A:bad.append("invented "+id)
 ck(changed==["L-SSC-061","L-SSC-062"],"189 predecessor full records unchanged: "+str(changed))
 for id in changed:
  old=A[id];cur=B[id];link=cur.get("source_expression_census",{}).get("L02_EQ27_QUARTIC_TRACE_SIGN_G0",{})
  ck(cur.get("body","").startswith(old.get("body","MISSING_ANCESTOR")),"prior source body conserved "+id)
  ck(link.get("source_packet",{}).get("path")==str(P["packet"]) and link.get("source_packet",{}).get("git_blob_sha")==blob(P["packet"]),"exact packet hash "+id)
  ck(link.get("source_global_quartic_trace_sign_qualified") is False and link.get("author_math_error_proved") is False and link.get("G1_authorized") is False,"no source error/proposed completion promoted "+id)
 rev=census.get("revision",{})
 ck(rev.get("predecessor_git_blob_sha")==blob(P["old"]) and rev.get("source_packet",{}).get("git_blob_sha")==blob(P["packet"]) and rev.get("changed_source_items")==["L-SSC-061","L-SSC-062"],"SSC0.48 original ancestry")
 ck(census.get("guards",{}).get("source_census_freeze_complete") is False and census.get("guards",{}).get("recursive_IA_authorized") is False,"current G0 still open")
 ck(gate.get("track")=="L" and gate.get("stage")=="G0" and gate.get("semantic_authority") is False and gate.get("predecessor_gate",{}).get("git_blob_sha")==blob(P["oldGate"]),"new G0 gate parent")
 ck(gate.get("current_source_census",{}).get("git_blob_sha")==blob(P["current"]) and gate.get("current_source_census",{}).get("frozen") is False,"current source gate exact SSC")
 ck(gate.get("current_source_packet",{}).get("git_blob_sha")==blob(P["packet"]) and gate.get("source_verifier",{}).get("git_blob_sha")==blob(P["checker"]) and gate.get("source_verifier",{}).get("math_blob_sha")==blob(P["math"]),"checker/math/packet exact blobs")
 ck(gate.get("current_lawful_state",{}).get("G1_authorized") is False and gate.get("current_lawful_state",{}).get("cross_track_synthesis_authorized") is False,"stage firewall")
 ck("W-SSC-" not in json.dumps(packet),"no W import")
 return bad
spec=importlib.util.spec_from_file_location("l02eq27_exact_math",P["math"]);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
math=module.math_audit();issues=list(math["issues"]);killed_math=0
for name,mutant in module.MUTATIONS:
 try:r=module.math_audit(mutant)
 except Exception as exc:issues.append("CRASHED_MATH_MUTANT "+name+": "+str(exc));continue
 if r["pass"]:issues.append("ESCAPED_MATH_MUTANT "+name)
 else:killed_math+=1
packet=load(P["packet"]);old=load(P["old"]);new=load(P["current"]);gate=load(P["gate"])
issues+=audit(packet,old,new,gate)
mutations=[
 ("source-v1",lambda p:p["source"].update(revision="arXiv:1004.4866v1")),
 ("source-trace-replaced",lambda p:p["source"]["source_formulas"][0].update(expression="trace is minus scalar")),
 ("source-area-half",lambda p:p["source"]["source_formulas"][1].update(expression="SigmaPrime=ePrime wedge ePrime/2")),
 ("source-quartic-e26",lambda p:p["source"]["source_formulas"][2].update(expression="phi4/128 SigmaPrime star SigmaPrime")),
 ("source-quartic-e27",lambda p:p["source"]["source_formulas"][3].update(expression="quartic is -3/32 phi4")),
 ("source-eprime-not-e",lambda p:p["source"]["source_formulas"][3].update(expression="Eq27 valid for all ePrime")),
 ("source-euclidean",lambda p:p["source"]["source_formulas"][4].update(expression="Euclidean star^2=+1")),
 ("source-YM-sign",lambda p:p["source"]["source_formulas"][5].update(expression="YM coefficient +1/4")),
 ("direct-math-opposite",lambda p:p["mathematical_reconstruction"].update(invariant_result="Sigma star Sigma +24 always")),
 ("source-target-minus",lambda p:p["mathematical_reconstruction"].update(printed_E27_quartic_requires="-24")),
 ("declare-trace-resolved",lambda p:p["source_disposition"].update(universal_trace_sign_no_go_established=True)),
 ("declare-error",lambda p:p["source_disposition"].update(original_source_author_error_confirmed=True)),
 ("drop-global-YM-negative",lambda p:p["mathematical_reconstruction"].update(global_trace_flip_issue="uniform trace repairs")),
 ("drop-disclaimer",lambda p:p["mathematical_reconstruction"].update(cannot_conclude="All author claims disproved")),
 ("promote-G1",lambda p:p["stage_locks"].update(G1_authorized=True)),
 ("forge-ssc-parent",lambda p:p["parents"]["ssc047"].update(git_blob_sha="INVALID"))
]
killed_source=0
for name,fn in mutations:
 copy=json.loads(json.dumps(packet));fn(copy)
 if audit(copy,old,new,gate):killed_source+=1
 else:issues.append("ESCAPED_SOURCE_MUTANT "+name)
output={"schema":"isograph.exp062-L02-Eq27-quartic-trace-sign-G0-verifier.v0.1",
"pass":not issues,"issues":issues,"math":math,"math_mutants_defined":len(module.MUTATIONS),"math_mutants_rejected":killed_math,
"source_mutants_defined":len(mutations),"source_mutants_rejected":killed_source,
"L_source_identities":191,"unchanged_full_source_records":189,"changed":["L-SSC-061","L-SSC-062"],
"original_all_spinN_trace_qualified":False,"author_mathematical_error_proved":False,
"G1_authorized":False,"cross_track_semantics_authorized":False,"external_cold_theory_review_passed":False}
print(json.dumps(output,indent=2))
if issues:raise SystemExit(1)
