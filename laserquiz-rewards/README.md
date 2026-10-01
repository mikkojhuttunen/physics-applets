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

- `cavity-workbench.html`: laser cavity workbench, the student edition. Build
  ring/linear cavities from mirrors, lenses, gain crystals, etalons, BRF and
  optical isolator elements (ABCD + Gaussian beams, paraxial ray trace,
  astigmatism compensation, mode selection, linewidth). Its examples are the
  DHW1 (Nd:YAG) and DHW2 (Ti:sapphire) starting cavities without isolator or
  etalons, so students add those themselves. Carries a `noindex` meta tag.
  Draft, pending instructor physics review.
- `cavity-workbench-pro.html`: teacher edition of the same workbench. It also
  loads the full DHW1/DHW2 designs (isolator, BRF, etalons), i.e. the answers.
  Do not hand this URL out through the bot. This file is the master copy:
  edit it, then regenerate the student edition, which drops the
  `PRO-ONLY` blocks so the answers are not in its page source:
  `sed -e '/PRO-ONLY-START/,/PRO-ONLY-END/{//!d;}' -e "s/const EDITION='pro';/const EDITION='student';/" cavity-workbench-pro.html > cavity-workbench.html`

Do not add links to this folder from `index.html`, `manifest.json`, or any
other page's navigation.
