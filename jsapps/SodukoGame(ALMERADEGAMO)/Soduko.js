let selectedCell = null;
const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let currentBoard = JSON.parse(JSON.stringify(initialBoard));

function initializeBoard() {
    const boardContainer = document.getElementById('sudoku-board');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = currentBoard[i][j] !== 0 ? currentBoard[i][j] : '';
            if (initialBoard[i][j] !== 0) {
                cell.classList.add('given');
            }

            if (initialBoard[i][j] === 0) {
                cell.classList.add('input-cell');
                cell.contentEditable = true;
            }

            cell.addEventListener('click', () => selectCell(i, j));

            boardContainer.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    const cells = document.querySelectorAll('.cell');
    const cellIndex = row * 9 + col;

    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }

    selectedCell = cells[cellIndex];
    selectedCell.classList.add('selected');
}

function updateBoardUI() {
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cellIndex = i * 9 + j;
            const cell = cells[cellIndex];
            cell.textContent = currentBoard[i][j] !== 0 ? currentBoard[i][j] : '';
        }
    }
}

function solveSudoku() {
    if (solveSudokuHelper(currentBoard)) {
        updateBoardUI();
        showModal('Success! Sudoku solved.');
    } else {
        showModal('No solution exists!');
    }
}

async function solveSudokuHelper(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        updateBoardUI();

                        await sleep(100);

                        if (solveSudokuHelper(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                        updateBoardUI();
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxStartRow + i][boxStartCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearBoard() {
    currentBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    updateBoardUI();
}

function showModal(message) {
    const modal = document.getElementById('success-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}

document.addEventListener('input', (event) => {
    if (selectedCell && selectedCell.classList.contains('input-cell')) {
        const inputValue = event.target.textContent.trim();
        if (/^[1-9]$/.test(inputValue)) {
            const row = Math.floor(selectedCell.cellIndex / 9);
            const col = selectedCell.cellIndex % 9;
            currentBoard[row][col] = parseInt(inputValue);
            updateBoardUI();
        } else {
            // Reset the content if invalid input is detected
            event.target.textContent = '';
        }
    }
});

document.addEventListener('click', (event) => {
    // Deselect the cell if clicking outside the board
    if (!event.target.classList.contains('cell')) {
        if (selectedCell) {
            selectedCell.classList.remove('selected');
            selectedCell = null;
        }
    }
});

initializeBoard();