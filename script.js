const gameBoard = (() => {
    let boardValues = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
    const boardGrid = document.querySelector('.game-board');
    console.log(boardValues);

    for (cell of boardValues) {
        let cellDiv = document.createElement('div');
        cellDiv.classList.toggle('board-cell');
        cellDiv.textContent =  cell;
        boardGrid.appendChild(cellDiv);
    }
})();





















const Player = (name, number) => {
    return {name, number};
}

const player1 = Player('stephen', 'one');
