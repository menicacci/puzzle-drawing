function generateImage(puzzle, cellSize, fontSize, move) {
    // Define the dimensions of the image
    let imageSize = cellSize*4;

    // Create a canvas element
    let canvas = document.createElement('canvas');
    canvas.width = imageSize;
    canvas.height = imageSize;

    // Get the 2D drawing context
    let context = canvas.getContext('2d');

    // Draw the background
    context.beginPath();
    context.rect(0, 0, imageSize, imageSize);
    context.fillStyle = '#f0f0f0';
    context.fill();

    // Define the font
    context.font = fontSize.toString() + 'px sans-serif';
    context.fillStyle = 'black';

    for (let i = 0; i < puzzle.length; i++) {
        let row = Math.floor(i / 4);
        let col = i % 4;

        // Calculate the coordinates of the cell rectangle
        let x1 = col * cellSize;
        let y1 = row * cellSize;

        // Draw the cell rectangle
        context.beginPath();
        context.rect(x1, y1, cellSize, cellSize);
        context.lineWidth = 1.5;
        context.strokeStyle = 'black';
        context.stroke();

        let num = puzzle[i];
        if (num !== 0) {
            // Write the number inside the cell
            let text = num.toString();
            let textWidth = context.measureText(text).width;
            let textHeight = fontSize;
            let textX = x1 + (cellSize - textWidth) / 2;
            let textY = y1 + (cellSize + textHeight) / 2;
            context.fillText(text, textX, textY);
        }
    }

    if (move !== undefined) {
        let emptySquareIndex = findZero(puzzle);

        let fromRow = Math.floor(emptySquareIndex / 4);
        let fromCol = emptySquareIndex % 4;
        let toRow = fromRow;
        let toCol = fromCol;

        // Update the destination coordinates based on the move direction
        if (move === 1) {
            toCol += 1; // Move right
        } else if (move === -1) {
            toCol -= 1; // Move left
        } else if (move === 4) {
            toRow += 1; // Move down
        } else if (move === -4) {
            toRow -= 1; // Move up
        }

        // Calculate the coordinates of the arrow
        let x1 = toCol * cellSize + cellSize / 2;
        let y1 = toRow * cellSize + cellSize / 2;
        let x2 = fromCol * cellSize + cellSize / 2;
        let y2 = fromRow * cellSize + cellSize / 2;

        // Draw the line
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = 2;
        context.strokeStyle = 'darkorange';
        context.stroke();

        // Draw the arrowhead
        let arrowSize = 10;
        let angle = Math.atan2(y2 - y1, x2 - x1);
        let arrowX1 = x2 - arrowSize * Math.cos(angle - Math.PI / 6);
        let arrowY1 = y2 - arrowSize * Math.sin(angle - Math.PI / 6);
        let arrowX2 = x2 - arrowSize * Math.cos(angle + Math.PI / 6);
        let arrowY2 = y2 - arrowSize * Math.sin(angle + Math.PI / 6);
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(arrowX1, arrowY1);
        context.lineTo(arrowX2, arrowY2);
        context.closePath();
        context.fillStyle = 'darkorange';
        context.fill();
    }

    // Return the image as a data URL
    return canvas.toDataURL();
}