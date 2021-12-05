
// this moduel control & contain all thing's about sitting in game 
import {player_sitting} from "./menu/game_sitting/game_players_sitting.js";
import {game_details_sitting} from "./menu/game_sitting/game_details_sitting.js"
import {game_audio_sitting} from "./menu/game_sitting/game_audio_sitting.js";

export class game_sitting_side{

    constructor(){

        this.sitting_side   = document.querySelector("#sitting");
        this.sitting_button = document.querySelector("#SittingButton");
        this.sitting_background = document.querySelector("#sitting_background");
        this.back_button    = this.sitting_side.querySelector("#sitting_back_button");
       
        // click on sitting button make "sitting_side" visible
        this.sitting_button.addEventListener("click" , () => {
            this.sitting_side.style.cssText       = "visibility: visible";
            this.sitting_background.style.cssText = "visibility: visible";  
        });

        // click on back button in "sitting_side" make "sitting_side" hidden
        this.back_button.addEventListener("click" , () => {
            this.sitting_side.style.cssText       = "visibility: hidden";
            this.sitting_background.style.cssText = "visibility: hidden";
        });
        this.sitting_background.addEventListener("click" , () => {
            this.sitting_side.style.cssText       = "visibility: hidden";
            this.sitting_background.style.cssText = "visibility: hidden";
        })
    
        // load players side in sitting  
        this.player_sitting_side = new player_sitting();

        // load game_details side in sitting  
        this.game_details_side = new game_details_sitting();

        // load audio side in sitting
        this.game_audio_sitting = new game_audio_sitting(); 

    }

}
