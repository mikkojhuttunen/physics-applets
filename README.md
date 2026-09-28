# Physics & Math Applets

Standalone, self-contained HTML applets for teaching. Each file has no external
dependencies (no CDN, no build step) and runs directly in a browser.

## Applets

Each course has its own folder with an `index.html` listing its applets.

- `fys232-structure-of-matter/`
- `fys240-optics/`
- `fys310-solid-state-physics/` — 3D lattice viewer, Van Hove and DOS explorer,
  band structure explorer (empty lattice, weak potential, Al/Si/Ge/GaAs/diamond
  and AlGaAs composition).
- `fys501-laser-physics/` — laser gain media absorption/emission spectra, a
  Gaussian beam / ABCD-matrix optical cavity stability explorer, and a
  3-/4-level (ruby, Nd:YAG) laser rate-equation solver, a spatial hole burning
  applet (linear vs ring cavity), and a mode-competition applet (homogeneous vs
  inhomogeneous gain, intracavity etalon, cavity length).
- `finnmath-app/`

When adding an applet, link it from the course `index.html`, add
`<script src="../assets/js/course-back.js" defer></script>` before `</body>` (adds the back-to-course link), and add its path to
`APP_SHELL` in `service-worker.js`, then bump `CACHE_NAME` so installed copies update.

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, enable Pages for the `main` branch, root folder.
3. The site will be live at `https://mikkojhuttunen.github.io/physics-applets/`.
