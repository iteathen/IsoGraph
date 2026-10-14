#!/usr/bin/env python3
"""Cold original-first Woit 2104.05099v2 §4.3 two paragraphs, W043.

Check source semantic meaning, not source mathematical correctness. Fetch a
versioned author original independently rather than replaying the SSC ledger.
"""
from html.parser import HTMLParser
import subprocess, hashlib, json, unicodedata
class ParagraphText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth=0
        self.chunks=[]
        self.paragraphs=[]
    VOID={"br","hr","img","input","meta","link","area","source","embed","wbr"}
    def handle_starttag(self,tag,attrs):
        if tag=="p" and self.depth==0:
            self.depth=1
            self.chunks=[]
        elif self.depth>0:
            if tag not in self.VOID:
                self.depth+=1
            if tag in ("math","span","a","br"):
                self.chunks.append(" ")
    def handle_data(self,data):
        if self.depth:self.chunks.append(data)
    def handle_endtag(self,tag):
        if self.depth:
            self.depth-=1
            if self.depth==0:
                self.paragraphs.append(" ".join(unicodedata.normalize("NFC","".join(self.chunks)).split()))
url="https://arxiv.org/html/2104.05099v2"
def fetch():
    out=subprocess.run(["curl","--silent","--show-error","--fail","--location",
        "--retry","2","--connect-timeout","20","--max-time","90",url],capture_output=True,check=True,timeout=230)
    assert len(out.stdout)>50000 and b"Euclidean Twistor Unification" in out.stdout
    p=ParagraphText()
    p.feed(out.stdout.decode("utf8","replace"))
    a=[x for x in p.paragraphs if "In the usual formalism, states for the full theory" in x]
    b=[x for x in p.paragraphs if "The usual Penrose-Ward correspondence relates bundles" in x]
    assert len(a)==1 and len(b)==1,(len(a),len(b))
    return a[0],b[0]
def verify(a,b):
    assert a.startswith("In the usual formalism, states for the full theory"), "first §4.3 original author paragraph identity"
    assert b.startswith("The usual Penrose-Ward correspondence"), "second §4.3 original author paragraph identity"
    assert "The usual Penrose-Ward correspondence" not in a, "different source paragraphs conflated"
    assert "In the usual formalism" not in b, "source paragraphs reversed or conflated"
    requirements={
      "source_minkowski_state_fields":["states for the full theory","functionals of fields","spinor fields","gauge fields","vierbeins","Higgs field"],
      "PT0_five_dim":["five-dimensional space","fibered over","with fiber"],
      "future_holomorphic":["One needs to somehow exploit the holomorphic structure","to relate fields"],
      "source_PW_baseline":["usual Penrose-Ward correspondence relates bundles","pull-backs"],
      "PT_intrinsic":["principal bundles which live on","not pull-backs from space-time","vary along"]
    }
    for key, tokens in requirements.items():
        body=a if key.startswith(("source_minkowski","PT0","future")) else b
        for token in tokens:
            assert token in body,(key,token)
    assert a.index("states for the full theory")<a.index("five-dimensional space")<a.index("One needs to somehow")
    assert b.index("usual Penrose-Ward")<b.index("not pull-backs from space-time")<b.index("vary along")
    return True
a,b=fetch()
assert verify(a,b)
cases=[
 ("erase holomorphic uncertainty",lambda a,b:(a.replace("One needs to somehow exploit","The author has completed"),b)),
 ("remove CP1 fiber",lambda a,b:(a.replace("with fiber","without any fiber"),b)),
 ("invert five-dimensional PT0",lambda a,b:(a.replace("five-dimensional space","four-dimensional space"),b)),
 ("erase ordinary Minkowski fields",lambda a,b:(a.replace("vierbeins","some unspecified matter"),b)),
 ("promote cited pullback to source original solution",lambda a,b:(a,b.replace("The usual Penrose-Ward","The source built a new and complete Penrose-Ward"))),
 ("erase not-pullback boundary",lambda a,b:(a,b.replace("not pull-backs from space-time","pull-backs from space-time"))),
 ("erase varying CP1 fiber",lambda a,b:(a,b.replace("vary along","remain constant along"))),
 ("reverse source statement order",lambda a,b:(b,a))
]
for label,change in cases:
    x,y=change(a,b)
    try:verify(x,y)
    except AssertionError:continue
    raise AssertionError("hostile escaped: "+label)
print("W043 W01 v2 original source §4.3 author paragraphs cold FIRST PASS "
      +json.dumps({"paragraphs":2,"semantic_classes":5,
                   "sha256_original_two_paragraphs":hashlib.sha256((a+"\n"+b).encode()).hexdigest(),
                   "hostile_rejected":len(cases),"historical_Oct03":"OPEN",
                   "original_source":"arXiv:2104.05099v2"}))
