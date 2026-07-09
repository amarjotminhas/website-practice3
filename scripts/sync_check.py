#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Content sync check (dev-only; not served to the browser).

Confirms the shipped static HTML still matches js/client-data.js, the single
source of truth. For every string value in client-data.js it checks that the
value is present in at least one shipped HTML page (HTML entities are decoded
first, so "Bonded & Insured" matches "Bonded &amp; Insured"). It also confirms
PROMISE_TEXT in js/main.js matches the `promise` field character-for-character.

Usage:  python scripts/sync_check.py
Exit code is non-zero if anything is out of sync.
"""
import os, re, html, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "js", "client-data.js")
MAIN = os.path.join(ROOT, "js", "main.js")

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

data_src = read(DATA)

# Strip comments so quoted text inside them isn't mistaken for a data value.
def strip_comments(src):
    # Only block/HTML comments (that's where quoted prose can appear).
    # Line comments are left alone so https:// inside URL string literals survives.
    src = re.sub(r'<!--.*?-->', '', src, flags=re.S)   # HTML comments
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)     # /* block */ comments
    return src

# Extract every double-quoted string literal value from client-data.js.
string_vals = re.findall(r'"((?:[^"\\]|\\.)*)"', strip_comments(data_src))
# De-duplicate but keep order.
seen, values = set(), []
for v in string_vals:
    if v and v not in seen:
        seen.add(v); values.append(v)

# Load all shipped HTML (entity-decoded) once.
html_files = sorted(glob.glob(os.path.join(ROOT, "*.html")))
pages = {os.path.basename(p): html.unescape(read(p)) for p in html_files}

def present_in_any(value):
    needle = html.unescape(value)
    hits = [name for name, text in pages.items() if needle in text]
    return hits

failures = []
print("=== client-data.js -> HTML sync ===")
for v in values:
    hits = present_in_any(v)
    label = (v[:60] + "…") if len(v) > 60 else v
    if hits:
        print(f"  PASS  {label}")
    else:
        print(f"  FAIL  {label}")
        failures.append(v)

# PROMISE_TEXT char-for-char check.
print("\n=== PROMISE_TEXT sync (main.js <-> client-data.js) ===")
promise = re.search(r'const\s+promise\s*=\s*"([^"]*)"', data_src)
promise_txt = re.search(r'const\s+PROMISE_TEXT\s*=\s*"([^"]*)"', read(MAIN))
if not promise or not promise_txt:
    print("  FAIL  could not locate promise / PROMISE_TEXT")
    failures.append("PROMISE_TEXT locate")
elif promise.group(1) == promise_txt.group(1):
    print("  PASS  PROMISE_TEXT matches promise character-for-character")
else:
    print("  FAIL  PROMISE_TEXT does not match promise")
    print("        client-data.js:", repr(promise.group(1)))
    print("        main.js       :", repr(promise_txt.group(1)))
    failures.append("PROMISE_TEXT mismatch")

print()
if failures:
    print(f"RESULT: {len(failures)} field(s) out of sync — delivery blocked.")
    sys.exit(1)
print(f"RESULT: all {len(values)} field values in sync. OK.")
