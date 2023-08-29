class Game{
    constructor(){
        this.resetButton = createButton("RESETAR")
        this.placarTitulo = createElement("h2")
        this.lugar1 = createElement("h2")
        this.lugar2 = createElement("h2")
        this.movendo = false
        this.esquerda=false

    }
    handleElements(){
        this.resetButton.class("resetButton")
        this.resetButton.position(width*0.66,100)
        this.resetButton.mousePressed(()=>{
            database.ref("/").set({
                gameState:0,
                playerCount:0,
                players:{},
                vencedores:0
            })
            window.location.reload()
        })

        this.placarTitulo.class("leadersText")
        this.lugar1.class("leadersText")
        this.lugar2.class("leadersText")
        this.placarTitulo.position(width*0.33,100)
        this.lugar1.position(width*0.33,120)
        this.lugar2.position(width*0.33,140)

        this.placarTitulo.html("PLACAR")
    }

    showLeaderBoard(){
        var lugar1, lugar2
        var players = Object.values(allPlayers)
        if(players[0].rank==0 && players[1].rank==0 ){
            lugar1 = players[0].rank +
            "&emsp;"+
            players[0].nome +
            "&emsp;"+
            players[0].score;

            lugar2 = players[1].rank +
            "&emsp;"+
            players[1].nome +
            "&emsp;"+
            players[1].score;
        }
        if(players[0].rank==1 && players[1].rank==0 ){
            lugar1 = players[0].rank +
            "&emsp;"+
            players[0].nome +
            "&emsp;"+
            players[0].score;

            lugar2 = players[1].rank +
            "&emsp;"+
            players[1].nome +
            "&emsp;"+
            players[1].score;
        }
        if(players[1].rank==1 ){
            lugar1 = players[1].rank +
            "&emsp;"+
            players[1].nome +
            "&emsp;"+
            players[1].score;

            lugar2 = players[0].rank +
            "&emsp;"+
            players[0].nome +
            "&emsp;"+
            players[0].score;
        }
        if(players[1].rank==2 ){
            lugar1 = players[0].rank +
            "&emsp;"+
            players[0].nome +
            "&emsp;"+
            players[0].score;

            lugar2 = players[1].rank +
            "&emsp;"+
            players[1].nome +
            "&emsp;"+
            players[1].score;
        }
        this.lugar1.html(lugar1)
        this.lugar2.html(lugar2)
        
    }

    start(){
        //crie o objeto form da classe Form
        form = new Form();
        form.show();
        player = new Player();
        player.getCount();

        //criar as sprites dos carros
        car1 = createSprite(width/2-100, height);
        //add a imagem
        car1.addImage(carimg1)
        car1.addImage("blast",blastImg)
        //define o tamanho
        car1.scale = 0.07
        car2 = createSprite(width/2+100, height);
        //add a imagem
        car2.addImage(carimg2)
        car2.addImage("blast",blastImg)
        //define o tamanho
        car2.scale = 0.07
        cars =  [car1, car2]

        var obsPos = [
            {x:width/2+200,y:height-800},
            {x:width/2-200, y:height-1300},
            {x:width/2+150, y:height-1800},
            {x:width/2-150, y:height-2300},
            {x:width/2+150, y:height-2300},
            {x:width/2-100, y:height-2600},
            {x:width/2+100, y:height-2600},
            {x:width/2-100, y:height-3000},
            {x:width/2+100, y:height-3000},
            {x:width/2, y:height-3500},
            {x:width/2+200,y:height-3800},
            {x:width/2-200, y:height-4300},
            {x:width/2+150, y:height-4800},
            {x:width/2-150, y:height-5300},
            {x:width/2+150, y:height-5300},
            {x:width/2-100, y:height-5600},
            {x:width/2+100, y:height-5600},
            {x:width/2-100, y:height-6000},
            {x:width/2+100, y:height-6000},
            {x:width/2, y:height-6500}
        ]
        
        coins = new Group ()
        fuel = new Group ()
        obs=new Group()
        this.addSprites(coins, 30, coinImg, 0.03)
        this.addSprites(fuel, 15, fuelImg, 0.1)
        this.addSprites(obs,obsPos.length, obsImg2, 0.03,obsPos)

    }

    handleCollision(i){
        if(cars[i-1].collide(obs)){
            this.perdeVida()
        }
        if(cars[0].collide(cars[1])){
            this.perdeVida()
        }

    }

    perdeVida(){
        if(player.life>0){
        player.life-=40
        if(this.esquerda){
            player.positionX+=100
        }else{
            player.positionX-=100
        }
        }
        player.update()
    }
    
    handleSprites(i){
        cars[i-1].overlap(coins,(colisor,colidido)=>{
            colidido.remove()
            player.score+=21
            player.update()
        })
        cars[i-1].overlap(fuel,(colisor,colidido)=>{
            colidido.remove()
            player.fuel=160
            player.update()
        })
    }

    addSprites(grupo,numero,imagem,tamanho, pos=[]){
        for(var i=0; i < numero; i++){
            if(pos.length>0){
                var x = pos[i].x
                var y = pos[i].y
            }else{
                var x = random(width*0.3,width*0.6)
                var y = random(-height*4.5,height-100)
            }

            var sprite=createSprite(x,y)
            sprite.addImage(imagem)
            sprite.scale = tamanho
            grupo.add(sprite)
        }
    }

    
    //ler 👀📖 o valor de gameState do BD e guarda na variável
    getState(){
        database.ref("gameState").on("value", function(data){
            gameState = data.val();
        })
    }

    //atualizar ✍🏻📖o valor de gameState
    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }
    play(){
        form.hide()
       //chamar o método getInfo
       Player.getInfo();
       if(allPlayers!== undefined){
            //colocar a imagem da pista
            image (pista, 0, -height*5.0, width, height*6)
            player.getVencedores()
            this.handleElements()
            this.showLeaderBoard()
            this.mostrarComb()
            this.mostrarVida()
            this.handleFuel()
            this.gameOver()
            //desenhar as sprites dos carros
            drawSprites()
            var i = 0;
            for(var p in allPlayers){
                var x = allPlayers[p].positionX;
                var y = height - allPlayers[p].positionY;
                
                cars[i].position.x = x;
                cars[i].position.y = y;
                i++;
                if(i==player.indice){
                    camera.position.y = y;
                    this.handleSprites(i)
                    this.handleCollision(i)
                    var linhaChegada = height*5.9
                    if(player.positionY>linhaChegada){
                        player.rank++
                        player.update()
                        Player.updateVencedores(player.rank)
                        this.mostrarRank()
                        gameState=2
                    }
                    if(player.life<=0){
                        cars[i-1].changeImage("blast")
                        cars[i-1].scale=0.7
                        swal({
                            title:"VOCÊ PERDEU!",
                            text:"Sua vida acabou",
                            confirmButtonText:"OK :("
                        },()=>{
                            gameState=2
                        })
                    }
                }
            }
            if(player.life>0){
                this.controlarCarro()
            }
            
       }
    }
    controlarCarro(){
        this.movendo=false
        if(keyDown(UP_ARROW)){
            this.movendo=true
            player.positionY+=10;
            player.update()
        }

        if(keyDown(LEFT_ARROW)&&player.positionX>width*0.33){
            this.esquerda=true
            player.positionX-=10
            player.update()
        }
        if(keyDown(RIGHT_ARROW)&&player.positionX<width*0.66){
            this.esquerda=false
            player.positionX+=10
            player.update()
        }
        if(keyDown(DOWN_ARROW)){
            player.positionY-=10
            player.update()
        }
    }
    handleFuel(){
        if (this.movendo&&player.fuel>0){
            player.fuel-=0.8
        }
    }
    gameOver(){
        if(player.fuel<=0){
            swal({
                title:"VOCÊ PERDEU!",
                imageUrl:"nofuel.jpg",
                imageSize:"300x300",
                text:"Seu combustível acabou!",
                confirmButtonText:"OK :("
            })
            gameState=2
        }
    }

    mostrarRank(){
        if(player.rank==1){
            swal ({
                title:"PARABÉNS!",
                imageUrl:"https://media.tenor.com/RxGETpJZvusAAAAC/luigi-you-win.gif",
                text:"Você chegou em 1° lugar!",
                confirmButtonText:"OK",
            })
        }else{
            swal ({
                title:"VOCÊ PERDEU!",
                imageUrl:"lose.gif",
                imageSize:"300x300",
                text:"Pelo menos você chegou no final :)",
                confirmButtonText:"OK :("
            })
        }
    }

    mostrarComb(){
        push()
        image(fuelImg, width/2-150, height-player.positionY,20,20)
        fill ("orange")
        rect (width/2-120,height-player.positionY,player.fuel,20)
        pop()
    }

    mostrarVida(){
        push()
        image(heartImg, width/2-150, height-player.positionY+40,20,20)
        fill("red")
        rect(width/2-120,height-player.positionY+40,player.life,20)
        pop()
    }
}