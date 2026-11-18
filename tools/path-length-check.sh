#!/bin/sh
# Windows stops a checkout when a path is too long ("Filename too long", BO 18 Nov 2026).
# This fails when any tracked file's path from the repository root is 80 characters or longer.
# Usage: sh tools/path-length-check.sh [repository folder]   (default: this repository)
cd "${1:-$(dirname "$0")/..}" || exit 1
LIMIT=80
long=$(git ls-files | awk -v L=$LIMIT 'length($0) >= L { print length($0) " " $0 }')
max=$(git ls-files | awk '{ if (length($0) > m) m = length($0) } END { print m }')
if [ -n "$long" ]; then echo "FAIL paths of $LIMIT characters or more:"; echo "$long"; exit 1; fi
echo "PASS every path under $LIMIT characters (longest $max)"
