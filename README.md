# Aether Dux Website

A responsive multi-page marketing website for Aether Dux — Aerial Technology. Limitless Possibilities.

## Structure

- `index.html` — Home
- `about.html` — About
- `solutions.html` — Services & Solutions
- `technology.html` — Technology & Innovation
- `contact.html` — Contact & Partnership
- `assets/aether-dux-logo.png` — supplied/generated Aether Dux logo
- `assets/styles.css` — custom styling and animations
- `assets/script.js` — navigation, reveal effects, counters and contact form validation

## Run locally

No build step is required.

1. Extract the folder.
2. Open `index.html` in a browser, or serve the folder with any static web server.
3. Tailwind CSS loads from the official CDN, so an internet connection is required for the CDN styles.
4. Replace `hello@aetherdux.com` in `assets/script.js` and the footer/contact links with your real company details before launch.

## Deployment

This is a static site and can be deployed to Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any standard web host.

## Contact form

The included form validates required fields and email format, then opens the visitor's default email client with a pre-filled inquiry. For a production backend, replace the `mailto:` handoff in `assets/script.js` with your preferred form endpoint or serverless function.
