# Puzzle Drawing

### Small project for Data Visualization course

The objective is to depict the complete set of optimal solutions for a given state in the 15 puzzle game using a layered graph structure.

For a solution to be considered optimal, it must be achieved through the shortest possible sequence of moves. Therefore, all solutions have the same length in terms of moves.

![puzzle1](https://github.com/menicacci/puzzle-drawing/assets/105044910/5a460c1d-76ae-4de9-87c3-5d65b2573bf6)


In this representation, each node corresponds to a distinct puzzle configuration, and the edges between nodes illustrate the specific moves taken to transition from one state to another.

Since each node represents a unique state, the solutions will tend to separate at the beginning and then progressively reunite, until arriving at a single final state.

<table>
  <tr>
    <td><img src="https://github.com/menicacci/puzzle-drawing/assets/105044910/98afbcce-5492-4414-9eb4-2406df9cadb7" alt="Image 1"></td>
    <td><img src="https://github.com/menicacci/puzzle-drawing/assets/105044910/3d860f00-b22e-42e3-a9f8-71ead42168d9" alt="Image 2"></td>
  </tr>
</table>
