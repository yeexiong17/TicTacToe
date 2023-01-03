let clickBox = document.querySelectorAll(".box");
let display1 = document.getElementById("player1");
let display2 = document.getElementById("player2");
let again = document.getElementById("play-again");
let start = document.getElementById("start");
let blur = document.querySelector(".main");
let startPage = document.querySelector(".start-page");
let winPage = document.querySelector(".win-page");
let check1 = document.getElementsByName("player-1");
let check2 = document.getElementsByName("player-2");
let radio1 = document.querySelectorAll(".radio1");
let radio2 = document.querySelectorAll(".radio2");

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const Play = () => {

    // Player 1 info
    const player1 = {
        name: "Player 1",
        turn: true,
        sign: "x"
    };

    // Player 2 info
    const player2 = {
        name: "Player 2",
        turn: false,
        sign: "o"
    };

    const playMove = (index) => {

        let row = Math.floor(index / 3);
        let col = index % 3;

        // Validation and move for player 1
        if (gameBoard[row][col] == "" && player1.turn == true && player2.turn == false) {
            clickBox[index].innerHTML = player1.sign;
            gameBoard[row][col] = player1.sign;

            let isWin = checkWin();
            let isDraw = checkDraw();

            // Box cannot click when 1 player wins
            if (isWin == true || isDraw == true) {
                clickBox.forEach(box => {
                    box.removeEventListener('click', myFunction);
                });
                display2.textContent = player1.name + " Wins";

                playAgain();
            }

            if (isDraw == true) {
                display2.textContent = "Draw";
                playAgain();
            }

            player1.turn = false;
            player2.turn = true;

            display1.style.display = "none";
            display2.style.display = "block";

        }
        // Validation and move for player 2
        else if (gameBoard[row][col] == "" && player1.turn == false && player2.turn == true) {
            clickBox[index].innerHTML = player2.sign;
            gameBoard[row][col] = player2.sign;

            let isWin = checkWin();
            let isDraw = checkDraw();

            // Box cannot click when 1 player wins
            if (isWin == true || isDraw == true) {
                clickBox.forEach(box => {
                    box.removeEventListener('click', myFunction);
                });
                display1.textContent = player2.name + " Wins";
                playAgain();
            }

            if (isDraw == true) {
                display1.textContent = "Draw";
                playAgain();
            }

            player1.turn = true;
            player2.turn = false;

            display1.style.display = "block";
            display2.style.display = "none";

        }
    }

    const checkWin = () => {

        // Check Row
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] != "" && gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][0] == gameBoard[i][2]) {
                console.log(gameBoard[i][0] + " wins");

                return true;
            }
        }

        // Check Column
        for (let j = 0; j < 3; j++) {
            if (gameBoard[0][j] != "" && gameBoard[0][j] == gameBoard[1][j] && gameBoard[1][j] == gameBoard[2][j]) {
                console.log(gameBoard[0][j] + " wins");

                return true;
            }
        }

        // Check Diagonal
        if (gameBoard[0][0] != "" && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            console.log(gameBoard[0][0] + " wins");

            return true;
        }
        else if (gameBoard[0][2] != "" && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            console.log(gameBoard[0][2] + " wins");

            return true;
        }
    }

    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == "") {
                    return false;
                }
            }
        }

        if (checkWin()) {
            return false;
        }

        return true;
    }

    return { player1, player2, playMove };

}

function myFunction() {

    let index = this.id;

    run.playMove(index - 1);

}

// Wait 800ms then show play again screen
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function playAgain() {

    await delay(1000);
    winPage.style.display = "flex";
    blur.classList.add("blur-screen");

}

// When play again is clicked, everything refresh
function restart() {

    winPage.style.display = "none";
    blur.classList.remove("blur-screen");

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = "";
        }
    }

    for (let i = 0; i < 9; i++) {
        clickBox[i].innerHTML = "";
    }

    run.player1.turn = true;
    run.player2.turn = false;

    clickBox.forEach(box => {
        box.addEventListener('click', myFunction);
    });

    display1.style.display = "block";
    display2.style.display = "none";
    display1.textContent = `${run.player1.name}'s turn [${run.player1.sign}]`;
    display2.textContent = `${run.player2.name}'s turn [${run.player2.sign}]`;
}

// Start and sign selection page
function starting() {
    if (run.player1.sign == run.player2.sign) {
        alert("Choose Your Sign Again!");
    }
    else {
        startPage.classList.remove("slide-in");
        startPage.classList.add("slide-out");

        // Wait 150ms to set start page display to none
        playAgain2();
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        async function playAgain2() {

            await delay(150);
            startPage.style.display = "none";

        }
    }

}

// Assign the selected player sign into object
function playerSign() {
    for (let i = 0; i < 3; i++) {

        if (check1[i].checked && check1[i].value != "c") {
            let newSign1 = check1[i].value;
            run.player1.sign = newSign1;

            display1.textContent = `${run.player1.name}'s turn [${run.player1.sign}]`;
        }

        if (check2[i].checked && check2[i].value != "c") {
            let newSign2 = check2[i].value;
            run.player2.sign = newSign2;

            display2.textContent = `${run.player2.name}'s turn [${run.player2.sign}]`;
        }

    }
}

// Main Code
let run = Play();

start.addEventListener('click', starting);

radio1.forEach(check1 => {
    check1.addEventListener('click', playerSign);
});

radio2.forEach(check2 => {
    check2.addEventListener('click', playerSign);
});

clickBox.forEach(box => {
    box.addEventListener('click', myFunction);
});

again.addEventListener('click', restart);



