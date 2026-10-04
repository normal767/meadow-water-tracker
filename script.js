const cups = document.querySelectorAll('.cup-small');
const water = document.getElementById('water');
const remaining = document.getElementById('remaining');
const status = document.getElementById('status');
const cheer = document.getElementById('cheer');

const cupVolume = 250;
const goalVolume = cups.length * cupVolume;

// Key used to store the daily record in this browser.
const storageKey = 'grassland-water-record';

const messages = [
  '👏 Great job!',
  '🎉 You’re doing amazing!',
  '👏 Well done! Keep it up!',
  '💧 One sip closer to your goal!',
  '🌟 You’re a hydration star!',
  '🙌 Cheers to another glass!',
  '🦋 Keep going! You’ve got this!'
];

let cheerTimer;
let lastMessageIndex = -1;
let recordDate = getToday();
let cupStates = loadRecord();

// Return the current date using the device's local time.
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Restore today's record if its structure is valid.
function loadRecord() {
  const emptyStates = Array(cups.length).fill(false);

  try {
    const savedText = localStorage.getItem(storageKey);

    if (!savedText) {
      return emptyStates;
    }

    const savedRecord = JSON.parse(savedText);

    if (
      savedRecord &&
      savedRecord.date === recordDate &&
      Array.isArray(savedRecord.cupStates) &&
      savedRecord.cupStates.length === cups.length &&
      savedRecord.cupStates.every(value => typeof value === 'boolean')
    ) {
      return savedRecord.cupStates;
    }
  } catch (error) {
    console.warn('Unable to load the water record:', error);
  }

  return emptyStates;
}

// Store the date and each cup's selection state.
function saveRecord() {
  try {
    const record = {
      date: recordDate,
      cupStates: cupStates
    };

    localStorage.setItem(storageKey, JSON.stringify(record));
  } catch (error) {
    console.warn('Unable to save the water record:', error);

    status.textContent += ' · Unable to save in this browser';
  }
}

// Reset the record when the local date changes.
function checkNewDay() {
  const today = getToday();

  if (today === recordDate) {
    return;
  }

  recordDate = today;
  cupStates = Array(cups.length).fill(false);

  clearTimeout(cheerTimer);
  cheer.classList.remove('show');

  updateDisplay();
  saveRecord();
}

// Toggle only the clicked cup.
cups.forEach((cup, index) => {
  cup.addEventListener('click', () => {
    checkNewDay();

    cupStates[index] = !cupStates[index];

    updateDisplay();
    saveRecord();

    // Celebrate new entries, but not cancellations.
    if (cupStates[index]) {
      showCheer();
    }
  });
});

// Update cup colors, remaining water, and progress.
function updateDisplay() {
  const drunkCups = cupStates.filter(isDrunk => isDrunk).length;

  const drunkVolume = drunkCups * cupVolume;
  const remainingVolume = goalVolume - drunkVolume;
  const progress = drunkVolume / goalVolume * 100;

  cups.forEach((cup, index) => {
    const isDrunk = cupStates[index];

    cup.classList.toggle('full', isDrunk);
    cup.setAttribute('aria-pressed', String(isDrunk));
  });

  // A full daily supply occupies 75% of the jug, leaving headroom.
  water.style.height = `${remainingVolume / goalVolume * 75}%`;
  remaining.textContent = `${remainingVolume / 1000} L`;

  if (drunkCups === cups.length) {
    status.textContent = `Drank ${goalVolume} ml · Daily goal complete!`;
  } else {
    status.textContent = `Drank ${drunkVolume} ml · ${progress}% complete`;
  }
}

// Display an English encouragement message for 2.2 seconds.
function showCheer() {
  clearTimeout(cheerTimer);

  const allDone = cupStates.every(isDrunk => isDrunk);

  if (allDone) {
    cheer.textContent = '🏆👏 Goal complete! You did it!';
  } else {
    let messageIndex;

    // Avoid showing the same random message twice in a row.
    do {
      messageIndex = Math.floor(Math.random() * messages.length);
    } while (messageIndex === lastMessageIndex);

    lastMessageIndex = messageIndex;
    cheer.textContent = messages[messageIndex];
  }

  cheer.classList.add('show');

  cheerTimer = setTimeout(() => {
    cheer.classList.remove('show');
  }, 2200);
}

// Check the date when the user returns to this tab.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkNewDay();
  }
});

// Check once per minute while the page remains open.
setInterval(checkNewDay, 60000);

// Render the restored record on page load.
updateDisplay();