//selectors
const textDisplay = document.querySelector(".textDisplay");
const textInput = document.querySelector("#text-input");
const spans = document.getElementsByTagName("span");
//declarations
const words = `Sometimes to understand a word's meaning you need more than a definition; you need to see the word used in a sentence. At YourDictionary, we give you the tools to learn what a word means and how to use it correctly. With this sentence maker, simply type a word in the search bar and see a variety of sentences with that word used in its different ways. Our sentence generator can provide more context and relevance, ensuring you use a word the right way.`;
let count = 0;
let letters = [];
//events
textInput.addEventListener("input", (e) => {
  letters = e.target.value.split("");

  for (let i = 0; i < e.target.value.split("").length; i++) {
    if (letters[i] != spans[count].innerText.split("")[i]) {
      spans[count].classList.remove("correct");
      spans[count].classList.add("incorrect");
    } else {
      spans[count].classList.remove("correct");
      spans[count].classList.remove("incorrect");
    }
  }
  if (e.target.value.includes(" ")) {
    if (e.target.value == spans[count].innerText) {
      spans[count].classList.add("correct");
      spans[count].classList.remove("incorrect");
    } else {
      spans[count].classList.remove("correct");
      spans[count].classList.add("incorrect");
    }
    count++;
    e.target.value = "";
  }
});

//functions
function setWords() {
  words.split(" ").forEach((word, index) => {
    const el = document.createElement("span");
    let text = index == 1 ? ` ${word} ` : `${word} `;
    el.innerText = text;
    textDisplay.appendChild(el);
  });
}
//running
setWords();
console.log(textDisplay.innerText);
