
// game moduel is the main one who control/access/load all others 
import {Menu} from "./javascript/menu.js";
import {Player} from "./javascript/player/player.js";
import {game_table} from "./javascript/game_table.js";

class Game{

    constructor(){
        this.menu = new Menu();
        this.game_table = new game_table();
    }

}

const game = new Game();
