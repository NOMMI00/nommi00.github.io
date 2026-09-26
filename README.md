# Nouman Qureshi - Unity Developer Portfolio

A responsive portfolio website built with plain HTML, CSS and JavaScript.

## Files

- `index.html` - Main website
- `styles.css` - Styling and responsive design
- `script.js` - Animations, mobile navigation, active nav link, copy-number button
- `assets/favicon.svg` - Browser favicon
- `assets/games/` - Game icons from the Google Play listings

## How to run

Double-click `index.html`, or open the folder in VS Code and use the **Live Server** extension.

## Updating published games

Each game is an `<article class="game-card">` inside the **Published Games** section of `index.html`.
To add a game, copy one card, change the icon in `assets/games/`, the title, genre, description,
download count and Play Store link.

If download counts change, also update the totals in the hero (`680K+`) and the metrics section
(`data-count="680"`).

## Add your CV

Put a PDF in the folder, e.g. `Nouman_Qureshi_Unity_Developer_CV.pdf`, then add a button:

```html
<a href="Nouman_Qureshi_Unity_Developer_CV.pdf" target="_blank" class="btn btn-secondary">Download CV</a>
```

## Hosting

Free options: GitHub Pages, Netlify or Vercel.

## Customization

Main colors are at the top of `styles.css`:

```css
:root {
  --bg: #070b14;
  --cyan: #62f2df;
  --blue: #6da8ff;
  --purple: #9d7cff;
}
```
