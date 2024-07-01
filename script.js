//! Gameboard
function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Space());
        }
    }

    const getGameboard = () => board;

    const printBoard = () => {
        const printableBoard = board.map((row) => row.map((space) => space.getMark()));
        console.log(printableBoard);
    };

    const makeMove = (row, column, marker) => {
        if (board[row - 1][column - 1].getMark() === "_") {
            board[row - 1][column - 1].makeMark(marker);
        } else {
            console.log("Someone else has already played here.");
        }
    };

    return {
        getGameboard,
        printBoard,
        makeMove,
    };
}

//! Markers
function Space() {
    let marker = "_";

    const makeMark = (playerToken) => {
        marker = playerToken;
    };

    const getMark = () => marker;

    return { getMark, makeMark };
}

//! Logging in console
let gameboard = Gameboard();
gameboard.printBoard();

//! Game controller
function gameController() {
    let gameboard = Gameboard();

    const players = { player0: "X", player1: "O" };
    let turn = 0;
    let winner = false;

    const playRound = (row, column) => {
        if (turn % 2 === 0) {
            // Player 0 moves
            gameboard.makeMove(row, column, players.player0);
        } else {
            // Player 1 moves
            gameboard.makeMove(row, column, players.player1);
        }
    };

    const newRound = () => {
        turn += 1;
        gameboard.printBoard();
    };

    return { playRound, newRound };
}

const game = gameController();
