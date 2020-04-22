
//sound path
const SoundClickEffectPath = "../sound/click.mp3";
const SoundClick = new Audio(); SoundClick.src = SoundClickEffectPath;

export const AllGameBlock = document.querySelector("#GAME_TABLE").children;

function SetEffectClickForAllBlock(){
    // we set Effect Click if player make effect mod checkbox true in sitting 
    if(JSON.parse(localStorage.getItem("isEffectClicksActive"))){
        for(let i = 0 ; i < AllGameBlock.length ; i += 1){
            AllGameBlock[i].onclick = _ => {
                SoundClick.play();
            }
        } 
    }
}

SetEffectClickForAllBlock();

var musicModActive = JSON.parse(localStorage.getItem("isMusicModActive"));

if(musicModActive){
    var DefultMusic = new Audio();
        DefultMusic.src = sourceMusic;
        DefultMusic.loop = true;

        
        if(localStorage.getItem("CurrentTime_Music")){
            DefultMusic.currentTime = localStorage.getItem("CurrentTime_Music");
        }
        DefultMusic.play();

    // for saving current time of music "for keep playing in other mods :)"
    setInterval(() => {
        localStorage.setItem("CurrentTime_Music",DefultMusic.currentTime);
        //DefultMusic.currentTime = 100;
    }, 1000);
}