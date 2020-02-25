const  AllPartOfSitting = document.querySelectorAll(".PartOfSitting");
export const [SittingPlayerOne , SittingPlayerTow , GameDeatils , GameAudio] = AllPartOfSitting;

const AllBtns = document.querySelectorAll(".btns");
const [PlayButton,SittingButton] = AllBtns;

const contentMods = document.querySelector("#contentMods");
const HideModsButton = document.querySelector("#back");


PlayButton.addEventListener("click" , getTableModGameVisible);
HideModsButton.addEventListener("click" , getTableModGameHidden);


function getTableModGameVisible(){
    contentMods.style.cssText = "visibility: visible;";
}

function getTableModGameHidden(){
    contentMods.style.cssText = "visibility: hidden;";
}


// divs mods part 
// making every div move you to specifice mod page 

// this constant has all divs mods ".mods"
const DivsModsAll = document.querySelectorAll(".mods");

// array who has all game mods paths
const   PathsModsAll = [
        "/GAME-X-O-tic-tac-toe/1vs1_mod/content.html",
        "/GAME-X-O-tic-tac-toe/easy_mod/content.html",
        "/GAME-X-O-tic-tac-toe/normal_mod/content.html",
        "/GAME-X-O-tic-tac-toe/hard_mod/content.html"
];

function SetGameModsEvent(ArrayPaths = [],ArrayDivsMod = []){

    if(ArrayPaths.length != 0 || ArrayDivsMod != 0){
        for(let i = 0 ; i < ArrayDivsMod.length ; i += 1){
            ArrayDivsMod[i].onclick = _ => {
                window.open(ArrayPaths[i],"_self","",true);
            } 
        }
    }
    else{
        let error = new Error("Empty Array","Array.length 0");
        throw error;
    }

}

SetGameModsEvent(PathsModsAll,DivsModsAll);


SittingButton.addEventListener("click" , getSittingTableVisible);


const SittingButtonsPart = document.querySelector("#ButtonsPart").children;
const [back] = SittingButtonsPart;


back.addEventListener("click" , getSittingTableHidden);


function getSittingTableVisible(){
    sitting.style.cssText = "visibility: visible;";
}

function getSittingTableHidden(){
    sitting.style.cssText = "visibility: hidden;";
}