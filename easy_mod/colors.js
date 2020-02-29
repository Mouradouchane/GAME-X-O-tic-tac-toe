// this part for put colors 

import {AllGameBlock} from "./audio.js";

var RecentColors = [
    localStorage.getItem("GameDeatils_ColorBlockOne"),localStorage.getItem("GameDeatils_ColorBlockTow")
];

export function GetRecentColors(){
    for(let i = 0 ; i < AllGameBlock.length ; i += 1){
        if(i % 2 == 0){
            AllGameBlock[i].style.backgroundColor = RecentColors[0];
        }
        else{
            AllGameBlock[i].style.backgroundColor = RecentColors[1];
        }
    }
}

GetRecentColors();