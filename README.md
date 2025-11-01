# Level Up Gosport » Demo Rebuild

This is a static demo rebuild of the Level Up Gosport website using modern HTML/CSS/JS patterns.

Files added:
- `index.html` » main page (single-page demo)
- `styles.css` » styles using CSS variables, Grid & Flexbox
- `script.js` » small JS for nav toggle, smooth scroll, and form UX
- `research.md` » research notes and choices made
- `brainstorm.md` » layout and feature brainstorm

How to view locally:
1. Open `index.html` in a web browser (double-click or use "Open with..." in your editor).

Notes & next steps:
- This demo is static. The contact form uses `mailto:` and will open the user's default mail client.
- Accessibility: basic ARIA and keyboard support added; run Lighthouse or Axe for deeper checks.
- Deployment: can be hosted on GitHub Pages, Netlify, or any static host.

Optional improvements:
- Add a real backend or form provider (Formspree) for the contact form.
- Add light/dark mode and more micro-interactions.
- Convert to a small static-site build (eleventy/Vite) if templating is needed.

