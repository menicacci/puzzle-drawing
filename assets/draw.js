
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

// TODO: Adjust parameters
function layout() {
    myDiagram.startTransaction("change Layout");
    var lay = myDiagram.layout;
    lay.direction = 90;
    lay.layerSpacing = 25;
    lay.columnSpacing = 25;
    lay.cycleRemoveOption = go.LayeredDigraphLayout.CycleDepthFirst;
    lay.layeringOption = go.LayeredDigraphLayout.LayerOptimalLinkLength;
    lay.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    lay.aggressiveOption = go.LayeredDigraphLayout.AggressiveNone;
    lay.packOption = 7;
    lay.alignOption = go.LayeredDigraphLayout.AlignAll;
    lay.spouseSpacing = 30;
    myDiagram.commitTransaction("change Layout");
}
