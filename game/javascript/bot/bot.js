import {bot_profile} from "./bot_profile.js";

export class BOT{

    constructor(game_table = null , game_table_size){
        
        this.game_table = game_table;
        this.table_size = game_table_size;

        // bot normal data
        this.profile = new bot_profile();

        // bot border as matrix for playing ;)
        this.border = null;

        // function when bot deside where shoud he play
        this.makeDecision = () => {
            return Math.floor(Math.random() * 3 + 1);
        }

        // this function using the decision comming form "make decision function" & play
        this.play = () => {

        }
    }
}