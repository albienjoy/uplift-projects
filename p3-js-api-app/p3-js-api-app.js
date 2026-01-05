const apiKey = "sTnnOYfqToCeyfh5tJ86FYy9Pj17gjJ0TgKuJINp";
const serverURL = "https://api.cohere.com/v2/chat";
const model = "command-a-03-2025";
let isFetchingWords = false;

const fallbackWords = {
  easy: [
    "apple",
    "chair",
    "bread",
    "plant",
    "house",
    "mouse",
    "water",
    "smile",
    "table",
    "light",
    "green",
    "paper",
    "train",
    "clock",
    "stone",
    "brush",
    "river",
    "sleep",
    "drink",
    "laugh",
    "cloud",
    "grass",
    "heart",
    "shirt",
    "floor",
    "sweet",
    "round",
    "sound",
    "happy",
    "quiet",
    "beach",
    "candy",
    "dance",
    "fruit",
    "grain",
    "knife",
    "lemon",
    "money",
    "night",
    "piano",
    "smoke",
    "spoon",
    "sugar",
    "toast",
    "truck",
    "watch",
    "wheat",
    "world",
    "write",
    "young",
    "wined",
    "throne",
    "drone",
  ],
  medium: [
    "window",
    "pencil",
    "forest",
    "battery",
    "signal",
    "picture",
    "teacher",
    "journey",
    "balance",
    "machine",
    "plastic",
    "library",
    "weather",
    "capture",
    "diamond",
    "freedom",
    "harvest",
    "improve",
    "message",
    "pattern",
    "problem",
    "process",
    "regular",
    "service",
    "support",
    "traffic",
    "welcome",
    "benefit",
    "channel",
    "control",
    "digital",
    "element",
    "factory",
    "feature",
    "gravity",
    "history",
    "journal",
    "kitchen",
    "natural",
    "outline",
    "protect",
    "quarter",
    "science",
    "storage",
    "subject",
    "theory",
    "typical",
    "utility",
    "version",
    "shelter",
  ],
  hard: [
    "algorithm",
    "paradigm",
    "framework",
    "interface",
    "synthesis",
    "prototype",
    "bandwidth",
    "metaphor",
    "architecture",
    "cognitive",
    "derivative",
    "equation",
    "hierarchy",
    "hypothesis",
    "inference",
    "iteration",
    "magnitude",
    "nebulous",
    "paradox",
    "quantify",
    "resonance",
    "semantics",
    "threshold",
    "trajectory",
    "asymmetry",
    "calibrate",
    "constraint",
    "dichotomy",
    "empirical",
    "granular",
    "heuristic",
    "idempotent",
    "juxtapose",
    "kinematic",
    "logarithm",
    "monolithic",
    "nonlinear",
    "orthogonal",
    "polymorph",
    "recursive",
    "refactor",
    "subsystem",
    "telemetry",
    "ubiquity",
    "vectorize",
    "workload",
    "xenolith",
    "yield-rate",
    "zero-day",
  ],
};

const difficultyPrompts = {
  easy: `
Kindergarten to grade 3 vocabulary.
Words must have 4 to 5 letters only.
Simple, concrete nouns or verbs.
No plurals.
No proper nouns.
  `,
  medium: `
Grade 3 to grade 6 vocabulary.
Words must have 4 to 7 letters.
Common but varied words.
No slang.
  `,
  hard: `
High school to college level vocabulary.
Words must have 4 to 9 letters.
May include hyphenated words.
May include jargon or advanced terms.
Avoid extremely common words.
  `,
};
const logoIcon = document.getElementById("logo");
const usernameIcon = document.getElementById("username-icon");
const wordBufferSize = 35;
const wordBuffer = [];
const usedWords = new Set();
const difficultySettings = {
  easy: {
    time: 60,
    multiplier: 1,
  },
  medium: {
    time: 45,
    multiplier: 2,
  },
  hard: {
    time: 30,
    multiplier: 3,
  },
};

const usernameScreen = document.getElementById("username-section");
const difficultyScreen = document.getElementById("difficulty-section");
const gameScreen = document.getElementById("game-section");

const usernameInput = document.getElementById("username-input");
const usernameBtn = document.getElementById("username-btn");
const usernameHeaderDisplay = document.getElementById(
  "username-header-display"
);
const usernameError = document.getElementById("username-error");

const savedUsername = localStorage.getItem("username");
const savedDifficulty = localStorage.getItem("difficulty");

const backgroundAudio = document.getElementById("background-music");
const countdownAudio = document.getElementById("countdown-music");

const timeDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const wordDisplay = document.getElementById("word");
const gameoverOverlay = document.getElementById("gameover-overlay");

const wordInput = document.getElementById("word-input");

const pauseOverlay = document.getElementById("pause-overlay");
const restartBtns = document.querySelectorAll(".restart-btn");
const replayBtn = document.getElementById("replay-btn");
const leaderboardBtn = document.getElementById("leaderboard-btn");
let timerId = null;

const gameState = {
  username: localStorage.getItem("username"),
  difficulty: localStorage.getItem("difficulty"),
  timeLeft: 0,
  score: 0,
  currentWord: "",
  isPlaying: false,
  isPaused: false,
};

const leaderboardScreen = document.getElementById("leaderboard-screen");
const leaderboardList = document.getElementById("leaderboard-list");
const userScore = document.getElementById("user-score");

backgroundAudio.autoplay = false;
backgroundAudio.muted = true;
countdownAudio.autoplay = false;
countdownAudio.muted = true;

/* Username screen */
usernameScreen.classList.remove("hidden");

logoIcon.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username === "") {
    usernameError.classList.remove("hidden");
  } else {
    usernameScreen.classList.add("hidden");
    difficultyScreen.classList.remove("hidden");
    leaderboardScreen.classList.add("hidden");
    gameoverOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    usernameIcon.classList.remove("hidden");
  }
});

usernameBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username === "") {
    usernameError.classList.remove("hidden");
    usernameScreen.classList.remove("hidden");
  } else {
    localStorage.setItem("username", username);
    usernameScreen.classList.add("hidden");
    usernameHeaderDisplay.append(username);
    usernameIcon.classList.remove("hidden");
    difficultyScreen.classList.remove("hidden");
  }
});

difficultyScreen.addEventListener("click", (event) => {
  if (!event.target.dataset.level) return;

  const difficulty = event.target.dataset.level;

  localStorage.setItem("difficulty", difficulty);

  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  leaderboardScreen.classList.add("hidden");
  startGame();
});

async function startGame() {
  const difficulty = localStorage.getItem("difficulty");
  const { time, multiplier } = difficultySettings[difficulty];

  gameState.timeLeft = time;
  gameState.multiplier = multiplier;

  setupGame();
  await fetchWordList(difficulty);

  gameState.currentWord = await getNextWord(difficulty);

  showNewWord();
  startTimer();

  backgroundAudio.autoplay = true;
  backgroundAudio.muted = false;
  backgroundAudio.load();
  backgroundAudio.play();
  backgroundAudio.loop = true;

  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.add("hidden");
  leaderboardScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameoverOverlay.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
}

function setupGame() {
  const difficulty = localStorage.getItem("difficulty");
  const settings = difficultySettings[difficulty];

  gameState.timeLeft = settings.time;
  gameState.score = 0;
  gameState.isPlaying = true;

  updateUI();
}

async function fetchWordList(difficulty) {
  if (isFetchingWords) return;

  isFetchingWords = true;

  try {
    const previousWords = Array.from(usedWords);
    const payload = {
      model: model,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are generating words for a typing game.
                Rules:
                - Generate ${wordBufferSize} UNIQUE English words
                - Return only a comma-separated list
                - No numbering
                - No explanations
                - No duplicates
                - Do not repeat any previously used words

                Difficulty rules:
                ${difficultyPrompts[difficulty]}

                Previously used words:
                ${previousWords || "none"}`.trim(),
            },
          ],
        },
        {
          role: "user",
          content: {
            type: "text",
            text: "Generate the words now",
          },
        },
      ],
    };

    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    const rawText = result.message.content[0].text;

    const newWords = rawText
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w && !usedWords.has(w));

    newWords.forEach((w) => usedWords.add(w));
    wordBuffer.push(...newWords);
  } catch (error) {
    getFallbackWords(difficulty, wordBufferSize);
    return null;
  } finally {
    isFetchingWords = false;
  }
}

function getFallbackWords(difficulty, count) {
  const pool = fallbackWords[difficulty] || [];
  const available = pool.filter((w) => !usedWords.has(w));

  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  const selected = available.slice(0, count);

  selected.forEach((w) => usedWords.add(w));
  wordBuffer.push(...selected);
}

async function getNextWord(difficulty) {
  if (wordBuffer.length < 3) {
    await fetchWordList(difficulty);
  }
  return wordBuffer.shift() || null;
}

async function showNewWord() {
  const word = await getNextWord();
  gameState.currentWord = word;
  wordDisplay.textContent = word;
  wordInput.value = "";
}

wordInput.addEventListener("input", () => {
  if (!gameState.isPlaying) return;
  if (wordInput.value === gameState.currentWord) {
    handleCorrectword();
  }
});

function handleCorrectword() {
  const difficulty = localStorage.getItem("difficulty");
  const multiplier = difficultySettings[difficulty].multiplier;

  gameState.score += 1 * multiplier;
  scoreDisplay.textContent = gameState.score;

  showNewWord();
}

function startTimer() {
  timerId = setInterval(() => {
    if (gameState.isPaused) return;
    updateUI();

    if (gameState.timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      endGame();
      return;
    }

    if (gameState.timeLeft === 3) {
      countdownAudio.muted = false;
      countdownAudio.autoplay = true;
      countdownAudio.load();
      countdownAudio.play();
    }

    gameState.timeLeft--;
    updateUI();
  }, 1000);
}

function updateUI() {
  timeDisplay.textContent = gameState.timeLeft;
  scoreDisplay.textContent = gameState.score;
}

function pauseGame() {
  wordInput.disabled = true;
  pauseOverlay.classList.remove("hidden");
}

function resumeGame() {
  wordInput.disabled = false;
  wordInput.focus();
  pauseOverlay.classList.add("hidden");
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    gameState.isPaused = !gameState.isPaused;

    if (gameState.isPaused) {
      backgroundAudio.pause();
      countdownAudio.pause();
      pauseOverlay.classList.remove("hidden");
    } else {
      backgroundAudio.play();
      countdownAudio.play();
      pauseOverlay.classList.add("hidden");
    }
  }
});

function endGame() {
  gameState.isPlaying = false;
  wordInput.disabled = true;

  userScore.textContent = "";
  gameoverOverlay.classList.remove("hidden");
  const score = gameState.score;
  userScore.textContent = `Your score: ${gameState.score}`;
  backgroundAudio.autoplay = false;
  backgroundAudio.muted = true;
  saveScore();
}

function saveScore() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const username = localStorage.getItem("username");

  leaderboard.push({
    username: username,
    score: gameState.score,
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function getTopScore() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  return leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
}

function renderLeaderboard(leaderboardList) {
  const topScores = getTopScore();
  leaderboardList.innerHTML = "";

  topScores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="rank">${index + 1}</span>
    <span class="username">${entry.username}</span>
    <span class="score">${entry.score}</span>`;

    leaderboardList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLeaderboard(leaderboardList);
});

restartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    clearInterval(timerId);
    startGame();
    wordInput.disabled = false;
  });
});

replayBtn.addEventListener("click", () => {
  difficultyScreen.classList.remove("hidden");
  leaderboardScreen.classList.add("hidden");
  usernameScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  gameoverOverlay.classList.add("hidden");
  clearInterval(timerId);
  wordInput.disabled = false;
});

leaderboardBtn.addEventListener("click", () => {
  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.add("hidden");
  leaderboardScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  renderLeaderboard();
});

document.addEventListener("keydown", () => {
  if (event.code === "ArrowDown") {
    backgroundAudio.muted = !backgroundAudio.muted;
  }
});
