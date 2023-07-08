
/*
    From an array of solution sequences, it generates a layered graph
    containing all solution. On any layer, there cannot be two equal
    puzzles.
 */
function initiate_graph(sequences) {
    let graph = [];
    let sol_len = sequences[0].length;
    for(let i = 0; i < sol_len; i++)
        graph.push([]);
    // Populate graph
    sequences.forEach((seq) => {
        // Check if a configuration is already in the layer
        function check_graph_level(g_level, seq_elem) {
            for(let i = 0; i < g_level.length; i++) {
                if (equals(g_level[i].puzzle ,seq_elem.puzzle)) {
                    // If true, add the following move if it hasn't already
                    if (!g_level[i].moves.includes(seq_elem.move))
                        g_level[i].moves.push(seq_elem.move)
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

// Creates the links between the layers of the graph
function link_graph(graph) {
    // For each layer
    for (let i = 0; i < graph.length - 1; i++) {
        // For each node in a layer
        graph[i].forEach((node) => {
            // Variable that contains the links between one node and the nodes of the next layer
            let links = []
            // For each move that we can make from that node (puzzle)
            node.moves.forEach((move) => {
                /*
                    Add a link between the current node and the node on the next layer. This node has
                    the puzzle that corresponds to the current one after we make the move.
                 */
                links.push({
                    node_indx:
                        (
                            // Finds the node on the next layer
                            (g_l, state) => {
                                for (let j = 0; j < g_l.length; j++) {
                                    if (equals(g_l[j].puzzle, state))
                                        return j;
                                }
                            })(
                            graph[i + 1], make_move(node.puzzle, move)
                        ),
                    type:
                        // Translates the move for visualization purposes
                        (
                            (m) => {
                                switch (m) {
                                    case 1:
                                        return 'R';
                                    case -1:
                                        return 'L';
                                    case 4:
                                        return 'D';
                                    case -4:
                                        return 'U';
                                }
                            }
                        )(move)
                    }
                );
            });
            node.moves = links;
        })
    }
}

// Extract data from a graph
function extract_graph_data(graph) {
    let nodeDataArray = [];
    let linkDataArray = [];

    let i = 1;
    // Look into each level of the graph
    graph.forEach((level) => {
        let l = level.length;   // # of nodes inside the level
        let b = i;              // base index for the level

        level.forEach((node) => {
            // Associate to each node a key based on the visiting order
            nodeDataArray.push({
                key: i,
                text: i.toString()
            });
            node.moves.forEach((move) => {
                /*
                    Associate to each link the key of the current node and
                    the key of the node specified inside the move array.
                    This node is on the next level and is not yet added to
                    the array of nodes.
                 */
                linkDataArray.push({
                    from: i,
                    to: b + l + move.node_indx,
                    text: move.type
                });
            })
            i++;
        })
    })
    return {nodes: nodeDataArray, links: linkDataArray};
}

// Returns a layered graph
function get_graph(puzzle, sols) {
    // Generate solution sequences
    let sequences = []
    sols.forEach((sol) => {
        sequences.push(get_sol_sequence(puzzle, sol));
    })

    // Initiate layered graph
    let graph = initiate_graph(sequences);

    // Link nodes in each layer
    link_graph(graph);

    return graph;
}

function get_graph_data(puzzle_data) {
    return extract_graph_data(
        get_graph(puzzle_data.puzzle, puzzle_data.move_seq)
    );
}
