
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

var GAME_TABLE = document.querySelector("#GAME_TABLE");
var GAME_BLOCKS_TABLE = GAME_TABLE.children;

var GAME_OBJECTCASE = ["x","o"];

const players_info_in_dom = document.querySelectorAll(".player_profile");
const timer_and_result_matches = document.querySelector("#matchs_result").children;

var RESERVED_BLOCKS_IN_TABLE = [];

var time = 0;
var start_timer = setInterval(() => {
    timer_and_result_matches[0].textContent = time+"s";
    time+=1;
} , 1000);

var GAME_ALL_TRYING = 0;

let x = "../graphics/x.png";
let o = "../graphics/o.png";

function DRAW_IN_BLOCK(){

    if(GAME_OBJECTCASE[0] == "x"){
        this.style.cssText = `background-image: url(${x})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"x",name:this.id});
        this.removeEventListener("click",DRAW_IN_BLOCK);
    }

    if(GAME_OBJECTCASE[0] == "o"){
        this.style.cssText = `background-image: url(${o})`;
        RESERVED_BLOCKS_IN_TABLE.push({type:"o",name:this.id});
        this.removeEventListener("click",DRAW_IN_BLOCK);
    }

    GAME_ALL_TRYING+=1;
    GAME_OBJECTCASE.reverse();
    DRAW_TURN();
}

for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
    GAME_BLOCKS_TABLE[i].addEventListener("click",DRAW_IN_BLOCK);
}

function GAME_CHECK_IS_DRAW(){
    if(GAME_ALL_TRYING >= 9){
        console.warn("GAME IS DRAW");
        // stop game 
        for(let i = 0 ; i < GAME_BLOCKS_TABLE.length ; i+=1){
            GAME_BLOCKS_TABLE[i].removeEventListener("click",DRAW_IN_BLOCK);
        }
        clearInterval(checking_draw);
        clearInterval(start_timer);

        console.log(RESERVED_BLOCKS_IN_TABLE);
    }
}

// checking every 100ms if game is end & no one is win "game is draw" :)
var checking_draw  = setInterval(() => {
    GAME_CHECK_IS_DRAW(); 
}, 100);

// sources path for go & stop png for drawing who's in turn
var STOP_GO_SRC = ["../graphics/go.png","../graphics/stop.png"]; 

// function who's drawing turns
function DRAW_TURN(){
    // reversed turn 
    STOP_GO_SRC.reverse();

    players_info_in_dom[0].children[2].src = STOP_GO_SRC[0];
    players_info_in_dom[1].children[2].src = STOP_GO_SRC[1];
}

// *** rules part ***

function GAME_IS_WIN(){
for(let i = 1 ; i < 9 ; i+=3){
    if(RESERVED_BLOCKS_IN_TABLE[i] != undefined && RESERVED_BLOCKS_IN_TABLE[i+1] != undefined && RESERVED_BLOCKS_IN_TABLE[i+2] != undefined ){
        if(RESERVED_BLOCKS_IN_TABLE[i].type ==  "x" && RESERVED_BLOCKS_IN_TABLE[i+1].type == "x" && RESERVED_BLOCKS_IN_TABLE[i+2].type == "x");
        console.warn("WINNER IS : x" , "in row : " , i);
        clearInterval(checking_is_win);
        }
    } 
}

var checking_is_win = setInterval(GAME_IS_WIN,500);