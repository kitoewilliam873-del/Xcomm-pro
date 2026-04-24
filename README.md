# Xcomm-pro

A lightweight front-end prototype for an animal-sound-to-human-speech translator app.

## Features
- Home scene with lion, falcon, wolf, bear, and shark in a split savanna/ocean habitat.
- Animal picker dialog (with images) to choose additional animals.
- Translation output panel that maps animal sounds to human-readable meaning.
- Listener phrase output with audio narration support.
- Dashboard with profile/account summary and sign-in details form.

## Run locally
> Run all commands from this repository folder (the folder that contains `package.json`).

### Option 1: with npm
```bash
npm install
npm start
```
Then open http://localhost:8000/Index.html.

### Option 2: without npm
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000/Index.html.

## Usage flow
1. Click an animal in the habitat or choose one from **Choose another animal**.
2. Review the sound pattern, interpretation, and translated listener phrase.
3. Click **🔊 Listen to translation** to hear the phrase in spoken English.
4. Save sign-in details in the dashboard card.

## Deployment notes
- Linux/macOS hosting is case-sensitive. This project intentionally uses:
  - `package.json` (lowercase) for npm.
  - `styles.css` (lowercase) to match `Index.html`.
- If your deploy logs show missing-file errors, verify your build artifact preserves these exact names.

## Troubleshooting
- If `npm start` fails, verify you are in this directory and that `package.json` exists.
- If audio does not play, your browser may block autoplay or may not support speech synthesis. The translated text remains available visually.
Package.json → package.json
Package.json → package.json
