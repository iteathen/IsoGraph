#!/usr/bin/env python3
"""Fail closed if the current author-body and PDF fingerprints change."""
import copy
import json
from pathlib import Path
manifest = json.loads(Path("research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json").read_text())
capture = json.loads(Path("/tmp/woit-source-capture-20261011-v03/CURRENT_W_SOURCE_HASHES_0_1.json").read_text())
def verify(m, c):
    assert m["target_id"] == "W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1"
    assert m["original_frozen_target"]["retained_open"] is True
    assert m["original_frozen_target"]["no_retroactive_qualification"] is True
    assert m["source_scope"]["exact_mutable_oct03_bytes_claimed_same"] is False
    assert c["track"]=="W" and not c["failures"] and len(c["source_entries"])==8
    observed = {x["unit"]:x for x in c["source_entries"]}
    assert len(observed)==8
    for u in m["source_scope"]["units"]:
        if u["source_identity_mode"]=="RETRIEVED_CURRENT_AUTHOR_ARTICLE_CANONICAL_FINGERPRINT":
            o=observed[u["unit"]]
            assert o["format"]=="html" and o["original_author_url"]==u["original_url"]
            assert o["normalized_author_article_sha256"]==u["authored_content_sha256"], u["unit"]
            assert o["normalized_author_article_characters"]==u["authored_content_character_count"],u["unit"]
            assert u["exact_oct03_raw_source_identity_verified"] is False
    for p in m["source_scope"]["attached_author_pdf_originals"]:
        o=observed[p["unit"]]
        assert o["format"]=="pdf" and o["original_author_url"]==p["original_url"]
        assert o["sha256_raw_source_bytes"]==p["sha256_raw_bytes"],p["unit"]
        assert o["byte_length"]==p["byte_length"]
        assert p["exact_oct03_raw_source_identity_verified"] is False
    return True
assert verify(manifest,capture)
tests=[
 ("article body drift", lambda m,c: c["source_entries"][0].update({"normalized_author_article_sha256":"0"*64})),
 ("pdf binary drift",lambda m,c:c["source_entries"][-1].update({"sha256_raw_source_bytes":"f"*64})),
 ("delete source",lambda m,c:c["source_entries"].pop()),
 ("replace source URL",lambda m,c:c["source_entries"][1].update({"original_author_url":"https://invalid.example"})),
 ("change article body length",lambda m,c:c["source_entries"][0].update({"normalized_author_article_characters":0})),
 ("claim historical identity",lambda m,c:m["source_scope"].update({"exact_mutable_oct03_bytes_claimed_same":True})),
 ("rewrite old disposition",lambda m,c:m["original_frozen_target"].update({"retained_open":False})),
 ("wrong PDF length",lambda m,c:c["source_entries"][-1].update({"byte_length":1})),
]
for label, change in tests:
    mm,cc=copy.deepcopy(manifest),copy.deepcopy(capture)
    change(mm,cc)
    try: verify(mm,cc)
    except AssertionError: continue
    raise AssertionError("hostile escaped "+label)
print("W G0 current web authored semantic fingerprints 6/6 PDF exact bytes 2/2 PASS with 8/8 adversarial controls; historical October03 identity remains OPEN")
