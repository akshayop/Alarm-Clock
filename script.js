var stopAlaram = document.getElementById('stop-alaram');
var recentalaramslist = document.querySelector('#recent-alarams-list');
var animate = document.getElementById("clock-image");
let setAmPm = document.getElementById("am/pm");
const addAlaram = document.querySelector('.setAlaram');
const alaramAudio = new Audio('alarm-tone.wav');
const alaramList = [];
var interval;
var printAlaram;

// Setting AM and PM 

let daysetter = ['AM', 'PM'];

for(let  i = 0; i < daysetter.length; i++) {
    setAmPm.options[setAmPm.options.length] = new Option(daysetter[i]);
}

// To display the real time 

function realTime() {
    const date = new Date();

    let hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    let ampm;

    if(date.getHours() >= 12){
       if(date.getHours() == 12) {
        hour = 12;
       }

       else {
        hour = hour - 12;
        if(hour < 10) {
            hour = '0' + hour;
        }
       }
       ampm = "PM";
    }

    else {
        ampm = "AM";
    }
    
    document.getElementById('real-time').innerHTML = hour + ':' + minutes +':' + seconds+ " " + ampm;

    const currentTime = `${hour}:${minutes}:${seconds}:${ampm}`;

    // check the the alaram list whether real time is equal to alaram list
    // if yes then start's ring function

    if(alaramList.includes(currentTime)) {
        ring(currentTime);
    }
}

function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return "0" + time;
    }
    return time;
}

// Alaram function if the current time and alaram time matches

function ring(currentTime) {
    interval = setInterval(function(){
        alaramAudio.play();
    }, 1000);

    alert(`It's ${currentTime}`);
    animateImage();
}


setInterval(realTime, 1000);


//To set alaram whenever alaram set
addAlaram.addEventListener('submit', event => {

    // Preventing default  behavior
    event.preventDefault();

    let hour = formatTime(addAlaram.hr.value);
    if (hour === '0') {
        hour = '00';
    }
    let minute = formatTime(addAlaram.min.value);
    if (minute === '0') {
        minute = '00';
    }
    let second = formatTime(addAlaram.sec.value);
    if (second === '0') {
        second = '00';
    }

    let selectedAmPm = setAmPm.options[setAmPm.selectedIndex].value;

    printAlaram = `${hour}:${minute}:${second} ${selectedAmPm}`;
    const newAlaram = `${hour}:${minute}:${second}:${selectedAmPm}`;
    // console.log(newAlaram);

    // Adding alaram to recent List

    if (isNaN(newAlaram)) {
        if (!alaramList.includes(newAlaram)) {
            alaramList.push(newAlaram);
            addNewAlaram(newAlaram);
            addAlaram.reset();
            alert(`Set alaram to ${printAlaram}`)
        } 
        
        else {
            alert(`Alarm for ${printAlaram} already set.`);
        }
    } else {
        alert("Invalid Time Entered");
    }

});


// Creating recent list design

function addNewAlaram(newAlaram) {
    const html = 
    
    `<li class = "recent-list">        
        <span class="time">${printAlaram}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlaram}>Delete Alarm</button>       
    </li>`
    recentalaramslist.innerHTML += html;
}

// Stop the alaram
stopAlaram.addEventListener('click', function() {
    alaramAudio.pause();
    clearInterval(interval);
    animate.style.animation = "none";
});



// remove the recent alaram from the alaram  container
recentalaramslist.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});


remove = (value) => {
    let newList = alaramList.filter((time) => time != value);
    alaramList.length = 0; // Clear contents
    alaramList.push.apply(alaramList, newList);
}

// Animate image 

function animateImage() {
    animate.style.animation = "vibrate 0.5s infinite";

}
