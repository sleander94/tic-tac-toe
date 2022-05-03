const Player = (name, symbol) => {
    return {name, symbol};
}

const playerX = Player('Player 1', 'X');
const playerO = Player('Player 2', 'O');


const gameGrid = (() => {
    let boardValues = ['', '', '', '', '', '', '', '', ''];
    const boardGrid = document.querySelector('.game-board');
    generateBoard();
    displayPlayers();


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

    function displayPlayers() {
        const players = document.querySelector('.players');

        const player1 = document.createElement('div')
        const player1Name = document.createElement('div');
        player1Name.classList.toggle('name');
        const player1Symbol = document.createElement('div');
        player1Symbol.classList.toggle('symbol');
        player1Name.textContent = playerX.name;
        player1Symbol.textContent = playerX.symbol;
        player1.appendChild(player1Name);
        player1.appendChild(player1Symbol);
        players.appendChild(player1);

        const player2 = document.createElement('div')
        const player2Name = document.createElement('div');
        player2Name.classList.toggle('name');
        const player2Symbol = document.createElement('div');
        player2Symbol.classList.toggle('symbol');
        player2Name.textContent = playerO.name;
        player2Symbol.textContent = playerO.symbol;
        player2.appendChild(player2Name);
        player2.appendChild(player2Symbol);
        players.appendChild(player2);
    }

    return {generateBoard, clearBoard}
})();


const game = (() => {
    let cells = document.querySelectorAll('.board-cell');
    let postGame = document.querySelector('.post-game');
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
        let winMessage = document.createElement('div');
        winMessage.classList.toggle('win-message');
        postGame.appendChild(winMessage);
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
            postGame.appendChild(restartButton);
            restartButton.addEventListener('click', () => {
                gameGrid.clearBoard();
                cells = document.querySelectorAll('.board-cell');
                winner = false;
                playGame();
                postGame.innerHTML = '';
        });
    }

})();