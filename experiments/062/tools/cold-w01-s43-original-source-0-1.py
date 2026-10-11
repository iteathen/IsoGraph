#!/usr/bin/env python3
"""Independent live Woit v2 original HTML source check for three W G1 §4.3 items.

No copyrighted author paragraphs re-published: check original prose anchors and
print only source-scoped digest/provenance. A source token failure invalidates G1.
"""
import hashlib
import re
import subprocess
import sys
from html.parser import HTMLParser
URL="https://arxiv.org/html/2104.05099v2"
class AuthorText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts=[]
        self.hidden=0
        self.math_tokens=[]
    def handle_starttag(self,tag,attrs):
        if tag in ("style","script"):self.hidden+=1
        d=dict(attrs)
        if not self.hidden and tag=="math":
            self.math_tokens.append(d.get("alttext",""))
        if not self.hidden and tag in ("p","section","h1","h2","h3","li"):
            self.parts.append(" ")
    def handle_endtag(self,tag):
        if tag in ("style","script") and self.hidden:self.hidden-=1
        elif not self.hidden and tag in ("p","section","h1","h2","h3","li"):
            self.parts.append(" ")
    def handle_data(self,data):
        if not self.hidden:self.parts.append(data)
def read_original():
    cmd=["curl","--fail","--silent","--show-error","--location","--retry","2",
         "--connect-timeout","20","--max-time","80",URL]
    r=subprocess.run(cmd,capture_output=True,timeout=230,check=True)
    assert r.stdout and b"arxiv" in r.stdout[:10000].lower()
    p=AuthorText()
    p.feed(r.stdout.decode("utf-8","replace"))
    body=" ".join("".join(p.parts).split())
    # Tight section boundary: do not satisfy a source claim elsewhere in PDF
    i=body.rfind("Considering first free massless matter fields")
    if i<0: raise AssertionError("frozen original W01 §4.3 author premise not found")
    stop=body.find("In the usual formalism, states",i)
    if stop<0:raise AssertionError("W01 §4.3 independent source endpoint missing")
    excerpt=body[i:stop]
    return excerpt,p.math_tokens
excerpt,formula=read_original()
phrases=[
"free massless matter fields",
"without coupling to gauge fields or the Higgs field",
"single-particle state space",
"obscuring the Poincaré group action",
"an equator in compactified Euclidean space",
"upper",
"lower",
"the real part of the numerator vanish",
"this is exactly the condition",
"the five-dimensional subspace",
"massless Dirac equation",
"where they are hyperfuctions",
"holomorphic cohomology classes",
"restricts the class to the fiber",
"solutions of the Weyl equation",
"for anti-self-dual connections on a vector bundle",
"holomorphic bundle",
"coupled to that connection",
"only applies to gauge fields satisfying the anti-self-duality equations rather than the more general Yang-Mills equations",
"Nair","Chalmers-Siegel","Witten",
]
for text in phrases:
    if text.lower() not in excerpt.lower():
        raise AssertionError("Missing original W01 v2 §4.3 source-native phrase: "+text)
assert "anti-self-duality equations" in excerpt
assert "more general Yang-Mills equations" in excerpt
assert "Nair" in excerpt and "Witten" in excerpt
d=hashlib.sha256(excerpt.encode("utf-8")).hexdigest()
print("W_G1_W01_S43_ORIGINAL_AUTHOR_FIRST PASS source=arxiv:2104.05099v2 section=4.3 author_prose_anchors="+str(len(phrases))+" bounded_body_sha256="+d+" math_alttext_nodes="+str(len(formula)))
