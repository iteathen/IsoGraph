#!/usr/bin/env python3
"""Independently re-read W04e July-10 author reply and hash the scoped source text.

Uses exact article/author reply original text, not source-derived SSC prose.
Do not upload or redistribute source text. No October-03 equality implied.
"""
import hashlib,json,subprocess,datetime,unicodedata
from html.parser import HTMLParser

URL="https://www.math.columbia.edu/~woit/wordpress/?p=15768"
class AllVisibleText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.chunks=[]
        self.skip=0
    def handle_starttag(self,tag,attrs):
        if tag in ("script","style"):
            self.skip+=1
        if not self.skip and tag in ("p","li","h3","span","div","br"):
            self.chunks.append(" ")
    def handle_endtag(self,tag):
        if tag in ("script","style") and self.skip:
            self.skip-=1
        elif not self.skip and tag in ("p","li","h3","span","div"):
            self.chunks.append(" ")
    def handle_data(self,data):
        if not self.skip:
            self.chunks.append(data)
    def text(self):
        return " ".join(unicodedata.normalize("NFC","".join(self.chunks)).replace("\u2019","'").split())

def snapshot():
    cp=subprocess.run(["curl","--fail","--silent","--show-error","--location","--connect-timeout","20","--max-time","75","--retry","3",URL],capture_output=True,timeout=280,check=True)
    html=cp.stdout
    assert html and b"<!doctype" in html[:1600].lower()
    reader=AllVisibleText()
    reader.feed(html.decode("utf-8",errors="replace"))
    text=reader.text()
    begin="I should explain that"
    end="haven't looked hard."
    assert text.count(begin)==1, "W04e author reply not uniquely found"
    start=text.index(begin)
    assert text.count(end)==1, "W04e reply end not uniquely found"
    stop=text.index(end,start)+len(end)
    assert 250<stop-start<1900, "W04e comment envelope invalid"
    reply=text[start:stop]
    for excerpt in ("local quantum field theory","not trying to get a topological field theory",
                    "positive and negative imaginary time","chiral degrees of freedom",
                    "haven't looked hard"):
        assert excerpt in reply, "Author reply source meaning not present: "+excerpt
    return {
      "fetched_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
      "source_url":URL,"source_unit":"W04e_author_july10_reply",
      "source_author":"Peter Woit","source_date":"2026-07-10 12:50",
      "scoped_normalization":"HTMLParser visible text NFC, collapse whitespace and apostrophe",
      "scope":"author reply only from unique I should explain that to haven't looked hard.",
      "author_comment_sha256":hashlib.sha256(reply.encode("utf-8")).hexdigest(),
      "author_comment_characters":len(reply),
      "required_semantic_anchor_count":5,
      "original_Oct03_byte_identity_proved":False,
      "byte_length_of_HTTP_HTML":len(html),
      "full_raw_HTML_sha256":hashlib.sha256(html).hexdigest(),
    }
results=[snapshot(),snapshot()]
assert results[0]["author_comment_sha256"]==results[1]["author_comment_sha256"], "reply semantic content drifted across independent HTTP fetches"
assert results[0]["author_comment_characters"]==results[1]["author_comment_characters"]
for entry in results:
    print("WOIT_W04E_AUTHOR_REPLY_FINGERPRINT",json.dumps(entry,separators=(",",":"),ensure_ascii=False),flush=True)
print("WOIT_W04E_AUTHOR_REPLY_STABLE_TWO_FETCHES",results[0]["author_comment_sha256"],results[0]["author_comment_characters"],flush=True)
