import {GameAudio} from "../javascript/menu.js";

//music path
const DefultMusicSource = "../sound/defMusic.mp3";

// click checkbox in sitting 
const AudioClickEffect = GameAudio.querySelector("#AudioEffect");
// music checkbox in sitting 
const MusicSitting = GameAudio.querySelector("#MusicEffect");

// music constant               // source music
const DefultMusic = new Audio(); DefultMusic.src = DefultMusicSource;

// keys for "Music Mod" & "Effect Click"
const isMusicModActive = "isMusicModActive";
const isEffectClicksActive = "isEffectClicksActive";


// Function Who Responsible for Checking Recent Values & do Upgrading 
function CheckToggleAndUpgrading(TargetElement,SourceAudio,UpgradingKeyinLocalDB){
    if(TargetElement.checked){
        SourceAudio.play();
        localStorage.setItem(UpgradingKeyinLocalDB,TargetElement.checked);
    }
    else{
        SourceAudio.pause();
        localStorage.setItem(UpgradingKeyinLocalDB,TargetElement.checked);
    }
}


// when menu game load "first check automatic"
CheckToggleAndUpgrading(MusicSitting,DefultMusic,isMusicModActive);


// manually check & upgrading when clicked
MusicSitting.onclick = _ => {
    CheckToggleAndUpgrading(MusicSitting,DefultMusic,isMusicModActive);
}


// manually upgrading when clicked
AudioClickEffect.onclick = (event) =>{
    localStorage.setItem(isEffectClicksActive, event.target.checked);
}