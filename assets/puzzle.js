// Makes a move on a puzzle
function makeMove(puzzle, move) {
    let zero_index = findZero(puzzle);
    let new_puzzle = [...puzzle];
    new_puzzle[zero_index] = new_puzzle[zero_index + move];
    new_puzzle[zero_index + move] = 0;

    return new_puzzle;
}

// Generates an array containing the solution path for a puzzle
function getSolSequence(puzzle, sol) {
    let sequence = [];
    let state = puzzle;
    for (let i = 0; i < sol.length; i++) {
        sequence.push({
            puzzle: state,
            move: sol[i]
        });
        state = makeMove(state, sol[i]);
    }
    return sequence;
}

// Find the index of the empty square (0) in the puzzle
function findZero(puzzle) {
    return puzzle.indexOf(0);
}

// Checks if two puzzle are equals
function equals(a, b) {
    return a.every((val, index) => val === b[index]);
}