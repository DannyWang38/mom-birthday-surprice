const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
let circleTurn;

startGame();
restartButton.addEventListener("click", startGame);
// window.alert(window.screen.availHeight)
// window.alert(window.screen.availWidth)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);

        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // console.log(cell);
    // place mark
    placeMark(cell, currentClass);
    // check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // check for draw
        // switch turn
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `平手! \n 柏翰愛玩手機 \n 😏😏😏😏`;
    } else {
    // winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} 勝利!\n 媽媽生日快樂唷!`;
    winningMessageTextElement.innerText = `媽媽\n生日快樂唷!\n🎂🎂🎂 \n 我愛你\n💓💓💓`;

}
    winningMessageElement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return (
            cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        );
    });
}
console.log([...cellElements]); // node=>array

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}