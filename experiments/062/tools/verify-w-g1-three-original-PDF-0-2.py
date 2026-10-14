#!/usr/bin/env python3
"""Cold current-original W G1 source audit: W084/W095/W126 only.

No new source authority, cross-track semantics, G1 completeness, or G2 rights.
Compare exact source PDF bytes, actual printed page text, frozen G0 locations,
source-specific roles, prior G1 as historical, and explicit hostile controls.
No author PDF content is committed or uploaded.
"""
import copy
import hashlib
import json
import os
import re
import subprocess
import tempfile
import unicodedata
from pathlib import Path

ROOT = Path("experiments/062")
PATH = ROOT / "W_G1_W084_W095_W126_CURRENT_ORIGINAL_FIRST_0_1.json"
def read(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))
def git_blob(p):
    b=Path(p).read_bytes()
    return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\0"+b).hexdigest()
SOURCES={
 "ssc":("research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json","f13075a1e2b039bab66e738cc992e121cd6c9947"),
 "inverse":(ROOT/"W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json","6a959eabe8803770bc8e9851e288de6535821477"),
 "frontier":(ROOT/"W_G1_CURRENT_AUTHOR_SOURCE_REBASELINE_FRONTIER_0_1.json","0813758c9d11a32fa7e9e90329aaa7cf4d3d4c19"),
 "oldG1":(ROOT/"W_EXTRACTION_RECONCILED_0_31.json","a87da9d8de2a68fdf60df6c32ddfb5f5e4b4376e"),
 "stage21":(ROOT/"W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_4.json","57f0fa392ad02c2fb522d4c6f5127c8db29549eb"),
 "G0stage":(ROOT/"W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json","e3848f4025a733d33b8b8b3411fa779e8b0a5b9a"),
 "W04e_source":(ROOT/"W04E_G0_ALL_15PAGE_CURRENT_AUTHOR_PDF_ORIGINAL_FIRST_CONVERGENCE_0_1.json","4d5abe5ccff0149a2f72b10c3b78c73752fd6041"),
 "W04d_source":(ROOT/"W04D_G0_28_SLIDE_6_POST_SOURCE_FIRST_0_1.json","41859a68f1ef1c30b56dd1040e23f56ac4e8c525"),
}
for k,(path,hash_) in SOURCES.items():
    assert git_blob(path)==hash_,("CHANGED_SOURCE_INPUT",k,path)
docs={k:read(path) for k,(path,h) in SOURCES.items()}
stage=docs["stage21"]
g0=docs["G0stage"]
assert stage["source_reconciliation"]["current_source_local_reviewed_count"]==21
assert stage["G1_complete"] is False and stage["G2_authorized"] is False
assert g0["current"]["G0_frozen"] is True
assert g0["historical_oct03_target"]["G0_complete"] is False
ssc={x["id"]:x for x in docs["ssc"]["items"]}
inv={x["ssc_id"]:x for x in docs["inverse"]["current_ssc_to_original_inverse"]}
front={x["census_id"]:x for x in docs["frontier"]["rows"]}
old={x["census_id"]:x for x in docs["oldG1"]["items"]}
m=read(PATH)
RAW_EXPECTED={
"W04d_slides":("39a835a2d7966a897559201340073547e30dd5cee701180afed22ec8a95f4c56",28),
"W04e_notes":("02a4165cd3a4efab34ad575fd2e31b2c5df6153124f634f0c8e942e4d7c0e9ce",15)}
EXPECTED_KEYS=[
("W-SSC-084","W04e",8,"W04e/linked_source_PDF_15pages/W04E-P08-045",4),
("W-SSC-095","W04d",27,"W04d/linked_source_PDF_28slides/W04D-PDF-P27",8),
("W-SSC-126","W04e",13,"W04e/linked_source_PDF_15pages/W04E-S56-22",6)]
def compact(s):
    s=unicodedata.normalize("NFKC",s).casefold().replace("\u00ad","")
    return "".join(ch for ch in s if ch.isalnum())
def read_original_pdf(pdf,folder):
    unit=pdf["id"]
    assert unit in RAW_EXPECTED
    expected_sha,pages=RAW_EXPECTED[unit]
    assert pdf["pages"]==pages and pdf["raw_sha256"]==expected_sha
    assert pdf["url"].startswith("https://www.math.columbia.edu/~woit/twistorunification/")
    target=Path(folder)/(unit+".pdf")
    p=subprocess.run([
       "curl","--fail","--silent","--show-error","--location","--retry","3",
       "--retry-delay","2","--connect-timeout","20","--max-time","85",
       "--user-agent","IsoGraph-W-G1-exact-original-fidelity-v0.1",
       "--output",str(target),pdf["url"]
    ],capture_output=True,text=True,timeout=320)
    assert p.returncode==0,("PDF_GET",unit,p.stderr[-500:])
    raw=target.read_bytes()
    assert len(raw)>50000 and raw.startswith(b"%PDF-")
    assert hashlib.sha256(raw).hexdigest()==expected_sha,("PDF_DIGEST",unit)
    info=subprocess.check_output(["pdfinfo",str(target)],text=True)
    lines=[x for x in info.splitlines() if x.startswith("Pages:")]
    assert len(lines)==1 and int(lines[0].split(":")[1])==pages
    return target
def read_page(path,n):
    return subprocess.check_output(["pdftotext","-f",str(n),"-l",str(n),"-layout",str(path),"-"],text=True)
def verify(m,pages):
    assert m["schema"]=="isograph.exp062-W-G1-24-body-next-original-three-source-audit.v0.1"
    assert m["track"]=="W"
    assert m["current_source_target"]=="W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1"
    assert m["historical_Oct03_G0"]=="OPEN"
    assert m["G0_new_scope_frozen_qualified"] is True
    for f in ["G1_global_complete","G2_authorized","L_semantics_used","native_primitives_assigned","source_math_claims_independently_proven"]:
        assert m[f] is False,f
    assert len(m["pinned_inputs"])==len(SOURCES)
    assert {v["name"]:(v["path"],v["blob"]) for v in m["pinned_inputs"]}=={
        k:(str(path),hash_) for k,(path,hash_) in SOURCES.items()}
    assert len(m["original_pdfs"])==2
    for x in m["original_pdfs"]:
        assert (x["raw_sha256"],x["pages"])==RAW_EXPECTED[x["id"]]
    assert len(m["rows"])==3
    assert m["counts"]=={"reviewed_source_units":2,"new_exact_historical_bodies":3,
        "source_rows":18,"occurrence_candidates":18,
        "inherited_current_reviewed":21,"total_frozen_SSC":151,
        "unreviewed_until_CI":130,"on_success_current_reviewed":24,
        "on_success_unreviewed":127,"historical_Oct03_G0_frozen":False}
    source_first=docs["W04e_source"]["original_source_to_ssc"]
    slides=docs["W04d_source"]["slides"]
    observed=[]
    for i,(c,unit,pageno,g0key,howmany) in enumerate(EXPECTED_KEYS):
        row=m["rows"][i]
        assert row["census_id"]==c and row["source_unit"]==unit
        assert row["original"]["current_G0_source_location"]==g0key
        assert row["original"]["printed_page"]==pageno
        assert row["original"]["zero_based_pdf_index"]==pageno-1
        assert row["source_read_method"]=="INDEPENDENT_AUTHOR_PDF_SOURCE_FIRST_READ_VISUAL_AND_TEXT_CHECKED_2026_10_11"
        assert row["historical_G1_exact_body_match_only_not_qualification"] is True
        assert row["source_G1_state"]=="AUTHOR_ORIGINAL_FIRST_REVIEW_CANDIDATE_AWAITING_EXACT_INDEPENDENT_CI"
        assert len(row["original_evidence_atoms"])==howmany
        assert len(row["candidate_occurrences"])==howmany
        assert len(old[c]["occurrences"])==[4,4,5][i]
        assert front[c]["historical_G1"]["historical_body_identical_to_current"] is True
        assert front[c]["historical_G1"]["nonreconstructing_old_occurrences"]==[]
        assert inv[c]["source_typed_statement_ids"]==[]
        assert inv[c]["original_source_keys"]==[g0key]
        assert ssc[c]["obligation"]!= "" and ssc[c]["source"].startswith(("W04d","W04e"))
        if unit=="W04e":
            z=next(x for x in source_first if x["key"]==g0key.split("/")[-1])
            assert c in z["ssc_owners"] and z["printed_pdf_page"]==pageno
        else:
            z=next(x for x in slides if x["source_location"]==g0key.split("/")[-1])
            assert c in z["source_to_ssc"] and z["printed_slide"]==pageno
        name=row["original"]["pdf_source_identity"]
        text=compact(pages[(name,pageno)])
        assert len(text)>250,(c,"source page text unexpectedly short")
        positions=[]
        for n,(atom,oc) in enumerate(zip(row["original_evidence_atoms"],row["candidate_occurrences"]),1):
            expected_id=f"{c}-SRC-{n:02d}"
            expected_oc=f"{c}-CURRENT-G1-{n:02d}"
            assert atom["id"]==expected_id and oc["source_anchor_id"]==expected_id
            assert oc["occurrence_id"]==expected_oc
            assert atom["source_printed_anchor"] and atom["source_role"]==oc["source_operator_or_relation"]
            assert oc["logical_force"] and oc["source_guard"] and oc["source_binder_scope"]
            assert oc["stage"]=="G1_ORIGINAL_AUTHOR_SOURCE_FIRST_CANDIDATE"
            assert oc["source_native_abstract_math_proof_imported"] is False
            assert oc["newly_qualified_IsoGraph_semantics"] is False
            anchor=compact(atom["source_printed_anchor"])
            offset=text.find(anchor)
            assert offset>=0,("ORIGINAL_PAGE_ANCHOR_MISSING",c,n,atom["source_printed_anchor"])
            positions.append(offset)
            for dep in oc["depends_on"]:
                assert dep in [x["occurrence_id"] for x in row["candidate_occurrences"][:n-1]]
        # Original page order is independent from topological dependency order:
        # slide27's title precedes the two PT presentations that it relates.
        printed_order={"W-SSC-084":[0,1,2,3],
                       "W-SSC-095":[4,0,1,2,3,5,6,7],
                       "W-SSC-126":[0,1,2,3,4,5]}[c]
        cursor=0
        for n0 in printed_order:
            source_anchor=compact(row["original_evidence_atoms"][n0]["source_printed_anchor"])
            new_offset=text.find(source_anchor,cursor)
            assert new_offset>=0,("SOURCE_ANCHOR_OUT_OF_PRINTED_ORDER",c,n0+1,source_anchor)
            cursor=new_offset+len(source_anchor)
        observed.append(c)
    assert observed==[x[0] for x in EXPECTED_KEYS]
    w84,w95,w126=m["rows"]
    assert w84["candidate_occurrences"][1]["source_specific_argument_and_result_roles"]["actor"]=="THETA_REFLECTION"
    assert w84["candidate_occurrences"][2]["source_specific_argument_and_result_roles"]["source_symmetry"]=="SO4"
    assert w84["candidate_occurrences"][3]["source_specific_argument_and_result_roles"]["to"]=="SO31_LORENTZ_INVARIANCE"
    assert "unfinished chiral" in w84["original"]["source_original_scope"].casefold()
    assert w95["candidate_occurrences"][0]["source_specific_argument_and_result_roles"]["presentation"]=="PROJECTIVE_RIGHT_SPIN_BUNDLE"
    assert w95["candidate_occurrences"][3]["source_specific_argument_and_result_roles"]["binder"]=="TANGENT_SPACE_AT_CHOSEN_S4_POINT"
    assert w95["candidate_occurrences"][5]["source_specific_argument_and_result_roles"]["dimension"]==4
    assert w95["candidate_occurrences"][6]["source_specific_argument_and_result_roles"]=={
        "premise":"METRIC_ANTI_SELF_DUAL","conclusion":"TWISTOR_SPACE_COMPLEX_MANIFOLD","binder":"Riemannian_M_d4"}
    assert w95["candidate_occurrences"][7]["source_specific_argument_and_result_roles"]["requires"]==[
        "METRIC_ASD","TWISTOR_SPACE_COMPLEX"]
    assert w126["candidate_occurrences"][0]["source_specific_argument_and_result_roles"]["input"]=="HOLOMORPHIC_VECTOR_BUNDLES_ON_CP3"
    assert w126["candidate_occurrences"][1]["source_specific_argument_and_result_roles"]["quantifier"]=="CERTAIN_NOT_ALL"
    assert w126["candidate_occurrences"][2]["source_specific_argument_and_result_roles"]["output"]=="RIGHT_HANDED_WEYL_EQUATION_SOLUTIONS"
    assert w126["candidate_occurrences"][3]["source_specific_argument_and_result_roles"]["rhs"]=="SELF_DUAL_CONNECTION"
    assert w126["candidate_occurrences"][4]["source_specific_argument_and_result_roles"]["domain"]=="EUCLIDEAN_S4_HEMISPHERE"
    assert w126["candidate_occurrences"][5]["source_specific_argument_and_result_roles"]["domain"]=="MINKOWSKI_SPACETIME"
    assert w126["candidate_occurrences"][5]["source_specific_argument_and_result_roles"]["relation"]=="HOLOMORPHIC_BOUNDARY_VALUES"
    return {"source_first_author_units":2,"source_body_rows":3,"author_occurrences":18,
            "author_pdfs_exact_hashes":2,"current_G1_reviewed_if_pass":24,
            "remaining_G1":127,"historical_G0":"OPEN","G2":"BLOCKED"}
source_pages={}
with tempfile.TemporaryDirectory() as tmp:
    downloaded={x["id"]:read_original_pdf(x,tmp) for x in m["original_pdfs"]}
    for row in m["rows"]:
        p=row["original"]
        key=(p["pdf_source_identity"],p["printed_page"])
        source_pages[key]=read_page(downloaded[key[0]],key[1])
    original=verify(copy.deepcopy(m),source_pages)
    attacks=[
    ("erase original row",lambda q:q["rows"].pop()),
    ("fake source PDF sha",lambda q:q["original_pdfs"][0].update({"raw_sha256":"0"*64})),
    ("false G1 complete",lambda q:q.update({"G1_global_complete":True})),
    ("false G2 authorized",lambda q:q.update({"G2_authorized":True})),
    ("fake Oct03 freeze",lambda q:q.update({"historical_Oct03_G0":"CLOSED"})),
    ("L semantic import",lambda q:q.update({"L_semantics_used":True})),
    ("W84 false completed chiral Theta",lambda q:q["rows"][0]["candidate_occurrences"][1]["source_specific_argument_and_result_roles"].update({"actor":"CONSTRUCTED_CHIRAL_THETA"})),
    ("W84 flipped source symmetry",lambda q:q["rows"][0]["candidate_occurrences"][2]["source_specific_argument_and_result_roles"].update({"source_symmetry":"SO31"})),
    ("W84 remove source anchor",lambda q:q["rows"][0]["original_evidence_atoms"][2].update({"source_printed_anchor":"text never authored"})),
    ("W95 discard ASD premise",lambda q:q["rows"][1]["candidate_occurrences"][6]["source_specific_argument_and_result_roles"].update({"premise":"ANY_METRIC"})),
    ("W95 unconditional holomorphic",lambda q:q["rows"][1]["candidate_occurrences"][7]["source_specific_argument_and_result_roles"].update({"requires":[]})),
    ("W95 turn d4 into arbitrary dimension",lambda q:q["rows"][1]["candidate_occurrences"][5]["source_specific_argument_and_result_roles"].update({"dimension":10})),
    ("W95 flip PT presentation",lambda q:q["rows"][1]["candidate_occurrences"][0]["source_specific_argument_and_result_roles"].update({"presentation":"LEFT_SPINOR_BUNDLE"})),
    ("W126 all rather than certain",lambda q:q["rows"][2]["candidate_occurrences"][1]["source_specific_argument_and_result_roles"].update({"quantifier":"ALL"})),
    ("W126 arbitrary YM coupling",lambda q:q["rows"][2]["candidate_occurrences"][3]["source_specific_argument_and_result_roles"].update({"rhs":"ARBITRARY_YM_CONNECTION"})),
    ("W126 reverse chirality",lambda q:q["rows"][2]["candidate_occurrences"][2]["source_specific_argument_and_result_roles"].update({"output":"LEFT_HANDED_WEYL"})),
    ("W126 entire S4 instead of hemisphere",lambda q:q["rows"][2]["candidate_occurrences"][4]["source_specific_argument_and_result_roles"].update({"domain":"ALL_S4"})),
    ("W126 Minkowski not boundary values",lambda q:q["rows"][2]["candidate_occurrences"][5]["source_specific_argument_and_result_roles"].update({"relation":"ORDINARY_EUCLIDEAN_FIELD"})),
    ("W126 drop original source locator",lambda q:q["rows"][2]["original"].update({"current_G0_source_location":"W04d/fake"})),
    ("W126 fabricate typed G0 source ID",lambda q:q["rows"][2]["original_evidence_atoms"][3].update({"id":"W-SSC-126-FAKE"})),
    ("duplicate unsupported author relation",lambda q:q["rows"][2]["candidate_occurrences"].append(copy.deepcopy(q["rows"][2]["candidate_occurrences"][-1]))),
    ("G1 predecessor stage wrong",lambda q:q["counts"].update({"inherited_current_reviewed":151})),
    ]
    for name,mutation in attacks:
        candidate=copy.deepcopy(m);mutation(candidate)
        caught=False
        try: verify(candidate,source_pages)
        except AssertionError: caught=True
        assert caught,("HOSTILE_MUTATION_ESCAPED",name)
    print("W G1 ORIGINAL TWO AUTHOR PDF 3-BODY PASS",json.dumps({**original,"hostile_rejected":len(attacks),"hostiles_total":len(attacks)}),flush=True)
