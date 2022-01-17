/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */

// how to display js code on html
console.log(questions);


// 1. set timer
// 2. shuffling questions
// 2. display questions by array
// 3. count right and wrong scores
// 4. localstorage and show scores
// 5. end 

// Timer
const timerDiv = document.getElementById('timer')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')
var   timerEl = document.getElementById(".countdown");
const nextBtn = document.querySelector('#next-btn')
const startBtn = document.querySelector('#start-btn');
const scoreEl = document.querySelector('.score')
const containerEl = document.querySelector('.container')

var shuffleQuestion
let userAnswer;
let questionCount = 0;
let userScore = 0;
var sec = 50;
let checkAnswer = true


//timer, set up a given time and countdown, and end game
function timer() {
    var timer = setInterval(function () {
        timerDiv.innerHTML = sec;
        sec--;

        if (sec < 0) {
            clearInterval(timer);
            timerDiv.innerText = 'Time'

            endGame()   //game over time out         
        }
    }, 1000);

    //
}
const startBtnFunction = () => {
    console.log('start button ')
}





function startGame() {


    console.log("lastTimeScore" + localStorage.getItem('score'))

    userScore = 0; // start with score 0 in the game even restart it.
    scoreEl.innerText = `Score : ${userScore}`
    startBtn.classList.add('hide') // hide startBtn
    containerEl.classList.remove('hide') // open html container contents
    shuffleQuestion = questions.sort(() => Math.random() - .5) //randomly shuffling questions array


    questionCount = 0

    nextBtn.classList.remove('hide')
    checkAnswer = true




// Next movement action
function moveNextquestion() {
    console.log(checkAnswer)
    const len = shuffleQuestion[questionCount].choices.length;

    for (let i = 0; i < len; i++) {
        const button = document.getElementById(`option-${i + 1}`) // link Btn options
        button.classList.remove('select')

        clearStatusClass(button)
    }

    if (checkAnswer) {
        if (shuffleQuestion[questionCount].answer === userAnswer) {
            userScore++
        }
        scoreEl.innerText = `Score : ${userScore}`


        for (let i = 0; i < len; i++) {
            const button = document.getElementById(`option-${i + 1}`)
            button.classList.remove('select')

            // console.log(button.innerText)

            if (button.innerText === shuffleQuestion[questionCount].answer) {
                setStatusClass(button, true)
            } else {
                setStatusClass(button, false)
            }
        }

        checkAnswer = false
    } else {
        questionCount++
        showQuestion(questions)


        for (let i = 0; i < len; i++) {
            const button = document.getElementById(`option-${i + 1}`)
            button.classList.remove('select')

            clearStatusClass(button)
        }

        checkAnswer = true
    }





    /*
        if next question
        else check answer and show correct one
    */
}

function showQuestion(questions) {
    if (questionCount > questions.length - 1) {
        endGame()
    }

    questionElement.innerText = shuffleQuestion[questionCount].title
    // options
    // const option1 = document.getElementById('option-1')
    // const option2 = document.getElementById('option-2')
    // const option3 = document.getElementById('option-3')
    // const option4 = document.getElementById('option-4')

    // option1.innerText = questions[questionCount].choices[0]
    // option2.innerText = questions[questionCount].choices[1]
    // option3.innerText = questions[questionCount].choices[2]
    // option4.innerText = questions[questionCount].choices[3]

    const len = shuffleQuestion[questionCount].choices.length;
    for (let i = 0; i < len; i++) {
        const button = document.getElementById(`option-${i + 1}`)
        button.innerText = shuffleQuestion[questionCount].choices[i];
        button.addEventListener("click", () => { selectAnswer(`option-${i + 1}`) });
    }


}

function selectAnswer(answerEl) {
    const selectEl = document.querySelector(`#${answerEl}`)

    const len = shuffleQuestion[questionCount].choices.length;
    for (let i = 0; i < len; i++) {
        const button = document.getElementById(`option-${i + 1}`)
        button.classList.remove('select')
    }


    if (checkAnswer) { selectEl.classList.add('select') }

    userAnswer = selectEl.textContent



    // console.log(userAnswer)



}
/**
 *const endGame = function() {}
 * 
 */
const endGame = () => {
    sec = 0 // make timer up

    containerEl.classList.add('hide') //hide container in html
    startBtn.classList.remove('hide')
    nextBtn.classList.add('hide')

    localStorage.setItem('score', userScore)
}

 

startBtn.addEventListener('click', () => {
    sec = 50 // we end the game and start it again, set time as the beginning in order to restart

    timer();
    startGame()
    showQuestion(shuffleQuestion);
})
nextBtn.addEventListener('click', moveNextquestion)


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}