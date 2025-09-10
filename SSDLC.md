I’ll outline concrete SSDLC steps tailored to this repo so you can harden the app end to end and automate checks.

## Checklist (prioritized)

- Governance & policy
  - Define security objectives (OWASP ASVS L1 as a baseline) and add a short SECURITY.md
  - Add CODEOWNERS, PR template, issue template, branch protection, required reviews
- Threat modeling & design
  - Create a lightweight threat model (STRIDE) for the three API endpoints + upcoming “like” feature
  - Identify abuse cases (spam likes, coupon farming) and mitigations (rate limit, auth/captcha)
- Secrets & configuration
  - Remove hardcoded secrets in app.js; use `.env` + `.env.example`; load via `dotenv`
  - Add secret scanning (gitleaks) in CI and pre-commit; ensure `.env` is gitignored
- Dependency & supply chain
  - Turn on Dependabot/Renovate for npm updates (both client and server)
  - Generate SBOM (CycloneDX) and scan with Trivy/Grype in CI
- Static analysis & linting
  - Add Semgrep (rules: javascript, react, express, security-audit)
  - Add ESLint security plugins: `eslint-plugin-security`, `eslint-plugin-node` (server)
  - Add Prettier + consistent formatting to reduce review noise
- Testing (unit/integration/e2e)
  - Keep Vitest + Supertest; add security-focused tests (headers present, input validation rejects bad payloads)
  - Add E2E with Playwright/Cypress (happy paths + auth/abuse checks)
- Runtime security (API)
  - Add `helmet` for security headers
  - Add `express-rate-limit` and `express-slow-down` on write endpoints (future “like”)
  - Restrict CORS to the Netlify frontend origin (no wildcard in prod)
  - Validate inputs with Zod/express-validator; centralize error handling; avoid leaking stack traces
  - Structured logging (pino) with redaction; correlation IDs; basic request metrics
- Frontend security
  - Add CSP, HSTS, and other headers via Netlify `_headers`; avoid `dangerouslySetInnerHTML`
  - Use HTTPS-only URLs; verify no mixed content; consider Subresource Integrity for external assets (if any)
- CI/CD gates
  - GitHub Actions workflow:
    - Lint + type checks (client/server), unit tests, build
    - Semgrep SAST
    - SCA scan (npm audit/OSV + SBOM scan)
    - SonarCloud/SonarQube as in your TODO
    - Optional: OWASP ZAP DAST against a local ephemeral deploy
  - Make CI block merges on high/critical findings
- Observability & ops
  - Health endpoint, uptime monitoring, basic alerts
  - Log retention policy; avoid PII/secrets in logs
- Deployment
  - Netlify (client): set strict headers, restrict env access, rotate tokens
  - Render (server): set environment variables, enable HTTPS only, enforce allowed origins
- Documentation
  - Add SECURITY.md, THREATMODEL.md, and update README.md with security runbook (how to rotate secrets, run scans)
- Data & privacy
  - Define what (if any) user data is processed; document retention, consent, and deletion paths

## Quick wins you can do this week

- Server hardening in app.js
  - Add `dotenv`, `helmet`, `express-rate-limit`, input validation, centralized error handler
  - Replace wildcard CORS with explicit `origin` allowlist (Netlify URL in prod)
- Repo hygiene
  - Add `.env.example`, `.gitignore` confirm, SECURITY.md, CODEOWNERS, PR template
- CI foundation
  - One workflow running: install → lint → test → build → semgrep → npm audit → SBOM (cyclonedx) → Trivy scan

## Notes for your existing TODO

- “Like company” feature: make it POST, validate body, require CSRF or bot mitigation (captcha/turnstile), rate-limit per IP/user, and deduplicate likes
- “Coupon code for every 10th like”: guard against replay/automation; generate single-use codes; server-side audit trail; avoid predictable sequences
- SonarQube: wire into CI after tests; fail on quality gate
