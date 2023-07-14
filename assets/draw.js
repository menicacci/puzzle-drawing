
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
            { locationSpot: go.Spot.Center },
            $(go.Shape, "Rectangle",
                {
                    fill: "lightgray",
                    stroke: null,
                    desiredSize: new go.Size(30, 30)
                },
                new go.Binding("fill", "fill")),
            $(go.TextBlock,
                new go.Binding("text", "text"))
        );

    myDiagram.linkTemplate =
        $(go.Link,
            { selectable: false },
            $(go.Shape,
                { strokeWidth: 3, stroke: "#333" }));
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
    myDiagram.startTransaction("change Layout");
    var lay = myDiagram.layout;
    lay.direction = 90;
    lay.layerSpacing = 100; // aumenta lo spazio tra i livelli
    lay.columnSpacing = 25;
    lay.cycleRemoveOption = go.LayeredDigraphLayout.CycleDepthFirst;
    lay.layeringOption = go.LayeredDigraphLayout.LayerOptimalLinkLength;
    lay.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveNone;
    lay.packOption = 7;
    lay.alignOption = go.LayeredDigraphLayout.AlignCenter; // allinea lo strato centrale
    lay.spouseSpacing = 30;
    myDiagram.scale = 1; // imposta lo scale del diagramma a 1
    myDiagram.isReadOnly = false; // rende il diagramma non editabile
    myDiagram.commitTransaction("change Layout"); 

    // Impostazione della posizione e della scala del diagramma
    var bounds = myDiagram.documentBounds;
    var scaleX = myDiagram.div.clientWidth / bounds.width;
    var scaleY = myDiagram.div.clientHeight / bounds.height;
    var scale = Math.min(scaleX, scaleY);
    scale = 0.2;
    myDiagram.scale = scale;
    var x = (myDiagram.div.clientWidth - bounds.width * scale) / 2; // calcola la posizione X per centrare il diagramma
    var y = (myDiagram.div.clientHeight - bounds.height * scale) / 2; // calcola la posizione Y per centrare il diagramma
    myDiagram.position = new go.Point(x, y);
    myDiagram.viewportBounds = new go.Rect(0, 0, bounds.width * scale, bounds.height * scale);

    // Centra il diagramma
    var diagramBounds = myDiagram.documentBounds;
    myDiagram.commandHandler.scrollToPart(myDiagram.findPartAt(diagramBounds.center));
    myDiagram.commandHandler.zoomToFit(diagramBounds);
    myDiagram.centerRect(diagramBounds);
}