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






const Player = (name, symbol) => {
    function placeSymbol() {
        let cells = document.querySelectorAll('.board-cell');
        cells.forEach(cell => cell.addEventListener ('click', () => {
            if (cell.textContent == '') {
                cell.textContent = this.symbol;
            }
        }));
    }
    return {name, symbol, placeSymbol};
}




gameBoard.generateBoard();
const player1 = Player('Stephen', 'X');
player1.placeSymbol();
