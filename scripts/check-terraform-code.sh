#!/bin/bash

#
# Terraformコードのチェックを行う
#
# use the file at module dir only.
#

set -e

find_root_dir() {
  local dir="$PWD"
  local marker_files=(".git" "go.mod" "package.json" "pyproject.toml")
  
  while [[ "$dir" != "/" ]]; do
    for marker in "${marker_files[@]}"; do
      if [[ -e "$dir/$marker" ]]; then
        echo "$dir"
        return 0
      fi
    done
    dir="$(dirname "$dir")"
  done
  return 1
}

# 設定ファイルが必ずしもルートディレクトリにあるとは限らないためfind_root_dir()にまとめてはいけない
find_config_file() {
  local config_file="$1"
  local dir="$PWD"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/$config_file" ]]; then
      echo "$dir/$config_file"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}


CURRENT_DIR=$(pwd)
ROOT_DIR=$(find_root_dir)

# Run terraform fmt
echo "Running terraform fmt..."
terraform fmt -check -recursive "$ROOT_DIR"

# Run terraform init
echo "Running terraform init..."
terraform init

# Run terraform validate
echo "Running terraform validate..."
terraform validate

# Run tflint
echo "Running tflint..."
tflint_config_file=$(find_config_file ".tflint.hcl" || echo "")
if [[ -n "$tflint_config_file" ]]; then
  tflint --init --config "$tflint_config_file"
  tflint --recursive --config "$tflint_config_file"
else
  echo "No .tflint.hcl found, running with default config..."
  tflint --init
  tflint --recursive
fi

# Run checkov
echo "Running checkov..."
checkov_config_file=$(find_config_file ".checkov.yml" || echo "")
if [[ -n "$checkov_config_file" ]]; then
  checkov -d . --config-file "$checkov_config_file"
else
  echo "No .checkov.yml found, running with default config..."
  checkov -d .
fi

# Run terraform-docs
echo "Running terraform-docs..."
terraform-docs markdown table --output-file README.md --output-mode inject .

echo "All Terraform checks successfully!"