# laserquiz-rewards

Bonus FYS.501 Laser Physics applets, deliberately **not** linked from this
repo's root `index.html` or `manifest.json`. They're reachable only via a
direct URL, which the `Laser_physics_bot` Telegram bot hands out as a
reward for progress in `/laserquiz` (e.g. per-chapter mastery or streaks).

This is spoiler control, not real access control — anyone with the exact
URL can still open these pages, the same as any other public GitHub Pages
file. The point is just to keep them out of casual browsing / search
indexing so they still feel like an earned unlock.

Current contents:

- `q-switching-explorer.html` — active Q-switch build-up simulator
  (ruby / Nd:YAG presets), draft, pending instructor physics review.
- `mode-locking-explorer.html` — comb-synthesis basics + a self-starting
  Haus-master-equation simulation (SESAM vs KLM), plus a conceptual
  SESAM/KLM/Mamyshev comparison panel, draft, pending instructor physics
  review.

Do not add links to this folder from `index.html`, `manifest.json`, or any
other page's navigation.
