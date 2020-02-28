
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
