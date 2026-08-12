# CLAUDE.md — Studio Serra

Local source for the Studio Serra website at `serra-studio.vercel.app`.
GitHub: `CuriousAquarius/serra-studio` · Deploy: push to GitHub → Vercel auto-deploys.

---

## Chat Widget Design — Always Load First

Any time we are designing, building, or pitching a website that includes a Serra chat window — load this before touching colors or layout:
**`~/chatbot/research/widget-design-guide.md`**

It has: industry palettes (ready to paste), config field explanations, current widget features, and the new-client onboarding checklist.

---

## Key Files

| File | Purpose |
|---|---|
| `index.html` | Main landing page |
| `start.html` | Intake form (submits via Telegram ping to Josef) |
| `demo/index.html` | Interactive demo page with industry switcher |
| `tos.html` · `privacy.html` | Legal pages |

---

## Deploy Rules

- Edit locally → `git add <files>` → `git commit` → `git push`
- Repo: `CuriousAquarius/serra-studio` (public)
- Never use `gh CLI` to push — use standard git with the token already in the remote URL
- No `.env` or secret files committed

---

## Checking Pages

- Need to actually look at a page (does it load, does a form work, does a flow go through) → try Playwright or Claude-in-Chrome first, before a manual screenshot walkthrough.

## Design Rules

- Colors: match serrachat.com exactly (gold `#e8c97e`, navy `#1a1a2e`, cream `#fdf6f0`)
- Fonts: DM Serif Display + Inter
- No em dashes in any copy
- All pages must be responsive (desktop + mobile)
- Never default to Serra's dark/blue palette for client demo sites — match the client's industry
