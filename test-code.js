const timer = document.getElementById('timer')

const startButton = document.getElementById('timer-start')
const stopButton = document.getElementById('timer-stop')
const pauseButton = document.getElementById('timer-pause')

// start
startButton.addEventListener('click', () => {
    toggleClock();
})

// pause
pauseButton.addEventListener('click', () => {
    toggleClock()
})

// stop
stopButton.addEventListener('click', () => {
    toggleClock(true)
})

let isClockRunning = false

let workSessionDuration = 1500 // 25-min in seconds
let currentTimeLeftInSession = 1500
let breakSessionDuration = 300 // 5-min in seconds
let timeSpentInCurrentSession = 0

let type = 'Work'

// start/stop/pause countdown timer
const toggleClock = (reset) => {
    if (reset) {
        // STOP TIMER
        stopClock()
        timeSpentInCurrentSession = 0
    } else {
        if (isClockRunning === true) {
            // PAUSE TIMER
            clearInterval(clockTimer) //stop clockTimer
            isClockRunning = false
        } else {
            isClockRunning = true
        }
        clockTimer = setInterval( () => {
            // decrease time left / increase time spent
            stepDown() // decrease one second
            displayCurrentTimeLeftInSession()
        }, 1000) // setInterval acts once a second
    }
}

const stopClock = () => {
    // 1.reset the set timer
    clearInterval(clockTimer)
}

// function to carry out countdown
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        //decrease time left / increase time spent
        currentTimeLeftInSession--
        timeSpentInCurrentSession++
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0 // reset time spent in session
        // Timer is over -> switch to break, or viceversa
        if (type === 'Work') {
            currentTimeLeftInSession = breakSessionDuration
            displaySessionLog('Work')
            type = 'Break'
        } else {
            type = 'Work'
            displaySessionLog('Break')
        }
    }
    displayCurrentTimeLeftInSession()
}

// function to display session log
const displaySessionLog = (type) => {
    const sessionsList = document.getElementById('timer-sessions')
    // append li to timer-sessions
    const li = document.createElement('li');
    let sessionLabel = type
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    elapsedTime = (elapsedTime > 0 ? elapsedTime : '< 1')

    const text = document.createTextNode(
        `${sessionLabel} : ${elapsedTime} min`
    )
    li.appendChild(text)
    sessionsList.appendChild(li)
}

// function to display the countdown clock
const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const seconds = secondsLeft % 60
    const minutes = parseInt(secondsLeft / 60) % 60
    let hours = parseInt(secondsLeft / 3600)
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
        return (time < 10 ? `0${time}` : time)
    }

    if (hours > 0) result =+ `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    timer.innerText = result.toString()
}
