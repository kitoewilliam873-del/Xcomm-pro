# Xcomm-pro

A lightweight front-end prototype for an animal-sound-to-human-speech translator app.

## Features
- Home scene with lion, falcon, wolf, bear, and shark in a split savanna/ocean habitat.
- Animal picker dialog (with images) to choose additional animals such as cat or cheetah.
- Translation output panel that maps sample animal sounds to human-readable meaning.
- Dashboard with profile/account summary and sign-in details form.

## Run locally
> Run all npm commands from this repository folder (the folder that contains `package.json`).

### Option 1: with npm
```bash
cd Xcomm-pro
npm install
npm start
```

### Option 2: without npm
```bash
cd Xcomm-pro
python3 -m http.server 8000
```
Then open http://localhost:8000/index.html.

## Troubleshooting
If you get `npm ERR! enoent Could not read package.json`, you are in the wrong folder.
Run `pwd`, then `cd` into the project directory, and retry.
