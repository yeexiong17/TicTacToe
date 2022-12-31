let clickBox = document.querySelectorAll(".box");
let display1 = document.getElementById("player1");
let display2 = document.getElementById("player2");
let again = document.getElementById("play-again");
let start = document.getElementById("start");
let blur = document.querySelector(".main");
let startPage = document.querySelector(".start-page");
let winPage = document.querySelector(".win-page");

const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const Play = () => {

    const player1 = {
        name: "Player 1",
        turn: true,
        sign: "x"
    };

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
                console.log(gameBoard[i][0]);

                return true;
            }
        }

        // Check Column
        for (let j = 0; j < 3; j++) {
            if (gameBoard[0][j] != "" && gameBoard[0][j] == gameBoard[1][j] && gameBoard[1][j] == gameBoard[2][j]) {
                console.log(gameBoard[0][j]);

                return true;
            }
        }

        // Check Diagonal
        if (gameBoard[0][0] != "" && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            console.log(gameBoard[0][0]);

            return true;
        }
        else if (gameBoard[0][2] != "" && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            console.log(gameBoard[0][2]);

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

    await delay(800);
    winPage.style.display = "flex";
    blur.classList.add("blur-screen");

}

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
    display1.textContent = run.player1.name + "'s turn [x]";
    display2.textContent = run.player2.name + "'s turn [o]";
}

function starting() {
    startPage.classList.remove("slide-in");
    startPage.classList.add("slide-out");

    playAgain2();
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function playAgain2() {

        await delay(150);
        startPage.style.display = "none";

    }

}

// Main Code
let run = Play();

display1.textContent = run.player1.name + "'s turn [x]";
display2.textContent = run.player2.name + "'s turn [o]";

start.addEventListener('click', starting);

clickBox.forEach(box => {
    box.addEventListener('click', myFunction);
});

again.addEventListener('click', restart);


