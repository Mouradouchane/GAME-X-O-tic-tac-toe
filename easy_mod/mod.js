// for removing Hover Mod events 
import {SetHoverMod_Bot , RemoveHoverMod_Bot} from "../easy_mod/HoverMod.js";
import {GetRecentColors} from "./colors.js";

// player class
class player{
    constructor(name,type,index = 1){
        this.name = name;
        this.owned_blocks = [];
        this.matches_win = 0;
        this.type = type;
        this.index = index;
        this.isbot = false;
        // this for get player info from "LOCAL DB" in browser & print it in header 
        this.get_player_info = () => {
            // get info from localDB
            let PLAYER_DATA = localStorage.getItem(`Player1ScoreEasyMod`);

            // this has all children's
            let class_info_in_dom = document.querySelectorAll(".player_profile");

            //just checking if this is a player 1 or 2 
            // if(this.index == 1){
            let player_name_in_dom = class_info_in_dom[0].querySelector(".player_name");
            player_name_in_dom.textContent = this.name;
            // print in first 
            timer_and_result_matches[1].textContent = PLAYER_DATA;
            // }
            // if(this.index == 2){
            //     let player_name_in_dom = class_info_in_dom[1].querySelector(".player_name");
            //     player_name_in_dom.textContent = this.name;
            //     // print in last
            //     timer_and_result_matches[3].textContent = PLAYER_DATA;
            // }
        }
        // this for updating info to "LOCALC DB"
        // this method must be happen when player win :)
        this.update_player_info = () => {
            // get info from localDB
            let PLAYER_DATA = Number.parseInt(localStorage.getItem(`Player1ScoreEasyMod`));

            //just checking if this is a player 1 or 2 
            // if(this.index == 1){
                localStorage.setItem("Player1ScoreEasyMod",PLAYER_DATA+=1);
                // call print info because there is a changed in values :)
                this.get_player_info();
            // }

            let matchResult = document.querySelector("#match_result");
            matchResult.textContent = "winner is :" + this.name;
        }
    }
}

class EasyBot{
    constructor(){
        this.isbot = true;
        this.name = "Mr.Easy";
        this.owned_blocks = [];
        this.matches_win = 0;
        this.type = "0";
        this.index = 2;
        // this for get bot info from "LOCAL DB" in browser & print it in header 
        this.get_bot_info = () => {
            
            // get info from localDB
            let Bot_DATA = localStorage.getItem("EasyBot");
            // this has all children's
            let class_info_in_dom = document.querySelectorAll(".player_profile");

            let player_name_in_dom = class_info_in_dom[1].querySelector(".player_name");
            player_name_in_dom.textContent = this.name;
            // print in last
            timer_and_result_matches[3].textContent = Bot_DATA;
            
        }
        // this for updating info to "LOCALC DB"
        // this method must be happen when bot win :)
        this.update_bot_info = () => {
            // get info from localDB
            let Bot_DATA = Number.parseInt(localStorage.getItem("EasyBot"));
            localStorage.setItem("EasyBot",Bot_DATA+=1);
            
            // call print info because there is a changed in values :)
            this.get_bot_info();
            
            let matchResult = document.querySelector("#match_result");
            matchResult.textContent = "winner is :" + this.name;
        }
        // this method make bot playing :) (randomlly & stupidlly)
        this.bot_playing = () => {
            var RandomChoise = Math.round(Math.random() * 8);
            while(true){
                if(LISTED_OBJECTS_BLOCKS[RandomChoise].type == ""){
                    GAME_BLOCKS_TABLE[RandomChoise].click();
                    break;
                }
                else{
                    RandomChoise = Math.round(Math.random() * 8);
                }
            }
        }
    }
}

const timer_and_result_matches = document.querySelector("#matchs_result").children;

// define player & bot
const player1 = new player(localStorage.getItem("Player1Name"),"x",1);
const Bot_MrEasy = new EasyBot();

// array has players
var PLAYERS = [player1,Bot_MrEasy];

// printing data in header in dom
PLAYERS[0].get_player_info();
PLAYERS[1].get_bot_info();

// game table
var GAME_TABLE = document.querySelector("#GAME_TABLE");
// array has all blocks in game table
var GAME_BLOCKS_TABLE = GAME_TABLE.children;

const players_info_in_dom = document.querySelectorAll(".player_profile");

// array of reserved block's
var RESERVED_BLOCKS_IN_TABLE = [];

// array of block's listed as object's from 1 to 9 
// for detected winner   
var LISTED_OBJECTS_BLOCKS = [];

// just a arrow function run it automaticlly to make listed objects in ==> "LISTED_OBJECTS_BLOCKS"
(() => {
    for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
        LISTED_OBJECTS_BLOCKS.push({
            name : "block"+(i+1),
            type : "",
            owner : null,
            block : GAME_BLOCKS_TABLE[i],
            index : undefined,
        });
    }
})();

// **** time part ****
// time varible 
var time = 0;

function timerFunc(){
    timer_and_result_matches[0].textContent = time+"s";
    time+=1;
} 

// interval responsible for adding time every => "1sec add 1sec"
var start_timer = setInterval(timerFunc, 1000);


// interval responsible for adding time every => "1sec add 1sec"
var start_timer = setInterval(timerFunc, 1000);

// game case for switching bettween x & o
var GAME_OBJECTCASE = ["x","o"];

// for checking if draw 
// look to GAME_CHECK_IF_DRAW function to understand why this varible !!
var GAME_ALL_TRYING = 0;

// x & o path images
let x = "../graphics/x.png";
let o = "../graphics/o.png";

// this function for "drawing" x or o in blocks 
function DRAW_IN_BLOCK(){
    let tp;
    if(GAME_OBJECTCASE[0] == "x"){
        this.style.cssText = `background-image: url(${x})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"x",name:this.id,owner:PLAYERS[0].name});
        tp = "x";
    }

    if(GAME_OBJECTCASE[0] == "o"){
        this.style.cssText = `background-image: url(${o})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"o",name:this.id,owner:PLAYERS[0].name});
        tp = "o";
    }

    this.removeEventListener("click",DRAW_IN_BLOCK);
    this.removeEventListener("mouseover" , SetHoverMod_Bot);
    this.removeEventListener("mouseleave", RemoveHoverMod_Bot);

    GetRecentColors();

    for(let c = 0 ; c < LISTED_OBJECTS_BLOCKS.length ; c+=1){
        if(LISTED_OBJECTS_BLOCKS[c].name == this.id){
            LISTED_OBJECTS_BLOCKS[c].owner = PLAYERS[0].name;
            LISTED_OBJECTS_BLOCKS[c].type = tp;
            LISTED_OBJECTS_BLOCKS[c].index = c;
            // stop loop if condition true
            break;
        }
    }

    // this part for reserving block & send it to the player "owner_block" => ARRAY !
    PLAYERS[0].owned_blocks.push({
        name:this.id,
        type: tp,
    });

    //reverse PLAYERS turn in array
    PLAYERS.reverse();
    // adding 1 to TRYING for we now is game is end or not "important for CHECKING_DRAW !"
    GAME_ALL_TRYING+=1;
    // reversing case array for switching bettween x & o
    GAME_OBJECTCASE.reverse();
    // just calling draw fucntion as last step :)
    DRAW_TURN();
}

// give all blocks in game table a "click event" for playing as players :) 
for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
    GAME_BLOCKS_TABLE[i].addEventListener("click",DRAW_IN_BLOCK);
}

// this function "dependent" a "GAME_ALL_TRYING" varible  
// this function called in "Interval" every "100ms" ===> in "checking_draw varible"
function GAME_CHECK_IF_DRAW(){

    /* 
    if GAME_ALL_TRYING >= 9 that mean game is end by draw 
    because total blocks in game table is 9 :)
    soo if condition is true stop match is end :)
    */
    
    if(GAME_ALL_TRYING >= 9){

        // printing match is draw in header
        let matchResult = document.querySelector("#match_result");
        matchResult.textContent = "match is draw";

        // stop this function !!
        clearInterval(checking_draw);
        
        // stop game by remove event from all blocks
        REMOVE_EVENT_FROM_BLOCKS();

        // stop timer because match is end 
        clearInterval(start_timer);

        // stop & clearing checking is a bot turn or not 
        clearInterval(checkPlayer);
    
        // for next game :)
        Call_AutoReplay();
        
        if(PLAYERS[0].isbot){
            PLAYERS[0].bot_playing = null;
        }
        if(PLAYERS[1].isbot){
            PLAYERS[1].bot_playing = null;
        }
    }
}

// "checking every 100ms" if game is "end" & no one is win "game is draw" :)
var checking_draw  = setInterval(GAME_CHECK_IF_DRAW , 500);

// sources path for go & stop png for drawing who's in turn
var STOP_GO_SRC = ["../graphics/go.png","../graphics/stop.png"]; 

// function drawing who have turns
function DRAW_TURN(){
    // reversed turn 
    STOP_GO_SRC.reverse();

    players_info_in_dom[0].children[2].src = STOP_GO_SRC[0];
    players_info_in_dom[1].children[2].src = STOP_GO_SRC[1];
}


// *** rules part & check who is win ***

function GAME_IS_WIN(){

    // blocks all just 3 block for winning :)
    let blocks_all = false;
    
    // for checking winner is bot or not
    let winnerType = undefined;
    
    for(let i = 0 ; i < 9 ; i+=3){
        
        // check all horizontal blocks for player 1 & 2
        if(LISTED_OBJECTS_BLOCKS[i] != undefined && LISTED_OBJECTS_BLOCKS[i+1] != undefined && LISTED_OBJECTS_BLOCKS[i+2] != undefined){
            if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[0].name && 
                LISTED_OBJECTS_BLOCKS[i+1].owner == PLAYERS[0].name && 
                LISTED_OBJECTS_BLOCKS[i+2].owner == PLAYERS[0].name ){
                winnerType = 0;
                blocks_all = true;
                break;
            }
    
            if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[1].name && 
                LISTED_OBJECTS_BLOCKS[i+1].owner == PLAYERS[1].name && 
                LISTED_OBJECTS_BLOCKS[i+2].owner == PLAYERS[1].name ){
                winnerType = 1;
                blocks_all = true;
                break;
            }
        }
    } 
    
    for(let i = 0 ; i < 3 ; i+=1){
            // check all vertical blocks for player 1 & 2
            if(LISTED_OBJECTS_BLOCKS[i] != undefined && LISTED_OBJECTS_BLOCKS[i+3] != undefined && LISTED_OBJECTS_BLOCKS[i+6] != undefined){
                if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[0].name && 
                    LISTED_OBJECTS_BLOCKS[i+3].owner == PLAYERS[0].name && 
                    LISTED_OBJECTS_BLOCKS[i+6].owner == PLAYERS[0].name ){
                    winnerType = 0;
                    blocks_all = true;
                    break;
                }
    
                if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[1].name && 
                    LISTED_OBJECTS_BLOCKS[i+3].owner == PLAYERS[1].name && 
                    LISTED_OBJECTS_BLOCKS[i+6].owner == PLAYERS[1].name ){
                    winnerType = 1;
                    blocks_all = true;
                    break;
                }
            }
    }
    
    if(LISTED_OBJECTS_BLOCKS[0] != undefined && LISTED_OBJECTS_BLOCKS[4] != undefined && LISTED_OBJECTS_BLOCKS[8] != undefined &&
        LISTED_OBJECTS_BLOCKS[2] != undefined && LISTED_OBJECTS_BLOCKS[6] != undefined
      ){
        // check Diagonal blocks for player 1  
        if( LISTED_OBJECTS_BLOCKS[0].owner == PLAYERS[0].name && 
            LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[0].name &&
            LISTED_OBJECTS_BLOCKS[8].owner == PLAYERS[0].name ){
                winnerType = 0;
                blocks_all = true;
        }
        // check Diagonal blocks for player 2 
        if( LISTED_OBJECTS_BLOCKS[0].owner == PLAYERS[1].name && 
            LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[1].name &&
            LISTED_OBJECTS_BLOCKS[8].owner == PLAYERS[1].name ){
                winnerType = 1;
                blocks_all = true;
        }
    
        // check Diagonal "2" blocks for player 1  
        if( LISTED_OBJECTS_BLOCKS[2].owner == PLAYERS[0].name && 
            LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[0].name &&
            LISTED_OBJECTS_BLOCKS[6].owner == PLAYERS[0].name ){
                winnerType = 0;
                blocks_all = true;
        }
        // check Diagonal "2" blocks for player 2  
        if( LISTED_OBJECTS_BLOCKS[2].owner == PLAYERS[1].name && 
            LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[1].name &&
            LISTED_OBJECTS_BLOCKS[6].owner == PLAYERS[1].name ){
                winnerType = 1;
                blocks_all = true;
        }
    }
    
        // if any one of this conditions send true this function stop after do this condition :)
        // as last step 
        if(blocks_all == true){
            
            Call_AutoReplay();
            REMOVE_EVENT_FROM_BLOCKS();
            
            // stop checking because match is end 
            clearInterval(checking_is_win);
            
            // stop timer because match is end 
            clearInterval(start_timer);
    
            clearInterval(checking_draw);
            GAME_ALL_TRYING = 0;
    
            // check winner type
            if(winnerType == 0){
                if(PLAYERS[0].isbot == true){
                    PLAYERS[0].update_bot_info();
                }
                else{
                    PLAYERS[0].update_player_info();
                }
            }
            if(winnerType == 1){
                if(PLAYERS[1].isbot == true){
                    PLAYERS[1].update_bot_info();
                }
                else{
                    PLAYERS[1].update_player_info();
                }
            }

            // stop & clearing checking is a bot turn or not 
            clearInterval(checkPlayer);
        }

}


var checking_is_win = setInterval(GAME_IS_WIN,100);

// this function called when game is end in draw or in winning 
// for remove event from all blocks in table;
function REMOVE_EVENT_FROM_BLOCKS(){
    for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
        GAME_BLOCKS_TABLE[i].removeEventListener("click",DRAW_IN_BLOCK);
        GAME_BLOCKS_TABLE[i].removeEventListener("mouseover" , SetHoverMod_Bot);
        GAME_BLOCKS_TABLE[i].removeEventListener("mouseleave", RemoveHoverMod_Bot);
    }
}

// ******** this part for reloading game *********

const resetElements = document.querySelector("#reset_game");
const reloadElements = resetElements.children;
//just destructing assignement reloadElements
let [autoPlayText,progress,buttonRELOAD] = reloadElements;

let CASE = ["none","block"];

buttonRELOAD.addEventListener("click" , () => {   
    HideReplay();
    window.location.href = window.location.pathname;
});
    
// just displaying resetElements
function DisplayReplay(){
    resetElements.style.cssText = `display : ${CASE[1]};`;
}
// just hidding resetElements
function HideReplay(){
    resetElements.style.cssText = `display : ${CASE[0]};`;
    progress.value = progress.max;
}
    
    // timer for auto replay 
    // for changing value in progress :)
    let timerAutoPlay = 30;
    
    // this function check if time autoreplay is end or not yet
    function timerReplay(){
        autoPlayText.textContent = `auto replay in ${Number.parseInt(timerAutoPlay)}`;
    
        if(progress.value <= 0){
            timerAutoPlay = 30;
            progress.value = progress.max;
            return buttonRELOAD.click();
        }
        if(progress.value >= 0){
            setTimeout( _ => {
                timerAutoPlay -= 0.01;
                progress.value = timerAutoPlay;
                timerReplay();
            } , 10);
        }
    } 
    
    // this function just for call DisplayReplay & timerReplay 
    function Call_AutoReplay(){
        DisplayReplay();
        timerReplay();
    };
    



// check if bot turn or not :)
function CheckingPlayerIsBot(){
        if(PLAYERS[0].isbot == true){
            PLAYERS[0].bot_playing();
        }
}

var checkPlayer = setInterval(CheckingPlayerIsBot,100);



// background mod 
function LoadRecentBackground(){
    if( JSON.parse(localStorage.getItem("isBackgroundModActive")) ){
        let RecentImg = localStorage.getItem("backgroundIndex");
        document.body.style.backgroundImage = `url(${RecentImg})`;
    }else{
        document.body.style.backgroundColor = "white";
    }
}

// call load recent background as first time when opening page
LoadRecentBackground();


// this part for upgrading picture player

const picsPlayerOneInDOM = document.querySelectorAll(".player_pic_profile")[0];


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

PrintNewPlayerPictuer("Player1PicturePath" , picsPlayerOneInDOM);