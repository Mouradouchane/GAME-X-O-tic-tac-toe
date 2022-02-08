// simple player profile for playing 
export class Player{

    constructor(name = "def" , wins = 0 , index = 0){
        // some player data 
        this.name = name;
        this.wins = wins;
        this.photo = "./graphics/pic_player.png";
        this.turn = false;
        this.index = index;
    }

}