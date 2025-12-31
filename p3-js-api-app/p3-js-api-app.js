const apiKey = "OmclmpULcP9CCYjDrI8Dn1r2RDUFYp1m2FTcEwIa";

const serverURL = "https://api.cohere.com/v2/chat";
const model = "command-a-03-2025";

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

const wordBufferSize = 20;
const wordBuffer = [];
const usedWords = new Set();
const difficultySettings = {
  easy: {
    time: 60,
    multiplier: 1,
  },
  medium: {
    time: 60,
    multiplier: 2,
  },
  hard: {
    time: 60,
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
const savedUsername = localStorage.getItem("username");
const savedDifficulty = localStorage.getItem("difficulty");

const timeDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const wordDisplay = document.getElementById("word");
const gameoverOverlay = document.getElementById("gameover-overlay");

const wordInput = document.getElementById("word-input");
const pauseBtn = document.getElementById("pause-btn");
const pauseBtnText = document.querySelector(".front-btn");
const pauseOverlay = document.getElementById("pause-overlay");
const restartBtn = document.getElementById("restart-btn");
const replayBtn = document.getElementById("replay-btn");
const leaderboardBtn = document.getElementById("leaderboard-btn");
let timerId = null;

/* the brain of my game */
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

/* Username screen */
usernameScreen.classList.remove("hidden");

/*DELETE WHEN FINALIZING --- HIDE ALL OTHER SECTIONS */
difficultyScreen.classList.remove("hidden");
gameScreen.classList.remove("hidden");
leaderboardScreen.classList.remove("hidden");
// gameoverOverlay.classList.remove("hidden")
pauseOverlay.classList.add("hidden");

usernameBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username === "") {
    alert("Please enter a username");
    usernameScreen.classList.remove("hidden");
  }

  localStorage.setItem("username", username);

  usernameHeaderDisplay.append(username);
  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.remove("hidden");
  leaderboardScreen.classList.add("hidden");
  gameoverOverlay.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
});

difficultyScreen.addEventListener("click", (event) => {
  /* putting the code in the diffulcty screen helps with event delegation */
  console.log("Clicked difficulty:", event.target.dataset.level);
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

  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.add("hidden");
  leaderboardScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  gameoverOverlay.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
}

function setupGame() {
  const settings = difficultySettings[gameState.difficulty];
  const difficulty = localStorage.getItem("difficulty");
  console.log("Difficulty:", difficulty);
  console.log("Settings:", settings);

  gameState.timeLeft = settings.time;
  gameState.score = 0;
  gameState.isPlaying = true;

  updateUI();
}

async function fetchWordList(difficulty) {
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
    console.log(wordBuffer);
    console.log(usedWords);
  } catch (error) {
    console.log("Error fetching word list!");
    return null;
  }
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
  const multiplier = difficultySettings[gameState.difficulty].multiplier;
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
      pauseOverlay.classList.remove("hidden");
    } else {
      pauseOverlay.classList.add("hidden");
    }
  }
});

function endGame() {
  gameState.isPlaying = false;
  wordInput.disabled = true;

  gameoverOverlay.classList.remove("hidden");
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
    // const li = document.createElement("li");
    // li.textContent = `${index + 1} ${entry.username} - ${entry.score}`;
    // leaderboardList.appendChild(li);    
  });

  gameScreen.classList.add("hidden");
  leaderboardScreen.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderLeaderboard(leaderboardList);
})

restartBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startGame();
  wordInput.disabled = false;
});

replayBtn.addEventListener("click", () => {
  difficultyScreen.classList.remove("hidden");
  leaderboardScreen.classList.add("hidden");
  usernameScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  clearInterval(timerId);
  startGame();
});

leaderboardBtn.addEventListener("click", () => {
  usernameScreen.classList.add("hidden");
  difficultyScreen.classList.add("hidden");
  leaderboardScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  renderLeaderboard();
});
