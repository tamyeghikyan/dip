#!/bin/sh
set -eu

cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  REACT_APP_TOKEN: "${REACT_APP_TOKEN:-predict_digit}",
  REACT_APP_API_BASE_URL: "${REACT_APP_API_BASE_URL:-}"
};
EOF

exec "$@"
