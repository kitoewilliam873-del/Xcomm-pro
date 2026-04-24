diff --git a/README.md b/README.md
index acfe9c36edb1e3361b93efc59fd59f2d579afc1a..ff16210b8fe6c41db29e06ea012a0c4e69bf476d 100644
--- a/README.md
+++ b/README.md
@@ -1,30 +1,43 @@
 # Xcomm-pro
 
 A lightweight front-end prototype for an animal-sound-to-human-speech translator app.
 
+## What was improved for smooth listener playback
+- Repaired broken front-end source files so the app loads correctly (`Index.html` and `app.js`).
+- Added a dedicated **Translated listener phrase** output that converts each animal sound into a clear sentence.
+- Added a **🔊 Listen to translation** button that uses the browser Web Speech API (`speechSynthesis`) to read the translated phrase aloud.
+- Added graceful fallback status text when speech playback is unavailable in the current browser.
+- Expanded available animals in the picker (cat, cheetah, elephant, dolphin, owl, penguin) while keeping the original habitat scene.
+
 ## Features
 - Home scene with lion, falcon, wolf, bear, and shark in a split savanna/ocean habitat.
-- Animal picker dialog (with images) to choose additional animals such as cat or cheetah.
-- Translation output panel that maps sample animal sounds to human-readable meaning.
+- Animal picker dialog (with images) to choose additional animals.
+- Translation output panel that maps animal sounds to human-readable meaning.
+- Listener phrase output with audio narration support.
 - Dashboard with profile/account summary and sign-in details form.
 
 ## Run locally
-> Run all npm commands from this repository folder (the folder that contains `package.json`).
+> Run all commands from this repository folder (the folder that contains `package.json`).
 
 ### Option 1: with npm
 ```bash
-cd Xcomm-pro
 npm install
 npm start
 ```
+Then open http://localhost:8000/Index.html.
 
 ### Option 2: without npm
 ```bash
-cd Xcomm-pro
 python3 -m http.server 8000
 ```
-Then open http://localhost:8000/index.html.
+Then open http://localhost:8000/Index.html.
+
+## Usage flow
+1. Click an animal in the habitat or choose one from **Choose another animal**.
+2. Review the sound pattern, interpretation, and translated listener phrase.
+3. Click **🔊 Listen to translation** to hear the phrase in spoken English.
+4. Save sign-in details in the dashboard card.
 
 ## Troubleshooting
-If you get `npm ERR! enoent Could not read package.json`, you are in the wrong folder.
-Run `pwd`, then `cd` into the project directory, and retry.
+- If `npm start` fails, verify you are in this directory and that `package.json` exists.
+- If audio does not play, your browser may block autoplay or may not support speech synthesis. The translated text remains available visually.
