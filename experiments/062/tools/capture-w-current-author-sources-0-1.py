#!/usr/bin/env python3
"""Capture SHA-256 evidence for the current W-only mutable author originals.

No third-party source bodies are committed or uploaded. This emits SHA metadata
only. It is NOT proof of identity with October 3 2026 retrievals.
"""
import datetime
import hashlib
import json
import pathlib
import subprocess
import sys

SOURCES = [
    ("W03", "html", "Euclidean Twistor Unification", "https://www.math.columbia.edu/~woit/wordpress/?page_id=12263"),
    ("W04a", "html", "Weyl Spinor Fields and Right-handed Spacetime", "https://www.math.columbia.edu/~woit/wordpress/?p=15574"),
    ("W04b", "html", "Twistors and Wick Rotation", "https://www.math.columbia.edu/~woit/wordpress/?p=15600"),
    ("W04c", "html", "Twistors and Unification", "https://www.math.columbia.edu/~woit/wordpress/?p=15620"),
    ("W04d", "html", "Wick Rotating Spinors and Twistors", "https://www.math.columbia.edu/~woit/wordpress/?p=15663"),
    ("W04d_slides", "pdf", "Wick Rotating Spinors and Twistors", "https://www.math.columbia.edu/~woit/twistorunification/marseille.pdf"),
    ("W04e", "html", "Notes on Wick Rotation and Chiral Field Theories", "https://www.math.columbia.edu/~woit/wordpress/?p=15768"),
    ("W04e_notes", "pdf", "Notes on Wick Rotation and Chiral Field", "https://www.math.columbia.edu/~woit/twistorunification/chiralwick-sketch.pdf"),
]
OUT = pathlib.Path("/tmp/woit-source-capture-20261011")
OUT.mkdir(parents=True, exist_ok=True)
result = {
    "schema": "isograph-w-g0-current-live-author-original-byte-hashes.v0.1",
    "track": "W",
    "observation_only": True,
    "old_october_03_byte_equivalence_asserted": False,
    "old_corpus_preserved": True,
    "capture_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "source_entries": [],
    "failures": [],
}
for key, typ, expected, url in SOURCES:
    filename = OUT / (key + ("_source.pdf" if typ == "pdf" else "_source.html"))
    headers = OUT / (key + "_headers.txt")
    args = [
        "curl", "--fail", "--silent", "--show-error", "--location",
        "--retry", "3", "--retry-all-errors", "--retry-delay", "3",
        "--connect-timeout", "20", "--max-time", "75",
        "--user-agent", "IsoGraph research source-fidelity capture (version 0.1)",
        "--dump-header", str(headers), "--output", str(filename),
        "--write-out", "%{http_code}\t%{url_effective}\t%{content_type}",
        url,
    ]
    print("SOURCE_CAPTURE_ATTEMPT", key, url, flush=True)
    p = subprocess.run(args, capture_output=True, text=True, timeout=310)
    if p.returncode:
        result["failures"].append({"unit": key, "curl_exit": p.returncode,
                                   "error": p.stderr[-700:]})
        print("SOURCE_CAPTURE_FAILURE", key, p.returncode, p.stderr[-300:], flush=True)
        continue
    data = filename.read_bytes()
    valid = data.startswith(b"%PDF-") if typ == "pdf" else (
        b"<html" in data[:1500].lower() or b"<!doctype" in data[:1500].lower()
    )
    valid = valid and expected.encode("utf-8") in data
    if not valid:
        result["failures"].append({"unit": key, "reason": "SOURCE_FORMAT_OR_TITLE_MISMATCH",
                                   "first_hex": data[:24].hex()})
        print("SOURCE_CAPTURE_FAILURE", key, "FORMAT_OR_TITLE", flush=True)
        continue
    h = headers.read_text(errors="replace")
    lastmod = [x.strip() for x in h.splitlines() if x.lower().startswith("last-modified:")]
    etag = [x.strip() for x in h.splitlines() if x.lower().startswith("etag:")]
    entry = {
        "unit": key, "format": typ, "original_author_url": url,
        "capture_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "sha256_raw_source_bytes": hashlib.sha256(data).hexdigest(),
        "byte_length": len(data),
        "response": p.stdout.strip(),
        "last_modified_headers": lastmod[-1:] or [],
        "etag_headers": etag[-1:] or [],
        "source_claim_qualified": False,
    }
    result["source_entries"].append(entry)
    print("SOURCE_CAPTURE_SHA256", key, entry["sha256_raw_source_bytes"],
          "BYTES", len(data), "RESPONSE", repr(p.stdout.strip()), flush=True)
manifest = OUT / "CURRENT_W_SOURCE_HASHES_0_1.json"
manifest.write_text(json.dumps(result, indent=2, ensure_ascii=False)+"\n")
print("SOURCE_CAPTURE_RESULT_JSON", json.dumps(result, separators=(",", ":"), ensure_ascii=False), flush=True)
print("SOURCE_CAPTURE_RESULT_UNITS", len(result["source_entries"]),
      "FAILURES", len(result["failures"]), flush=True)
if result["failures"]:
    sys.exit(1)
