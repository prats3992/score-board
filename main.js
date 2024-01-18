let timer;
let totalSeconds;
let initialTime;
let leftCounter = 0;
let rightCounter = 0;
let rightScore = 0;
let leftScore = 0;

function startTimer() {
  const inputTime = document.getElementById("timeInput").value;
  totalSeconds = parseTime(inputTime);

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert("Invalid time format. Please enter a valid time (HH:MM:SS).");
    return;
  }

  initialTime = totalSeconds;

  document.getElementById("startButton").disabled = true;

  clearInterval(timer);
  updateTimerDisplay();
  timer = setInterval(updateTimer, 1000);
}

function resetTimer() {
  if (initialTime !== undefined) {
    totalSeconds = initialTime;
    updateTimerDisplay();
    document.getElementById("startButton").disabled = false;
  }
}

function clearTimer() {
  totalSeconds = 0;
  initialTime = undefined;
  document.getElementById("timeInput").value = "";
  document.getElementById("timer").innerText = "";
  document.getElementById("startButton").disabled = false;
}

function updateTimer() {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateTimerDisplay();
  } else {
    clearInterval(timer);
    // alert("Countdown completed!");
    document.getElementById("startButton").disabled = false;
  }
}

function pauseTimer() {
  clearInterval(timer);
  document.getElementById("startButton").disabled = false;
}

function resumeTimer() {
  document.getElementById("startButton").disabled = true;
  timer = setInterval(updateTimer, 1000);
}

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  document.getElementById("timer").innerText = formattedTime;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function parseTime(inputTime) {
  const timeArray = inputTime.split(":").map(Number);
  return timeArray.length === 3
    ? timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2]
    : NaN;
}

function increaseCounter(direction) {
  if (direction === "left") {
    leftCounter++;
    document.getElementById(
      "leftValue"
    ).innerText = `${leftCounter}`;
  } else if (direction === "right") {
    rightCounter++;
    document.getElementById(
      "rightValue"
    ).innerText = `${rightCounter}`;
  }
}

function decreaseCounter(direction) {
  if (direction === "left" && leftCounter > 0) {
    leftCounter--;
    document.getElementById(
      "leftValue"
    ).innerText = `${leftCounter}`;
  } else if (direction === "right" && rightCounter > 0) {
    rightCounter--;
    document.getElementById(
      "rightValue"
    ).innerText = `${rightCounter}`;
  }
}

function score_inc(direction, score) {
  if (direction === "left") {
    leftScore = leftScore + score;
    document.getElementById("leftScore").innerText = `${leftScore}`;
  } else if (direction === "right") {
    rightScore = rightScore + score;
    document.getElementById(
      "rightScore"
    ).innerText = `${rightScore}`;
  }
}
