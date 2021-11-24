// moduel handel all things about playing new game 

export class play_new_game_side{

    constructor(){
        this.contentMods = document.querySelector("#contentMods");
        this.back_button = this.contentMods.querySelector("#back") 

        // click on "PlayButton" make content of mods visible for choose one
        this.PlayButton = document.querySelector("#PlayButton");
            PlayButton.addEventListener("click" , () => {
                contentMods.style.cssText = "visibility: visible";
            });

            // click on "back_button" make content of mods hidden 
            this.back_button.addEventListener("click" , () => {
                contentMods.style.cssText = "visibility: hidden";
            });
    }

} 