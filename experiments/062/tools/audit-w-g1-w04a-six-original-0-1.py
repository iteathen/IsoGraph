#!/usr/bin/env python3
"""Cold original W04a March 5 first, not generated from the G1 candidate.

Author-only entry content, two independent fetches, stable G0 frozen hash,
ordered original source witnesses 11,32-38. No reader comments redistributed.
"""
import hashlib,subprocess,unicodedata,json
from html.parser import HTMLParser
URL="https://www.math.columbia.edu/~woit/wordpress/?p=15574"
PIN="69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659"
class SourceHTML(HTMLParser):
 VOID={"br","hr","img","input","meta","link","source","area","embed"}
 def __init__(self):
  super().__init__(convert_charrefs=True)
  self.level=0
  self.seen=0
  self.p=0
  self.data=[]
 def handle_starttag(self,tag,attrs):
  if self.level==0:
   a=dict(attrs)
   if "entry-content" in a.get("class","").split() or "post-content" in a.get("class","").split():
    self.level=1;self.seen+=1
   return
  if tag in ("p","li","h1","h2","h3","blockquote"):self.data.append(" ")
  if tag=="p":self.p+=1
  if tag not in self.VOID:self.level+=1
 def handle_endtag(self,tag):
  if self.level:
   if tag in ("p","li","h1","h2","h3","blockquote"):self.data.append(" ")
   if tag not in self.VOID:self.level-=1
 def handle_data(self,data):
  if self.level:self.data.append(data)
 def text(self):
  return " ".join(unicodedata.normalize("NFC","".join(self.data)).split())
def source():
 cp=subprocess.run(["curl","--fail","--silent","--show-error","--location","--retry","3",
   "--connect-timeout","20","--max-time","65","--user-agent",
   "IsoGraph W source-original G1 independent cold March5 review",URL],
   capture_output=True,check=True,timeout=280)
 h=SourceHTML();h.feed(cp.stdout.decode("utf-8","replace"))
 assert h.seen==1 and h.p>=6
 return h.text()
# Evidence read from source directly, before consulting SSC or occurrence artifacts.
witness=[
 ("W011_SINGLE","Wick-rotating a single Weyl spinor field appears to be impossible"),
 ("W063_CONVENTIONAL_LEFT","need to add a left-handed spinor field"),
 ("W063_OS_SECOND","then doubles again the number of degrees of freedom"),
 ("W012_RIGHT_ONLY","one kind of Weyl spinor field"),
 ("W013_RIGHT_GEOMETRY","acts non-trivially on vectors"),
 ("W013_LEFT_INTERNAL","acting trivially, available for use as a gauged internal symmetry"),
 ("W064_FOUR_ONLY","the only dimension in which the rotation group breaks up into two independent pieces"),
 ("W064_EUCLIDEAN_MINKOWSKI","the two parts are complex conjugates and can’t be separated"),
 ("W012_BOTH_SIGNATURES","both Minkowski and Euclidean spacetime just sees the right-handed part of the geometry"),
 ("W065_TWISTOR_POINT","a point in spacetime is tautologically the same thing as the space of spinors"),
 ("W065_LEFT_DISTINCT","is something else."),
]
def validate(t):
 assert hashlib.sha256(t.encode()).hexdigest()==PIN, "source G0 original author-text hash changed"
 positions=[]
 for key,clause in witness:
  assert t.count(clause)==1,(key,"not exactly one primary-original location")
  positions.append(t.index(clause))
 assert positions==sorted(positions),"source line/paragraph position changed"
 return len(positions)
first=source();assert validate(first)==11
second=source();assert second==first and validate(second)==11
attacks=[
 ("flip OS second to one-step",lambda t:t.replace("then doubles again the number of degrees of freedom","then keeps the same number of degrees of freedom",1)),
 ("lose left internal role",lambda t:t.replace("acting trivially, available for use as a gauged internal symmetry","acting geometrically and not internally",1)),
 ("weaken only four claim",lambda t:t.replace("the only dimension in which the rotation group breaks up into two independent pieces","a dimension where the rotation group breaks up",1)),
 ("make halves independent Minkowski",lambda t:t.replace("the two parts are complex conjugates and can’t be separated","the two parts are independent and separate",1)),
 ("omit both-signature right proposal",lambda t:t.replace("both Minkowski and Euclidean spacetime just sees the right-handed part of the geometry","only Minkowski sees the right-handed part",1)),
 ("change twistor point representation",lambda t:t.replace("a point in spacetime is tautologically the same thing as the space of spinors","a point in spacetime is unrelated to the space of spinors",1)),
 ("author textual drift",lambda t:t+" changed"),
 ("remove left field step",lambda t:t.replace("need to add a left-handed spinor field","need no additional spinor field",1)),
]
for name,f in attacks:
 candidate=f(first);assert candidate!=first,name
 try:validate(candidate)
 except AssertionError:continue
 raise AssertionError("HOSTILE ESCAPED "+name)
print("W04a original source-first six-remaining bodies PASS",json.dumps({
 "source":"W04a","original_author_source_SHA256":PIN,
 "author_original_article_read_twice":True,
 "independent_source_anchor_count":len(witness),
 "affected_source_bodies":["W-SSC-011","W-SSC-012","W-SSC-013","W-SSC-063","W-SSC-064","W-SSC-065"],
 "hostile_rejected":len(attacks),
 "historic_Oct03_source_identical_claim":False,
 "G1_global_completed":False,
 "source_text_redistributed":False}))
