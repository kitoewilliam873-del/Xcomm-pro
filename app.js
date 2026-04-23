const animalTranslations = {
  lion: {
    sound: "Roaarrr-uhh!",
    meaning: "I am guarding my territory. Keep your distance.",
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
  const button = document.createElement("button");
  button.className = "animal-option";
  button.type = "button";
  button.innerHTML = `
    <img src="${animalDetails[animal].image}" alt="${animal}" />
    <span>${animal.charAt(0).toUpperCase() + animal.slice(1)}</span>
  `;

  button.addEventListener("click", () => {
    showTranslation(animal);
    animalDialog.close();
  });

  animalList.appendChild(button);
});

animalPickerBtn.addEventListener("click", () => animalDialog.showModal());
closeDialog.addEventListener("click", () => animalDialog.close());

Array.from(document.querySelectorAll(".animal")).forEach((animalCard) => {
  animalCard.addEventListener("click", () => {
    showTranslation(animalCard.dataset.animal);
  });
});

signinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const remember = document.getElementById("remember").value;

  signinStatus.textContent = `Saved for ${email} (remember: ${remember}).`;
});
