#!/usr/bin/env bash
set -euo pipefail

# This script clones sibling repositories required by file:../ dependencies
# and builds them so their dist/ output exists before pnpm install.

REPO_OWNER="${REPO_OWNER:-Andersseen}"
WORKSPACE_DIR="$(dirname "$(pwd)")"

echo "Workspace dir: $WORKSPACE_DIR"

clone_and_build() {
  local repo_name=$1
  local build_cmd="${2:-pnpm install && pnpm run build}"
  local target_dir="$WORKSPACE_DIR/$repo_name"

  if [ -d "$target_dir" ]; then
    echo "[$repo_name] already exists, skipping clone"
  else
    echo "[$repo_name] cloning..."
    git clone "https://github.com/$REPO_OWNER/$repo_name.git" "$target_dir"
  fi

  cd "$target_dir"

  echo "[$repo_name] installing..."
  pnpm install --frozen-lockfile

  echo "[$repo_name] building..."
  eval "$build_cmd"

  cd - >/dev/null
}

assert_dir_exists() {
  local repo_name=$1
  local artifact_dir=$2

  if [ ! -d "$WORKSPACE_DIR/$repo_name/$artifact_dir" ]; then
    echo "[$repo_name] expected artifact not found: $artifact_dir" >&2
    exit 1
  fi
}

# Order matters because the main app consumes angular-movement's built library.
clone_and_build "angular-movement" "pnpm install && pnpm exec ng build movement"
assert_dir_exists "angular-movement" "dist/movement"

clone_and_build "quartz" "pnpm install && pnpm run build:lib"
assert_dir_exists "quartz" "dist/quartz"

clone_and_build "lumen-icons" "pnpm install && pnpm run build:lib"
assert_dir_exists "lumen-icons" "packages/icons/dist"

echo "Sibling repos ready"
