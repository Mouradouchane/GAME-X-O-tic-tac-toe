
// game moduel is the main one who control/access/load all others 
import {Menu} from "./javascript/menu.js";

class Game{

    constructor(){
        this.menu = new Menu();
    }

}

const game = new Game();