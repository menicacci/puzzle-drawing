
// Makes a move on a puzzle
function make_mave(puzzle, move) {
    let zero_index = puzzle.findIndex((n) => n == 0);
    let new_puzzle = [...puzzle];
    new_puzzle[zero_index] = new_puzzle[zero_index + move];
    new_puzzle[zero_index + move] = 0;

    return new_puzzle
}

// Generates an array containing the solution path for a puzzle
function get_sol_sequence(puzzle, sol) {
    let sequence = [];
    let state = puzzle;
    for (let i = 0; i < sol.length; i++) {
        sequence.push([state, sol[i]]);
        state = make_mave(state, sol[i]);
    }
    return sequence;
}

// Checks if two puzzle are equals
function equals(a, b) {
    return a.every((val, index) => val === b[index])
}