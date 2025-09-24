// script.js
console.log("script.js connected!");

// ----- CONFIG: map answer letters to categories -----
const LETTER_TO_CATEGORY = {
  A: "Teleportation",
  B: "Creation",
  C: "Charisma",
  D: "Mind-Reading",
};

const LETTER_POINTS = { A: 1, B: 1, C: 1, D: 1 };

// ----- STATE -----
const selectionsByQuestionId = {};

// ----- ANSWER BUTTONS -----
document.addEventListener("DOMContentLoaded", () => {
  const questionBlocks = document.querySelectorAll(".question-block");

  questionBlocks.forEach((block) => {
    const answerButtons = block.querySelectorAll(".answer-btn");
    const questionContainer = block.closest("[id]");
    const questionId = questionContainer ? questionContainer.id : null;

    answerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Clear selected
        answerButtons.forEach((b) => b.classList.remove("selected"));
        // Mark clicked
        btn.classList.add("selected");
        // Store answer
        const letter = btn.dataset.answer;
        if (questionId && letter) {
          selectionsByQuestionId[questionId] = letter;
        }
      });
    });
  });

  // Connect results button
  const showBtn = document.getElementById("show-result");
  if (showBtn) showBtn.addEventListener("click", displayResult);
});

// ----- CALCULATE & DISPLAY RESULT -----
function displayResult() {
  const categoryTotals = {
    Teleportation: 0,
    Creation: 0,
    Charisma: 0,
    "Mind-Reading": 0,
  };

  Object.values(selectionsByQuestionId).forEach((letter) => {
    const category = LETTER_TO_CATEGORY[letter];
    const pts = LETTER_POINTS[letter] ?? 1;
    if (category) categoryTotals[category] += pts;
  });

  // Find top category
  const entries = Object.entries(categoryTotals);
  entries.sort((a, b) => b[1] - a[1]);
  const [topCategory, topScore] = entries[0];

  // Descriptions
  const descriptionByCategory = {
    Teleportation: "You’re adventurous and free-spirited. You want to be everywhere at once.",
    Creation: "You’re imaginative and expressive. You love bringing new ideas to life.",
    Charisma: "You’re a natural leader. People gravitate toward your energy and charm.",
    "Mind-Reading": "You’re insightful and reflective. You understand people on a deep level.",
  };

  const resultText =
    topScore === 0
      ? "Please answer all questions before getting a result."
      : `${topCategory}: ${descriptionByCategory[topCategory]}`;

  const card = document.getElementById("result-container");
  const text = document.getElementById("result-text");
  if (text) text.textContent = resultText;
  if (card) card.style.display = "block";
}
