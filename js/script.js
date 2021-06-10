window.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "2px solid red";
    document.body.appendChild(canvas);
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");


    document.addEventListener("keydown", interaction);



    /*Propritétés serpent*/
    var serpColor = "blue";
    var serpLength = 30;
    var xSerp = canvasWidth/2;
    var ySerp = canvasHeight/2;
    var moveX = 0
    var moveY = 0

    //Fonction qui dessine le serpent
    var intervalID = setInterval(drawSerp, 1000)
    //drawSerp();
    function drawSerp() {
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        xSerp = xSerp + moveX*serpLength;
        ySerp = ySerp + moveY*serpLength;
        ctx.fillStyle = serpColor;
        ctx.fillRect(xSerp,ySerp,serpLength,serpLength);
    }
    //Fonction qui dirige le serpent
    function interaction(event){
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
            //Gauche
            moveX = -1;
            moveY = 0;
                break;
            case 38:
            //Haut
            moveX = 0;
            moveY = -1; 
                break;
            case 39:
            //Droite
            moveX = 1;
            moveY = 0;       
                break;    
            case 40:
            //Bas
            moveX = 0;
            moveY = 1; 
                break;
            case 32:
             //Pause
             moveX = 0;
             moveY = 0;     
                break;     
            default: 
        }
    }



}