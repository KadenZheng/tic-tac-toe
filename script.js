document.addEventListener("DOMContentLoaded", () => {
    let board_html = document.querySelector(".board");
    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("dialog + button");
    const closeButton = document.querySelector("dialog button");

    //! Gameboard
    function Gameboard() {
        const rows = 3;
        const columns = 3;
        let board = [];

        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Space(`${i + 1}-${j + 1}`));
            }
        }

        const getGameboard = () => board;

        const printBoard = () => {
            const printableBoard = board.map((row) => row.map((space) => space.getMark()));
            console.log(printableBoard);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    board[i][j].createDisplay(board_html);
                }
            }
        };

        const makeMove = (row, column, marker) => {
            if (board[row - 1][column - 1].getMark() === "") {
                const spaceElement = document.querySelector(`.space-${row}-${column}`);
                if (spaceElement) {
                    spaceElement.querySelector("h5").textContent = marker;
                }
                board[row - 1][column - 1].makeMark(marker);
                return true;
            } else {
                console.log("Someone else has already played here.");
                return false;
            }
        };

        const resetBoard = () => {
            board = [];
            board_html.innerHTML = "";

            for (let i = 0; i < rows; i++) {
                board[i] = [];
                for (let j = 0; j < columns; j++) {
                    board[i].push(Space(`${i + 1}-${j + 1}`));
                }
            }

            printBoard();
        };

        return {
            getGameboard,
            printBoard,
            makeMove,
            resetBoard,
        };
    }

    //! Markers
    function Space(id) {
        let marker = "";
        let spaceID = id;
        row = [...spaceID][0];
        column = [...spaceID][1];

        const createDisplay = (board_html) => {
            let spaceHTML = document.createElement("div");
            spaceHTML.classList.add("space");
            spaceHTML.classList.add(`space-${spaceID}`);
            spaceHTML.innerHTML += `<h5>${marker}</h5>`;

            board_html.appendChild(spaceHTML);

            spaceHTML.addEventListener("mouseover", () => {
                spaceHTML.classList.add("hovered");
            });
            spaceHTML.addEventListener("mouseout", () => {
                spaceHTML.classList.remove("hovered");
            });
        };

        const makeMark = (playerToken) => {
            marker = playerToken;
        };

        const getMark = () => marker;

        return { getMark, makeMark, createDisplay };
    }

    //! Logging in console
    let gameboard = Gameboard();
    gameboard.printBoard();

    //! Game controller
    function gameController() {
        let gameboard = Gameboard();

        const players = { player0: "X", player1: "O" };
        let turn = 0;

        const playRound = (row, column) => {
            if (turn % 2 === 0 && gameboard.makeMove(row, column, players.player0)) {
                // Player 0 moves
                turn++;
                checkWinner();
            } else if (turn % 2 !== 0 && gameboard.makeMove(row, column, players.player1)) {
                // Player 1 moves
                turn++;
                checkWinner();
            }
        };

        // const newRound = () => {
        //     turn += 1;
        //     gameboard.printBoard();
        // };

        const checkWinner = () => {
            // Check rows
            for (let i = 0; i < gameboard.getGameboard().length; i++) {
                if (gameboard.getGameboard()[i][0].getMark() === "X" && gameboard.getGameboard()[i][1].getMark() === "X" && gameboard.getGameboard()[i][2].getMark() === "X") {
                    let winnerText = document.createElement("p");
                    winnerText.textContent = "Player X won!";
                    dialog.appendChild(winnerText);
                    dialog.showModal();
                    gameboard.resetBoard();
                    addEventListeners();
                    turn = 0;

                    // "Close" button closes the dialog
                    closeButton.addEventListener("click", () => {
                        dialog.close();
                        let winnerText = document.querySelector("dialog > p");
                        if (winnerText) {
                            if (winnerText) {
                                dialog.removeChild(winnerText);
                            }
                        }
                    });
                } else if (
                    gameboard.getGameboard()[i][0].getMark() === "O" &&
                    gameboard.getGameboard()[i][1].getMark() === "O" &&
                    gameboard.getGameboard()[i][2].getMark() === "O"
                ) {
                    let winnerText = document.createElement("p");
                    winnerText.textContent = "Player O won!";
                    dialog.appendChild(winnerText);
                    dialog.showModal();
                    gameboard.resetBoard();
                    addEventListeners();
                    turn = 0;

                    // "Close" button closes the dialog
                    closeButton.addEventListener("click", () => {
                        dialog.close();
                        let winnerText = document.querySelector("dialog > p");
                        if (winnerText) {
                            dialog.removeChild(winnerText);
                        }
                    });
                }
            }

            // Check the columns
            for (let i = 0; i < gameboard.getGameboard().length; i++) {
                if (gameboard.getGameboard()[0][i].getMark() === "X" && gameboard.getGameboard()[1][i].getMark() === "X" && gameboard.getGameboard()[2][i].getMark() === "X") {
                    let winnerText = document.createElement("p");
                    winnerText.textContent = "Player X won!";
                    dialog.appendChild(winnerText);
                    dialog.showModal();
                    gameboard.resetBoard();
                    addEventListeners();
                    turn = 0;

                    // "Close" button closes the dialog
                    closeButton.addEventListener("click", () => {
                        dialog.close();
                        let winnerText = document.querySelector("dialog > p");
                        if (winnerText) {
                            dialog.removeChild(winnerText);
                        }
                    });
                } else if (
                    gameboard.getGameboard()[0][i].getMark() === "O" &&
                    gameboard.getGameboard()[1][i].getMark() === "O" &&
                    gameboard.getGameboard()[2][i].getMark() === "O"
                ) {
                    let winnerText = document.createElement("p");
                    winnerText.textContent = "Player 0 won!";
                    dialog.appendChild(winnerText);
                    dialog.showModal();
                    gameboard.resetBoard();
                    addEventListeners();
                    turn = 0;

                    // "Close" button closes the dialog
                    closeButton.addEventListener("click", () => {
                        dialog.close();
                    });
                }
            }

            // Check diagonals
            if (
                (gameboard.getGameboard()[0][0].getMark() === "X" && gameboard.getGameboard()[1][1].getMark() === "X" && gameboard.getGameboard()[2][2].getMark() === "X") ||
                (gameboard.getGameboard()[0][2].getMark() === "X" && gameboard.getGameboard()[1][1].getMark() === "X" && gameboard.getGameboard()[2][0].getMark() === "X")
            ) {
                let winnerText = document.createElement("p");
                winnerText.textContent = "Player X won!";
                dialog.appendChild(winnerText);
                dialog.showModal();
                gameboard.resetBoard();
                addEventListeners();
                turn = 0;

                // "Close" button closes the dialog
                closeButton.addEventListener("click", () => {
                    dialog.close();
                    let winnerText = document.querySelector("dialog > p");
                    if (winnerText) {
                        dialog.removeChild(winnerText);
                    }
                });
            } else if (
                (gameboard.getGameboard()[0][0].getMark() === "O" && gameboard.getGameboard()[1][1].getMark() === "O" && gameboard.getGameboard()[2][2].getMark() === "O") ||
                (gameboard.getGameboard()[0][2].getMark() === "O" && gameboard.getGameboard()[1][1].getMark() === "O" && gameboard.getGameboard()[2][0].getMark() === "O")
            ) {
                let winnerText = document.createElement("p");
                winnerText.textContent = "Player O won!";
                dialog.appendChild(winnerText);
                dialog.showModal();
                gameboard.resetBoard();
                addEventListeners();
                turn = 0;

                // "Close" button closes the dialog
                closeButton.addEventListener("click", () => {
                    dialog.close();
                    let winnerText = document.querySelector("dialog > p");
                    if (winnerText) {
                        dialog.removeChild(winnerText);
                    }
                });
            }

            // Check for tie
            if (isBoardFull()) {
                let tieText = document.createElement("p");
                tieText.textContent = "It's a tie!";
                dialog.appendChild(tieText);
                dialog.showModal();
                gameboard.resetBoard();
                addEventListeners();
                turn = 0;

                // "Close" button closes the dialog
                closeButton.addEventListener("click", () => {
                    dialog.close();
                    let tieText = document.querySelector("dialog > p");
                    if (tieText) {
                        dialog.removeChild(tieText);
                    }
                });
            }
        };

        const isBoardFull = () => {
            return gameboard.getGameboard().every((row) => row.every((space) => space.getMark() !== ""));
        };

        const addEventListeners = () => {
            let spaces = document.querySelectorAll(".space");
            spaces.forEach((space) => {
                space.addEventListener("click", () => {
                    let row = [...space.classList[1]][6];
                    let column = [...space.classList[1]][8];
                    playRound(row, column);
                    console.log(gameboard.getGameboard());
                });
            });
        };

        addEventListeners();
        return { playRound };
    }

    const game = gameController();
});
