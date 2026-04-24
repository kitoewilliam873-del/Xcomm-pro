const ANIMALS = [
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    habitat: 'Savanna',
    sound: 'ROAR-RR-ROAR',
    interpretation: 'Territorial warning with confidence and alertness.',
    phrase: 'I am here. Keep your distance and respect this territory.'
  },
  {
    id: 'falcon',
    name: 'Falcon',
    emoji: '🦅',
    habitat: 'Cliffs',
    sound: 'KREE-KREE',
    interpretation: 'High-altitude signal for attention and navigation.',
    phrase: 'Focus now. I see movement and we need quick coordination.'
  },
  {
    id: 'wolf',
    name: 'Wolf',
    emoji: '🐺',
    habitat: 'Forest',
    sound: 'AOOO-HOWL',
    interpretation: 'Pack-location and social-bond communication.',
    phrase: 'Where are you? Stay close so the group can move together.'
  },
  {
    id: 'bear',
    name: 'Bear',
    emoji: '🐻',
    habitat: 'Mountain',
    sound: 'GRUFF-HUMPH',
    interpretation: 'Boundary-setting and cautious evaluation.',
    phrase: 'I am uncomfortable. Please give me space.'
  },
  {
    id: 'shark',
    name: 'Shark',
    emoji: '🦈',
    habitat: 'Ocean',
    sound: 'LOW-FIN-RUSH',
    interpretation: 'Movement cue linked to pursuit and positioning.',
    phrase: 'Target detected. Maintain direction and momentum.'
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    habitat: 'Domestic',
    sound: 'MEOW-PRR',
    interpretation: 'Comfort request with social friendliness.',
    phrase: 'Hello there. I would like attention and maybe a snack.'
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    emoji: '🐆',
    habitat: 'Grassland',
    sound: 'CHIRP-CHIRP',
    interpretation: 'Close-range coordination before movement.',
    phrase: 'Stay in sync with me. We are about to move quickly.'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    habitat: 'Savanna',
    sound: 'RUMBLE-TRUMPET',
    interpretation: 'Long-distance family contact and guidance.',
    phrase: 'Family, gather here. It is time to travel safely together.'
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    habitat: 'Ocean',
    sound: 'CLICK-WHISTLE',
    interpretation: 'Social greeting paired with sonar scanning.',
    phrase: 'Hi team, I am checking the area and it looks clear.'
  },
  {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    habitat: 'Woodland',
    sound: 'HOO-HOO',
    interpretation: 'Night-position beacon with calm awareness.',
    phrase: 'I am nearby and watching. The night remains quiet.'
  },
  {
    id: 'penguin',
    name: 'Penguin',
    emoji: '🐧',
    habitat: 'Polar coast',
    sound: 'HONK-BRAY',
    interpretation: 'Nest and partner recognition call.',
    phrase: 'I found you. Let us stay together and protect the nest.'
  }
];

const state = {
  selectedAnimal: ANIMALS[0],
  utterance: null
};

const habitatAnimals = document.getElementById('habitatAnimals');
const pickerAnimals = document.getElementById('pickerAnimals');
const selectedAnimalEl = document.getElementById('selectedAnimal');
const soundPatternEl = document.getElementById('soundPattern');
const interpretationEl = document.getElementById('interpretation');
const translatedPhraseEl = document.getElementById('translatedPhrase');
const speechStatusEl = document.getElementById('speechStatus');
const listenBtn = document.getElementById('listenBtn');
const openAnimalPickerBtn = document.getElementById('openAnimalPicker');
const animalPicker = document.getElementById('animalPicker');
const profileForm = document.getElementById('profileForm');
const profileStatus = document.getElementById('profileStatus');

function cardTemplate(animal) {
  return `
    <button class="animal-card" type="button" data-animal-id="${animal.id}" aria-label="Select ${animal.name}">
      <span class="emoji" aria-hidden="true">${animal.emoji}</span>
      <strong>${animal.name}</strong><br>
      <small>${animal.habitat}</small>
    </button>
  `;
}

function renderAnimalLists() {
  const cards = ANIMALS.map(cardTemplate).join('');
  habitatAnimals.innerHTML = cards;
  pickerAnimals.innerHTML = cards;
}

function updateTranslator(animal) {
  state.selectedAnimal = animal;
  selectedAnimalEl.textContent = `${animal.emoji} ${animal.name}`;
  soundPatternEl.textContent = animal.sound;
  interpretationEl.textContent = animal.interpretation;
  translatedPhraseEl.textContent = animal.phrase;
  speechStatusEl.textContent = '';
}

function selectAnimalById(animalId, closePicker = false) {
  const animal = ANIMALS.find((item) => item.id === animalId);
  if (!animal) return;
  updateTranslator(animal);
  if (closePicker && animalPicker.open) {
    animalPicker.close();
  }
}

function speakTranslation() {
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  if (!canSpeak) {
    speechStatusEl.textContent = 'Speech playback is unavailable in this browser.';
    return;
  }

  window.speechSynthesis.cancel();

  state.utterance = new SpeechSynthesisUtterance(state.selectedAnimal.phrase);
  state.utterance.lang = 'en-US';
  state.utterance.rate = 1;
  state.utterance.pitch = 1;

  state.utterance.onstart = () => {
    speechStatusEl.textContent = 'Playing translation...';
  };

  state.utterance.onend = () => {
    speechStatusEl.textContent = 'Playback complete.';
  };

  state.utterance.onerror = () => {
    speechStatusEl.textContent = 'Unable to play audio right now.';
  };

  window.speechSynthesis.speak(state.utterance);
}

function restoreProfile() {
  const saved = localStorage.getItem('xcomm_profile');
  if (!saved) return;

  try {
    const profile = JSON.parse(saved);
    if (profile.fullName) document.getElementById('fullName').value = profile.fullName;
    if (profile.email) document.getElementById('email').value = profile.email;
    if (profile.role) document.getElementById('role').value = profile.role;
  } catch {
    // if malformed data exists, ignore and continue
  }
}

function saveProfile(event) {
  event.preventDefault();
  const formData = new FormData(profileForm);
  const profile = {
    fullName: String(formData.get('fullName') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    role: String(formData.get('role') || '').trim()
  };

  localStorage.setItem('xcomm_profile', JSON.stringify(profile));
  profileStatus.textContent = `Saved for ${profile.fullName} (${profile.role}).`;
}

function bindEvents() {
  habitatAnimals.addEventListener('click', (event) => {
    const button = event.target.closest('[data-animal-id]');
    if (!button) return;
    selectAnimalById(button.dataset.animalId, false);
  });

  pickerAnimals.addEventListener('click', (event) => {
    const button = event.target.closest('[data-animal-id]');
    if (!button) return;
    selectAnimalById(button.dataset.animalId, true);
  });

  openAnimalPickerBtn.addEventListener('click', () => {
    if (typeof animalPicker.showModal === 'function') {
      animalPicker.showModal();
    } else {
      speechStatusEl.textContent = 'Animal picker dialog is not supported in this browser.';
    }
  });

  listenBtn.addEventListener('click', speakTranslation);
  profileForm.addEventListener('submit', saveProfile);
}

function init() {
  renderAnimalLists();
  bindEvents();
  restoreProfile();
  updateTranslator(state.selectedAnimal);
}

init();
