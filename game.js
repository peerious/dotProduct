/* =====================================
   DOT PRODUCT CHALLENGE
   GAME.JS
===================================== */

let currentQuestion = 0;

let totalQuestions = 20;

let timeLimit = 30;

let timeRemaining = 30;

let timer = null;

let score = 0;

let combo = 0;

let maxCombo = 0;

let correctCount = 0;

let wrongCount = 0;

let vectorA = null;

let vectorB = null;

let correctAnswer = 0;

/* =====================================
   STARTUP
===================================== */

window.addEventListener(

    "load",

    () => {

        initializeAudio();

        attachEvents();

    }

);

/* =====================================
   EVENTS
===================================== */

function attachEvents(){

    document
        .getElementById(
            "startBtn"
        )
        .addEventListener(
            "click",
            startGame
        );

    document
        .getElementById(
            "submitBtn"
        )
        .addEventListener(
            "click",
            submitAnswer
        );

    document
        .getElementById(
            "restartBtn"
        )
        .addEventListener(
            "click",
            restartGame
        );

    document
        .getElementById(
            "answerInput"
        )
        .addEventListener(

            "keydown",

            (e) => {

                if(
                    e.key ===
                    "Enter"
                ){

                    submitAnswer();
                }

            }

        );
}

/* =====================================
   START GAME
===================================== */

function startGame(){

    playClick();

    totalQuestions = Number(

        document.getElementById(
            "questionCount"
        ).value

    );

    timeLimit = Number(

        document.getElementById(
            "timeLimit"
        ).value

    );

    currentQuestion = 0;

    score = 0;

    combo = 0;

    maxCombo = 0;

    correctCount = 0;

    wrongCount = 0;

    updateHUD();

    document
        .getElementById(
            "startScreen"
        )
        .classList.add(
            "hidden"
        );

    document
        .getElementById(
            "gameScreen"
        )
        .classList.remove(
            "hidden"
        );

    nextQuestion();
}

/* =====================================
   RESTART
===================================== */

function restartGame(){

    playClick();

    document
        .getElementById(
            "resultScreen"
        )
        .classList.add(
            "hidden"
        );

    document
        .getElementById(
            "startScreen"
        )
        .classList.remove(
            "hidden"
        );
}

/* =====================================
   RANDOM VECTOR
===================================== */

function randomVector(){

    return {

        x: randomInt(
            -5,
            5
        ),

        y: randomInt(
            -5,
            5
        )

    };
}

function randomInt(
    min,
    max
){

    return Math.floor(

        Math.random()

        *

        (
            max - min + 1
        )

    ) + min;
}

/* =====================================
   NEXT QUESTION
===================================== */

function nextQuestion(){

    if(

        currentQuestion >=
        totalQuestions

    ){

        finishGame();

        return;
    }

    currentQuestion++;

    vectorA =
        randomVector();

    vectorB =
        randomVector();

    correctAnswer =

        vectorA.x *

        vectorB.x

        +

        vectorA.y *

        vectorB.y;

    document
        .getElementById(
            "questionText"
        )
        .innerHTML =

`
A = (${vectorA.x}, ${vectorA.y})

<br><br>

B = (${vectorB.x}, ${vectorB.y})

<br><br>

หา Dot Product

<br><br>

A · B = ?
`;

    document
        .getElementById(
            "answerInput"
        )
        .value = "";

    document
        .getElementById(
            "answerInput"
        )
        .focus();

    updateHUD();

    startTimer();
}

/* =====================================
   TIMER
===================================== */

function startTimer(){

    clearInterval(
        timer
    );

    timeRemaining =
        timeLimit;

    updateTimer();

    timer = setInterval(

        () => {

            timeRemaining--;

            updateTimer();

            if(

                timeRemaining <= 0

            ){

                timeoutQuestion();

            }

        },

        1000

    );
}

function updateTimer(){

    const percent =

        (
            timeRemaining

            /

            timeLimit

        ) * 100;

    document
        .getElementById(
            "timerBarInner"
        )
        .style.width =

        percent + "%";
}

/* =====================================
   SUBMIT
===================================== */

function submitAnswer(){

    const answer = Number(

        document
            .getElementById(
                "answerInput"
            )
            .value

    );

    clearInterval(
        timer
    );

    if(

        answer ===
        correctAnswer

    ){

        handleCorrect();

    }else{

        handleWrong();
    }
}

/* =====================================
   CORRECT
===================================== */

function handleCorrect(){

    correctCount++;

    combo++;

    if(
        combo >
        maxCombo
    ){
        maxCombo =
            combo;
    }

    let earned;

    if(
        timeRemaining > 20
    ){

        earned = 100;

    }else if(
        timeRemaining > 10
    ){

        earned = 70;

    }else{

        earned = 40;
    }

    earned +=
        combo * 5;

    score +=
        earned;

    playCorrect();

    if(
        combo >= 3
    ){
        playCombo(
            combo
        );
    }

    showFeedback(

        `✅ ถูกต้อง

        +${earned} คะแนน`,

        "correct"

    );

    updateHUD();

    setTimeout(

        nextQuestion,

        1200

    );
}

/* =====================================
   WRONG
===================================== */

function handleWrong(){

    wrongCount++;

    combo = 0;

    playWrong();

    showFeedback(

`
❌ ไม่ถูกต้อง

<br><br>

วิธีทำ

<br>

(${vectorA.x})
×
(${vectorB.x})

+

(${vectorA.y})
×
(${vectorB.y})

=

${correctAnswer}
`,

        "wrong"

    );

    updateHUD();

    setTimeout(

        nextQuestion,

        3500

    );
}

/* =====================================
   TIMEOUT
===================================== */

function timeoutQuestion(){

    clearInterval(
        timer
    );

    wrongCount++;

    combo = 0;

    playTimeout();

    showFeedback(

`
⏰ หมดเวลา

<br><br>

คำตอบคือ

${correctAnswer}
`,

        "wrong"

    );

    updateHUD();

    setTimeout(

        nextQuestion,

        2500

    );
}

/* =====================================
   FEEDBACK
===================================== */

function showFeedback(

    text,
    cssClass

){

    const el =

        document
            .getElementById(
                "feedbackText"
            );

    el.className =
        cssClass;

    el.innerHTML =
        text;
}

/* =====================================
   HUD
===================================== */

function updateHUD(){

    document
        .getElementById(
            "scoreValue"
        )
        .textContent =
        score;

    document
        .getElementById(
            "comboValue"
        )
        .textContent =
        combo;

    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        currentQuestion;

    document
        .getElementById(
            "questionTotal"
        )
        .textContent =
        totalQuestions;
}

/* =====================================
   FINISH
===================================== */

function finishGame(){

    document
        .getElementById(
            "gameScreen"
        )
        .classList.add(
            "hidden"
        );

    document
        .getElementById(
            "resultScreen"
        )
        .classList.remove(
            "hidden"
        );

    document
        .getElementById(
            "finalScore"
        )
        .textContent =
        score;

    document
        .getElementById(
            "correctCount"
        )
        .textContent =
        correctCount;

    document
        .getElementById(
            "wrongCount"
        )
        .textContent =
        wrongCount;

    const accuracy =

        correctCount

        +

        wrongCount

        === 0

        ? 0

        :

        100 *

        correctCount

        /

        (
            correctCount
            +
            wrongCount
        );

    document
        .getElementById(
            "accuracy"
        )
        .textContent =

        accuracy.toFixed(1)

        + "%";

    document
        .getElementById(
            "maxCombo"
        )
        .textContent =
        maxCombo;

    playWin();
}
