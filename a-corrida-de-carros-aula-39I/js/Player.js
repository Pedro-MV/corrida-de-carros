class Player{
    constructor(){
        this.nome = '';
        this.indice = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.rank=0
        this.score=0
        this.fuel=160
        this.life=160
    }
    addPlayer(){
        //se o índice for 1, fica à esquerda
        if(this.indice == 1){
            this.positionX = width/2 - 100;
        }else{
            //senão, fica à direita
            this.positionX = width/2 + 100;
        }
        //indicar/referenciar o endereço dos dados no BD
        database.ref("players/player"+this.indice).set({
            nome      : this.nome, 
            positionX : this.positionX, 
            positionY : this.positionY,
            score : this.score,
            rank : this.rank,
            fuel : this.fuel,
            life : this.life
        });

        
    }
    update(){
        database.ref("players/player"+this.indice).update({
            positionX : this.positionX, 
            positionY : this.positionY,
            rank  : this.rank,
            score : this.score,
            fuel : this.fuel,
            life : this.life
        })
    }
    //ATUALIZAR O VALOR NO BD ✍🏻💻
    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }
        static updateVencedores(count){
            database.ref("/").update({
                vencedores:count
            })
        }

        getVencedores(){
            database.ref("vencedores").on("value",(data)=>{
                player.rank = data.val()
            })
        }

    //LER O VALOR DO BD 📖
    getCount(){
        database.ref("playerCount").on("value", (data)=>{
            //definindo o valor de uma variável
            //guardando um valor na memória do computador
            playerCount = data.val();
        })

    }

    //métodos estáticos: são métodos chamados
    //pelo nome da classe em vez do nome do objeto
    static getInfo(){
        database.ref("players").on("value", (data)=>{
            //guarda na memória as informações de
            //todos os jogadores do banco de dados
            allPlayers = data.val();
        })
    }


}