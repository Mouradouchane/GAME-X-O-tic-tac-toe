
// game moduel is the main one who control/access/load all others 
import {Menu} from "./javascript/menu.js";
import {Player} from "./javascript/player/player.js";

class Game{

    constructor(){
        this.menu = new Menu();
    }

}

const game = new Game();

console.log( game.menu.game_sitting_side.player1_data )
console.log( game.menu.game_sitting_side.player2_data )
