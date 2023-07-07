
/*
    From an array of solution sequences, it generates a layered graph
    containing all solution. On any layer, there cannot be two equal
    puzzles.
 */
function initiate_graph(sequences) {
    let graph = []
    for(let i = 0; i < sequences[0].length; i++)
        graph.push([])
    // Populate graph
    sequences.forEach((seq) => {
        // Check if a configuration is already in the layer
        function check_graph_level(g_level, seq_elem) {
            for(let i = 0; i < g_level.length; i++) {
                if (equals(g_level[i][0],seq_elem[0])) {
                    // If true, add the following move if it hasn't already
                    if (!g_level[i][1].includes(seq_elem[1]))
                        g_level[i][1].push(seq_elem[1])
                    return false;
                }
            }
            return true;
        }
        // For each puzzle in the sequence, checks if, on the corresponding
        // layer, the puzzle is present
        for (let j = 0; j < sequences[0].length; j++) {
            if (check_graph_level(graph[j], seq[j]))
                graph[j].push([seq[j][0], [seq[j][1]]]);
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
            node[1].forEach((move) => {
                // Add a link between the current node and the node on the next layer. This node, has
                // the puzzle that corresponds to the current one after we make the move.
                // We are pushing an array of this format: [pos (int), move (string)], where pos
                // represent the position of the node on the next layer
                links.push(
                    [
                        (
                            // Finds the node on the next layer
                            (g_l, state) => {
                                for (let j = 0; j < g_l.length; j++) {
                                    if (equals(g_l[j][0], state))
                                        return j;
                                }
                            })(graph[i + 1], make_mave(node[0], move)
                        ),
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
                    ]
                )
            })
            node[1] = links
        })
    }
}

// Extract data from a graph
function extract_graph_data(graph) {
    let nodeDataArray = [];
    let linkDataArray = [];

    let i = 1
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
            node[1].forEach((move) => {
                /*
                    Associate to each link the key of the current node and
                    the key of the node specified inside the move array.
                    This node is on the next level and is not yet added to
                    the array of nodes.
                 */
                linkDataArray.push({
                    from: i,
                    to: b + l + move[0],
                    text: move[1]
                })
            })
            i++;
        })
    })
    return [nodeDataArray, linkDataArray];
}

// Returns a layered graph
function get_graph(puzzle, sols) {
    // Generate solution sequences
    let sequences = []
    sols.forEach((sol) => {
        sequences.push(get_sol_sequence(puzzle, sol));
    })

    // Initiate layered graph
    let graph = initiate_graph(sequences)
    // Link nodes in each layer
    link_graph(graph)

    return graph;
}

function get_graph_data(puzzle, sols) {
    return extract_graph_data(
        get_graph(puzzle, sols)
    );
}
