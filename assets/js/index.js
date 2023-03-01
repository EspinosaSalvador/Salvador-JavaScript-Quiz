var containerEl = document.getElementsByClassName("container");
var startButtonEl = document.getElementById("start-button");
var quizEl = document.getElementById("quiz");
var resultsEl = document.getElementById("results");
var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var hideEl = document.getElementsByClassName("hide");
var quizQuestionsEL = document.getElementById("questions");

var scoreEl = 0;
var timeleft = 60;
var timer;
const quizQuestions = [
  {
    question:
      "Which method is used to get the value of an input fiel in JavaScript?",
    answers: [
      { Text: "getValue()", correct: false },
      { Text: "getElementValue()", correct: false },
      { Text: "document.inputValue()", correct: false },
      { Text: "document.getElementById().value", correct: true },
    ],
  },
  {
    question:
      "Which event occurs when the user clicks on an HTML element in JavaScript?",
    answers: [
      { Text: "onmouseover", correct: false },
      { Text: "onmouseout", correct: false },
      { Text: "onclick", correct: true },
      { Text: "onsubmit", correct: false },
    ],
  },
  {
    question:
      "Which property is used to change the CSS style of an element in JavaScript?",
    answers: [
      { Text: "cssStyle", correct: false },
      { Text: "style", correct: true },
      { Text: "setStyle", correct: false },
      { Text: "setCss", correct: false },
    ],
  },
  {
    question:
      "Which method is used to add a new element to an HTML document in JavaScript?",
    answers: [
      { Text: "createNode()", correct: false },
      { Text: "createElement()", correct: true },
      { Text: "addElement()", correct: false },
      { Text: "insertElement()", correct: false },
    ],
  },
  {
    question:
      "Which method is used to remove an element from an HTML document in JavaScript?",
    answers: [
      { Text: "removeElement()", correct: false },
      { Text: "deleteNode()", correct: false },
      { Text: "removeNode()", correct: false },
      { Text: "removeChild()", correct: true },
    ],
  },
  {
    question:
      "Which method is used to change the text of an HTML element in JavaScript?",
    answers: [
      { Text: "setText()", correct: false },
      { Text: "changeText()", correct: false },
      { Text: "innerText()", correct: false },
      { Text: "innerHTML()", correct: true },
    ],
  },
  {
    question:
      "Which event occurse when an HTML form is submitted in JavaScript?",
    answers: [
      { Text: "onsubmit", correct: true },
      { Text: "onformsubmit", correct: false },
      { Text: "onclick", correct: false },
      { Text: "onsubmitform", correct: false },
    ],
  },
  {
    question:
      "which property is used to get the width of an HTML element in JavaScript?",
    answers: [
      { Text: "offsetWidth", correct: true },
      { Text: "clientWidth", correct: false },
      { Text: "width", correct: false },
      { Text: "scrollWidth", correct: false },
    ],
  },
  {
    question:
      "Which method is used to change the href attribute of an anchor element in JavaScript?",
    answers: [
      { Text: "setHref()", correct: false },
      { Text: "changeHref()", correct: false },
      { Text: "href()", correct: false },
      { Text: "setAttribute", correct: true },
    ],
  },
  {
    question:
      "Which event occurs when an HTML page has finished loading in JavaScript?",
    answers: [
      { Text: "onload", correct: true },
      { Text: "onready", correct: false },
      { Text: "onloaded", correct: false },
      { Text: "onpageloaded", correct: false },
    ],
  },
];

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
  startButtonEl.classList.add("hide");
}
