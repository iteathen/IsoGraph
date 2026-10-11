#!/usr/bin/env python3
"""Independently verify W04e source author's scoped reply and negative meaning."""
from html.parser import HTMLParser
from urllib.request import Request, urlopen
import unicodedata, hashlib, json, copy
from pathlib import Path
URL = "https://www.math.columbia.edu/~woit/wordpress/?p=15768"
DOC = Path("experiments/062/W04E_CURRENT_AUTHOR_REPLY_SOURCE_FINGERPRINT_0_1.json")
r = json.loads(DOC.read_text())
class ContentText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts=[]
        self.hidden=0
    def handle_starttag(self,tag,attrs):
        if tag in ("script","style","noscript"):
            self.hidden+=1
        if not self.hidden and tag in ("div","p","li","h3","span"):
            self.parts.append(" ")
    def handle_endtag(self,tag):
        if tag in ("script","style","noscript") and self.hidden: self.hidden-=1
        elif not self.hidden and tag in ("div","p","li","h3","span"):
            self.parts.append(" ")
    def handle_data(self,data):
        if not self.hidden:self.parts.append(data)
def read_source():
    req=Request(URL,headers={"User-Agent":"IsoGraph-W-G0-independent-comment-original-verifier/0.1"})
    with urlopen(req,timeout=45) as res:
        assert res.status==200
        raw=res.read()
    p=ContentText()
    p.feed(raw.decode("utf-8","replace"))
    s=" ".join(unicodedata.normalize("NFC","".join(p.parts)).replace("\u2019","'").split())
    a="I should explain that";b="haven't looked hard."
    assert s.count(a)==1 and s.count(b)==1
    x=s[s.index(a):s.index(b,s.index(a))+len(b)]
    return x
def verify(x,reply_text):
    assert x["track"]=="W"
    assert x["source_unit"]=="W04e"
    assert x["successful_exact_run"]["conclusion"]=="success"
    assert x["oct03_historical_raw_equal_unverified"] is True
    assert x["source_only"] is True
    assert x["normalized_envelope_start"]=="I should explain that"
    assert x["normalized_envelope_end"]=="haven't looked hard."
    assert reply_text.startswith(x["normalized_envelope_start"])
    assert reply_text.endswith(x["normalized_envelope_end"])
    expected=[
      "local quantum field theory in four dimensions",
      "not trying to get a topological field theory",
      "positive and negative imaginary time",
      "chiral degrees of freedom",
      "haven't looked hard"
    ]
    for e in expected:assert e in reply_text, "lost original author semantic "+e
    assert len(reply_text)==x["scoped_characters"]
    assert hashlib.sha256(reply_text.encode()).hexdigest()==x["scoped_sha256_NFC_whitespace_apostrophe"]
    return True
original=read_source()
assert verify(r,original)
mutants=[
 ("invent hash",lambda x,y: x.update({"scoped_sha256_NFC_whitespace_apostrophe":"0"*64})),
 ("fake old equality",lambda x,y: x.update({"oct03_historical_raw_equal_unverified":False})),
 ("source truth overreach",lambda x,y: x.update({"source_only":False})),
 ("misattribute author",lambda x,y: x.update({"source_unit":"W04c"})),
 ("missing author negative",lambda x,y: y.append(original.replace("not trying to get a topological field theory","trying to prove all global topology"))),
 ("truncate original",lambda x,y: y.append(original[:-55])),
 ("invent old CI",lambda x,y: x["successful_exact_run"].update({"conclusion":"failure"})),
 ("fake author source words",lambda x,y: y.append(original.replace("haven't looked hard","I have proved this result"))),
]
for label,fn in mutants:
    q=copy.deepcopy(r);out=[];fn(q,out)
    candidate=out[0] if out else original
    try:verify(q,candidate)
    except AssertionError:continue
    raise AssertionError("hostile escaped: "+label)
print("W04e original July10 author reply fingerprint and source modalities PASS 8/8 adversarial; historical Oct03 remains open")
