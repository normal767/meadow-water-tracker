# Meadow Water Tracker 🌿💧

A meadow-themed water tracker built with HTML, CSS, and vanilla JavaScript.

Log your daily water intake in a colorful outdoor scene with a wooden
table, a water jug, flowers, clouds, and animated butterflies.

## Features

- Daily goal of 2 liters, divided into eight 250 ml glasses.
- Select glasses in any order.
- Click a selected glass again to undo that entry.
- Selected glasses turn blue.
- The jug's water level decreases as you log drinks.
- English encouragement messages appear after each new entry.
- Daily records are saved locally in your browser.
- Records reset when the device's local date changes.
- Animations respect the browser's reduced-motion preference.

## How to Run

1. Download or clone this repository.
2. Open `index.html` in your browser.

No installation or build step is required.

## How to Use

Click any glass to record 250 ml of water.
Click it again to cancel that entry.

The page displays your total intake, completion percentage,
and remaining water.

Records are stored using `localStorage`. They are specific to your
browser and site address and do not sync between devices.
Browser settings may restrict storage when opening local files.

## Project Files

- `index.html` — Page structure and decorative elements.
- `style.css` — Layout, colors, and animations.
- `script.js` — Cup interactions, progress, encouragement, and storage.

## Learning Goals

This practice project explores:

- HTML structure and accessible buttons.
- CSS positioning, Grid, and keyframe animations.
- JavaScript events and independent selection states.
- DOM updates and browser storage.

## Credits

Inspired by the Drink Water project from
[Brad Traversy's 50 Projects in 50 Days](https://github.com/bradtraversy/50projects50days).

This version changes the visual design, allows independent glass
selection, and adds encouragement messages and daily local storage.

Built as a learning project with AI assistance.
Original project license: MIT. See `LICENSE` for the original license notice.