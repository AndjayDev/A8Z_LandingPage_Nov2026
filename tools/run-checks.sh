#!/bin/sh
# Runs every landing-page check on a fresh build. One line per check: PASS or FAIL.
# A check that fails is run a second time once (some checks wait on timers);
# it counts as FAIL only if both runs fail. Exit code 1 when any check fails.
# Usage: sh tools/run-checks.sh            (from the repository root)
#        ONLY="cases doors" sh tools/run-checks.sh   (run some checks only)
set -u
ROOT=$(cd "$(dirname "$0")/.." && pwd)
V="$ROOT/variants/variant-A-clay-and-ink"
OUT="$ROOT/tools/out"; mkdir -p "$OUT/S" /tmp/a8z-alone
cd "$ROOT/tools"
[ -d node_modules ] || npm install --no-audit --no-fund --silent

# 1. build: case pages + the one-file page
python3 build-cases.py "$ROOT" > "$OUT/build.txt" || { echo "FAIL build-cases.py"; exit 1; }
python3 make_onefile.py "$V/index.html" "$ROOT" "$V/one-file.html" >> "$OUT/build.txt" || { echo "FAIL make_onefile.py"; exit 1; }
cp "$V/index.html" /tmp/a8z-alone/index.html          # the page without its photo folder

ONE="$V/one-file.html"
fails=0
run () {   # name, then the command
  name=$1; shift
  if [ -n "${ONLY:-}" ] && ! echo " $ONLY " | grep -q " $name "; then return; fi
  for try in 1 2; do
    if timeout 240 "$@" > "$OUT/$name.txt" 2>&1 && ! grep -qE "^ *FAIL|Error:" "$OUT/$name.txt"; then
      echo "PASS $name $( [ $try = 2 ] && echo '(second run)')"; return
    fi
  done
  echo "FAIL $name  ->  tools/out/$name.txt"; grep -E "FAIL|Error" "$OUT/$name.txt" | head -3 | sed 's/^/     /'
  fails=$((fails+1))
}
run cases          node case-check.mjs "$ONE" "$V/results" "$OUT/S/case"
run booking-popup  node popup-check.mjs "$ONE"
run video-referer  node youtube-referer-check.mjs "$ONE"
run video-relay    node youtube-relay-check.mjs "$ONE" "$ROOT/relay/youtube/index.html"
run stone-lines    node stone-line-check.mjs "$ONE"
run hero-baseline  node hero-baseline-check.mjs "$ONE"
run frame-photos   node frame-and-photos-check.mjs "$ONE" /tmp/a8z-alone/index.html
run photos         node photo-check.mjs "$ONE" "$OUT/S/photo"
run doors          node interact.mjs "$ONE"
run hero-bg        node hero-background-check.mjs "$ONE"
run founders       node founders-check.mjs "$ONE" "$OUT/S"
run sweep          node sweep.mjs "$ONE" "$OUT/S"

echo "checks: $fails failed · details in tools/out/"
[ $fails = 0 ]
