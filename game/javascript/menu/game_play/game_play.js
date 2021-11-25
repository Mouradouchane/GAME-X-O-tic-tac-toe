// moduel handel all things about playing new game 

export class play_new_game_side{

    constructor(){
        this.contentMods = document.querySelector("#contentMods");
        this.back_button = this.contentMods.querySelector("#back") 
        this.sitting_background = document.querySelector("#sitting_background");

        // 2 side as buttons for starting new game "1 vs 1" or "1 vs bot"
        [this.oneVsoneMod_Button , this.oneVsBotMod_Button] = document.querySelectorAll(".mods");
        // table size a small window for table size before start new game 
        this.new_game_table_size = document.querySelector("#new_game_table_size");

        this.make_table_size_visible = () => {
            this.contentMods.style.cssText         = "visibility: hidden";
            this.new_game_table_size.style.cssText = "visibility: visible";    
        }

        this.oneVsoneMod_Button.addEventListener("click" , this.make_table_size_visible);
        this.oneVsBotMod_Button.addEventListener("click" , this.make_table_size_visible);

        // click on "PlayButton" make content of mods visible for choose one
        this.PlayButton = document.querySelector("#PlayButton");

        // click on play button in menu
        PlayButton.addEventListener("click" , () => {
            this.contentMods.style.cssText        = "visibility: visible";
            this.sitting_background.style.cssText = "visibility: visible";      
        });

        // click on "back_button" make content of mods hidden 
        this.back_button.addEventListener("click" , () => {
            this.contentMods.style.cssText        = "visibility: hidden";
            this.sitting_background.style.cssText = "visibility: hidden";
        });

        // click on "dark background" 
        this.sitting_background.addEventListener("click" , () =>{
            this.contentMods.style.cssText         = "visibility: hidden";
            this.sitting_background.style.cssText  = "visibility: hidden";
            this.new_game_table_size.style.cssText = "visibility: hidden";
        })
    }

} 