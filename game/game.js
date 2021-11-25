
// game moduel is the main one who control/access/load all others 
import {Menu} from "./javascript/menu.js";
import {Player} from "./javascript/player/player.js";

class Game{

    constructor(){
        this.menu = new Menu();
    }

}

const game = new Game();
