#!/usr/bin/env bash

# モジュールディレクトリの中のresearch.md, tasks.md、data-model.mdを読み込んで、それぞれIssueにコメントとして投稿する。

# Usage post-process-docs.sh <module_dir> <issue_number>

# コメントは下記の書式とする。ファイルがなければスキップでよい
# ```
# # research.md
#
# <research.mdの内容>
# ```
#
#

set -euo pipefail

# Usage check
if [ $# -ne 2 ]; then
    echo "Usage: $0 <module_dir> <issue_number>" >&2
    exit 1
fi

MODULE_DIR="$1"
ISSUE_NUMBER="$2"

# Validate module directory exists
if [ ! -d "$MODULE_DIR" ]; then
    echo "Error: Module directory '$MODULE_DIR' does not exist" >&2
    exit 1
fi

# Target files
TARGET_FILES=("research.md" "tasks.md" "data-model.md")

# Process each file
for file in "${TARGET_FILES[@]}"; do
    file_path="$MODULE_DIR/$file"

    # Skip if file doesn't exist
    if [ ! -f "$file_path" ]; then
        echo "Skipping $file (not found)"
        continue
    fi

    echo "Processing $file..."

    # Create temporary file in /tmp with proper formatting
    temp_file=$(mktemp /tmp/gh-comment.XXXXXX)
    trap "rm -f '$temp_file'" EXIT

    {
        echo "# $file"
        echo ""
        echo '```'
        cat "$file_path"
        echo '```'
    } > "$temp_file"

    # Post comment using --body-file (safe from injection)
    gh issue comment "$ISSUE_NUMBER" --body-file "$temp_file"

    rm -f "$temp_file"
    echo "Posted $file to issue #$ISSUE_NUMBER"
done

echo "Done"
