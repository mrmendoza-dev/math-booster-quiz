// MATH QUIZZER

// Fast percentages quizzer
// - Adjust difficulty (size/percent)

// INPUTS
// ex 

// Question 23% of 12

// GENERATE ANSWERS

// SELECT and ADD SCORES





// - User starts game and initalizes
// - game rendered, question generated and displayed for answer
// - user answers and results calc
// - generate next question





const difficulties = ['easy', 'normal', 'hard', 'extreme']

let percent = 0;
let number = 0;

let minNum = 10;
let maxNum = 50;
let minPercent = 10;
let maxPercent = 99;


let numQuestions = 10;
let numAnswers = 4;

let correct = 0;
let answers = [];

let waiting = false;
let score = 0;


let startBlock = document.getElementById("startBlock");
let questionBlock = document.getElementById("questionBlock");

let questionPrompt = document.getElementById("questionPrompt");

let startEl = document.getElementById("startBtn")
startEl.addEventListener("click", initGame)



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function roll(min, max, floatFlag, fixed) {
    let r = Math.random() * (max - min) + min
    return floatFlag ? r.toFixed(fixed) : Math.floor(r)
}
function switchView() {
    if (startBlock.style.display === "none") {
        startBlock.style.display = "block";
        questionBlock.style.display = "none";
    }
    else {
        startBlock.style.display = 'none';
        questionBlock.style.display = "block";
    }

}

function initGame() {
    score = 0
    switchView();
    generateQuestion();
}


function generateQuestion() {

    number = roll(minNum, maxNum, 0, 0);
    percent = roll(minPercent, maxPercent, 0, 0);
    questionPrompt.textContent = `${percent}% of ${number}`
    correct = (number * percent/100).toFixed(2);
    answers = generateAnswers(correct)
    waiting = false;


}

function generateAnswers(correct) {
    answers = Array.from({length:numAnswers-1}, ()=> roll(1, correct, 1, 2))
    answers.push(correct);
    answers = shuffleArray(answers);
    displayAnswers(answers);

}


// Generate buttons for numAnswers
function displayAnswers(answers) {

    let answersHtml = answers.map((num) =>
        `<button  onclick="selectAnswer(this)" class="btn answer-btn">${num}</button>`).join("")
        document.getElementById("answers").innerHTML = answersHtml;

}


function selectAnswer(text) {
    if (!waiting) {
        waiting = true;


        let choice = text.textContent;
        console.log(choice);

        if (parseFloat(choice) == correct) {
            console.log("Correct");
            score += 1;
            text.style.color = "#fff";
            text.style.backgroundColor = "green";
            text.style.borderColor = "green";
        } else {
            console.log("Wrong");
            text.style.color = "#fff";

            text.style.backgroundColor = "red";
            text.style.borderColor = "red";
        }

        calculateScore();
        setTimeout(() => {
            generateQuestion();
        }, 500);
    }



}


function calculateScore() {
    console.log(score)
}

