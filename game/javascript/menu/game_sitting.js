import {Player} from "../player/player.js";

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

        this.loadPlayerData = (index = 1) =>{
            let player_data;
            if(index == 1 ) player_data = localStorage.getItem("player1")
            else player_data = localStorage.getItem("player2");

            return (player_data != null) ? player_data : new Player();
        }

        // load player 1 & 2 data from local db or making new player obj
        this.player1_data = this.loadPlayerData(1);
        this.player2_data = this.loadPlayerData(2);

    }

}