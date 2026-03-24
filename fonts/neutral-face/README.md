# Neutral Face Webfont Files

Self-hosted `Neutral Face` files used by the site:

- `NeutralFace.otf` for weights `400`, `500`, `600`
- `NeutralFace-Bold.otf` for weight `700`

Why this folder exists:

- The site is already configured to load `Neutral Face` from these exact paths in [tokens.css](/O:/Dev/test-ai-portfolio/tokens.css).
- Once the files are added, visitors will see the font even if it is not installed on their machine.
- Until then, the browser will fall back to the system font stack.

Important:

- Use only font files you are licensed to self-host on the web.
