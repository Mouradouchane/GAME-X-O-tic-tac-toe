
class player{
    constructor(name,type){
        this.name = name;
        this.owned_blocks = [];
        this.matches_win = 0;
        this.type = type;
        this.draw_player_info = () => {
            
        }
    }
}

// define players 
const player1 = new player("ouchane","x");
const player2 = new player("tjego","o");

// array has players
var PLAYERS = [player1,player2];

// game table
var GAME_TABLE = document.querySelector("#GAME_TABLE");
// array has all blocks in game table
var GAME_BLOCKS_TABLE = GAME_TABLE.children;

// game case for switching bettween x & o
var GAME_OBJECTCASE = ["x","o"];

const players_info_in_dom = document.querySelectorAll(".player_profile");
const timer_and_result_matches = document.querySelector("#matchs_result").children;

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
    console.log(LISTED_OBJECTS_BLOCKS);
})();


// time varible 
var time = 0;
// interval responsible for adding time every => "1sec add 1sec"
var start_timer = setInterval(() => {
    timer_and_result_matches[0].textContent = time+"s";
    time+=1;
} , 1000);

// for checking if draw 
// look to GAME_CHECK_IF_DRAW function to understand why this varible !!
var GAME_ALL_TRYING = 0;

let x = "../graphics/x.png";
let o = "../graphics/o.png";

// this function for "drawing" x or o in blocks
function DRAW_IN_BLOCK(){
    let tp;
    if(GAME_OBJECTCASE[0] == "x"){
        this.style.cssText = `background-image: url(${x})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"x",name:this.id,owner:PLAYERS[0].name});
        this.removeEventListener("click",DRAW_IN_BLOCK);
        tp = "x";
    }

    if(GAME_OBJECTCASE[0] == "o"){
        this.style.cssText = `background-image: url(${o})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"o",name:this.id,owner:PLAYERS[0].name});
        this.removeEventListener("click",DRAW_IN_BLOCK);
        tp = "o";
    }

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
        console.warn("GAME IS DRAW");
        // stop game by remove event from all blocks
        REMOVE_EVENT_FROM_BLOCKS();

        // stop this function !!
        clearInterval(checking_draw);
        // stop timer because match is end 
        clearInterval(start_timer);

    }
}

// "checking every 100ms" if game is "end" & no one is win "game is draw" :)
var checking_draw  = setInterval(GAME_CHECK_IF_DRAW , 100);

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

let blocks_all = false;

for(let i = 0 ; i < 9 ; i+=3){
    if(LISTED_OBJECTS_BLOCKS[i] != undefined && LISTED_OBJECTS_BLOCKS[i+1] != undefined && LISTED_OBJECTS_BLOCKS[i+2] != undefined){
        if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[0].name && 
            LISTED_OBJECTS_BLOCKS[i+1].owner == PLAYERS[0].name && 
            LISTED_OBJECTS_BLOCKS[i+2].owner == PLAYERS[0].name ){
            console.warn("WINNER IS :" + PLAYERS[0].name);
            console.log(PLAYERS[0]);
            blocks_all = true;
            break;
        }

        if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[1].name && 
            LISTED_OBJECTS_BLOCKS[i+1].owner == PLAYERS[1].name && 
            LISTED_OBJECTS_BLOCKS[i+2].owner == PLAYERS[1].name ){
            console.warn("WINNER IS :" + PLAYERS[1].name);
            console.log(PLAYERS[1]);
            blocks_all = true;
            break;
        }
    }
} 

for(let i = 0 ; i < 3 ; i+=1){
        if(LISTED_OBJECTS_BLOCKS[i] != undefined && LISTED_OBJECTS_BLOCKS[i+3] != undefined && LISTED_OBJECTS_BLOCKS[i+6] != undefined){
            if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[0].name && 
                LISTED_OBJECTS_BLOCKS[i+3].owner == PLAYERS[0].name && 
                LISTED_OBJECTS_BLOCKS[i+6].owner == PLAYERS[0].name ){
                console.warn("WINNER IS :" + PLAYERS[0].name);
                console.log(PLAYERS[0]);
                blocks_all = true;
                break;
            }

            if( LISTED_OBJECTS_BLOCKS[i].owner == PLAYERS[1].name && 
                LISTED_OBJECTS_BLOCKS[i+3].owner == PLAYERS[1].name && 
                LISTED_OBJECTS_BLOCKS[i+6].owner == PLAYERS[1].name ){
                console.warn("WINNER IS :" + PLAYERS[1].name);
                console.log(PLAYERS[1]);
                blocks_all = true;
                break;
            }
        }
}

    if( LISTED_OBJECTS_BLOCKS[0].owner == PLAYERS[0].name && 
        LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[0].name &&
        LISTED_OBJECTS_BLOCKS[8].owner == PLAYERS[0].name ){
            console.warn("WINNER IS :" + PLAYERS[0].name);
            console.log(PLAYERS[0]);
            blocks_all = true;
    }

    if( LISTED_OBJECTS_BLOCKS[0].owner == PLAYERS[1].name && 
        LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[1].name &&
        LISTED_OBJECTS_BLOCKS[8].owner == PLAYERS[1].name ){
            console.warn("WINNER IS :" + PLAYERS[1].name);
            console.log(PLAYERS[1]);
            blocks_all = true;
    }


    if( LISTED_OBJECTS_BLOCKS[2].owner == PLAYERS[0].name && 
        LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[0].name &&
        LISTED_OBJECTS_BLOCKS[6].owner == PLAYERS[0].name ){
            console.warn("WINNER IS :" + PLAYERS[0].name);
            console.log(PLAYERS[0]);
            blocks_all = true;
    }

    if( LISTED_OBJECTS_BLOCKS[2].owner == PLAYERS[1].name && 
        LISTED_OBJECTS_BLOCKS[4].owner == PLAYERS[1].name &&
        LISTED_OBJECTS_BLOCKS[6].owner == PLAYERS[1].name ){
            console.warn("WINNER IS :" + PLAYERS[1].name);
            console.log(PLAYERS[1]);
            blocks_all = true;
    }

    if(blocks_all == true){
        clearInterval(checking_is_win);
        REMOVE_EVENT_FROM_BLOCKS();
        // stop timer because match is end 
        clearInterval(start_timer);
    }
        
}

var checking_is_win = setInterval(GAME_IS_WIN,200);


function REMOVE_EVENT_FROM_BLOCKS(){
    for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
        GAME_BLOCKS_TABLE[i].removeEventListener("click",DRAW_IN_BLOCK);
    }
}