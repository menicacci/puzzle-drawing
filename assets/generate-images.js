function generateImage(puzzle, cellSize, fontSize) {
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
    context.fillStyle = '#f0f0f0'; // Set the background color to light gray
    context.fill();

    // Define the font
    context.font = fontSize.toString() + 'px sans-serif';
    context.fillStyle = 'black'; // Set the color of the numbers to black

    for (let i = 0; i < puzzle.length; i++) {
        let row = Math.floor(i / 4); // Row number (0-3)
        let col = i % 4;                // Column number (0-3)

        // Calculate the coordinates of the cell rectangle
        let x1 = col * cellSize;
        let y1 = row * cellSize;

        // Draw the cell rectangle
        context.beginPath();
        context.rect(x1, y1, cellSize, cellSize);
        context.strokeStyle = 'black';
        context.stroke();

        const num = puzzle[i];
        if (num !== 0) {
            // Write the number inside the cell
            let text = num.toString();
            let textWidth = context.measureText(text).width;
            let textHeight = 20;
            let textX = x1 + (cellSize - textWidth) / 2;
            let textY = y1 + (cellSize - textHeight) / 2 + textHeight;
            context.fillText(text, textX, textY);
        }
    }

    // Return the image as a data URL
    return canvas.toDataURL();
}