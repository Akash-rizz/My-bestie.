# Anaya Bestie Universe ✨

A mobile-first, static friendship website built with HTML, CSS, and vanilla JavaScript. No API keys, backend, or paid services required.

## Files
- `index.html` — page structure and sections
- `style.css` — visual design, responsiveness, and animations
- `script.js` — interactions and editable content
- `assets/` — optional local images/audio

## Customize it
Open `script.js` and edit the `CONFIG` object near the top:
- `name`, `title`, and `footer`
- `letter`
- `stories`
- `memories`
- `quiz`
- `surprises`

The default memory cards are abstract placeholders, not real photographs. Use the photo picker on the website to add images temporarily in the current browser session. To keep pictures in the published website, place your chosen images in `assets/` and update the page/config to reference them.

## Optional music
Music is off by default. For a local music file, use audio you have permission to use and put it at `assets/music.mp3`. Playback wiring can be added to `script.js` if you want the control to play that file. The website works normally without music.

## Run locally
Open `index.html` in a browser. For local testing with Python installed:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder to the repository root.
3. Open **Settings → Pages**.
4. Under build/deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to finish and open the published URL.

This is a static website. Photos added through the file picker are not uploaded and do not persist after the page session ends. Never add private keys or passwords to frontend files.
