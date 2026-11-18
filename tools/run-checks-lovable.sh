#!/bin/sh
# Runs the landing-page checks against the built Lovable site (served at http://127.0.0.1:4173/).
# Usage: sh tools/run-checks-lovable.sh <folder of the Lovable repo>
set -u
LR=$(cd "$1" && pwd); T=$(cd "$(dirname "$0")" && pwd); OUT="$T/out-lovable"; mkdir -p "$OUT/S"
cd "$T"; [ -d node_modules ] || npm install --no-audit --no-fund --silent
cd "$LR"; [ -d node_modules ] || npm install --no-audit --no-fund --silent
npx vite build > "$OUT/build.txt" 2>&1 || { echo "FAIL build (see $OUT/build.txt)"; exit 1; }
npx vite preview --host 127.0.0.1 --port 4173 --strictPort > "$OUT/preview.txt" 2>&1 & PID=$!
sleep 4; U=http://127.0.0.1:4173/; cd "$T"; fails=0
run () { name=$1; shift
  for try in 1 2; do
    if timeout 240 "$@" > "$OUT/$name.txt" 2>&1 && ! grep -qE "^ *FAIL|Error:" "$OUT/$name.txt"; then echo "PASS $name $( [ $try = 2 ] && echo '(second run)')"; return; fi
  done
  echo "FAIL $name  ->  $OUT/$name.txt"; grep -E "FAIL|Error" "$OUT/$name.txt" | head -3 | sed 's/^/     /'; fails=$((fails+1)); }
run paths         sh "$T/path-length-check.sh" "$LR"
run cases         node case-check.mjs "$U" "$LR/public/results" "$OUT/S/case"
run booking-video node popup-check.mjs "$U"
run video-player  node video-player-check.mjs "$U" "$OUT/S"
run stone-lines   node stone-line-check.mjs "$U"
run hero-baseline node hero-baseline-check.mjs "$U"
run photos        node photo-check.mjs "$U" "$OUT/S/photo"
run doors         node interact.mjs "$U"
run hero-bg       node hero-background-check.mjs "$U"
run founders      node founders-check.mjs "$U" "$OUT/S"
kill $PID 2>/dev/null
echo "lovable checks: $fails failed · details in $OUT/"
[ $fails = 0 ]
