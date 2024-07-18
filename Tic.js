document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
        );

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.color = currentPlayer === 'X' ? '#007bff' : '#28a745';

        if (checkWin()) {
            statusMessage.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            statusMessage.textContent = 'Game ended in a tie!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (
                gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                return true;
            }
        }
        return false;
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.textContent = `It's ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#000';
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
