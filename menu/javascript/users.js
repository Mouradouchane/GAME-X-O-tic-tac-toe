
import {SittingPlayerOne , SittingPlayerTow} from "../javascript/menu.js";

const [PlayerOne_ProfileRecent , PlayerOne_UpdatePicture , PlayerOne_UpdateName] = SittingPlayerOne.querySelectorAll(".content_prop");

const PlayerOneInputName = document.querySelector("#PlayerOneName");

PlayerOneInputName.addEventListener("onkeydown", PlayerSetUpgradedInfoName);

function PlayerGetRecentInfo(Pname,Pwin){
    let PlayerName = localStorage.getItem(Pname);
    let PlayerWin = localStorage.getItem(Pwin);

    if(PlayerName != null || PlayerWin != null){
        PlayerOne_ProfileRecent.children[1].children[0].textContent = PlayerName;
        PlayerOne_ProfileRecent.children[1].children[1].textContent = "Match Win : " + PlayerWin;
    }
    else{
        let error = new error("data invalid");
        throw error;
    }
}

function PlayerSetUpgradedInfoName(){
    //let PlayerName = localStorage.getItem(Pname);
    console.clear();
    console.log("name : " + PlayerOneInputName.value);
    /* if(0){
        
    }
    else{
        let error = new error("data invalid");
        throw error;
    }*/
}

PlayerGetRecentInfo("Player1Name","Player1MatchWin");
