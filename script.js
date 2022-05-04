const Player = (name, symbol) => {
    return {name, symbol};
}

const playerX = Player('Player 1', 'X');
const playerO = Player('Player 2', 'O');
let turnTracker = 1;


const gameDisplay = (() => {
    let boardValues = ['', '', '', '', '', '', '', '', ''];
    const boardGrid = document.querySelector('.game-board');
    const postGame = document.querySelector('.post-game');
    const players = document.querySelector('.players');
    const winMessageContainer = document.createElement('div');


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
        const player1 = document.createElement('div');
        player1.classList.toggle('player1');
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
        player2.classList.toggle('player2');
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


    function createRenameButtons() {
        const player1Div = document.querySelector('.player1')
        const renameButton1 = document.createElement('button');
        renameButton1.type = 'button';
        renameButton1.classList.toggle('rename');
        renameButton1.textContent = 'Edit Name';
        player1Div.appendChild(renameButton1);
        renameButton1.addEventListener('click', () => {
            let nameDiv = player1Div.querySelector('.name');
            let newName = prompt('Enter your name:', `${nameDiv.textContent}`);
            nameDiv.textContent = newName;
            playerX.name = newName;
        });
            
        const player2Div = document.querySelector('.player2')
        const renameButton2 = document.createElement('button');
        renameButton2.type = 'button';
        renameButton2.classList.toggle('rename');
        renameButton2.textContent = 'Edit Name';
        player2Div.appendChild(renameButton2);
        renameButton2.addEventListener('click', () => {
            let nameDiv = player2Div.querySelector('.name');
            let newName = prompt('Enter your name:', `${nameDiv.textContent}`);
            nameDiv.textContent = newName; 
            playerO.name = newName;  
        });
        
    }


    function displayWinner() {
        const winMessage = document.createElement('div');
        winMessage.classList.toggle('win-message');
        winMessageContainer.appendChild(winMessage)
        players.insertBefore(winMessageContainer, players.lastElementChild);
        if (game.checkForWinner() == playerX.symbol) {
            winMessage.textContent = `${playerX.name} is the winner!`;
        } else if (game.checkForWinner() == playerO.symbol) {
            winMessage.textContent = `${playerO.name} is the winner!`;
        } else {
            winMessage.textContent = `It's a tie!`;
        }
    }


    function createRestartButton() {
        postGame.innerHTML = '';
        winMessageContainer.innerHTML = '';
        const restartButton = document.createElement('button');
            restartButton.type = 'button';
            restartButton.classList.toggle('restart');
            restartButton.textContent = 'Reset';
            postGame.appendChild(restartButton);
            restartButton.addEventListener('click', () => {
                gameDisplay.clearBoard();
                cells = document.querySelectorAll('.board-cell');
                game.playGame();
                turnTracker = 1;
        });
    }

    generateBoard();
    displayPlayers();
    createRenameButtons();
    return {generateBoard, clearBoard, displayWinner, createRestartButton}
})();


const game = (() => {
    let currentPlayer = playerX;
    let winner = false;


    function playGame() {
        gameDisplay.createRestartButton();
        let cells = document.querySelectorAll('.board-cell');
        cells.forEach(cell => cell.addEventListener ('click', calculateTurn));
        if (winner) {
            cells.forEach(cell => cell.removeEventListener ('click', calculateTurn));
            winner = false;
            gameDisplay.displayWinner();
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
        let cells = document.querySelectorAll('.board-cell');
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


    playGame();
    return {playGame, checkForWinner}
})();