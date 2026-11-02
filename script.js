/* ==========================================================================
   CSE 391: Programming for the Internet - Assignment 2
   JavaScript Implementation (script.js)
   Contains:
     1. Question 1: Fortune Generator (Array of 12 fortunes, random selection on load,
        dynamic styling of font color, background color, border color, and font size/family)
     2. Question 2: Stopwatch (Counts in multiples of 3s, auto-stops at 30s,
        Start, Stop/Pause & Resume, and Reset controls)
     3. Question 3: To-Do List (Add, display, checkbox complete, delete, and
        persistent storage using localStorage)
   ========================================================================== */

/* ==========================================================================
   QUESTION 1: FORTUNE GENERATOR (25 Marks)
   ========================================================================== */

// Requirement 1.1: Array with at least 10 different fortune messages (12 included)
const fortuneMessages = [
  "True wisdom comes not from knowledge, but from understanding.",
  "Every bug you fix today builds the intuition you need tomorrow.",
  "Clean, readable code is a gift you write for your future self.",
  "Patience and persistence turn complex algorithms into simple steps.",
  "A small step forward each day leads to remarkable mastery over time.",
  "Curiosity is the spark behind every breakthrough invention.",
  "Success in engineering comes from testing assumptions, not guessing.",
  "Your ability to explain your work clearly is your greatest superpower.",
  "Great software is built one well-tested function at a time.",
  "Opportunities multiply when preparation meets consistent effort.",
  "Simplicity is the ultimate sophistication in problem solving.",
  "Discipline in fundamentals makes advanced challenges effortless."
];

// Four high-contrast theme configurations for the 4 buttons beside the fortune box.
// Each object defines: font color, background color, border color, font size, and font family.
const fortuneThemes = [
  {
    name: "Emerald Meadow",
    fontColor: "#14361d",
    bgColor: "#e6f4ea",
    borderColor: "#2e7d32",
    fontSize: "1.18rem",
    fontFamily: "Georgia, 'Times New Roman', serif"
  },
  {
    name: "Amber Parchment",
    fontColor: "#5c2d0c",
    bgColor: "#fff2cc",
    borderColor: "#d97706",
    fontSize: "1.12rem",
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', sans-serif"
  },
  {
    name: "Ocean Slate",
    fontColor: "#0c2e4e",
    bgColor: "#e0f2fe",
    borderColor: "#0284c7",
    fontSize: "1.22rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif"
  },
  {
    name: "Sunset Terracotta",
    fontColor: "#4a1506",
    bgColor: "#ffedd5",
    borderColor: "#ea580c",
    fontSize: "1.15rem",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif"
  }
];

// Individual property cycles (used when "Individual Property Mode" is selected)
const fontColorsCycle = ["#783f04", "#14361d", "#0c2e4e", "#4a1506", "#3b0764"];
const bgColorsCycle = ["#ffe599", "#e6f4ea", "#e0f2fe", "#ffedd5", "#f3e8ff"];
const borderColorsCycle = ["#6aa84f", "#2e7d32", "#0284c7", "#ea580c", "#7e22ce"];
const fontStylesCycle = [
  { size: "1.15rem", family: "Georgia, serif" },
  { size: "1.22rem", family: "Verdana, sans-serif" },
  { size: "1.10rem", family: "'Trebuchet MS', sans-serif" },
  { size: "1.20rem", family: "'Courier New', monospace" }
];

let propIndices = { font: 0, bg: 0, border: 0, style: 0 };
let lastFortuneIndex = -1;

// DOM Elements for Question 1
const fortuneBox = document.getElementById("fortune-box");
const fortuneText = document.getElementById("fortune-text");
const fortuneStyleStatus = document.getElementById("fortune-style-status");
const buttonModeSelect = document.getElementById("button-mode-select");
const newFortuneBtn = document.getElementById("new-fortune-btn");
const swatchButtons = [
  document.getElementById("swatch-btn-0"),
  document.getElementById("swatch-btn-1"),
  document.getElementById("swatch-btn-2"),
  document.getElementById("swatch-btn-3")
];

/**
 * Selects a random fortune from the fortuneMessages array and displays it.
 * Prevents picking the exact same index twice in a row when triggered repeatedly.
 */
function displayRandomFortune() {
  let randomIndex = Math.floor(Math.random() * fortuneMessages.length);
  if (fortuneMessages.length > 1 && randomIndex === lastFortuneIndex) {
    randomIndex = (randomIndex + 1) % fortuneMessages.length;
  }
  lastFortuneIndex = randomIndex;
  fortuneText.textContent = fortuneMessages[randomIndex];
}

/**
 * Applies appearance changes to the fortune box when one of the 4 buttons is clicked.
 * Supports both:
 *  - "theme" mode (default): each button changes font color, bg color, border color, and font size/family together.
 *  - "individual" mode: Button 1 = Font Color, Button 2 = Bg Color, Button 3 = Border Color, Button 4 = Font Size & Family.
 * @param {number} buttonIndex - Index (0 to 3) of the clicked button
 */
function handleFortuneButtonClick(buttonIndex) {
  const mode = buttonModeSelect ? buttonModeSelect.value : "theme";

  if (mode === "theme") {
    const selectedTheme = fortuneThemes[buttonIndex];
    fortuneBox.style.color = selectedTheme.fontColor;
    fortuneBox.style.backgroundColor = selectedTheme.bgColor;
    fortuneBox.style.borderColor = selectedTheme.borderColor;
    fortuneBox.style.fontSize = selectedTheme.fontSize;
    fortuneBox.style.fontFamily = selectedTheme.fontFamily;

    if (fortuneStyleStatus) {
      fortuneStyleStatus.textContent =
        "Active Style: " + selectedTheme.name + " (" + selectedTheme.fontSize + ")";
    }
  } else {
    // Individual Property Mode: each of the 4 buttons modifies one specific requirement bullet
    if (buttonIndex === 0) {
      propIndices.font = (propIndices.font + 1) % fontColorsCycle.length;
      fortuneBox.style.color = fontColorsCycle[propIndices.font];
      fortuneStyleStatus.textContent = "Updated: Font Color (" + fontColorsCycle[propIndices.font] + ")";
    } else if (buttonIndex === 1) {
      propIndices.bg = (propIndices.bg + 1) % bgColorsCycle.length;
      fortuneBox.style.backgroundColor = bgColorsCycle[propIndices.bg];
      fortuneStyleStatus.textContent = "Updated: Background Color (" + bgColorsCycle[propIndices.bg] + ")";
    } else if (buttonIndex === 2) {
      propIndices.border = (propIndices.border + 1) % borderColorsCycle.length;
      fortuneBox.style.borderColor = borderColorsCycle[propIndices.border];
      fortuneStyleStatus.textContent = "Updated: Border Color (" + borderColorsCycle[propIndices.border] + ")";
    } else if (buttonIndex === 3) {
      propIndices.style = (propIndices.style + 1) % fontStylesCycle.length;
      const nextFont = fontStylesCycle[propIndices.style];
      fortuneBox.style.fontSize = nextFont.size;
      fortuneBox.style.fontFamily = nextFont.family;
      fortuneStyleStatus.textContent = "Updated: Font Size & Family (" + nextFont.size + ")";
    }
  }
}

// Attach click listeners to each of the 4 buttons beside the fortune box
swatchButtons.forEach(function (btn, index) {
  if (btn) {
    btn.addEventListener("click", function () {
      handleFortuneButtonClick(index);
    });
  }
});

if (newFortuneBtn) {
  newFortuneBtn.addEventListener("click", displayRandomFortune);
}

/* ==========================================================================
   QUESTION 2: STOPWATCH (35 Marks)
   ========================================================================== */

// Configuration constants for easy modification during faculty viva
const STEP_SECONDS = 3;         // Increments in multiples of 3 seconds (3, 6, 9...)
const MAX_SECONDS = 30;         // Automatically stops at 30 seconds
const TICK_INTERVAL_MS = 3000;  // 3000 ms = 3 real seconds per step

let currentSeconds = 0;
let stopwatchIntervalId = null; // Stores the active setInterval ID (null when paused/stopped)

// DOM Elements for Question 2
const stopwatchValueEl = document.getElementById("stopwatch-value");
const stopwatchStatusEl = document.getElementById("stopwatch-status");
const stopwatchProgressEl = document.getElementById("stopwatch-progress");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

/**
 * Updates the stopwatch DOM display, progress bar, and button disabled states.
 * @param {string} statusMessage - Human-readable status text
 */
function updateStopwatchUI(statusMessage) {
  stopwatchValueEl.textContent = currentSeconds;
  const percentage = Math.min(100, (currentSeconds / MAX_SECONDS) * 100);
  stopwatchProgressEl.style.width = percentage + "%";

  if (currentSeconds >= MAX_SECONDS) {
    stopwatchProgressEl.style.backgroundColor = "#16a34a";
  } else {
    stopwatchProgressEl.style.backgroundColor = "#2563eb";
  }

  if (statusMessage) {
    stopwatchStatusEl.textContent = statusMessage;
  }

  // Disable Start button if already running or if already at 30 seconds
  const isRunning = stopwatchIntervalId !== null;
  startBtn.disabled = isRunning || currentSeconds >= MAX_SECONDS;
  stopBtn.disabled = !isRunning;
}

/**
 * Starts or resumes the stopwatch timer.
 * Guards against multiple stacked intervals and prevents counting past 30 seconds.
 */
function startStopwatch() {
  // Guard 1: Do not start a second interval if one is already running
  if (stopwatchIntervalId !== null) {
    return;
  }

  // Guard 2: Do not start if already at the 30-second limit
  if (currentSeconds >= MAX_SECONDS) {
    updateStopwatchUI("Reached 30s limit. Click Reset to start again.");
    return;
  }

  const startMsg = currentSeconds === 0
    ? "Running... (counting in steps of 3 seconds)"
    : "Resumed from " + currentSeconds + "s... (counting in steps of 3 seconds)";

  stopwatchIntervalId = setInterval(function () {
    currentSeconds += STEP_SECONDS;

    // Requirement 1: Automatically stop when reaching 30 seconds
    if (currentSeconds >= MAX_SECONDS) {
      currentSeconds = MAX_SECONDS;
      clearInterval(stopwatchIntervalId);
      stopwatchIntervalId = null;
      updateStopwatchUI("Automatically stopped at 30 seconds (maximum reached).");
    } else {
      updateStopwatchUI("Running... Current time: " + currentSeconds + " seconds.");
    }
  }, TICK_INTERVAL_MS);

  updateStopwatchUI(startMsg);
}

/**
 * Pauses the stopwatch at the current recorded time so it can resume later.
 */
function stopStopwatch() {
  if (stopwatchIntervalId !== null) {
    clearInterval(stopwatchIntervalId);
    stopwatchIntervalId = null;
    updateStopwatchUI("Paused at " + currentSeconds + " seconds. Click Start to resume.");
  }
}

/**
 * Resets the stopwatch back to 0 seconds and stops any active interval.
 */
function resetStopwatch() {
  if (stopwatchIntervalId !== null) {
    clearInterval(stopwatchIntervalId);
    stopwatchIntervalId = null;
  }
  currentSeconds = 0;
  updateStopwatchUI("Ready (0 seconds). Increments by 3s up to 30s.");
}

// Attach event listeners for Question 2 buttons
startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);

/* ==========================================================================
   QUESTION 3: TO-DO LIST WITH LOCALSTORAGE PERSISTENCE (40 Marks)
   ========================================================================== */

const STORAGE_KEY = "cse391_assignment2_todos";
let tasks = [];

// DOM Elements for Question 3
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoValidationMsg = document.getElementById("todo-validation-msg");
const todoListEl = document.getElementById("todo-list");
const todoTotalCountEl = document.getElementById("todo-total-count");
const todoCompletedCountEl = document.getElementById("todo-completed-count");

/**
 * Safely loads saved tasks from browser localStorage on page load.
 * Wrapped in try/catch to handle malformed JSON or restricted storage environments.
 */
function loadTasksFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        tasks = parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read tasks from localStorage:", error);
    tasks = [];
  }
}

/**
 * Safely saves the current tasks array into browser localStorage.
 */
function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Could not save tasks to localStorage:", error);
  }
}

/**
 * Renders the tasks array into the DOM list and updates summary counters.
 * Uses document.createElement and textContent to prevent XSS vulnerabilities.
 */
function renderTasks() {
  // Clear existing list items
  todoListEl.innerHTML = "";

  // Update total and completed task counters
  const totalCount = tasks.length;
  const completedCount = tasks.filter(function (t) { return t.completed; }).length;
  todoTotalCountEl.textContent = "Total Tasks: " + totalCount;
  todoCompletedCountEl.textContent = "Completed: " + completedCount + " / " + totalCount;

  if (tasks.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent = "No tasks yet. Type a task above and click Add Task!";
    todoListEl.appendChild(emptyLi);
    return;
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "todo-item" + (task.completed ? " completed" : "");

    const leftDiv = document.createElement("div");
    leftDiv.className = "todo-left";

    // Requirement 3.2: Checkbox to mark task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = Boolean(task.completed);
    checkbox.setAttribute("aria-label", "Mark task '" + task.text + "' as completed");
    checkbox.addEventListener("change", function () {
      toggleTaskCompleted(task.id);
    });

    // Task description text
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = task.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // Requirement 3.1: Delete button to remove task from the list
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    todoListEl.appendChild(li);
  });
}

/**
 * Adds a new task from the input field into the tasks array and persists to localStorage.
 */
function addTask() {
  const trimmedText = todoInput.value.trim();

  if (trimmedText === "") {
    todoValidationMsg.textContent = "Please enter a non-empty task description.";
    todoInput.focus();
    return;
  }

  todoValidationMsg.textContent = "";

  const newTask = {
    id: Date.now() + "-" + Math.floor(Math.random() * 10000),
    text: trimmedText,
    completed: false
  };

  tasks.push(newTask);
  saveTasksToStorage();
  renderTasks();

  todoInput.value = "";
  todoInput.focus();
}

/**
 * Toggles the completed boolean flag for a specific task ID and updates localStorage.
 * @param {string} taskId - Unique identifier of the task
 */
function toggleTaskCompleted(taskId) {
  const targetTask = tasks.find(function (t) {
    return t.id === taskId;
  });

  if (targetTask) {
    targetTask.completed = !targetTask.completed;
    saveTasksToStorage();
    renderTasks();
  }
}

/**
 * Deletes a task by filtering it out of the tasks array and updating localStorage.
 * @param {string} taskId - Unique identifier of the task to remove
 */
function deleteTask(taskId) {
  tasks = tasks.filter(function (t) {
    return t.id !== taskId;
  });
  saveTasksToStorage();
  renderTasks();
}

// Attach event listeners for Question 3
addTodoBtn.addEventListener("click", addTask);
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

/* ==========================================================================
   INITIALIZATION ON PAGE LOAD
   ========================================================================== */
window.addEventListener("DOMContentLoaded", function () {
  // 1. Display a random fortune immediately when the page loads
  displayRandomFortune();

  // 2. Initialize stopwatch display to 0 seconds
  updateStopwatchUI("Ready (0 seconds). Increments by 3s up to 30s.");

  // 3. Load persisted tasks from localStorage and render them
  loadTasksFromStorage();
  renderTasks();
});
