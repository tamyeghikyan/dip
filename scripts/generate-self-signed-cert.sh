#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SSL_DIR="${ROOT}/nginx/ssl"
mkdir -p "${SSL_DIR}"

if [[ -f "${SSL_DIR}/cert.pem" && -f "${SSL_DIR}/key.pem" ]]; then
  echo "Certificates already exist at ${SSL_DIR}; remove them to regenerate."
  exit 0
fi

openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout "${SSL_DIR}/key.pem" \
  -out "${SSL_DIR}/cert.pem" \
  -days 365 \
  -subj "/CN=localhost"

echo "Wrote ${SSL_DIR}/cert.pem and ${SSL_DIR}/key.pem"
