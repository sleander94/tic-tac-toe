const Player = (name, symbol) => {
    return {name, symbol};
}


const gameBoard = (() => {
    let boardValues = ['', '', '', '', '', '', '', '', ''];
    const boardGrid = document.querySelector('.game-board');

    function generateBoard () {
        for (cell of boardValues) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.toggle('board-cell');
            cellDiv.textContent =  cell;
            boardGrid.appendChild(cellDiv);
        }
    }

    function clearBoard () {
        for (cell of boardValues) {
            cell = '';
        }
        boardGrid.innerHTML = '';
        this.generateBoard();
    }

    return {generateBoard, clearBoard};
})();


gameBoard.generateBoard();
const player1 = Player('Stephen', 'X');
const player2 = Player('Hannah', 'O');


const game = (() => {
    let turnTracker = 1;
    let currentPlayer = player1;
    startTurns(currentPlayer);




    function startTurns(player) {
        let cells = document.querySelectorAll('.board-cell');
        cells.forEach(cell => cell.addEventListener ('click', () => {
            if (turnTracker > 0) {
                currentPlayer = player1;
            } else {
                currentPlayer = player2;
            }
            if (cell.textContent == '') {
                cell.textContent = currentPlayer.symbol; 
                turnTracker *= -1;
                startTurns(currentPlayer);
            }
        }));
    }
})();