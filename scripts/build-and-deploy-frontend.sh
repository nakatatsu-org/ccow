#!/bin/bash

set -euo pipefail

S3_BUCKET="$1"
AWS_REGION="${2:-ap-northeast-1}"

cd "$(dirname "$0")/../frontend/app"

npm ci
npm run build

aws s3 sync out "s3://${S3_BUCKET}" \
    --region "${AWS_REGION}" \
    --size-only \
    --delete
