      
    //board details
    const boardWidth = 10;
    const boardHeight = 6;
    const numEconTiles = 4;
    
    //offsets and size specifications to ensure things appear properly on the canvas.  
    //If the size of the canvas or hexgrid is changed, adjust these accordingly
    //offsets to the entire hex grid
    const xOffset = 50;
    const yOffset = 70;
    //offsets to image assets
    const econXOffset = 10;
    const econYOffset = 20;
    const controlXOffset = 27;
    const controlYOffset = 33;

    //image asset sizes
    const econXSize = 27;
    const econYSize = 18;
    const controlXSize = 40;
    const controlYSize = 40;


    //initialize canvas
    var layer1 = document.getElementById("boardCanvas");
    ctxLayer1 = layer1.getContext("2d");
    layer1.width = 1100;
    layer1.height = 700;

    var layer2 = document.getElementById("layer2");
    ctxLayer2 = layer2.getContext("2d");
    layer2.width = 1100;
    layer2.height = 700;

    //tile array
    var tileArray = new Array(boardWidth);
    for(var i=0;i<boardWidth;i++) {
        tileArray[i] = new Array(boardHeight);
    }

    //variables for drawing hexmap
    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 55;

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

    
    function boardCreation() {

        initializeBoard();
        createEconAndControlTiles();
        
        
    }
    

    function initializeBoard() {
        if (layer1.getContext){

            for(var i=0;i<boardWidth;i++) {
                for(var j=0;j<boardHeight;j++) {
                    createTile(i, j);
                }
            }
            
            ctxLayer1.strokeStyle = "black";
            ctxLayer1.lineWidth = 1              
   
            drawBoard(ctxLayer1, boardWidth, boardHeight);
           
            layer2.addEventListener("mousemove", function(eventInfo) {
                var x,
                    y,
                    hexX,
                    hexY,
                    screenX,
                    screenY,
                    rect;
    
                rect = layer1.getBoundingClientRect();
                x = eventInfo.clientX - rect.left - xOffset;
                y = eventInfo.clientY - rect.top - yOffset;
    
                hexY = Math.floor(y / (hexHeight + sideLength));
                hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
    
                screenX = (hexX * hexRectangleWidth) + ((hexY % 2) * hexRadius);
                screenY = (hexY * (hexHeight + sideLength));
    
                ctxLayer1.clearRect(0, 0, layer1.width, layer1.height);
    
                drawBoard(ctxLayer1, boardWidth, boardHeight);
    
                // Check if the mouse's coords are on the board
                if(hexX >= 0 && hexX < boardWidth) {
                    if(hexY >= 0 && hexY < boardHeight) {
                        var fillColor = "yellow";
                        drawHexagon(ctxLayer1, screenX + xOffset, screenY + yOffset, true, fillColor);
                    }
                }
            });
        }

    }

    

    function drawBoard(canvasContext, width, height) {
        console.log("owo");
        var i,
            j;
        fillBackground(ctxLayer1);
        
        
        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
                if(tileArray[i][j][3] == "blue"){
                    fillColor = "#5247FF";
                }
                else {
                    fillColor = "#FF4444";
                }
                drawHexagon(
                    ctxLayer1, 
                    xOffset + (i * hexRectangleWidth + ((j % 2) * hexRadius)), 
                    yOffset + (j * (sideLength + hexHeight)), 
                    true, 
                    fillColor
                );
                
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill, fillColor) {           
        var fill = fill || false;

        canvasContext.fillStyle = fillColor;
        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.stroke();
        
    }

    function fillBackground(ctx) {
        ctx.fillStyle = "#00FFFF";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(1100, 0);
        ctx.lineTo(1100, 700);
        ctx.lineTo(0, 700);
        ctx.closePath();
        ctx.fill() 
    }

    function createTile(x, y) {
        //tiles have:  bool controlTile, bool econ, bool fort,  string controlledby, bool occupied, int turnsToCapture
     
        var controlledBy;
        if(x<(boardWidth/2)){
            controlledBy = "blue";
        }
        else {
            controlledBy = "red";
        }
        var newTile = new Array(false, false, false, controlledBy, false, 1);
        tileArray[x][y] = newTile;      
    }

    function createEconAndControlTiles() {
        var currentlyUsedTiles = new Array(numEconTiles * 2 + 2);
         
        //generating control points:
        //blue side
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 6);
        var xy= "" + x + y;
        currentlyUsedTiles[0] = xy;
        tileArray[x][y][0] = true;
        insertControlImages(x, y);

        //red side
        x = 6 + Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 6);
        xy = "" + x + y;    
        currentlyUsedTiles[1] = xy;  
        tileArray[x][y][0] = true;
        insertControlImages(x, y);
        
        //econ tiles
        for(var i=1;i<numEconTiles + 1;i++) {         
            while(true) {
                var alreadyUsed=false;
                x = Math.floor(Math.random() * 5);
                y = Math.floor(Math.random() * 6); 
                xy = "" + x + y;
                for(var j=0; j<i*2;j+=2){
                    if(currentlyUsedTiles[j] == xy) {
                        alreadyUsed=true;
                        j=i*2;  
                    }
                }
                if(alreadyUsed == false) {
                    currentlyUsedTiles[i*2] = xy;
                    tileArray[x][y][1] = true;
                    insertEconImages(x, y);
                    break;
                }
            }
            while(true){
                var alreadyUsed=false;
                x = 5 + Math.floor(Math.random() * 5);
                y = Math.floor(Math.random() * 6); 
                xy = "" + x + y;
                for(var j=1; j<(i*2)+1;j+=2){
                    if(currentlyUsedTiles[j] == xy) {
                        alreadyUsed=true;
                        j=(i*2)+1
                    }
                }
                if(alreadyUsed == false) {
                    currentlyUsedTiles[i*2+1] = xy;
                    tileArray[x][y][1] = true;
                    insertEconImages(x, y);
                    break;  
                }
            }
        }         
    } 

    function insertControlImages(x, y) {
        var xPos = xOffset + getHexPosition_X(x, y) + controlXOffset;
        var yPos = yOffset + getHexPosition_Y(y) + controlYOffset;
        var img = new Image();
        img.src = "assets/star.png";
        img.onload = function() {
            ctxLayer2.drawImage(img, xPos, yPos, controlXSize, controlYSize); 
        }
    }
    
    function insertEconImages(x, y) { 
        var xPos = xOffset + getHexPosition_X(x, y) + econXOffset;
        var yPos = yOffset + getHexPosition_Y(y) + econYOffset;
        var img = new Image();
        img.src = "assets/gold.png";
        img.onload = function() {
            ctxLayer2.drawImage(img, xPos, yPos, econXSize, econYSize); 
        }
    }

    function getHexPosition_X(x, y) {
       
        var pos = (x * hexRectangleWidth + ((y % 2) * hexRadius));
        return pos;
    }

    function getHexPosition_Y(y) {
        var pos = y * (sideLength + hexHeight);
        return pos;
    }

    $("#testButton").on("click", function() {
        tileArray[7][3][3] = "blue";
        drawBoard(ctxLayer1, boardWidth, boardHeight);
    });