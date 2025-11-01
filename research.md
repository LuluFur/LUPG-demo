# Research » Rebuilding Level Up Gosport

This research file collects modern techniques, accessibility, performance, SEO, and visual ideas to rebuild the Level Up Gosport website.

## Goals
- Create a modern, accessible, responsive static demo site.
- Prioritize performance (fast load on mobile), SEO basics, and clear calls-to-action (donate, volunteer, events).
- Use existing imagery from the `images/` folder and avoid heavy dependencies.

## Modern techniques and choices
- HTML5 semantic elements: header, nav, main, section, article, footer for clarity and accessibility.
- Responsive layout with CSS Grid + Flexbox.
- CSS variables for theme (colors, spacing) and dark-mode toggle as optional enhancement.
- Mobile-first CSS and progressive enhancement.
- Minimal JS: only for UI interactions (menu toggle, smooth scroll, form validation).
- Performance: defer non-critical JS, lazy-load images (loading="lazy"), use webp where available.
- Accessibility: keyboard-friendly nav, skip-link, descriptive alt attributes, color contrast checks, proper focus styles.
- SEO basics: descriptive title, meta description, structured content, headings hierarchy (h1..h3), meaningful link text.
- Forms: client-side validation and graceful fallback (no server required for demo).

## Visual and UX patterns
- Clean hero area with strong headline, short sub-head, and 2 CTAs (Donate / Volunteer / Events).
- Feature grid for core activities (foodbank, events, help, volunteering).
- Events or updates list using cards (date, title, short description, link).
- Contact or sign-up form in the page footer or a dedicated Contact section.
- Footer with social, address, small sitemap.

## Suggested palette and typography
- Palette: deep navy (#0b2545), accent green (#2cc36b) for CTAs, warm gold (#f3c25a) for highlights, soft neutrals (#f6f7fb to #ffffff).
- Typography: use a readable sans like Inter (or system-ui fallback). Larger line-height for body text.

## Performance & tooling notes
- Keep site static » can host on GitHub Pages or Netlify.
- No build steps required for demo » plain HTML/CSS/JS is sufficient.

## Accessibility checklist (quick)
- [ ] Skip link present
- [ ] Logical heading order
- [ ] Sufficient color contrast for text/buttons
- [ ] Focus outlines visible for keyboard users
- [ ] Images have alt text

## References
- MDN HTML semantics: https://developer.mozilla.org/
- WebAIM contrast checker: https://webaim.org/
- Google Lighthouse (performance/a11y tips)

