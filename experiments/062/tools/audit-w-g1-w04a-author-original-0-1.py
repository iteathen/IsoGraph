#!/usr/bin/env python3
"""W04a direct author-source cold-read for W059/W060/W061, without copying source text.

This verifies original March 5 2026 authored article paragraphs and math carriers
independently of source-semantic-census data, under the new Oct11 G0 target.
"""
import hashlib, json, subprocess, unicodedata
from html.parser import HTMLParser

ORIGINAL="https://www.math.columbia.edu/~woit/wordpress/?p=15574"
PIN="69792bb18e780484b0bdf491f5029d9bbeef04db7de677bd10122ffe7e869659"
class AuthorBody(HTMLParser):
    VOID={"br","hr","img","input","meta","link","source","area","embed"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.level=0
        self.count=0
        self.body=[]
        self.paragraphs=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if self.level==0:
            if "entry-content" in a.get("class","").split() or "post-content" in a.get("class","").split():
                self.level=1;self.count+=1
            return
        if tag in ("p","li","h1","h2","h3","blockquote"):
            self.body.append(" ")
        if tag=="p":
            self.paragraphs+=1
        if tag not in self.VOID:
            self.level+=1
    def handle_endtag(self,tag):
        if self.level:
            if tag in ("p","li","h1","h2","h3","blockquote"):
                self.body.append(" ")
            if tag not in self.VOID:self.level-=1
    def handle_data(self,data):
        if self.level:self.body.append(data)
    def canonical(self):
        return " ".join(unicodedata.normalize("NFC","".join(self.body)).split())

def download():
    r=subprocess.run(["curl","--fail","--silent","--show-error","--location","--retry","3",
      "--connect-timeout","20","--max-time","65","--user-agent",
      "IsoGraph W independent author source original-first cold review",ORIGINAL],
      capture_output=True,timeout=280,check=True)
    assert r.stdout[:64].lower().find(b"<html")!=-1 or r.stdout[:64].lower().find(b"<!doctype")!=-1
    parser=AuthorBody();parser.feed(r.stdout.decode("utf-8","replace"))
    t=parser.canonical()
    assert parser.count==1 and parser.paragraphs>=6
    return t,r.stdout
# Anchor list manually recovered from original author text before SSC comparisons.
witnesses=[
("W059_EQ","equation of motion of a right-handed Weyl spinor field"),
("W059_FACT","solutions will also be solutions of the massless Klein-Gordon equation"),
("W059_HELICITY","Defining helicity as the eigenvalue of the operator"),
("W059_POSITIVE","describe particles"),
("W059_NEGATIVE","describe anti-particles"),
("W060_OSC","infinite collection of complex harmonic oscillators"),
("W060_INDEX","one for each value of"),
("W060_CAR","annihilation and creation operators satisfying anti-commutation relations"),
("W060_YUKAWA","mass terms coming from Yukawa couplings to the Higgs field"),
("W061_W2","The Wightman function is the two by two matrix"),
("W061_S2","The obvious way to do Wick rotation would be"),
("W061_NEGATIVE","This runs into a fundamental inconsistency"),
("W061_MAP","maps from the space"),
("W061_DUAL","dual right-handed spinors"),
]
def check(text):
    assert hashlib.sha256(text.encode()).hexdigest()==PIN,"source G0 author text identity changed"
    positions=[]
    for key,phrase in witnesses:
        assert text.count(phrase)==1,(key,"source witness absent/duplicated")
        positions.append(text.index(phrase))
    assert positions==sorted(positions),"source-original line/paragraph order changed"
    assert "anti-commutation relations" in text
    assert "Schwinger function" in text
    assert "Wightman function" in text
    assert "Klein-Gordon" in text
    # Exact source original equation forms are protected by a full article text SHA.
    # Do not silently regularize W2, invent a CAR algebra, or turn naive S2 into a theorem.
    return len(positions)
first,raw=download()
n=check(first)
second,_=download()
assert check(second)==n
assert first==second
attacks=[
 ("drop anti-CAR",lambda x:x.replace("anti-commutation relations","commutation relations",1)),
 ("swap the two branches",lambda x:x.replace("describe particles","describe anti-particles",1)),
 ("erase Wick limitation",lambda x:x.replace("This runs into a fundamental inconsistency","This is a complete construction",1)),
 ("missing momentum quantifier",lambda x:x.replace("one for each value of","some values of",1)),
 ("modify Wightman carrier",lambda x:x.replace("The Wightman function","The Schwinger function",1)),
 ("alter author source token",lambda x:x+" EDIT"),
]
for name,attack in attacks:
    modified=attack(first)
    assert modified!=first,name
    try:check(modified)
    except AssertionError:pass
    else:raise AssertionError("hostile escaped "+name)
print("W04a original author cold-source body PASS",
      json.dumps({"unit":"W04a","frozen_target":"W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1",
      "article_sha256":PIN,"stable_original_fetches":2,"positive_original_article_witnesses":n,
      "original_sections":["EQUATION_HELICITY","OSCILLATORS","WIGHTMAN_AND_NAIVE_SCHWINGER"],
      "hostile_rejections":len(attacks),"history_oct03_authentication_claimed":False,
      "author_text_redistributed":False}))
