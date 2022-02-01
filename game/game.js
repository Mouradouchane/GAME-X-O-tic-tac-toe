
// game moduel is the main one who control/access/load all others 
import {Menu} from "./javascript/menu.js";
import {game_table} from "./javascript/game_table.js";

class Game{

    constructor(){
        // game sitting
        this.menu = new Menu();
        // game table with hole stuff
        this.game_table = new game_table();
    }

}

const game = new Game();
