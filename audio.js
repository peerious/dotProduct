/* =====================================
   AUDIO.JS
   Dot Product Challenge
===================================== */

let audioContext = null;

function getAudioContext(){

    if(!audioContext){

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}

function playTone(

    frequency,
    duration,
    type = "sine",
    volume = 0.08

){

    const ctx = getAudioContext();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.type = type;

    osc.frequency.value =
        frequency;

    gain.gain.value =
        volume;

    osc.connect(gain);

    gain.connect(
        ctx.destination
    );

    osc.start();

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        ctx.currentTime +
        duration

    );

    osc.stop(
        ctx.currentTime +
        duration
    );
}

/* =====================================
   CLICK
===================================== */

function playClick(){

    playTone(
        600,
        0.05,
        "square",
        0.04
    );
}

/* =====================================
   CORRECT
===================================== */

function playCorrect(){

    playTone(
        900,
        0.10,
        "sine"
    );

    setTimeout(() => {

        playTone(
            1300,
            0.12,
            "sine"
        );

    }, 100);
}

/* =====================================
   WRONG
===================================== */

function playWrong(){

    playTone(
        250,
        0.20,
        "sawtooth"
    );

    setTimeout(() => {

        playTone(
            180,
            0.25,
            "sawtooth"
        );

    }, 120);
}

/* =====================================
   TIMEOUT
===================================== */

function playTimeout(){

    playTone(
        300,
        0.15,
        "square"
    );

    setTimeout(() => {

        playTone(
            220,
            0.15,
            "square"
        );

    }, 150);

    setTimeout(() => {

        playTone(
            160,
            0.20,
            "square"
        );

    }, 300);
}

/* =====================================
   COMBO
===================================== */

function playCombo(combo){

    if(combo < 3){

        return;
    }

    const base =
        800 +
        combo * 40;

    playTone(
        base,
        0.08,
        "triangle"
    );

    setTimeout(() => {

        playTone(
            base + 200,
            0.10,
            "triangle"
        );

    }, 80);
}

/* =====================================
   WIN
===================================== */

function playWin(){

    const notes = [

        523,
        659,
        784,
        1046,
        1318

    ];

    notes.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.20,
                    "triangle"
                );

            },

            i * 180);

        }

    );
}

/* =====================================
   GAME OVER
===================================== */

function playGameOver(){

    const notes = [

        440,
        392,
        349,
        262

    ];

    notes.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.25,
                    "sawtooth"
                );

            },

            i * 220);

        }

    );
}

/* =====================================
   BONUS
===================================== */

function playBonus(){

    playTone(
        1000,
        0.08,
        "triangle"
    );

    setTimeout(() => {

        playTone(
            1400,
            0.10,
            "triangle"
        );

    }, 80);

    setTimeout(() => {

        playTone(
            1800,
            0.12,
            "triangle"
        );

    }, 160);
}

/* =====================================
   INIT
===================================== */

function initializeAudio(){

    document.addEventListener(

        "click",

        () => {

            getAudioContext();

        },

        { once: true }

    );
}
