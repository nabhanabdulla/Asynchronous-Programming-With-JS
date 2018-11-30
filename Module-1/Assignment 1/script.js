'use strict';

// Variables
const startbtn = document.querySelector('#start');
const resetbtn = document.querySelector('#reset');
const recordbtn = document.querySelector('#record');
const clearbtn = document.querySelector('#clear');

const recordList = document.querySelector('#record-list');

const timer = new Timer();
const html = new HTMLUI();
const local = new LocalStorage();

let timerdiv = document.querySelector('#timer');
let started = false;
let time;
let interval;

// Event listeners
function eventListen() {
    window.onunload = timer.unload;
    document.onkeypress = timer.keypress;

    startbtn.addEventListener('click', timer.start);
    resetbtn.addEventListener('click', timer.reset);
    recordbtn.addEventListener('click', timer.record);
}




// Objects
function Timer() {
    this.type = 'Timer';
}

function HTMLUI() {

}

function LocalStorage() {

}

Timer.prototype.start = toggleTimer;
Timer.prototype.reset = resetTimer;
Timer.prototype.record = recordTimer;
Timer.prototype.unload = unloadTimer;
Timer.prototype.keypress = keypress;

HTMLUI.prototype.clear = clearRecords;
HTMLUI.prototype.records = showStorageRecords;

LocalStorage.prototype.getCurrentRecord = function() {
    return JSON.parse(localStorage.getItem('recordedTime'));
}
LocalStorage.prototype.clear = function() {
    localStorage.removeItem('recordedTime')
}
LocalStorage.prototype.record = addTimeStorage;
LocalStorage.prototype.setTime = setCurrentTime;
LocalStorage.prototype.getTime = getCurrentTime;

// Functions

function setCurrentTime() {
    localStorage.setItem('time', (parseFloat(time) / 100).toFixed(2));
}

function getCurrentTime() {
    return localStorage.getItem('time');
}

function addTimeStorage(time) {
    let currentRecord = local.getCurrentRecord();

    if(currentRecord === null) {
        currentRecord = [];
    }
    currentRecord.push(time);
    
    localStorage.setItem('recordedTime', JSON.stringify(currentRecord));
}

function showStorageRecords() {
    let currentRecord = local.getCurrentRecord();
    if(currentRecord !== null) {
        currentRecord.forEach(function(record) {
        recordList.innerHTML += `
            <li class='records list-group-item'>${record}</li>
        `;
        })
    }
}

function clearRecords() {
    recordList.innerHTML = '';
}

function keypress(e) {
    switch(e.keyCode) {
        case 114:
            resetbtn.click();
            break;
        case 115:
            startbtn.click();
            break;
        case 116:
            recordbtn.click();
            break;
        default:
            break;
    }
}
function unloadTimer() {
    if(started === true) {
        toggleTimer();
    }
    local.setCurrentTime()
}

function recordTimer() {
    let timeToRecord = parseFloat(time) / 100;
    recordList.innerHTML += `
                <li class='records list-group-item'>${timeToRecord}</li>
            `;
    local.record(timeToRecord);
}

function resetTimer() {
    time = 0;
    timerdiv.innerHTML = time;
    html.clear();
    local.clear();
}

function toggleTimer() {
    if(started == false) {
        interval = setInterval(function incrementTimer() {
            console.log(time);
            time++;
            timerdiv.innerHTML = parseFloat(time++) / 100;
            local.setTime(time);
        }, 10);
        started = true;
    }
    else {
        clearInterval(interval);
        started = false;
    }
    return 0;
}
time = parseFloat(local.getTime()) * 100 || 0;
console.log(time)
eventListen();
html.records();
timerdiv.innerHTML = local.getTime();