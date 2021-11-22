
// this moduel control & contain all thing's about sitting in game 
import {player_sitting} from "./game_sitting_players.js";

export class game_sitting_side{

    constructor(){

        this.sitting_side   = document.querySelector("#sitting");
        this.back_button    = this.sitting_side.querySelector("#sitting_back_button");
        this.sitting_button = document.querySelector("#SittingButton");
       

        // click on sitting button make "sitting_side" visible
        this.sitting_button.addEventListener("click" , () => {
                this.sitting_side.style.cssText = "visibility: visible";
        });

        // click on back button in "sitting_side" make "sitting_side" hidden
        this.back_button.addEventListener("click" , () => {
                this.sitting_side.style.cssText = "visibility: hidden";
        });
        
        // the hole side of player profile sitting as class
        this.player_sitting_side = new player_sitting();
    }

}
