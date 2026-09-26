# Hamza - Unity Developer Portfolio

A modern responsive portfolio website built with plain HTML, CSS and JavaScript.

## Files

- `index.html` - Main website
- `styles.css` - Complete styling and responsive design
- `script.js` - Animations, mobile navigation, copy-email button
- `assets/favicon.svg` - Browser favicon

## How to run

Just double-click `index.html`.

For a better development workflow, open the folder in VS Code and use the **Live Server** extension.

## IMPORTANT: Things you should replace

Open `index.html` and search for:

- `your-email@example.com`
- `github.com/yourusername`
- `linkedin.com/in/yourusername`
- `href="#"`

Replace these with your real information.

## Add real project links

In the **Selected Work** section, each "Project Details" link currently uses:

```html
href="#"
```

Change it to your GitHub repository, Play Store link, YouTube gameplay video, or project case study.

Example:

```html
<a href="https://github.com/YOUR_USERNAME/YOUR_PROJECT" target="_blank" class="project-link">
```

## Add your CV

Put your PDF file in the portfolio folder, for example:

`Hamza_Unity_Developer_CV.pdf`

Then add a button:

```html
<a href="Hamza_Unity_Developer_CV.pdf" target="_blank" class="btn btn-secondary">Download CV</a>
```

## Hosting options

You can publish this site free using:

1. GitHub Pages
2. Netlify
3. Vercel

GitHub Pages is a great choice for a developer portfolio.

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

Change these variables to quickly change the website theme.

---

Built as a portfolio starter for a Unity 3D / Android game developer.
