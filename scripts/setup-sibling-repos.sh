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
  eval "$build_cmd" || true

  cd - >/dev/null
}

# Order matters if there are inter-dependencies between sibling repos
clone_and_build "quartz"        "pnpm install && pnpm run build"
clone_and_build "angular-movement" "pnpm install && pnpm run build"
clone_and_build "lumen-icons"   "pnpm install && pnpm run build"

echo "Sibling repos ready"
