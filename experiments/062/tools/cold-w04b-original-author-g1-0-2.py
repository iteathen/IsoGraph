#!/usr/bin/env python3
"""Cold-read only the March 9 Woit authored article; never use reader comments.

Verify 21 original article semantic-source lines' coverage through 19 independent
narrative anchors plus complete article-body SHA. Source claims not math proof.
"""
import hashlib
import json
import subprocess
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

URL="https://www.math.columbia.edu/~woit/wordpress/?p=15600"
EXPECTED_SHA="b706bc304a45c29059e74c5db0be3e8cd4da25f0d71f68de941d45db38d4cb67"
OUT=Path("/tmp/isograph-w04b-author-source-20261011-0-2.json")
ANCHORS={
 "L10":"Wick rotation is supposed to be analytic continuation",
 "L11":"The subgroup preserving the four real dimensional Minkowski spacetime",
 "L13":"The subgroup preserving the four real dimensional Euclidean spacetime",
 "L15":"so pairs of",
 "L16":"In Minkowski spacetime you only need one kind of spinor",
 "L17":"Twistor space is a space",
 "L18":"the complex three dimensional space",
 "L19":"the space of complex lines through the origin",
 "L20":"Borel-Weil",
 "L21":"with three orbits",
 "L22":"hyperfunctions a very natural one",
 "L23":"The Cayley transform relates the action",
 "L24":"the above story from",
 "L25":"light-rays in Minkowski spacetime",
 "L26":"solutions of massless wave equations",
 "L27":"This is the Euclidean signature conformal group",
 "L28":"Using the identification",
 "L29":"it no longer is just topologically",
 "L30":"running out of time today"
}
VOID={"br","hr","img","input","meta","link","source","area","embed"}
class AuthorBody(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True)
  self.depth=0;self.seen=0;self.words=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if not self.depth:
   if "entry-content" in attrs.get("class","").split() or "post-content" in attrs.get("class","").split():
    self.depth=1;self.seen+=1
   return
  if tag in ("p","li","h1","h2","h3","blockquote"):self.words.append(" ")
  if tag not in VOID:self.depth+=1
 def handle_endtag(self,tag):
  if self.depth:
   if tag in ("p","li","h1","h2","h3","blockquote"):self.words.append(" ")
   if tag not in VOID:self.depth-=1
 def handle_data(self,data):
  if self.depth:self.words.append(data)
 def body(self):
  return " ".join(unicodedata.normalize("NFC","".join(self.words)).split())
def capture():
 p=subprocess.run(["curl","--fail","--silent","--show-error","--location","--retry","3",
  "--retry-delay","2","--connect-timeout","25","--max-time","80",
  "--user-agent","IsoGraph-W-source-original-cold-review-0.1",URL],
  capture_output=True,check=True,timeout=310)
 assert p.stdout.startswith(b"<!") or b"<html" in p.stdout[:1400].lower()
 a=AuthorBody();a.feed(p.stdout.decode("utf-8","replace"))
 assert a.seen==1
 body=a.body()
 d=hashlib.sha256(body.encode("utf-8")).hexdigest()
 assert d==EXPECTED_SHA, ("Unexpected original authored article revision",d)
 for key,anchor in ANCHORS.items():
  assert anchor in body,(key,anchor)
 return {"url":URL,"sha256":d,"length":len(body),
         "anchors_verified":len(ANCHORS),
         "line_roles":list(ANCHORS.keys()),
         "raw_source_http_sha256":hashlib.sha256(p.stdout).hexdigest()}
x,y=capture(),capture()
assert x["sha256"]==y["sha256"]
assert x["length"]==y["length"]
output={"schema":"isograph.exp062-W04b-2026-03-09-original-author-cold.v0.2",
 "source":"W04b","two_clean_original_author_http_reads":True,
 "first":x,"second":y,
 "original_author_anchor_count":len(ANCHORS),
 "original_author_article_lines":[10,30],
 "comments_and_reader_responses_excluded":True,
 "original_2026_10_03_raw_identical_not_claimed":True,
 "scientific_truth_qualified":False}
OUT.write_text(json.dumps(output,indent=2,ensure_ascii=False)+"\n")
print("WOIT_W04B_AUTHOR_ORIGINAL_COLD_SHA",x["sha256"],"ANCHORS",len(ANCHORS),"CHARS",x["length"],flush=True)
print("WOIT_W04B_AUTHOR_SOURCE_FIRST_PASS",len(ANCHORS),"two independent original fetches",flush=True)
