
import {table} from "./table/load_table.js";

export class game_table{

    constructor(){
        this.inGame = false;

        // var important for knowing - in wich mod user want to start a new game "1 vs 1" or "1 vs bot"
        this.game_mode = 1;

        // object who responsible for load/render game_table for a new game 
        this.load_game_table = null;

        // go button => start new game 
        this.go_button = document.querySelector("#start_new_game");

        // game table size 
        this.table_size_range = document.querySelector("#table_size_range");

        // 2 side as buttons for choosing game mode "1 vs 1" or "1 vs bot"
        [this.oneVsone_button , this.onVsbot_button] = document.querySelectorAll(".mods");
        
        // when user click go that mean => "start a new game"
        this.go_button.addEventListener("click" , () => {
            //debugger
            // we starting a new game in case no game already playing 
            if(!this.inGame){
                this.load_game_table = new table(Number.parseInt(this.game_mode) , Number.parseInt(this.table_size_range.value));
            }
            else console.warn("GAME : you are already in game right know !");

            // switch it to true :)
            this.inGame = true;
        })

        this.oneVsone_button.addEventListener("click" , () => {
            this.game_mode = 1;
        });

        this.onVsbot_button.addEventListener("click" , () => {
            this.game_mode = 2;
        });
        
    }
}