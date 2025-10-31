#!/bin/bash

set -euo pipefail

# 環境変数からS3バケット名を取得
if [ -z "${CCOW_S3_BUCKET:-}" ]; then
    echo "Error: CCOW_S3_BUCKET environment variable is not set" >&2
    exit 1
fi

S3_BUCKET="${CCOW_S3_BUCKET}"
AWS_REGION="${CCOW_AWS_REGION:-ap-northeast-1}"

cd "$(dirname "$0")/../frontend"

npm ci
npm run build

aws s3 sync out "s3://${S3_BUCKET}" \
    --region "${AWS_REGION}" \
    --size-only \
    --delete
