
// just short implementer of js files in menu folder for game.js
import {play_new_game_side} from "./menu/game_play/game_play.js";
import {game_sitting_side} from "./game_sitting.js";


export class Menu{

    constructor(){
        this.play_new_game_side = new play_new_game_side();
        this.game_sitting_side = new game_sitting_side();
    }

}