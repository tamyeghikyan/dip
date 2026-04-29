## Quick start (Docker Compose + HTTPS)

### Prerequisites
- **Docker** + **Docker Compose**
- **openssl** (used by `/scripts/generate-self-signed-cert.sh`)

### 1) Generate TLS certs for Nginx
From repo root:

```bash
chmod +x ./scripts/generate-self-signed-cert.sh
./scripts/generate-self-signed-cert.sh
```

This creates:
- `nginx/ssl/cert.pem`
- `nginx/ssl/key.pem`

### 2) Build and run

```bash
docker compose up --build
```

### 3) Open the app
- Frontend (HTTPS): `https://localhost/`

API endpoints (proxied by Nginx):
- `https://localhost/predict-digit`
- `https://localhost/predict-text`

### Notes
- If your browser warns about the certificate: it’s self-signed (expected). Proceed/accept for localhost.
- Keep `REACT_APP_API_BASE_URL` as `https://localhost` (not `http://localhost`), otherwise Nginx will redirect 80 → 443 and the browser will block the preflight redirect.
- If you want to change the API token or CORS origins, edit `.env` and re-run `docker compose up --build`.


 