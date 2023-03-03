class Question {
  constructor(text, answers, correctAnswerIndex) {
    this.text = text;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
  }
  isCorrectAnswer(index) {
    return index === this.correctAnswerIndex;
  }
}
const questions = [
  new Question(
    "Which country is known for the programming language JavaScript?",
    ["USA", "France", "Germany", "Spain"],
    0
  ),
  new Question(
    "What is the largest planet in our solar system?",
    ["Mars", "Venus", "Jupiter", "Saturn"],
    2
  ),
  new Question(
    "What year did World War II end?",
    ["1944", "1945", "1946", "1947"],
    1
  ),
  new Question(
    "What is the highest mountain in the world?",
    ["Mount Everest", "Mount Kilimanjaro", "Mount Rushmore", "Mount Fuji"],
    0
  ),
  new Question(
    "What is the most populous country in the world?",
    ["India", "Russia", "China", "Brazil"],
    2
  ),
];
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const scoreFormContainer = document.getElementById("score-form-container");

let shuffledQuestions, currentQuestionIndex, timerInterval, points;
// Start the quiz
startButton.addEventListener("click", startQuiz);
// Start the quiz
function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  points = 5; // Initialize points to 5 for the first attempt
  scoreElement.textContent = 0;
  quizContainer.style.display = "none";
  scoreContainer.style.display = "none";
  scoreFormContainer.style.display = "none";
  questionContainer.style.display = "block";
  startTimer();
  showQuestion();
}
// Show the current question and answers
function showQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.text;
  answerButtonsElement.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => {
      selectAnswer(index);
    });
    answerButtonsElement.appendChild(button);
  });
}
// Select an answer and check if it is correct
function selectAnswer(index) {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const correctLegend = document.getElementById("correct-legend");
  const incorrectLegend = document.getElementById("incorrect-legend");
  if (currentQuestion.isCorrectAnswer(index)) {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      scoreElement.textContent = parseInt(scoreElement.textContent) + points;
      points = 5; // Reset points to 5 for the next question
      correctLegend.style.display = "block";
      setTimeout(() => {
        correctLegend.style.display = "none";
        showQuestion();
      }, 1000);
    } else {
      endQuiz();
    }
  } else {
    subtractTime();
    if (points > 1) {
      points -= 2; // Subtract 2 points for each incorrect attempt
    }
    incorrectLegend.style.display = "block";
    setTimeout(() => {
      incorrectLegend.style.display = "none";
      showQuestion();
    }, 1000);
  }
}

// Start the timer
function startTimer() {
  let timeLeft = 60;
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      updateTimer(timeLeft);
    } else {
      endQuiz();
    }
  }, 1000);
}
// Subtract 10 seconds from the timer
function subtractTime() {
  const timerElement = document.getElementById("timer");
  let timeLeft = parseInt(timerElement.textContent);

  if (timeLeft >= 10) {
    timeLeft -= 10;
    timerElement.textContent = timeLeft;
  } else {
    endQuiz();
  }
}

// Update the timer display
function updateTimer(timeLeft) {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timeLeft;

  // Update timer style to red when time is running low
  if (timeLeft <= 10) {
    timerElement.style.color = "red";
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  questionContainer.style.display = "none";
  scoreContainer.style.display = "block";
  scoreFormContainer.style.display = "block";
  scoreElement.textContent = document.getElementById("timer").textContent;

  // Save score in local storage
  const score = parseInt(scoreElement.textContent);
  const highScore = localStorage.getItem("highScore") || 0;

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  // Get the input value of initials

  const initials = document.getElementById("initials").value;

  // Save the score and initials in local storage
  if (initials && score > 0) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push("initials", initials);
    localStorage.setItem("scores", JSON.stringify(scores));
  }
}
