class Form{
    constructor(){
        this.titulo = createImg("TITULO.png", "titulo");
        this.input = createInput("nome");
        this.playButton = createButton("INICIAR");
        this.saudacao = createElement("h2");
    }
    posicionar(){
        //definir a posição da imagem de título
        this.titulo.position(120,50);
        //🕗HORA DO DESAFIO 😉: 
        //posicionar o input e o playbutton
        this.input.position(width/2-110, height/2 - 80);
        this.playButton.position(width/2-90, height/2 - 20);
        this.saudacao.position(width/2-300, height/2 - 100)
    }
    estilizar(){
        //define a aparência da imagem
        this.titulo.class("gameTitle");
        this.playButton.class("customButton");
        this.input.class("customInput")
        this.saudacao.class("greeting");
    }
    hide(){
        //define a aparência da imagem
        this.titulo.class("gameTitleAfterEffect");
        this.playButton.hide();
        this.input.hide()
        this.saudacao.hide();
    }
    mouseClicou(){
        this.playButton.mousePressed(()=>{
            this.playButton.hide();
            this.input.hide();
            var msg = "Seja bem vindo(a) " + this.input.value() + "! <br> Espere o outro jogador entrar";
            this.saudacao.html(msg);
            playerCount++;
            player.indice = playerCount;
            player.nome = this.input.value();
            player.addPlayer();
            player.updateCount(playerCount);
        })
    }

    show(){
        this.posicionar();
        this.estilizar();
        this.mouseClicou();
    }
}