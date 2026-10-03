# Responsive Website — Mobile-First Business Site

A mobile-first, fully responsive business website built with HTML5, CSS3
and vanilla JavaScript. No frameworks, no backend.

## Files
- index.html — page structure
- style.css — mobile-first styles with breakpoints for tablet/desktop
- script.js — mobile menu, scroll reveal, active nav highlighting,
  back-to-top button, light/dark theme toggle, and a contact form that
  saves to localStorage and opens the visitor's email app
- messages.html — view (and clear) contact messages saved in localStorage

## New: Theme toggle
Click the ◐ button in the header to switch between light and dark mode.
Your choice is remembered in this browser (localStorage).

## New: Contact form storage
Submitting the contact form saves the message to this browser's
localStorage (key `jq_contact_messages`) in addition to opening the
visitor's email app. Open `messages.html` to view or clear saved messages.
This is local to each browser — it is not sent to a server or shared
between visitors.

## Sections
Hero, stats bar, services (6 cards), about/why-choose-us, testimonials,
contact form, footer.

## Run it
Just open index.html in a browser — no server needed.

## Notes
- Built "mobile-first": the base CSS targets small screens, then a single
  `@media (min-width: 700px)` block adds the desktop layout (side-by-side
  hero, horizontal nav, 3-column grids).
- Business name, email and content are placeholders — replace "BrightEdge
  Studio" and the contact details with real ones before using this for an
  actual client or portfolio case study.
