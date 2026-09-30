# Physics & Math Applets

Standalone, self-contained HTML applets for teaching. Each file has no external
dependencies (no CDN, no build step) and runs directly in a browser.

## Applets

Each course has its own folder with an `index.html` listing its applets.

- `fys232-structure-of-matter/` — a chained radioactive decay applet, an interatomic potential explorer
  (Lennard-Jones and Morse curves with adjustable well depth and equilibrium separation; bond length,
  dissociation energy and force F = −dU/dr shown together, with the harmonic approximation, vibrational
  quantum and zero-point corrected D₀; presets for H₂⁺, H₂, N₂ and Ar₂), a binding-energy-per-nucleon
  explorer (Sect. 3.2 → 3.6/3.7: BE/A of the most stable nucleus at every A computed from atomic masses;
  click a nucleus to see the curve-based energy of fusing or splitting it, then fission channels of ²³⁵U,
  fusion reactions from the p–p chain to Si+Si→Ni-56 with exact Q-values, (n,γ) capture for neutron
  activation analysis with the activity build-up curve, and α decay of Am-241),
  and a quantum distributions explorer (Fermi–Dirac, Bose–Einstein and Maxwell–Boltzmann occupation
  numbers against energy with a temperature slider, fixed-N or fixed-μ normalisation, and mean energy
  per particle against temperature).
- `fys240-optics/`
- `fys310-solid-state-physics/` — lattice viewer (3D lattices with primitive vectors, Brillouin zones with empty-lattice bands, 2D Bravais lattices), Van Hove and DOS explorer,
  band structure explorer (empty lattice, weak potential, Al/Si/Ge/GaAs/diamond
  and AlGaAs composition), and a thermal transport explorer (Debye and sine
  phonon dispersions, heat capacity and thermal conductivity of diamond, Si,
  Ge, Al, Cu, and a coupled Einstein solid test material with the
  conductivity-peak shift), an orbitals applet (s, p, d, f clouds, sp3 and
  sp2 hybrids in diamond and graphene, bonding and antibonding molecular
  orbitals as two atoms approach), and a tight-binding explorer (1D chain, two
  atoms per cell, graphene and h-BN with doping, fcc s-band, s+p group 2
  chain), and a semiconductor doping and Hall effect explorer (donor/acceptor
  freeze-out, Fermi level, n(T), p(T), R_H(T) and resistivity for Si, Ge and
  GaAs), and a mechanical properties explorer (Morse bond and elastic constants,
  stress–strain curve with load, unload, work hardening and necking, edge
  dislocation glide against perfect-crystal slip with interstitial pinning, and
  a Poisson-ratio block with Y, G and K), and Term Alias (an Alias-style concept
  card game with dice roll, 60 s timer and "don't say" words, 97 terms).
- `fys501-laser-physics/` — laser gain media absorption/emission spectra, a
  Gaussian beam / ABCD-matrix optical cavity stability explorer, and a
  3-/4-level (ruby, Nd:YAG) laser rate-equation solver, a spatial hole burning
  applet (linear vs ring cavity), and a mode-competition applet (homogeneous vs
  inhomogeneous gain, intracavity etalon, cavity length), a laser-condition and
  logarithmic-losses applet (threshold inversion, round-trip gain waterfall),
  a coherence explorer (Michelson and Young, temporal vs spatial coherence),
  an output-coupler optimization applet (output power vs mirror
  transmission, optimum for given gain and loss), a transverse-mode
  explorer (Hermite–Gauss and Laguerre–Gauss field, phase and intensity, mode
  superpositions, ABCD propagation and M² focusing), and a Fabry–Pérot etalon
  explorer (Airy function with phasor sum, free spectral range and scanning,
  finesse, photon lifetime and resolution).
- `finnmath-app/`

Shared styling lives in `assets/css/`: `base.css` (colour, font and theme tokens), a per-course
file such as `fys240-optics.css` (course accent), and `applet.css` (panels, sliders, buttons,
segmented controls, readouts). New applets link all three before their own `<style>`, which
should hold only layout and figure-specific colours.

When adding an applet, link it from the course `index.html`, add
`<script src="../assets/js/course-back.js" defer></script>` before `</body>` (adds the back-to-course link), and add its path to
`APP_SHELL` in `service-worker.js`, then bump `CACHE_NAME` so installed copies update.

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, enable Pages for the `main` branch, root folder.
3. The site will be live at `https://mikkojhuttunen.github.io/physics-applets/`.
