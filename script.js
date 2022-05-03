const Player = (name, symbol) => {
    return {name, symbol};
}


const gameBoard = (() => {
    let boardValues = ['', '', '', '', '', '', '', '', ''];
    const boardGrid = document.querySelector('.game-board');
    generateBoard();

    function generateBoard() {
        for (cell of boardValues) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.toggle('board-cell');
            cellDiv.textContent =  cell;
            boardGrid.appendChild(cellDiv);
        }
    }

    function clearBoard() {
        for (cell of boardValues) {
            cell = '';
        }
        boardGrid.innerHTML = '';
        this.generateBoard();
    }

    return {generateBoard, clearBoard}
})();


const player1 = Player('Stephen', 'X');
const player2 = Player('Hannah', 'O');


const game = (() => {
    let cells = document.querySelectorAll('.board-cell');
    let turnTracker = 1;
    let currentPlayer = player1;
    startTurns(currentPlayer);


    function checkOutcome() {
        let cellsArray = Array.from(cells);
        let cellsList = [];
        cellsArray.forEach(cell => cellsList.push(cell.textContent));
        if (cellsList.includes('')) {
            if (cellsList[2] != '') {
                if (cellsList[0] === cellsList[1] && cellsList[1] === cellsList[2]) {
                return cellsList[2];
                } else if (cellsList[2] === cellsList[5] && cellsList[5] === cellsList[8]) {
                    return cellsList[2];
                }  
            } 
            if (cellsList[6] != '') {
                if (cellsList[0] === cellsList[3] && cellsList[3] === cellsList[6]) {
                    return cellsList[6];
                } else if (cellsList[6] === cellsList[7] && cellsList[7] === cellsList[8]) {
                    return cellsList[6];
                }
            } 
            if (cellsList[4] != '') {
                if (cellsList[0] === cellsList[4] && cellsList[4] === cellsList[8]) {
                    return cellsList[4];
                } else if (cellsList[1] === cellsList[4] && cellsList[4] === cellsList[7]) {
                    return cellsList[4];
                } else if (cellsList[2] === cellsList[4] && cellsList[4] === cellsList[6]) {
                    return cellsList[4];
                } else if (cellsList[3] === cellsList[4] && cellsList[4] === cellsList[5]) {
                    return cellsList[4];
                }
            }
        } else {
            return 'tie';
        }
    }


    function startTurns(player) {
        cells.forEach(cell => cell.addEventListener ('click', () => {
            if (turnTracker > 0) {
                currentPlayer = player1;
            } else {
                currentPlayer = player2;
            }
            if (cell.textContent == '') {
                cell.textContent = currentPlayer.symbol; 
                turnTracker *= -1;
                if (checkOutcome()) {
                    if (checkOutcome() == player1.symbol) {
                        console.log(`${player1.name} is the winner!`);
                    } else if (checkOutcome() == player2.symbol) {
                        console.log(`${player2.name} is the winner!`);
                    } else {
                        console.log(`It's a tie!`);
                    }
                
                } else {
                     startTurns(currentPlayer);
                }
            }
        }));
    }
})();