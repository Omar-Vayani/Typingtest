//selectors
const textDisplay = document.querySelector(".textDisplay");
const textInput = document.querySelector("#text-input");
const spans = document.getElementsByTagName("span");
//declarations
const words100 = [
  "the",
  "be",
  "of",
  "and",
  "a",
  "to",
  "in",
  "he",
  "have",
  "it",
  "that",
  "for",
  "they",
  "I",
  "with",
  "as",
  "not",
  "on",
  "she",
  "at",
  "by",
  "this",
  "we",
  "you",
  "do",
  "but",
  "from",
  "or",
  "which",
  "one",
  "would",
  "all",
  "will",
  "there",
  "say",
  "who",
  "make",
  "when",
  "can",
  "more",
  "if",
  "no",
  "man",
  "out",
  "other",
  "so",
  "what",
  "time",
  "up",
  "go",
  "about",
  "than",
  "into",
  "could",
  "state",
  "only",
  "new",
  "year",
  "some",
  "take",
  "come",
  "these",
  "know",
  "see",
  "use",
  "get",
  "like",
  "then",
  "first",
  "any",
  "work",
  "now",
  "may",
  "such",
  "give",
  "over",
  "think",
  "most",
  "even",
  "find",
  "day",
  "also",
  "after",
  "way",
  "many",
  "must",
  "look",
  "before",
  "great",
  "back",
  "through",
  "long",
  "where",
  "much",
  "should",
  "well",
  "people",
  "down",
  "own",
  "just",
  "because",
  "good",
  "each",
  "those",
  "feel",
  "seem",
  "how",
  "high",
  "too",
  "place",
  "little",
  "world",
  "very",
  "still",
  "nation",
  "hand",
  "old",
  "life",
  "tell",
  "write",
  "become",
  "here",
  "show",
  "house",
  "both",
  "between",
  "need",
  "mean",
  "call",
  "develop",
  "under",
  "last",
  "right",
  "move",
  "thing",
  "general",
  "school",
  "never",
  "same",
  "another",
  "begin",
  "while",
  "number",
  "part",
  "turn",
  "real",
  "leave",
  "might",
  "want",
  "point",
  "form",
  "off",
  "child",
  "few",
  "small",
  "since",
  "against",
  "ask",
  "late",
  "home",
  "interest",
  "large",
  "person",
  "end",
  "open",
  "public",
  "follow",
  "during",
  "present",
  "without",
  "again",
  "hold",
  "govern",
  "around",
  "possible",
  "head",
  "consider",
  "word",
  "program",
  "problem",
  "however",
  "lead",
  "system",
  "set",
  "order",
  "eye",
  "plan",
  "run",
  "keep",
  "face",
  "fact",
  "group",
  "play",
  "stand",
  "increase",
  "early",
  "course",
  "change",
  "help",
  "line",
];
let wordsGenerated = 150;
let count = 0;
let wpm = 0;
let wrong = 0;
let correct = 0;
let word = [];
let letters = [];

//events
textInput.addEventListener("input", (e) => {
  startTimer();
  canStart = false;
  letters = e.target.value.split("");
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
  if (count == spans.length - 5) {
    setWords();
  }
  if (e.target.value.includes(" ")) {
    if (count > -1 && count < spans.length - 1) {
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
  for (let i = 0; i < wordsGenerated; i++) {
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

const initialTime = 6;
let time = initialTime;
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
        // time == 60 ? `01:00` : time < 10 ? `00:0${time}` : `00:${time}`;
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
  document.querySelector(".result h2").innerHTML = ` ${
    (correct - wrong) / (initialTime / 60)
  }WPM`;
  restart();
}

resultBtn.addEventListener("click", () => {
  canStart = false;
  restartTimer = true;
  restart();
});

//restart

function restart() {
  textInput.value = "";
  textInput.readOnly = true;
  timeDisplay.innerHTML = `01:00`;
  textDisplay.style.color = "transparent";
  time = 60;
  count = 0;
  wpm = 0;
  wrong = 0;
  correct = 0;
  canStart = true;
  setTimeout(() => {
    textDisplay.innerHTML = "";
    textDisplay.style.color = "white";
    textInput.readOnly = false;
    setWords();
    textInput.focus();
  }, 1250);
}
