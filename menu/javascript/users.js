
import {SittingPlayerOne , SittingPlayerTow} from "../javascript/menu.js";

const [PlayerOne_ProfileRecent , PlayerOne_UpdatePicture ] = SittingPlayerOne.querySelectorAll(".content_prop");
const [PlayerTow_ProfileRecent , PlayerTow_UpdatePicture ] = SittingPlayerTow.querySelectorAll(".content_prop");

// player one input name in sitting
const PlayerOneInputName = document.querySelector("#PlayerOneName");
// set event onkeyup for updating player name value in every change
PlayerOneInputName.onkeyup = _ => PlayerSetUpgradedInfoName(true);

// player tow input name in sitting
const PlayerTowInputName = document.querySelector("#PlayerTowName");
// set event onkeyup for updating player name value in every change
PlayerTowInputName.onkeyup = _ => PlayerSetUpgradedInfoName(false);


// call recent info from localDB as first time
// **** true for Player One "Primary Player"
// **** false for Player Tow "defult Player"
PlayerGetRecentInfo("Player1Name","Player1MatchWin",true);
PlayerGetRecentInfo("Player2Name","Player2MatchWin",false);


function PlayerGetRecentInfo(Pname,Pwin,isPrimaryPlayer = true){
    let PlayerName = localStorage.getItem(Pname);
    let PlayerWin = localStorage.getItem(Pwin);

    if(PlayerName != null || PlayerWin != null){
        if(isPrimaryPlayer){
            PlayerOne_ProfileRecent.children[1].children[0].textContent = PlayerName;
            PlayerOne_ProfileRecent.children[1].children[1].textContent = "Match Win : " + PlayerWin;
        }
        else{
            PlayerTow_ProfileRecent.children[1].children[0].textContent = PlayerName;
            PlayerTow_ProfileRecent.children[1].children[1].textContent = "Match Win : " + PlayerWin;
        }
    }
    else{
        let error = new error("data invalid");
        throw error;
    }
}

function PlayerSetUpgradedInfoName(isPrimaryPlayer = true){

    let New_NamePlayerOne = String(PlayerOneInputName.value).trim();
    let New_PlayerNameTow = String(PlayerTowInputName.value).trim();

    let ERROR = new Error("invalid data can't upgrade recent name");

    if(isPrimaryPlayer){
        if(New_NamePlayerOne != ""){
            localStorage.setItem("Player1Name" , New_NamePlayerOne);

            // calling Get Recent Info for Upgrading printed info
            PlayerGetRecentInfo("Player1Name","Player1MatchWin",true);
        }
        else{   
            throw ERROR;
        }
    }
    else{
        if(New_PlayerNameTow != ""){
            localStorage.setItem("Player2Name" , New_PlayerNameTow);

            // calling Get Recent Info for Upgrading printed info
            PlayerGetRecentInfo("Player2Name","Player2MatchWin",false);
        }
        else{
            throw ERROR;
        }
    }
}


// **** pictuers part ****


// function who set new path to localDB in browser 
function UpgradingNewPlayerPictuer(Path , KeyNameInLocalDB){
        localStorage.setItem(KeyNameInLocalDB, Path);
        console.warn("picture working succsefly");
}


function PrintNewPlayerPictuer(PathInLocalDB , PicterInDocument){
    const GetPictuer = localStorage.getItem(PathInLocalDB).trim();
    
    if(GetPictuer != null && GetPictuer.startsWith("data:image") && GetPictuer != ""){
        PicterInDocument.src = GetPictuer;
    }
    else{
        console.error("invalid pictuer path in Local Storage");
        loadDefultPictuer(PicterInDocument);
    }
}


const PlayerOnePictuer = document.querySelector("#ProfilePicterPlayer1");
const UploadPictuerPlayerOne = PlayerOne_UpdatePicture.querySelector("#PlayerOnePicture");

var IMGReader   = new FileReader();

// set event "change" for getting new pictuer path everytime 
UploadPictuerPlayerOne.addEventListener("change" , _ =>{
    
    // get new pictuer path
    let NewPicPath  = String() , 
        KeyInDB     = "Player1PicturePath" ;

    IMGReader.readAsDataURL(UploadPictuerPlayerOne.files[0]);
    IMGReader.onloadend = event => {
       // PlayerTowPictuer.src = event.target.result;
        NewPicPath  = String(event.target.result);

        // call upgrading pictuer function
        UpgradingNewPlayerPictuer(NewPicPath , KeyInDB);

        // print new pictuer in dom
        PrintNewPlayerPictuer(KeyInDB , PlayerOnePictuer);
    }
}); 


const PlayerTowPictuer = document.querySelector("#ProfilePicterPlayer2");
const UploadPictuerPlayerTow = PlayerTow_UpdatePicture.querySelector("#PlayerTowPicture");

// set event "change" for getting new pictuer path everytime 
UploadPictuerPlayerTow.addEventListener("change" , _ => {
    // get new pictuer path
    let NewPicPath  = String() , 
        KeyInDB = "Player2PicturePath";       
        IMGReader   = new FileReader();

    IMGReader.readAsDataURL(UploadPictuerPlayerTow.files[0]);
    IMGReader.onloadend = event => {
        // PlayerTowPictuer.src = event.target.result;
        NewPicPath  = String(event.target.result);

        // call upgrading pictuer function
        UpgradingNewPlayerPictuer(NewPicPath , KeyInDB);

        // print new pictuer in dom
        PrintNewPlayerPictuer(KeyInDB , PlayerTowPictuer);
    }
});

// call print saved pictuers as frist time when page load it
PrintNewPlayerPictuer("Player1PicturePath" , PlayerOnePictuer);
PrintNewPlayerPictuer("Player2PicturePath" , PlayerTowPictuer);


function loadDefultPictuer(PictuerInDocument){
    PictuerInDocument.src = "../graphics/pic_player.png";
}
