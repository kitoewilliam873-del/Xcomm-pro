const ANIMALS = [
  {
    id: 'lion',
    name: 'Lion',
    habitat: 'Savanna',
    freqRange: [80, 450],
    image:
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'I am calm and scanning this area.',
      alert: 'I sense movement. Keep your distance respectfully.',
      urgent: 'Immediate warning. Move back now.'
    }
  },
  {
    id: 'elephant',
    name: 'Elephant',
    habitat: 'Grassland',
    freqRange: [20, 280],
    image:
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'Family group is settled and close.',
      alert: 'Regroup here and remain coordinated.',
      urgent: 'Urgent trumpet signal. Protect the herd now.'
    }
  },
  {
    id: 'wolf',
    name: 'Wolf',
    habitat: 'Forest',
    freqRange: [150, 900],
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'Pack is nearby and connected.',
      alert: 'Pack call detected. Hold formation.',
      urgent: 'High urgency howl. Threat is near.'
    }
  },
  {
    id: 'owl',
    name: 'Owl',
    habitat: 'Woodland',
    freqRange: [250, 1400],
    image:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'Quiet patrol call in the night.',
      alert: 'Attention call: movement detected nearby.',
      urgent: 'Sharp warning call. Immediate disturbance present.'
    }
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    habitat: 'Ocean',
    freqRange: [2000, 12000],
    image:
      'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'Pod is coordinated and moving smoothly.',
      alert: 'Sonar alert. Directional movement detected.',
      urgent: 'High-priority pod alert. Change course now.'
    }
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    habitat: 'Grassland',
        freqRange: [300, 1700],
    image:
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1000&q=80',
    templates: {
      calm: 'Close-range communication is stable.',
      alert: 'Coordination chirp detected before movement.',
      urgent: 'Fast-response alarm. Stay synchronized now.'
    }
  }
];

const state = {
  selectedAnimal: ANIMALS[0],
  detectionDistance: 12,
  sensitivity: 2,
  autoSpeak: false,
  stream: null,
  audioContext: null,
  analyser: null,
  listening: false,
  loopId: null,
  lastSpokenText: '',
  latestTranslation: 'Translation will appear instantly after incoming sound is detected.',
  noiseFloor: 0.02
};

const heroGallery = document.getElementById('heroGallery');
const animalSelector = document.getElementById('animalSelector');
const selectedAnimalEl = document.getElementById('selectedAnimal');
const configuredRange = document.getElementById('configuredRange');
const estimatedDistance = document.getElementById('estimatedDistance');
const liveIntensity = document.getElementById('liveIntensity');
const dominantFrequency = document.getElementById('dominantFrequency');
const confidenceScore = document.getElementById('confidenceScore');
const interpretedMeaning = document.getElementById('interpretedMeaning');
const humanSpeech = document.getElementById('humanSpeech');
const liveStatus = document.getElementById('liveStatus');
const startCapture = document.getElementById('startCapture');
const stopCapture = document.getElementById('stopCapture');
const speakNow = document.getElementById('speakNow');
const openQuickMenu = document.getElementById('openQuickMenu');
const quickMenu = document.getElementById('quickMenu');
const openSettings = document.getElementById('openSettings');
const settingsDialog = document.getElementById('settingsDialog');
const closeSettings = document.getElementById('closeSettings');
const distanceRange = document.getElementById('distanceRange');
const distanceValue = document.getElementById('distanceValue');
const sensitivityRange = document.getElementById('sensitivityRange');
const sensitivityValue = document.getElementById('sensitivityValue');
const autoSpeak = document.getElementById('autoSpeak');
const tabButtons = document.querySelectorAll('.tab-btn');
const windows = document.querySelectorAll('.window-card');

function renderHomeGallery() {
  heroGallery.innerHTML = ANIMALS.map(
    (animal) => `
      <article class="hero-tile" style="background-image:url('${animal.image}')">
        <span><strong>${animal.name}</strong> · ${animal.habitat}</span>
      </article>
    `
  ).join('');
}

function renderAnimalSelector() {
  animalSelector.innerHTML = ANIMALS.map(
    (animal) => `
      <button class="animal-card ${animal.id === state.selectedAnimal.id ? 'active' : ''}" type="button" data-animal-id="${animal.id}">
        <img src="${animal.image}" alt="${animal.name}" loading="lazy" />
        <div class="info">
          <strong>${animal.name}</strong><br />
          <small>${animal.habitat}</small>
        </div>
      </button>
    `
  ).join('');
}

function updateReadout() {
  selectedAnimalEl.textContent = state.selectedAnimal.name;
  configuredRange.textContent = `${state.detectionDistance} meters`;
  humanSpeech.textContent = state.latestTranslation;
}

function goToWindow(windowId) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.window === windowId);
  });

  windows.forEach((win) => {
    win.classList.toggle('active', win.id === windowId);
  });
}

function levelFromEnergy(normalizedEnergy) {
  const baseThreshold = [0.03, 0.06, 0.09][state.sensitivity - 1];
  if (normalizedEnergy > baseThreshold * 2.2) return 'urgent';
  if (normalizedEnergy > baseThreshold * 1.4) return 'alert';
  return 'calm';
}

function calcDominantFrequency(freqData, sampleRate) {
  let peakIndex = 0;
  let peak = -1;

  for (let i = 1; i < freqData.length; i += 1) {
    if (freqData[i] > peak) {
      peak = freqData[i];
      peakIndex = i;
    }
  }

  return Math.round((peakIndex * sampleRate) / (2 * freqData.length));
}

function estimateDistanceMeters(normalizedEnergy) {
  const scaled = Math.max(normalizedEnergy, 0.002);
  const estimated = Math.round(Math.min(40, Math.max(1, (0.16 / scaled) * 2.7)));
  return estimated;
}

function confidenceForAnimal(freqHz) {
  const [minHz, maxHz] = state.selectedAnimal.freqRange;
  const center = (minHz + maxHz) / 2;
  const halfBand = (maxHz - minHz) / 2;
  const offset = Math.abs(freqHz - center);
  const normalized = Math.max(0, 1 - offset / Math.max(halfBand, 1));
  return Math.round(35 + normalized * 65);
}

function speakText(message) {
  if (!('speechSynthesis' in window)) {
    liveStatus.textContent = 'Speech output is unavailable in this browser.';
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

function processLiveAudio() {
  if (!state.analyser || !state.listening) return;

  const timeData = new Float32Array(state.analyser.fftSize);
  const freqData = new Uint8Array(state.analyser.frequencyBinCount);
  state.analyser.getFloatTimeDomainData(timeData);
  state.analyser.getByteFrequencyData(freqData);

  const squareMean = timeData.reduce((sum, sample) => sum + sample * sample, 0) / timeData.length;
  const rms = Math.sqrt(squareMean);
  const dominantHz = calcDominantFrequency(freqData, state.audioContext.sampleRate);

state.noiseFloor = state.noiseFloor * 0.97 + rms * 0.03;
  const normalizedEnergy = Math.max(0, rms - state.noiseFloor);

  liveIntensity.textContent = `${normalizedEnergy.toFixed(4)}`;
  dominantFrequency.textContent = `${dominantHz} Hz`;

  if (normalizedEnergy > 0.003) {
    const level = levelFromEnergy(normalizedEnergy);
    const estimated = estimateDistanceMeters(normalizedEnergy);
    const confidence = confidenceForAnimal(dominantHz);

    estimatedDistance.textContent = `~${estimated} meters`;
    confidenceScore.textContent = `${confidence}%`;
    
        const meaning = `${state.selectedAnimal.name} profile detected with ${level} intensity at ${dominantHz} Hz.`;
    interpretedMeaning.textContent = meaning;

    const translation = state.selectedAnimal.templates[level];
    state.latestTranslation = translation;
    humanSpeech.textContent = translation;

    const inRange = estimated <= state.detectionDistance;
    liveStatus.innerHTML = inRange
      ? `<span class="good">Live detection in-range (${state.detectionDistance}m target)</span>`
      : `Detected beyond configured range (${state.detectionDistance}m). Increase distance in settings.`;

    if (state.autoSpeak && state.lastSpokenText !== translation) {
      state.lastSpokenText = translation;
      speakText(translation);
    }
  } else {
    liveStatus.textContent = 'Listening... no strong animal-like signal yet.';
  }

  state.loopId = window.setTimeout(processLiveAudio, 250);
}

async function startLiveCapture() {
  if (state.listening) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    liveStatus.textContent = 'Microphone access is unavailable in this browser.';
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.6;
    source.connect(analyser);

    state.stream = stream;
    state.audioContext = audioContext;
    state.analyser = analyser;
    state.listening = true;

    startCapture.disabled = true;
    stopCapture.disabled = false;
    liveStatus.textContent = 'Live capture started.';

    processLiveAudio();
  } catch {
    liveStatus.textContent = 'Microphone permission denied or unavailable.';
  }
}

function stopLiveCapture() {
  if (!state.listening) return;

  if (state.loopId) {
    window.clearTimeout(state.loopId);
    state.loopId = null;
  }

  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
  }

  if (state.audioContext) {
    state.audioContext.close();
  }

  state.stream = null;
  state.audioContext = null;
  state.analyser = null;
  state.listening = false;

  startCapture.disabled = false;
  stopCapture.disabled = true;
  liveStatus.textContent = 'Capture stopped.';
}

function saveSettings() {
  state.detectionDistance = Number(distanceRange.value);
  state.sensitivity = Number(sensitivityRange.value);
  state.autoSpeak = autoSpeak.checked;

  localStorage.setItem('xcomm_distance', String(state.detectionDistance));
  localStorage.setItem('xcomm_sensitivity', String(state.sensitivity));
  localStorage.setItem('xcomm_auto_speak', String(state.autoSpeak));

  updateReadout();
  liveStatus.textContent = `Saved: ${state.detectionDistance}m range, sensitivity ${state.sensitivity}.`;
}

function restoreSettings() {
  const savedDistance = Number(localStorage.getItem('xcomm_distance'));
  const savedSensitivity = Number(localStorage.getItem('xcomm_sensitivity'));
  const savedAutoSpeak = localStorage.getItem('xcomm_auto_speak');

  if (savedDistance >= 10 && savedDistance <= 40) {
    state.detectionDistance = savedDistance;
  }

  if (savedSensitivity >= 1 && savedSensitivity <= 3) {
    state.sensitivity = savedSensitivity;
  }

  if (savedAutoSpeak === 'true' || savedAutoSpeak === 'false') {
    state.autoSpeak = savedAutoSpeak === 'true';
  }

  distanceRange.value = String(state.detectionDistance);
  distanceValue.textContent = String(state.detectionDistance);
  sensitivityRange.value = String(state.sensitivity);
  sensitivityValue.textContent = String(state.sensitivity);
  autoSpeak.checked = state.autoSpeak;
}

function bindEvents() {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => goToWindow(button.dataset.window));
  });

  openQuickMenu.addEventListener('click', () => {
    quickMenu.hidden = !quickMenu.hidden;
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu-wrap')) {
      quickMenu.hidden = true;
    }
  });

  quickMenu.addEventListener('click', (event) => {
    const menuButton = event.target.closest('.menu-item[data-window]');
    if (!menuButton) return;
    goToWindow(menuButton.dataset.window);
    quickMenu.hidden = true;
  });

  openSettings.addEventListener('click', () => {
    quickMenu.hidden = true;
    settingsDialog.showModal();
  });

  closeSettings.addEventListener('click', () => {
    settingsDialog.close();
  });

  distanceRange.addEventListener('input', () => {
    distanceValue.textContent = distanceRange.value;
  });

  sensitivityRange.addEventListener('input', () => {
    sensitivityValue.textContent = sensitivityRange.value;
  });

    document.getElementById('settingsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    saveSettings();
    settingsDialog.close();
  });

  animalSelector.addEventListener('click', (event) => {
    const card = event.target.closest('[data-animal-id]');
    if (!card) return;

    const selected = ANIMALS.find((animal) => animal.id === card.dataset.animalId);
    if (!selected) return;

    state.selectedAnimal = selected;
    renderAnimalSelector();
    updateReadout();
  });

  startCapture.addEventListener('click', startLiveCapture);
  stopCapture.addEventListener('click', stopLiveCapture);
  speakNow.addEventListener('click', () => speakText(state.latestTranslation));
}

function init() {  
  restoreSettings();
  renderHomeGallery();
  renderAnimalSelector();
  updateReadout();
  bindEvents();
}

init();
