//loader and audio

const audio = new Audio();
audio.src = "./click.mp3";

let modalIsOpen = false;
let convertedNumber = "";

window.addEventListener('click', () => {
    document.getElementById("song").play();
});

function showLoaderAndOverlay() {
    document.querySelector('.loader-wrapper').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.loader-wrapper').style.display = 'none';
        document.getElementById('myModal').classList.remove('hidden');
    }, 1000); // duration
}

//functional main buttons
function refreshTimer() {
    clearInterval(timer);
}

function openModal() {
    openPopup("Click the REFRESH BUTTON to load the words.", false, 4000); //duration 
    document.getElementById('alertTitle').innerText = 'START'
    document.getElementById('alertTitle').style.color = 'green';
    document.getElementById('alertMessage').style.color = 'green';
    document.getElementById('alertMessage').style.fontStyle = 'italic';
    document.getElementById('progress').style.backgroundColor = 'green';
    setTimeout(() => {
        convertedNumber = "";
    }, 4000);

    document.getElementById("myModal").style.display = "flex";
    document.getElementById("openButton").style.display = "none";
    clearInterval(timer);
    modalIsOpen = true;
}

function closeModal() {
    refreshTimer();
    document.getElementById("myModal").style.display = "none";
    document.getElementById("openButton").style.display = "block";
    initGame();
    showLoaderAndRedirect();
    modalIsOpen = false;
}


const refreshGame = () => {
    if (!modalIsOpen) {
        refreshTimer();
        initGame();
    }
};

function startGame() {
    clearInterval(timer);
    initGame();
    closeModal();
}


function handlePlayButtonClick() {
    showLoaderAndOverlay();
    setTimeout(() => {
        openModal();
    }, 1000);
}

function showLoaderAndRedirect() {
    document.querySelector('.loader-wrapper').style.display = 'flex';
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000); //duration
}



const playButton = document.getElementById("openButton");
playButton.addEventListener("click", handlePlayButtonClick);



// validation,checker,gameinitialization

let words = [
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },
    {
        word: "position",
        hint: "Location of someone or something"
    },
    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },
    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        word: "store",
        hint: "Large shop where goods are traded"
    },
    {
        word: "field",
        hint: "Area of land for farming activities"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "second",
        hint: "One-sixtieth of a minute"
    },
    {
        word: "library",
        hint: "Place containing collection of books"
    },
]


const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        openPopup(`Time off! ${correctWord.toLowerCase()} was the correct word`, false, 4000);
        setTimeout(() => {
            convertedNumber = "";
        }, 5000);
        initGame();
    }, 2000);
}

const initGame = () => {
    initTimer(31);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);

}

function handleInputFieldColor(isCorrect) {
    if (isCorrect) {
        inputField.style.borderColor = 'green';
    } else {
        inputField.style.borderColor = 'red';
    }

    // Reset the border color after 1 second
    setTimeout(() => {
        inputField.style.borderColor = '';
    }, 1000);
}

let wrongAttemptsCount = 0;
let correctAttemptsCount = 0;

function updateAttempts(wrongAttemptsCount, correctAttemptsCount) {
    const wrongAttemptsDisplay = document.getElementById('wrongAttempts');
    const correctAttemptsDisplay = document.getElementById('correctAttempts');

    wrongAttemptsDisplay.textContent = wrongAttemptsCount;
    correctAttemptsDisplay.textContent = correctAttemptsCount;
}

function checkWord() {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return

    openPopup(`Please enter the word to check!`, false, 4000);
    setTimeout(() => {
        convertedNumber = "";
    }, 5000);

    if (userWord === correctWord) {
        inputField.style.borderColor = 'green';
        setTimeout(() => {
            inputField.style.borderColor = '';
        }, 2000);

        openPopup(`Congrats! ${correctWord.toUpperCase()} is the correct word`, false, 4000);
        document.getElementById('alertTitle').innerText = 'CONGRATULATIONS!'
        document.getElementById('alertTitle').style.color = 'green';
        document.getElementById('alertMessage').style.color = 'green';
        document.getElementById('alertMessage').style.fontStyle = 'italic';
        document.getElementById('progress').style.backgroundColor = 'green';

        setTimeout(() => {
            convertedNumber = "";
        }, 5000);

        refreshTimer();
        initGame();
        correctAttemptsCount++;
        updateAttempts(wrongAttemptsCount, correctAttemptsCount);

        if (correctAttemptsCount >= 10) {
            openPopup(`YOU'RE A WINNER! Thank you for playing!`, false, 5500);
            document.getElementById('alertTitle').innerText = 'CONGRATULATIONS!'
            document.getElementById('alertTitle').style.color = 'green';
            document.getElementById('alertMessage').style.color = 'green';
            document.getElementById('alertMessage').style.fontStyle = 'italic';
            document.getElementById('progress').style.backgroundColor = 'green';
            setTimeout(() => {
                convertedNumber = "";
                window.location.href = "index.html"; // Redirect to home page
            }, 3000);
            wrongAttemptsCount = 0;
            correctAttemptsCount = 0;
            updateAttempts(wrongAttemptsCount, correctAttemptsCount);
            initGame();
        }


    } else {
        inputField.style.borderColor = 'red';
        setTimeout(() => {
            inputField.style.borderColor = '';
        }, 1500);
        openPopup(`Oops! ${userWord.toLocaleUpperCase()} is not the correct word`, false, 4000);
        document.getElementById('alertTitle').innerText = 'WARNING!!!'
        document.getElementById('alertTitle').style.color = 'red';
        document.getElementById('alertMessage').style.color = 'black';
        document.getElementById('alertMessage').style.fontStyle = 'italic';
        document.getElementById('progress').style.backgroundColor = 'red';
        wrongAttemptsCount++;
        setTimeout(() => {
            convertedNumber = "";
        }, 4000);
        updateAttempts(wrongAttemptsCount, correctAttemptsCount);

        if (wrongAttemptsCount >= 3) {
            openPopup("You've reached 3 wrong attempts. Going back home...", false, 4000);
            document.getElementById('alertTitle').innerText = 'WARNING!!!'
            document.getElementById('alertTitle').style.color = 'red';
            document.getElementById('alertMessage').style.color = 'black';
            document.getElementById('alertMessage').style.fontStyle = 'italic';
            document.getElementById('progress').style.backgroundColor = 'red';
            setTimeout(() => {
                convertedNumber = "";
                window.location.href = "index.html"; // Redirect to home page
            }, 4000);
            updateAttempts(wrongAttemptsCount, correctAttemptsCount);
        }

    }
}
refreshBtn.addEventListener("click", () => {
    wrongAttemptsCount = 0;
    correctAttemptsCount = 0;
    updateAttempts(wrongAttemptsCount, correctAttemptsCount);
    initGame();
});


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

function openPopup(message, persistent) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('progress').style.width = '0%';

    let width = 1;

    // Display the progress bar after 3 seconds
    setTimeout(() => {
        const interval = setInterval(function () {
            if (width >= 100) {
                clearInterval(interval);
                if (!persistent) {
                    closePopup();
                }
            } else {
                width += 3.5;
                document.getElementById('progress').style.width = width + '%';
            }
        }, 10);
    }, 1000);

    if (!persistent) {
        setTimeout(() => {
            closePopup();
        }, 10000);
    }
}


function closePopup() {
    document.getElementById('overlay').style.display = 'none';
}

const initGameAfterClick = () => {
    inputField.removeEventListener('click', initGameAfterClick);
    refreshTimer();
    startTimer(); // timer starts
};

window.onload = function () {
    const inputField = document.querySelector("input");
    inputField.addEventListener('click', (event) => {
        if (!modalIsOpen) {
            initGame();
            event.target.blur();
        }
    });
};


showLoaderAndOverlay();
