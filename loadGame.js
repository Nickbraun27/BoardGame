    var mainMenuLayer = document.getElementById("mainMenu");
    ctxMainMenu = mainMenuLayer.getContext("2d");
    mainMenuLayer.width = 1100;
    mainMenuLayer.height = 700;

    var mainMenuTextLayer = document.getElementById("mainMenuText");
    ctxMainMenuText = mainMenuTextLayer.getContext("2d");
    mainMenuTextLayer.width = 1100;
    mainMenuTextLayer.height = 700;

    var onMainMenu = true;

 window.onload = function() {
     drawMainMenu(ctxMainMenu);


 }

mainMenuTextLayer.addEventListener("mousemove", function(event) {
    
    var rect = mainMenuLayer.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;
    
    if(x>=361.5 && x <= 738.5  && y >= 250 && y <= 330){
        drawButtonBox(250, "#C30C0A");
        mainMenuTextLayer.addEventListener("click", function() {
            if(onMainMenu == true) {
                onMainMenu = false;
                clearMainMenu();
                boardCreation();
            }            
        });
    } 
    else if(x>=361.5 && x <= 738.5  && y >= 350 && y <= 430) {
        drawButtonBox(350, "#C30C0A");
    }
    else {
        drawButtonBox(250, "#ED1B24");
        drawButtonBox(350, "#ED1B24");
    }


});

function drawMainMenu(ctx) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(mainMenuLayer.width, 0);
    ctx.lineTo(mainMenuLayer.width, mainMenuLayer.height);
    ctx.lineTo(0, mainMenuLayer.height);
    ctx.closePath();
    ctx.fill();

    var header = new Image();
    header.src = "assets/CaptureAndControl.png";
    header.onload = function() {
        ctx.drawImage(header, 188.5, 25); 
    }

    drawButtonBox(250, "#ED1B24");

    var sp = new Image();
    sp.src = "assets/SingleplayerText.png";
    sp.onload = function() {
        ctxMainMenuText.drawImage(sp, 361.5, 260);
    }

    drawButtonBox(350, "#ED1B24");

    var mp = new Image();
    mp.src = "assets/MultiplayerText.png";
    mp.onload = function() {
        ctxMainMenuText.drawImage(mp, 361.5, 357);
    }

    var logo = new Image();
    logo.src = "assets/UwUGames.png";
    logo.onload = function() {
        ctx.drawImage(logo, 471.5, 475);
    }  
}

function drawButtonBox(topLineHeight, color) {
        
    ctxMainMenu.fillStyle = color;
    ctxMainMenu.strokeStyle = "black";
    ctxMainMenu.lineWidth = 5;

    ctxMainMenu.beginPath();
    ctxMainMenu.moveTo(361.5, topLineHeight);
    ctxMainMenu.lineTo(738.5, topLineHeight);
    ctxMainMenu.lineTo(738.5, topLineHeight + 80);
    ctxMainMenu.lineTo(361.5, topLineHeight + 80);
    ctxMainMenu.closePath();
    ctxMainMenu.fill();
    ctxMainMenu.stroke();
}

function clearMainMenu() {
    
    document.getElementById("mainMenu").style.visibility = "hidden";
    document.getElementById("mainMenuText").style.visibility = "hidden";

    /*
    ctxMainMenu.fillStyle = "transparent";
    ctxMainMenu.beginPath();
    ctxMainMenu.moveTo(0, 0);
    ctxMainMenu.lineTo(mainMenuLayer.width, 0);
    ctxMainMenu.lineTo(mainMenuLayer.width, mainMenuLayer.height);
    ctxMainMenu.lineTo(0, mainMenuLayer.height);
    ctxMainMenu.closePath();
    ctxMainMenu.fill();

    ctxMainMenuText.beginPath();
    ctxMainMenuText.moveTo(0, 0);
    ctxMainMenuText.lineTo(mainMenuLayer.width, 0);
    ctxMainMenuText.lineTo(mainMenuLayer.width, mainMenuLayer.height);
    ctxMainMenuText.lineTo(0, mainMenuLayer.height);
    ctxMainMenuText.closePath();
    ctxMainMenuText.fill();
    */
}