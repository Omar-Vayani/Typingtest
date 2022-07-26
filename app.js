//selectors
const textDisplay = document.querySelector(".textDisplay");
const textInput = document.querySelector("#text-input");
const spans = document.getElementsByTagName("span");
//declarations
const words = `Sometimes to understand a word's meaning you need more than a definition; you need to see the word used in a sentence. At YourDictionary, we give you the tools to learn what a word means and how to use it correctly. With this sentence maker, simply type a word in the search bar and see a variety of sentences with that word used in its different ways. Our sentence generator can provide more context and relevance, ensuring you use a word the right way.`;
const words100 = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];
let count = 0;
let wpm = 0;
let wrong = 0;
let correct = 0;

//events
textInput.addEventListener("input", (e) => {
  startTimer();
  canStart = false;
  let letters = e.target.value.split("");
  let word = [];
  for (let i = 0; i < letters.length; i++) {
    word[i] = spans[count].innerText.split("")[i];
  }
  if (letters.some((letter, index) => letter != word[index])) {
    spans[count].classList.add("incorrect");
    spans[count].classList.remove("active");
  } else if (letters.some((letter, index) => letter == word[index])) {
    spans[count].classList.remove("incorrect");
    spans[count].classList.add("active");
  }

  if (e.target.value.includes(" ")) {
    if (count > -1) {
      spans[count + 1].classList.add("active");
    }
    if (e.target.value == spans[count].innerText) {
      correct++;
      spans[count].classList.add("correct");
      spans[count].classList.remove("incorrect");
      spans[count].classList.remove("active");
    } else {
      wrong++;
      spans[count].classList.remove("correct");
      spans[count].classList.remove("active");
      spans[count].classList.add("incorrect");
    }
    count++;
    e.target.value = "";
  }
});

//functions
function setWordsi() {
  words.split(" ").forEach((word, index) => {
    const el = document.createElement("span");
    let text = index == 1 ? ` ${word} ` : `${word} `;
    el.innerText = text;
    textDisplay.appendChild(el);
  });
}
function setWords() {
  for (let i = 0; i < 100; i++) {
    const el = document.createElement("span");
    let text =
      i == 1
        ? `${words100[Math.floor(Math.random() * 100)]} `
        : `${words100[Math.floor(Math.random() * 100)]} `;
    el.innerHTML = text;
    textDisplay.appendChild(el);
  }
}
//running
setWords();

//timer

const timeDisplay = document.querySelector(".countdown");
const resultBtn = document.querySelector(".result button");

let time = 60;
let canStart = true;
let restartTimer = false;

function startTimer() {
  if (canStart) {
    let timer = setInterval(() => {
      if (time == 0) {
        canStart = true;
        giveResult();
        clearInterval(timer);
      } else {
        time--;
        timeDisplay.innerHTML =
          time == 60 ? `01:00` : time < 10 ? `00:0${time}` : `00:${time}`;
      }
      if (restartTimer) {
        restartTimer = false;
        clearInterval(timer);
      }
    }, 1000);
  }
}
// give results

function giveResult() {
  console.log("done");
  document.querySelector(".result p b.wrongs").innerHTML = wrong;
  document.querySelector(".result p b.corrects").innerHTML = correct;
  document.querySelector(".result h2").innerHTML = ` ${correct - wrong}WPM`;
  restart();
}

resultBtn.addEventListener("click", () => {
  canStart = false;
  restartTimer = true;
  restart();
});

//restart

function restart() {
  timeDisplay.innerHTML = `01:00`;
  time = 61;
  count = 0;
  wpm = 0;
  wrong = 0;
  correct = 0;
  textInput.value = "";
  textDisplay.innerHTML = "";
  canStart = true;
  setTimeout(() => {
    setWords();
    textInput.focus();
  }, 1250);
}

//update
