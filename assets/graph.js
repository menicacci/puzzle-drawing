/*
    From an array of solution sequences, it generates a layered graph
    containing all solution. On any layer, there cannot be two equal
    puzzles.
 */
function initiateGraph(sequences) {
    let sol_len = sequences[0].length;
    let graph = Array.from(
        {length: sol_len}, () => []
    );

    // Populate graph
    sequences.forEach((seq) => {
        // Check if a configuration is already in the layer
        function check_graph_level(g_level, seq_elem) {
            for(let i = 0; i < g_level.length; i++) {
                if (equals(g_level[i].puzzle ,seq_elem.puzzle)) {
                    // If true, add the following move if it hasn't already
                    if (!g_level[i].moves.includes(seq_elem.move)) {
                        g_level[i].moves.push(seq_elem.move);
                    }
                    return false;
                }
            }
            return true;
        }
        // For each puzzle in the sequence, check if, on the corresponding
        // layer, the puzzle is present
        for (let j = 0; j < sol_len; j++) {
            if (check_graph_level(graph[j], seq[j]))
                graph[j].push({
                    puzzle: seq[j].puzzle,
                    moves: [seq[j].move]
                });
        }
    })
    return graph;
}

// Extract data from a graph
function extractGraphData(graph) {
    let nodeDataArray = [];
    let linkDataArray = [];
    // Stores the incremental key associated to a node
    let key_i = 1;
    // Look into each level of the graph, except the last one
    for (let i = 0; i < graph.length - 1; i++) {
        let l = graph[i].length;    // # of nodes inside the level
        let b = key_i;              // base index for the level

        graph[i].forEach((node) => {
            // Associate to each node a key based on the visiting order
            nodeDataArray.push({
                key: key_i,
                text: key_i.toString(),
                puzzle: node.puzzle
            });
            node.moves.forEach((move) => {
                /*
                    Associate to each link the key of the current node and
                    the key of the node on the next layer. This node, witch
                    hasn't been yet added to the array of nodes, has the
                    puzzle that corresponds to the current one after we
                    make the move.
                 */
                linkDataArray.push({
                    from: key_i,
                    to: b + l + (
                        // Find the node on the next layer
                        (g_level, state) => {
                            for (let j = 0; j < g_level.length; j++) {
                                if (equals(g_level[j].puzzle, state)) {
                                    return j;
                                }
                            }
                        }
                    )(graph[i + 1], makeMove(node.puzzle, move)),
                    // Translates the move for visualization purposes
                    move: move
                });
            });
            key_i++;
        })
    }

    // Add last node
    nodeDataArray.push({
        key: key_i,
        text: key_i.toString(),
        puzzle: graph[graph.length - 1][0].puzzle
    });

    return {nodes: nodeDataArray, links: linkDataArray};
}

// Returns a layered graph
function getGraph(puzzle, sols) {
    // Generate solution sequences
    let sequences = sols.map(
        sol => getSolSequence(puzzle, sol)
    );

    return initiateGraph(sequences);;
}

function generateGraphData(puzzle_data) {
    let graph = getGraph(puzzle_data.puzzle, puzzle_data.move_seq);

    return extractGraphData(graph);
}
