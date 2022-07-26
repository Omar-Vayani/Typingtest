const timeDisplay = document.querySelector(".countdown");
let time = 60;
let canStart = true;

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
    }, 1000);
  }
}
function giveResult() {
  console.log("done");
}
