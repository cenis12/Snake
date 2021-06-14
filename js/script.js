window.onload = function() {
    var canvas = document.createElement('canvas');
    var showScore = document.createElement('div');
    var stem = document.createElement('div');
    var foot = document.createElement('div');
    stem.id = "stem";
    foot.id = "foot";
    foot.innerHTML = "GAME ON"
    //showScore.style.border = "2px solid black";
    //showScore.height = "80px";
    showScore.id = "showScore";
    canvas.width = 900;
    canvas.height = 500;
    //canvas.style.border = "2px solid red";
    document.body.appendChild(showScore);
    document.body.appendChild(canvas);
    document.body.appendChild(stem);
    document.body.appendChild(foot);
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    var collision = false; 
    var score = 0;
    var life = 3;
    var level = 0;
    var touch = 0;
    var pause = false;

    

    document.addEventListener("keydown", interaction);



    /*Propritétés serpent*/
    var serpColor = "blue";
    var serpLength = 15;//taille d'un bloc
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

    //propriété Bonus 

    var bonusColor = "green";
    var xBonus = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
    var yBonus = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
    var bonusTime = 0;
    var showBonus = false;

    //Fonction qui dessine le serpent
    var intervalID = setInterval(game, 100);

    ShowScoreLife();

    //Fonction Game
    function game() {
        drawSerp();
        drawApple();
        collisionDetect();
        Score();
        lifeHandle();
        ShowBonus();
        
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

    //Fonction qui dessine le bonusTime
    function drawBonus(){
        ctx.font = "13px Arial";
        ctx.fillStyle = "red";
        ctx.fillRect(xBonus,yBonus,serpLength,serpLength);
        ctx.fillStyle = bonusColor;
        ctx.fillText("💚",xBonus-1.8,yBonus+13);
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
    //Fonction qui initialise la position du bonus
    function initBonus(){
        xBonus = Math.trunc(Math.random()*nbrBlWidth)*serpLength;
        yBonus = Math.trunc(Math.random()*nbrBlHeight)*serpLength;
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
        if (pause == true) {
            collision = false;
            return;
        }
        if(collision == true){
            life--;
            collision = false;
            bodySize = 5;
            initApple();
            initSnake();
            ShowScoreLife();
            bodySerp = [bodySerp[bodySerp.lenght-1]];
            if(life == 0){
                ctx.fillStyle = "#fff";
                ctx.font = "40px Arial";
                ctx.fillText("GAME OVER",canvasWidth/2-130,canvasHeight/2);
                ctx.font = "25px Arial";
                ctx.fillText("SCORE : "+ score + " points",canvasWidth/2-130,canvasHeight*2/3);
                ctx.font = "30px Arial";
                ctx.fillText("Appuyer sur ENTRER pour rejouer",canvasWidth/2-130,canvasHeight*3/4);
                clearTimeout(intervalID);
            }
        }
    }
    // Fonction qui sert à gerer l'affichage du bonusColor
    function ShowBonus(){
        if(bonusTime++> 50){
            bonusTime = 0;
            // on peux afficher le bonus
            if(Math.random() > -0.7){
            // on va afficher le bonus
            initBonus();
            showBonus = true;
            }else{
            //on affiche pas  
              //return;
              xBonus = 1000;
              yBonus = 800;
              showBonus = false;
            }
        }
        if (showBonus == true) {
            drawBonus();
        }
        // Tester on a mangé le bonus
        if (xSerp == xBonus && ySerp == yBonus) {
            life++;
            ShowScoreLife();
            xbonus = 1000;
            yBonus = 800;
            showBonus = false;
        }   
    }
    

    //Fonction qui dirige le serpent
    function interaction(event){
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
              //Gauche
            pause = false;    
               if (touch == 39) {
                   break;
               } 
            moveX = -1;
            moveY = 0;
            touch = event.keyCode;
                break;
            case 38:
              //Haut
            pause = false;    
                if (touch == 40) {
                    break;
                }
            moveX = 0;
            moveY = -1; 
            touch = event.keyCode;
                break;
            case 39:
              //Droite
            pause = false;    
                if (touch == 37) {
                    break;
                }
            moveX = 1;
            moveY = 0;
            touch = event.keyCode;       
                break;    
            case 40:
            //Bas
            pause = false;
            if (touch == 38) {
                break;
            }
            moveX = 0;
            moveY = 1; 
            touch = event.keyCode;
                break;
            case 32:
             //Pause
             pause = true;
             moveX = 0;
             moveY = 0;
             touch = event.keyCode; 
                break;
            case 13:
            // Rejouer
             document.location.reload(true);
                break;              
            default: 
        }
    }





}