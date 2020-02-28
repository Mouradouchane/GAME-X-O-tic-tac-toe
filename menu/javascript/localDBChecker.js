
// all defult "keys" must be founded in localDB
export const DB_DefKeys = [
    "EasyBot","NormalBot","Player1MatchWin","Player1Name","Player1PicturePath",
    "Player1ScoreEasyMod","Player1ScoreHardMod","Player1ScoreNormalMod","Player2MatchWin",
    "Player2Name","Player2PicturePath","GameDeatils_ColorBlockOne","GameDeatils_ColorBlockTow",
    "isHoverModActive","isBackgroundModActive","backgroundIndex","isEffectClicksActive"
];
// all defult "values" we set if we missing some "key" in localDB
export const DB_DefValues = [
    0,0,0,"user","default",0,0,0,0,"user","default","rgb(75, 92, 128)","rgb(73, 71, 94)",false,false,0,false
];


// function who do checking for all keys in LocalDB "one by one"
export function CheckDataFromLocalDB(){
    for(let index = 0; index < DB_DefKeys.length ; index+=1){
        if(localStorage.getItem(DB_DefKeys[index]) != null || localStorage.getItem(DB_DefKeys[index]) != undefined){
            continue;
        }
        else{
            localStorage.setItem(DB_DefKeys[index],DB_DefValues[index]);
            console.warn("missing :"+DB_DefKeys[index]+" from localDB");
        }
    }
}

// run check function as first time when game run
CheckDataFromLocalDB();