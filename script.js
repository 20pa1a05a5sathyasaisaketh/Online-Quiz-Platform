const questions = [
    {
        question: "What is the full form of HTML?",
        answers:[
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Makeup Language", correct: false},
            {text: "Hyper Test Marking Language", correct: false},
            {text: "Hybrid Test Making Language", correct: false},
        ]
    },
    {
        question: "Which symbol is used for represent comments in JavaScript?",
        answers:[
            {text: "$", correct: false},
            {text: "!", correct: false},
            {text: "//", correct: true},
            {text: "*", correct: false},
        ]
    },
    {
        question: "Which is fast among JavaScript and ASP Script?",
        answers:[
            {text: "Asp Script", correct: false},
            {text: "JavaScript", correct: true},
            {text: "Both are fast", correct: false},
            {text: "Both are not fast", correct: false},
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers:[
            {text: "Facebook", correct: false},
            {text: "Netscape", correct: true},
            {text: "Google", correct: false},
            {text: "Adobe", correct: false},
        ]
    },
    {
        question: "What do you mean by NULL in JavaScript?",
        answers:[
            {text: "No Value", correct: false},
            {text: "No Object", correct: false},
            {text: "Both", correct: true},
            {text: "None of the above", correct: false},
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHtml="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    nextButton.innerHTML = "Next";
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
        
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    currentQuestionIndex = -1;
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        
        showQuestion();
    }else{
        
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();