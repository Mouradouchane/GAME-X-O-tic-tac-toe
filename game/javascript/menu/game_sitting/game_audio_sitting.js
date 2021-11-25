
// this moduel should control & load audio sitting in game

class game_audio_obj {
    constructor(){
        this.music = false;
        this.clickEffects = true;
    }
}

export class game_audio_sitting{
    constructor(){
        this.audio_obj = undefined;

        // load audio object from localDB
        this.load_audio_obj = () => {
            // "t a o " => temp audio object
            // trying to laod "game_audio_obj" from localDB
            let tao = JSON.parse(localStorage.getItem("game_audio_obj"));

            // in case load succeed
            if(tao != null || tao != undefined) this.audio_obj = tao;
            // in case not found
            else {
                console.warn("GAME : 'audio object' not found in localDB , recreating new one");

                // create new one + save it :)
                this.audio_obj = new game_audio_obj();
                // save that new one
                this.save_audio_obj();
            }
        } 

        // save audio object in localDB
        this.save_audio_obj = () => {
            localStorage.setItem("game_audio_obj" , JSON.stringify( this.audio_obj ) );
        }

        this.update_audio_in_sitting_side = () => {
            this.clickEffect_checkBox.checked = this.audio_obj.clickEffects;
            this.Music_checkBox.checked = this.audio_obj.music;
        }

        // dom checkbox's in sitting side
        this.clickEffect_checkBox = document.querySelector("#AudioEffect"); // clicks effect
        this.Music_checkBox = document.querySelector("#MusicEffect"); // music 

        // event when player turn on/off "audio effects"
        this.clickEffect_checkBox.addEventListener("change" , () => {
            this.audio_obj.clickEffects = this.clickEffect_checkBox.checked;
            this.save_audio_obj();
        });

        // event when player turn on/off "music"
        this.Music_checkBox.addEventListener("change" , () => {
            this.audio_obj.music = this.Music_checkBox.checked;
            this.save_audio_obj();
        });
        
        // load audio sitting form localDB + updated dom
        this.load_audio_obj();
        this.update_audio_in_sitting_side();
    }
}