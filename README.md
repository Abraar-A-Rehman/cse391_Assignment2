# CSE 391: Programming for the Internet — Assignment 2 (JavaScript Programming)

## Project Structure
- `index.html`: Semantic HTML5 markup containing Question 1 (Fortune Generator, positioned in a centered box just above the page footer), Question 2 (Stopwatch), and Question 3 (To-Do List).
- `style.css`: Modular CSS3 stylesheet using CSS Custom Properties, Flexbox, and CSS Grid with WCAG-compliant contrast ratios.
- `script.js`: Well-commented vanilla ES6 JavaScript implementing DOM manipulation, event handling, timing intervals (`setInterval` / `clearInterval`), and `localStorage` persistence.

## Features Implemented
1. **Question 1: Fortune Generator (25 Marks)**
   - Stores 12 distinct fortune messages in a JavaScript array (`fortuneMessages`).
   - Randomly selects and displays a fortune on page load (`DOMContentLoaded`) inside a centered box positioned right above the page footer.
   - Features 4 buttons beside the fortune box that dynamically update the font color, background color, border color, and font size/family with high contrast. Includes a mode selector to demonstrate both cohesive 4-property theme swatches and individual per-button property cycling during viva evaluation.
2. **Question 2: Stopwatch (35 Marks)**
   - Counts time strictly in multiples of 3 seconds (`0, 3, 6, 9, ..., 30`).
   - Automatically stops upon reaching `30` seconds via `clearInterval()`.
   - Provides **Start**, **Stop**, and **Reset** buttons. Stopping before 30 seconds preserves `currentSeconds` so clicking **Start** resumes from the last recorded time without stacking intervals.
3. **Question 3: To-Do List (40 Marks)**
   - Allows adding tasks via the input field (`Add Task` button or `Enter` key) with empty-input validation.
   - Displays each task in an unordered list (`<ul>`) with a completion checkbox and a `Delete` button.
   - Saves and restores both task descriptions and completion states using `localStorage` (`JSON.stringify` / `JSON.parse`).

## External References & Citations
- Mozilla Developer Network (MDN) — `Window.localStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Mozilla Developer Network (MDN) — `setInterval()` & `clearInterval()`: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
- Mozilla Developer Network (MDN) — `Math.random()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- W3C Markup Validation Service: https://validator.w3.org/
- W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/
