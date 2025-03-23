let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startPauseBtn.textContent = "Start";
    laps = [];
    lapsContainer.innerHTML = "";
}

function recordLap() {
    if (!isRunning) return;
    laps.push(formatTime(elapsedTime));
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.length}: ${laps[laps.length - 1]}`;
    lapsContainer.appendChild(lapItem);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
