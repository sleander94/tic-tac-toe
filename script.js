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
        boardGrid.innerHTML = '';
        generateBoard();
    }

    return {generateBoard, clearBoard}
})();


const playerX = Player('Stephen', 'X');
const playerO = Player('Hannah', 'O');


const game = (() => {
    let cells = document.querySelectorAll('.board-cell');
    let controls = document.querySelector('.controls');
    let turnTracker = 1;
    let currentPlayer = playerX;
    let winner = false;
    playGame();


    function playGame() {
        cells.forEach(cell => cell.addEventListener ('click', calculateTurn));
        if (winner) {
            cells.forEach(cell => cell.removeEventListener ('click', calculateTurn));
            displayWinner();
            createRestartButton();
        }
    }


    function calculateTurn() {
        if (turnTracker > 0) {
            currentPlayer = playerX;
        } else {
            currentPlayer = playerO;
        }
        if (this.textContent == '') {
            this.textContent = currentPlayer.symbol; 
            turnTracker *= -1;
            if (checkForWinner()) {
                winner = true;
                playGame();
            } 
        }
    }


    function checkForWinner() {
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


    function displayWinner() {
        let winMessage = document.createElement('p');
        winMessage.classList.toggle('win-message');
        controls.appendChild(winMessage);
        if (checkForWinner() == playerX.symbol) {
            winMessage.textContent = `${playerX.name} is the winner!`;
        } else if (checkForWinner() == playerO.symbol) {
            winMessage.textContent = `${playerO.name} is the winner!`;
        } else {
            winMessage.textContent = `It's a tie!`;
        }
    }
    


    function createRestartButton() {
        let restartButton = document.createElement('button');
            restartButton.type = 'button';
            restartButton.classList.toggle('restart');
            restartButton.textContent = 'Play Again?';
            controls.appendChild(restartButton);
            restartButton.addEventListener('click', () => {
                gameBoard.clearBoard();
                cells = document.querySelectorAll('.board-cell');
                winner = false;
                playGame();
                controls.removeChild(restartButton);
        });
    }

})();