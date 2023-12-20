document.addEventListener("DOMContentLoaded", function () {
    const target = document.getElementById("target");
    const startButton = document.getElementById("startButton");
    const result = document.getElementById("result");
    const countdown = document.getElementById("countdown"); // Added countdown element
    const reaction = document.getElementById("reaction"); // Added reaction element
    let startTime, endTime, countdownTimer;

    startButton.addEventListener("click", function () {
        if (!countdownTimer) {
            resetTest();
            countdownTimer = startCountdown();
        }
    });

    target.addEventListener("click", function () {
        if (startTime) {
            endTime = new Date();
            const reactionTime = endTime - startTime;
            result.innerText = "Your reaction time is: " + reactionTime + " ms";
            reaction.innerText = getReactionMessage(reactionTime);
            target.style.backgroundColor = "#3498db"; // Change back to blue
        }
    });

    function resetTest() {
        startTime = null;
        endTime = null;
        result.innerText = "";
        reaction.innerText = ""; // Clear the reaction message
        target.style.backgroundColor = "#3498db";
        startButton.disabled = true;
        clearTimeout(countdownTimer);
        countdown.innerText = "";
    }

    function startCountdown() {
        let seconds = 3;
        countdown.innerText = seconds;

        return setInterval(function () {
            seconds--;

            if (seconds > 0) {
                countdown.innerText = seconds;
            } else {
                countdown.innerText = "";
                showTarget();
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        }, 1000);
    }

    function showTarget() {
        target.style.backgroundColor = "#e74c3c";
        startTime = new Date();
        startButton.disabled = false;
    }

    function getReactionMessage(time) {
        if (time < 100) {
            return "Incredible! Lightning-fast reaction!";
        } else if (time < 200) {
            return "Excellent! Your reflexes are impressive!";
        } else if (time < 300) {
            return "Well done! You have above-average reflexes!";
        } else if (time < 500) {
            return "Good job! Your reaction time is average.";
        } else {
            return "Keep practicing! You can improve your reaction time.";
        }
    }
});