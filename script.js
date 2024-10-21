console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let player1 = "X";  // Default name for player X
let player2 = "O";  // Default name for player O
let turn = "X";
let isgameover = false;
let moveStack = [];  // Stack to keep track of moves

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            let winner = boxtext[e[0]].innerText === "X" ? player1 : player2;
            document.querySelector('.info').innerText = winner + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

// Start Game Logic (Submit Names)
document.getElementById("startGame").addEventListener("click", () => {
    // Get player names from input fields
    player1 = document.getElementById("player1").value || "Player X";
    player2 = document.getElementById("player2").value || "Player O";
    // Update the initial turn info
    document.getElementsByClassName("info")[0].innerText = "Turn for " + player1;
    // Hide the 'Turn for Player one' message and input section
    document.getElementById("infoBeforeSubmit").style.display = "none";
    document.querySelector(".inputSection").style.display = "none";
});

// Main Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            moveStack.push({ element: boxtext, player: turn });
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + (turn === "X" ? player1 : player2);
            }
        }
    });
});

// Undo Button Logic
document.getElementById("undo").addEventListener('click', () => {
    if (moveStack.length > 0 && !isgameover) {
        let lastMove = moveStack.pop();
        lastMove.element.innerText = '';
        turn = lastMove.player;
        document.getElementsByClassName("info")[0].innerText = "Turn for " + (turn === "X" ? player1 : player2);
    }
});

// Reset Button Logic
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    moveStack = [];
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + player1;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
