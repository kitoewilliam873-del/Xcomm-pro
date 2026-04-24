diff --git a/app.js b/app.js
index a6915d116e95bbe93aa6240f7ce51ba0b6f6c60f..9ccd39cb9852a8729e0befc6629a8f347d70a16e 100644
--- a/app.js
+++ b/app.js
@@ -5,76 +5,108 @@ const animalTranslations = {
   },
   falcon: {
     sound: "Kee-kee-kee!",
     meaning: "I have spotted movement and I am hunting.",
   },
   wolf: {
     sound: "Awooooo!",
     meaning: "Pack, gather here. Let's coordinate.",
   },
   bear: {
     sound: "Huff-grrrr.",
     meaning: "I feel threatened. Back away calmly.",
   },
   shark: {
     sound: "Low pulse + rapid movement",
     meaning: "Something unusual is in the water near me.",
   },
   cat: {
     sound: "Meow-meow-prrr",
     meaning: "I want attention and I feel comfortable.",
   },
   cheetah: {
     sound: "Chirp-chirp",
     meaning: "I am calling my cubs or signaling nearby family.",
   },
+  elephant: {
+    sound: "Rumble-trumpet",
+    meaning: "I am checking in with my herd across a long distance.",
+  },
+  dolphin: {
+    sound: "Click-whistle-click",
+    meaning: "I am navigating and sharing where food is nearby.",
+  },
+  owl: {
+    sound: "Hoo-hoo",
+    meaning: "This is my territory, and I am active at night.",
+  },
+  penguin: {
+    sound: "Honk-bray",
+    meaning: "I am calling my partner or chick in a crowded colony.",
+  },
 };
 
 const animalDetails = {
   lion: {
     image:
       "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
   },
   falcon: {
     image:
       "https://upload.wikimedia.org/wikipedia/commons/1/16/Falco_peregrinus_good_-_Christopher_Watson.jpg",
   },
   wolf: {
     image: "https://upload.wikimedia.org/wikipedia/commons/1/15/2010-kabini-grey-wolf.jpg",
   },
   bear: {
     image: "https://upload.wikimedia.org/wikipedia/commons/7/71/2010-brown-bear.jpg",
   },
   shark: {
     image: "https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg",
   },
   cat: {
     image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Felis_catus-cat_on_snow.jpg",
   },
   cheetah: {
     image: "https://upload.wikimedia.org/wikipedia/commons/0/09/TheCheethcat.jpg",
   },
+  elephant: {
+    image:
+      "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg",
+  },
+  dolphin: {
+    image:
+      "https://upload.wikimedia.org/wikipedia/commons/2/28/Common_dolphin_noaa.jpg",
+  },
+  owl: {
+    image:
+      "https://upload.wikimedia.org/wikipedia/commons/1/14/Bubo_bubo_sibiricus_-_zoo_Madrid.jpg",
+  },
+  penguin: {
+    image:
+      "https://upload.wikimedia.org/wikipedia/commons/0/00/Aptenodytes_patagonicus_-Salisbury_Plain%2C_South_Georgia%2C_British_overseas_territory-8.jpg",
+  },
 };
 
 const soundPattern = document.getElementById("soundPattern");
 const humanMeaning = document.getElementById("humanMeaning");
 const lastTranslation = document.getElementById("lastTranslation");
 const animalPickerBtn = document.getElementById("animalPickerBtn");
 const animalDialog = document.getElementById("animalDialog");
 const closeDialog = document.getElementById("closeDialog");
 const animalList = document.getElementById("animalList");
 const signinForm = document.getElementById("signinForm");
 const signinStatus = document.getElementById("signinStatus");
 
 function showTranslation(animal) {
   const translation = animalTranslations[animal];
 
   if (!translation) {
     return;
   }
 
   soundPattern.textContent = translation.sound;
   humanMeaning.textContent = translation.meaning;
   lastTranslation.textContent = animal.charAt(0).toUpperCase() + animal.slice(1);
 }
 
 Object.keys(animalTranslations).forEach((animal) => {
