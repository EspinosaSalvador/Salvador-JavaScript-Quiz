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

let shuffledQuestions, currentQuestionIndex, timerInterval;
// Start the quiz
startButton.addEventListener("click", startQuiz);
// Start the quiz
function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
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
  if (currentQuestion.isCorrectAnswer(index)) {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  } else {
    subtractTime();
    answerButtonsElement.innerHTML = "";
    questionElement.textContent = "Wrong answer - 10 sec";
    setTimeout(() => {
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
  const timeLeft = parseInt(document.getElementById("timer").textContent);
  if (timeLeft >= 10) {
    updateTimer(timeLeft - 10);
  } else {
    endQuiz();
  }
}
// Update the timer display
function updateTimer(timeLeft) {
  document.getElementById("timer").textContent = timeLeft;
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
  const initials = document.getElementById("initials").value.trim();

  // Save the score and initials in local storage
  if (initials && score > 0) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ score, initials });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
}
