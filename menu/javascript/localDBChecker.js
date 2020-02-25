
export const DB_DefKeys = [
    "EasyBot","NormalBot","Player1MatchWin","Player1Name","Player1PicturePath",
    "Player1ScoreEasyMod","Player1ScoreHardMod","Player1ScoreNormalMod","Player2MatchWin",
    "Player2Name","Player2PicturePath"
];

export const DB_DefValues = [
    0,0,0,"user","default",0,0,0,0,"user","default"
];

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

CheckDataFromLocalDB();
