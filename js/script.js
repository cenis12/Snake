window.onload = function() {
    var canvas = document.createElement('canvas');
    var showScore = document.createElement('div');
    showScore.style.border = "2px solid black";
    showScore.height = "80px";
    showScore.id = "showScore";
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "2px solid red";
    document.body.appendChild(showScore);
    document.body.appendChild(canvas);
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    var collision = false; 
    var score = 0;
    var life = 3;
    var level = 0;
    var touch = 0;
    

    document.addEventListener("keydown", interaction);



    /*Propritétés serpent*/
    var serpColor = "blue";
    var serpLength = 30;//taille d'un bloc
    var nbrBlWidth = canvasWidth/serpLength;
    var nbrBlHeight = canvasHeight/serpLength;
    var xSerp = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
    var ySerp = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
    var moveX = 0;
    var moveY = 0;
    var bodySize  = 5;
    bodySerp = [];// Le corps du serpent
    //propriétés de la pomme
    var appleColor = "green";
    var xApple = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
    var yApple = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
    var appleRadius = serpLength/2 ;
    var appleTime = 0;
    var appleTimeMax = 100;

    //Fonction qui dessine le serpent
    var intervalID = setInterval(game, 250);

    ShowScoreLife();

    //Fonction Game
    function game() {
        drawSerp();
        drawApple();
        collisionDetect();
        Score();
        lifeHandle();
    }
    //Gestion position du serpent
    function SnakePosition(){
        xSerp = xSerp + moveX*serpLength;
        ySerp = ySerp + moveY*serpLength;
        bodySerp.push({x:xSerp,y:ySerp});
        while (bodySerp.length > bodySize) {
            bodySerp.shift();
        }
    }
    //drawSerp();
    function drawSerp() {
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        SnakePosition();
        ctx.fillStyle = serpColor;
        for (let i = 0; i < bodySerp.length; i++) {
            ctx.fillRect(bodySerp[i].x, bodySerp[i].y,serpLength-1,serpLength-1);
        }
    }
    //Fonction qui dessine la pomme
    function drawApple(){
        ctx.beginPath(); //qui ouvre un flux
        ctx.arc(xApple+appleRadius,yApple+appleRadius,appleRadius,0,2*Math.PI);
        ctx.fillStyle = appleColor;
        ctx.fill();
        ctx.font = "15px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("V",xApple+3,yApple+3);  
        ctx.closePath();      
    }
    //Fonction qui initialise la position de la pomme
    function initApple(){
        xApple = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
        yApple = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
    }
    //Fonction qui initialise la position du serpent
    function initSnake(){
        xSerp = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
        ySerp = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
    }
    //Detection collision
    function collisionDetect(){
        //cas où le serpent se mord
        if (bodySerp.length>5){
            for (var i = 0; i < bodySerp.length-1; i++) {
                if(bodySerp[i].x == bodySerp[bodySerp.length-1].x && 
                    bodySerp[i].y == bodySerp[bodySerp.length-1].y){
                        collision = true;
                        break;
                    }
                }
            }
        //cas ou le serpent sort du canvas
        if(xSerp<0 || ySerp<0 || xSerp+serpLength>canvasWidth
            ||ySerp+serpLength>canvasHeight) {
                collision = true;
        }   

    }

    //Fonction qui verifie si on a mangé la pomme

    function Score(){
        if(xApple == xSerp && yApple == ySerp){
            score += 10 + 3*bodySerp.length;
            level = Math.trunc(score/200);
            bodySize += 5;
            ShowScoreLife();
            initApple();
        }else if (appleTime++>appleTimeMax){
            initApple();
            appleTime = 0;     
        }
    }
    //Fonction qui affiche le score
    function ShowScoreLife(){
        var message = "Score : "+ score +" | Life : "+ life + " | Level : "+ level;
        document.getElementById("showScore").innerHTML = message;
    }
    //Fonction qui gère la vie du serpent
    function lifeHandle(){
        if(collision == true){
            life--;
            collision = false;
            bodySize = 5;
            initApple();
            initSnake();
            ShowScoreLife();
            bodySerp = [bodySerp[bodySerp.lenght-1]];
            if(life == 0){
                ctx.fillStyle = "#000";
                ctx.fillText("GAME OVER",canvasWidth/2,canvasHeight/2);
                clearTimeout(intervalID);
            }
        }
    }

    //Fonction qui dirige le serpent
    function interaction(event){
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
              //Gauche  
               if (touch == 39) {
                   break;
               } 
            moveX = -1;
            moveY = 0;
            touch = event.keyCode;
                break;
            case 38:
              //Haut  
                if (touch == 40) {
                    break;
                }
            moveX = 0;
            moveY = -1; 
            touch = event.keyCode;
                break;
            case 39:
              //Droite  
                if (touch == 37) {
                    break;
                }
            moveX = 1;
            moveY = 0;
            touch = event.keyCode;       
                break;    
            case 40:
            //Bas
            if (touch == 38) {
                break;
            }
            moveX = 0;
            moveY = 1; 
            touch = event.keyCode;
                break;
            case 32:
             //Pause
             moveX = 0;
             moveY = 0;
             touch = event.keyCode; 
                break;     
            default: 
        }
    }





}