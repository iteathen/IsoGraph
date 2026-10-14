#!/usr/bin/env python3
"""W G1 six-body author-original cold verification: fetch original before SSC.
Preserves text/anchor evidence only as hashes; never treats author claims as proved.
"""
import copy
import hashlib
import json
import subprocess
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

INPUT=Path("experiments/062/W_G1_CURRENT_AUTHOR_SIX_SOURCE_FIRST_EXACT_BODIES_0_1.json")
d=json.loads(INPUT.read_text())
expected={
 "W-SSC-001":("https://arxiv.org/html/2104.05099v2","W01"),
 "W-SSC-014":("https://www.math.columbia.edu/~woit/wordpress/?p=15600","W04b"),
 "W-SSC-062":("https://www.math.columbia.edu/~woit/wordpress/?p=15574","W04a"),
 "W-SSC-114":("https://arxiv.org/html/2104.05099v2","W01"),
 "W-SSC-134":("https://arxiv.org/html/2311.00608v2","W02"),
 "W-SSC-138":("https://arxiv.org/html/2311.00608v2","W02"),
}
class TextSource(HTMLParser):
    VOID={"br","hr","img","input","link","meta","source"}
    def __init__(self,article_only):
        super().__init__(convert_charrefs=True)
        self.article_only=article_only
        self.depth=0
        self.found_article=0
        self.hidden=0
        self.text=[]
    def handle_starttag(self,tag,attrs):
        at=dict(attrs)
        if self.article_only and self.depth==0:
            if "entry-content" in at.get("class","").split() or "post-content" in at.get("class","").split():
                self.depth=1
                self.found_article+=1
            return
        if tag in ("script","style","noscript"): self.hidden+=1
        if self.article_only and tag not in self.VOID:self.depth+=1
        if tag in ("p","li","div","h1","h2","h3","h4","blockquote"):self.text.append(" ")
    def handle_endtag(self,tag):
        if tag in ("script","style","noscript") and self.hidden:self.hidden-=1
        if self.article_only and self.depth and tag not in self.VOID:self.depth-=1
        if tag in ("p","li","div","h1","h2","h3","h4","blockquote"):self.text.append(" ")
    def handle_data(self,data):
        if not self.hidden and (not self.article_only or self.depth):self.text.append(data)
    def normalized(self):
        return " ".join(unicodedata.normalize("NFC","".join(self.text)).split())
def fetch(url):
    p=subprocess.run(["curl","--fail","--silent","--show-error","--location",
      "--connect-timeout","20","--max-time","65","--retry","2",
      "--user-agent","IsoGraph-original-Woit-G1-independent-source-recheck/0.1",url],
      capture_output=True,timeout=220,check=True)
    assert p.stdout[:500].lower().find(b"html")>=0, "Not HTML original response"
    parser=TextSource("wordpress" in url)
    parser.feed(p.stdout.decode("utf-8",errors="replace"))
    if "wordpress" in url:assert parser.found_article==1,"Original author article ambiguous"
    return parser.normalized()
cache={}
for url in sorted({x["primary_author_source_url"] for x in d["rows"]}):
    cache[url]=fetch(url)
def verify(manifest,sources):
    assert manifest["schema"]=="isograph.exp062.W.G1.six-original-first-exact-body-0.1"
    assert manifest["current_target"]=="W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1"
    assert manifest["original_oct03_G0_open"] is True
    assert manifest["G1_global_complete"] is False
    assert manifest["G2_authorized"] is False
    assert manifest["other_author_semantics_used"] is False
    assert len(manifest["rows"])==6
    assert manifest["summary"]["previous_qualified_source_local"]==12
    assert manifest["summary"]["new_candidate_source_bodies"]==6
    assert manifest["summary"]["remaining_if_qualified"]==133
    assert manifest["summary"]["new_candidate_occurrences"]==29
    assert set(sources)=={url for url,unit in expected.values()}
    seen=set()
    findings=[]
    for row in manifest["rows"]:
        k=row["census_id"]
        assert k in expected and k not in seen
        seen.add(k)
        assert row["primary_author_source_url"]==expected[k][0]
        assert row["source_unit"]==expected[k][1]
        assert row["historical_record_not_currently_authoritative"] is True
        assert row["stage"]=="G1_SOURCE_LOCAL_ORIGINAL_FIRST_CANDIDATE_NOT_GLOBAL_G1"
        a=row["independently_read_original_anchor_fragments"]
        fixed_count={"W-SSC-001":2,"W-SSC-014":3,"W-SSC-062":3,"W-SSC-114":3,"W-SSC-134":3,"W-SSC-138":3}
        assert len(a)==fixed_count[k],"Original source-first anchor count lost "+k
        txt=sources[row["primary_author_source_url"]]
        positions=[]
        for fragment in a:
            assert len(fragment)>=15,"Source anchor too weak"
            n=txt.count(fragment)
            if k=="W-SSC-062" and fragment=="In Minkowski spacetime":
                # Woit uses this lead-in twice in the article body. The prior
                # singleton source-anchor oracle mistakenly treated it as drift.
                assert 1<=n<=2,"W04a original signature paragraph source anchor missing/mutated"
            else:
                assert n==1,"Original source fragment missing or ambiguous "+k+" / "+fragment
            positions.append(txt.index(fragment))
        assert positions==sorted(positions), "Source anchor ordering changed "+k
        findings.append((k,len(a),hashlib.sha256("|".join(a).encode()).hexdigest()))
    assert len(seen)==6
    return findings
findings=verify(d,cache)
tests=[
 ("invent invalid author URL",lambda z: z["rows"][1].update({"primary_author_source_url":"https://other.example"})),
 ("alter W02 source scope",lambda z: z["rows"][4].update({"source_unit":"W01"})),
 ("false original quotation",lambda z: z["rows"][5]["independently_read_original_anchor_fragments"].__setitem__(1,"source text did not say this")),
 ("reorder original printed source sentences",lambda z: z["rows"][3]["independently_read_original_anchor_fragments"].reverse()),
 ("delete source anchor",lambda z: z["rows"][2]["independently_read_original_anchor_fragments"].pop()),
 ("promote old G0 provenance",lambda z: z.update({"original_oct03_G0_open":False})),
 ("promote G2",lambda z: z.update({"G2_authorized":True})),
 ("import other author",lambda z: z.update({"other_author_semantics_used":True})),
 ("misreport source reviewed count",lambda z: z["summary"].update({"new_candidate_source_bodies":7})),
 ("claim global G1",lambda z: z.update({"G1_global_complete":True}))
]
for label,change in tests:
    z=copy.deepcopy(d)
    change(z)
    try:verify(z,cache)
    except AssertionError:continue
    raise AssertionError("Hostile escaped: "+label)
print("W_G1_SIX_AUTHOR_ORIGINAL_COLD_REVIEW_PASS",json.dumps({
 "source_units":len(seen),"original_url_count":len(cache),"anchors":sum(x[1] for x in findings),
 "source_rows":findings,"negative_tests_rejected":len(tests),"G1_global":"OPEN",
 "G0_current":"FROZEN","G0_oct03":"OPEN"
},separators=(",",":")),flush=True)
