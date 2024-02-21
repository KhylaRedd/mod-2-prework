const questions = [
    {
        question: "Who was the first woman to lead an armed expedition in the Civil War?",
        answers: [
            {text: "Mariah Carey", correct: false},
            {text: "Lisa Monet", correct: false},
            {text: "Rosa Parks", correct: false},
            {text: "Harriet Tubman", correct: true},
        ]
    },
    {
        question: "Who was the first Black self-made female millionaires in the United States?",
        answers: [
            {text: "Beyonce", correct: false},
            {text: "Josephine Baker", correct: false},
            {text: "Madam C.J. Walker", correct: true},
            {text: "Rudy Huxtabule", correct: false},
        ]
    },
    {
        question: "Who was the African American master distiller believed to have mentored Jack Daniel in the art of whiskey production?",
        answers: [
            {text: "Taylor Portin", correct: false},
            {text: "Bob Kravin", correct: false},
            {text: "Nathan Nearest Green", correct: true},
            {text: "Tousaint Bosemin", correct: false},
        ]
    },
    {
        question: "Who led an anti-lynching crusade in the late 19th and early 20th centuries, documenting and exposing the atrocities of lynching in the United States?",
        answers: [
            {text: "Eddie Murphy", correct: false},
            {text: "Booker T. Washington", correct: false},
            {text: "Malcolm X", correct: false},
            {text: "Ida B. Wells.", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You have earned ${score} out of ${questions.length} Gems of Knowledge for your Crown!`;
    nextButton.innerHTML = "Earn More?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    handleNextButton();
});

startQuiz();
