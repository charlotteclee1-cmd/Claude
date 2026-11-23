# Personal portfolio website

A single-page portfolio and CV site in plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Files

| File | What it does |
| --- | --- |
| `index.html` | All the page content. Every place you should edit is marked with an `<!-- EDIT: ... -->` comment. |
| `css/styles.css` | Colours, fonts, layout, dark mode and print styles. Colours and fonts are tokens at the top of the file. |
| `js/main.js` | Optional extras: theme toggle, mobile menu, highlighting the current section in the nav, the email copy button. The page works without it. |

## Sections

1. **Hero**: name, one-line statement, location/status, buttons, portrait
2. **About**: two or three short paragraphs
3. **Experience**: roles in reverse date order
4. **Education**: degrees and qualifications
5. **Achievements**: prizes and positions, plus skills, languages and interests
6. **Writing & projects**: links to your published work
7. **Contact**: email (with a copy button) and profile links

## Making it yours

1. Open `index.html` and search for `EDIT:`. Replace the example text in each marked block.
2. **Add a photo:** put the image in an `images/` folder and replace `<div class="portrait" aria-hidden="true">YN</div>` with
   `<div class="portrait"><img src="images/portrait.jpg" alt="Portrait of Your Name"></div>`.
3. **Add or remove entries:** copy or delete a whole `<li class="entry">…</li>` block (or `<li>` in Achievements/Writing).
4. **Remove a section:** delete its `<section>` and its link in the `<nav>`.
5. **Change colours:** edit `--accent` and the other tokens at the top of `css/styles.css` (light values first, dark values in the two blocks below).

## Previewing locally

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing free on GitHub Pages

1. Merge this branch into your default branch (or publish from this branch).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch and the `/ (root)` folder, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Features

- Light and dark themes (follows the device setting; the moon button switches it and remembers your choice)
- Works on phones: the nav collapses into a menu button
- Printing the page (Ctrl/Cmd + P) gives a clean one-column CV without the navigation
- Accessible: skip link, visible keyboard focus, reduced motion respected
