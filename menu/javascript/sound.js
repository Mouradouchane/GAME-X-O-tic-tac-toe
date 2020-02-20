import {GameAudio} from "../javascript/menu.js";
const DefultMusicSource = "../sound/defMusic.mp3";

const MusicSitting = GameAudio.querySelector("#MusicEffect");

const DefultMusic = new Audio();
DefultMusic.src = DefultMusicSource;

function CheckToggleMusic(){
    if(MusicSitting.checked){
        DefultMusic.play();
    }
    else{
        DefultMusic.pause();
    }
}

// first check automatic
CheckToggleMusic();

// manually check 
MusicSitting.addEventListener("click" , CheckToggleMusic);

