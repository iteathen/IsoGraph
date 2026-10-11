#!/usr/bin/env python3
"""Independent W-only G0 HTML semantic-surface protection probe.

A text-only author-body hash ignores link href, inline math attributes, and
image alt/source targets. Test the true authored element surface while keeping
visitor/comment/sidebar chrome out of the original-article scope. Metadata only;
do not republish author text.
"""
import hashlib
import json
import subprocess
import sys
import unicodedata
from html.parser import HTMLParser
from urllib.parse import urljoin

SRC = [
 ("W03","https://www.math.columbia.edu/~woit/wordpress/?page_id=12263"),
 ("W04a","https://www.math.columbia.edu/~woit/wordpress/?p=15574"),
 ("W04b","https://www.math.columbia.edu/~woit/wordpress/?p=15600"),
 ("W04c","https://www.math.columbia.edu/~woit/wordpress/?p=15620"),
 ("W04d","https://www.math.columbia.edu/~woit/wordpress/?p=15663"),
 ("W04e","https://www.math.columbia.edu/~woit/wordpress/?p=15768"),
]
VOID={"img","br","hr","input","meta","link","source","embed","area","wbr"}
def digest(value):
 return hashlib.sha256(json.dumps(value,ensure_ascii=False,separators=(",",":"),sort_keys=True).encode("utf8")).hexdigest()
class Structure(HTMLParser):
 def __init__(self,base):
  super().__init__(convert_charrefs=True)
  self.base=base
  self.depth=0
  self.sections=0
  self.words=[]
  self.links=[]
  self.images=[]
  self.math=[]
  self.tag_count={}
  self.script_active=0
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if self.depth==0:
   if "entry-content" in attrs.get("class","").split() or "post-content" in attrs.get("class","").split():
    self.depth=1
    self.sections+=1
   return
  self.tag_count[tag]=self.tag_count.get(tag,0)+1
  if tag=="a":
   self.links.append({"url":urljoin(self.base,attrs.get("href","")),"label":attrs.get("title","")})
  if tag=="img":
   self.images.append({"url":urljoin(self.base,attrs.get("src","")),"alt":attrs.get("alt","")})
  if tag in ("script","math"):
   self.script_active+=1
  if tag not in VOID:
   self.depth+=1
  if tag in ("p","li","h1","h2","h3","blockquote"):
   self.words.append(" ")
 def handle_endtag(self,tag):
  if self.depth:
   if tag in ("p","li","h1","h2","h3","blockquote"):
    self.words.append(" ")
   if tag in ("script","math"):
    self.script_active=max(0,self.script_active-1)
   if tag not in VOID:
    self.depth-=1
 def handle_data(self,data):
  if self.depth:
   self.words.append(data)
   if self.script_active or "\\(" in data or "$$" in data:
    self.math.append(" ".join(data.split()))
 def normalized(self):
  return " ".join(unicodedata.normalize("NFC","".join(self.words)).split())
def fetch(u):
 r=subprocess.run(["curl","--fail","--silent","--show-error","--location","--retry","2","--connect-timeout","20","--max-time","60",
        "--user-agent","IsoGraph-W-G0-structural-source-fidelity-probe/0.1",u],
        capture_output=True,timeout=200,check=True)
 return r.stdout
all_found=[]
for unit,url in SRC:
  records=[]
  for attempt in (1,2):
   html=fetch(url)
   parser=Structure(url)
   parser.feed(html.decode("utf8","replace"))
   text=parser.normalized()
   assert parser.sections==1, (unit,"entry-content ambiguous",parser.sections)
   assert len(text)>300
   struct={"normalized_text":text,"ordered_link_targets":parser.links,"ordered_images":parser.images,"math_texts":parser.math}
   result={"unit":unit,"attempt":attempt,"original_url":url,
    "author_text_sha256":hashlib.sha256(text.encode("utf8")).hexdigest(),
    "canonical_semantic_surface_sha256":digest(struct),
    "article_text_character_count":len(text),
    "links_count":len(parser.links),"links_fingerprint":digest(parser.links),
    "images_count":len(parser.images),"images_fingerprint":digest(parser.images),
    "math_text_nodes_count":len(parser.math),"math_nodes_fingerprint":digest(parser.math),
    "all_tag_counts":parser.tag_count,
    "source_specific_links":[x["url"] for x in parser.links if "twistorunification/" in x["url"]],
    "source_text_available_on_website":True,
    "historical_oct03_byte_equality_asserted":False}
   records.append(result)
  a,b=records
  for key in ["author_text_sha256","canonical_semantic_surface_sha256","links_count","links_fingerprint","images_fingerprint","math_nodes_fingerprint"]:
   assert a[key]==b[key], "live original semantic surface drift "+unit+"/"+key
  print("AUTHOR_ORIGINAL_STRUCTURAL_SURFACE",json.dumps(a,separators=(",",":"),ensure_ascii=False),flush=True)
  all_found.append(a)
print("W_G0_ORIGINAL_STRUCTURAL_SURFACE_COMPLETE",len(all_found),"STABLE_SIX_OF_SIX",flush=True)
