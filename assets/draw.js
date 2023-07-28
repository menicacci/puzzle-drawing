let imageWindow;

// Diagram set-up
function init() {
    const $ = go.GraphObject.make;

    myDiagram =
        new go.Diagram("graphDiv",
            {
                initialAutoScale: go.Diagram.UniformToFill,
                layout: $(go.LayeredDigraphLayout, { alignOption: go.LayeredDigraphLayout.AlignAll })
            });

    myDiagram.nodeTemplate =
        $(go.Node, "Spot",
            {
                selectionAdorned: false,
                selectionChanged: onSelectionChangedNode,
                locationSpot: go.Spot.Center,
            },
            $(go.Shape, "Rectangle",
                {
                    name: "icon",
                    fill: "lightsteelblue",
                    stroke: null,
                    desiredSize: new go.Size(140, 140)
                },
                new go.Binding("fill", "fill")),
            $(go.TextBlock,
                {
                    font: "60px sans-serif",
                    textAlign: "center"
                },
                new go.Binding("text", "text"))
        );

    myDiagram.linkTemplate =
        $(go.Link,
            {
                selectionChanged: onSelectionChangedLink,
                selectionAdornmentTemplate:
                    $(go.Adornment,
                        $(go.Shape,
                            { isPanelMain: true, stroke: "dodgerblue", strokeWidth: 15 }),
                        $(go.Shape,
                            { toArrow: "Standard", fill: "dodgerblue", stroke: null, scale: 1 })
                    ),
                routing: go.Link.Normal,
                curve: go.Link.Bezier,
                toShortLength: 2
            },
            $(go.Shape,
                { name: "OBJSHAPE", strokeWidth: 15, stroke: "#3B444B" }),
            $(go.Shape,
                { name: "ARWSHAPE", toArrow: "Standard" }),

        );
}

// Draw the diagram
function generateDigraph(i) {
    myDiagram.startTransaction("generateDigraph");
    generateData(i);
    layout();
    myDiagram.commitTransaction("generateDigraph");
}

// Set nodes and links for the diagram
function generateData(i) {
    let data = generateGraphData(dataset[i]);
    myDiagram.model.nodeDataArray = data.nodes;
    myDiagram.model.linkDataArray = data.links;
}

function layout() {
    // Layout configuration
    myDiagram.startTransaction("change Layout");
    var lay = myDiagram.layout;
    lay.direction = 90;
    lay.layerSpacing = 250;
    lay.columnSpacing = 100;
    lay.cycleRemoveOption = go.LayeredDigraphLayout.CycleDepthFirst;
    lay.layeringOption = go.LayeredDigraphLayout.LayerOptimalLinkLength;
    lay.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveNone;
    lay.packOption = 7;
    lay.alignOption = go.LayeredDigraphLayout.AlignCenter;
    lay.spouseSpacing = 80;
    myDiagram.scale = 1;
    myDiagram.isReadOnly = false;
    myDiagram.commitTransaction("change Layout"); 

    // Setting the position and scale of the diagram
    let bounds = myDiagram.documentBounds;
    let scale = 0.2;
    myDiagram.scale = scale;
    let x = (myDiagram.div.clientWidth - bounds.width * scale) / 2;
    let y = (myDiagram.div.clientHeight - bounds.height * scale) / 2;
    myDiagram.position = new go.Point(x, y);
    myDiagram.viewportBounds = new go.Rect(0, 0, bounds.width * scale, bounds.height * scale);

    // Center the diagram
    var diagramBounds = myDiagram.documentBounds;
    myDiagram.commandHandler.scrollToPart(myDiagram.findPartAt(diagramBounds.center));
    myDiagram.commandHandler.zoomToFit(diagramBounds);
    myDiagram.centerRect(diagramBounds);
}

function onSelectionChangedNode(node) {
    let icon = node.findObject("icon");
    if (icon !== null) {
        if (node.isSelected) {
            icon.fill = "darkorange";
            showImageWindow(node, generateImage(node.data.puzzle, 30, 15));
        }
        else {
            icon.fill = "lightsteelblue";
            hideImageWindow();
        }
    }
}

function onSelectionChangedLink(link) {
    let node = myDiagram.findNodeForKey(link.data.from);
    let icon = node.findObject("icon");

    if (icon !== null) {
        if (link.isSelected) {
            showImageWindow(node, generateImage(node.data.puzzle, 30, 15, link.data.move));
        }
        else {
            hideImageWindow();
        }
    }
}

function showImageWindow(node, imageUrl) {
    if (!imageWindow) {
        // Create the image window if it doesn't exist
        imageWindow = document.createElement("div");
        imageWindow.id = "imageWindow";
        imageWindow.style.position = "absolute";
        imageWindow.style.zIndex = "10";

        imageWindow.appendChild(( () => {
                let img = document.createElement("img");
                img.style.maxWidth = "100%";
                return img;
            })()
        );

        // Append the image window to the document body
        document.body.appendChild(imageWindow);
    }
    // Update the image URL and show the image window
    let imageElement = imageWindow.querySelector("img");
    imageElement.src = imageUrl;
    imageWindow.style.display = "block";

    // Position the image window relative to the node's element
    let diagramPosition = myDiagram.transformDocToView(node.position);
    imageWindow.style.top = (diagramPosition.y + node.actualBounds.height) + "px";
    imageWindow.style.left = (diagramPosition.x + node.actualBounds.width) + "px";
}


function hideImageWindow() {
    if (imageWindow) {
        imageWindow.style.display = "none";
    }
}
