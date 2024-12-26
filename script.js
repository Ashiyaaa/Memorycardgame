document.addEventListener("DOMContentLoaded", () => {
  const cardGrid = document.querySelector(".card-grid");
  const movesDisplay = document.getElementById("move-count");
  const timerDisplay = document.getElementById("timer");
  const newGameBtn = document.getElementById("new-game");
  const congrats = document.querySelector(".congrats");
  const finalTime = document.getElementById("final-time");
  const finalMoves = document.getElementById("final-moves");

  const characters = [
    "🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐸", "🐷",
    "🦁", "🐨", "🦄", "🐥", "🐟", "🐙", "🦋", "🦉"
  ];

  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let moves = 0;
  let timer;
  let timeElapsed = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createCards() {
    const cardIcons = [...characters.slice(0, 8), ...characters.slice(0, 8)];
    shuffleArray(cardIcons);

    cardGrid.innerHTML = cardIcons.map(icon => `
      <div class="card" data-icon="${icon}">
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">${icon}</div>
        </div>
      </div>
    `).join("");

    cards = Array.from(document.querySelectorAll(".card"));
    cards.forEach(card => card.addEventListener("click", flipCard));
  }

  function flipCard() {
    if (this.classList.contains("flipped") || flippedCards.length === 2) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cards.length) {
        clearInterval(timer);
        finalTime.textContent = timerDisplay.textContent;
        finalMoves.textContent = moves;
        congrats.classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }

  function startTimer() {
    clearInterval(timer);
    timeElapsed = 0;
    timer = setInterval(() => {
      timeElapsed++;
      const minutes = Math.floor(timeElapsed / 60);
      const seconds = timeElapsed % 60;
      timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function resetGame() {
    moves = 0;
    matchedCards = 0;
    flippedCards = [];
    movesDisplay.textContent = moves;
    timerDisplay.textContent = "0:00";
    congrats.classList.add("hidden");
    startTimer();
    createCards();
  }

  newGameBtn.addEventListener("click", resetGame);

  resetGame();
});
