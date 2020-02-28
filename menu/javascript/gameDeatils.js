
// full side "GameDetails" sitting part
const GameDetails = document.querySelector("#GameDetails");
const [blockOne , blockTow] = GameDetails.querySelector("#ExampleBlocksFull").children;

const [inputOne , inputTow] = GameDetails.querySelectorAll(".BrowseInputs");
const [BlockOneHover , BlockTowHover] = GameDetails.querySelector("#Hover_ExampleBlocksFull").children;

function SetRecentColor(index = 1){

    let DefaultColorFromLoacalDB = "";

    if(index == 1){
        DefaultColorFromLoacalDB = localStorage.getItem("GameDeatils_ColorBlockOne");
        blockOne.style.backgroundColor = DefaultColorFromLoacalDB;
        BlockOneHover.style.backgroundColor = DefaultColorFromLoacalDB;
    }
    if(index == 2){
        DefaultColorFromLoacalDB = localStorage.getItem("GameDeatils_ColorBlockTow");
        blockTow.style.backgroundColor = DefaultColorFromLoacalDB;
        BlockTowHover.style.backgroundColor = DefaultColorFromLoacalDB;
    }
}

function UpgradingRecentColor(colorVal,index){

        if(colorVal != undefined && colorVal != ""){
            if(index == 1){
                localStorage.setItem("GameDeatils_ColorBlockOne",colorVal);
                SetRecentColor(1);
            }
            if(index == 2){
                localStorage.setItem("GameDeatils_ColorBlockTow",colorVal);
                SetRecentColor(2);
            }
        }
        else{
            console.error("invalid color value");
        }

}


inputOne.addEventListener("change" , (event) => {
    let NewColorValue = event.target.value;
    UpgradingRecentColor(NewColorValue,1);
});

inputTow.addEventListener("change" , (event) => {
    let NewColorValue = event.target.value;
    UpgradingRecentColor(NewColorValue,2);
});

SetRecentColor(1);
SetRecentColor(2);


// **** hover mod ****
const HoverModEffectCheckBox = GameDetails.querySelector("#HoverModEffect");

function HoverModEffectCheckBox_RecentValue(){
    let recentValue = localStorage.getItem("isHoverModActive");
    
    if(recentValue == "true"){
        HoverModEffectCheckBox.checked = true;
    }
    else{
        HoverModEffectCheckBox.checked = false;
    }
}

HoverModEffectCheckBox_RecentValue();

HoverModEffectCheckBox.onclick = (event) => {
        localStorage.setItem("isHoverModActive" , event.target.checked);
}


// **** background mod ****

const BackgrondModCheckBox = GameDetails.querySelector("#BackgrondModCheckBox");

BackgrondModCheckBox.onclick = (event) => {
    localStorage.setItem("isBackgroundModActive" , event.target.checked);
}

function LoadBackgroundModActive_CheckBox(){
    BackgrondModCheckBox.checked = JSON.parse(localStorage.getItem("isBackgroundModActive"));
}

LoadBackgroundModActive_CheckBox();

// **** selecting background ****

const ChosingBackgroundGame = GameDetails.querySelector("#ChosingBackgroundGame").children;
const RecentBackgroundGame = GameDetails.querySelector("#RecentBackgroundGame");

for(let i = 0 ; i < ChosingBackgroundGame.length ; i+=1){
    ChosingBackgroundGame[i].onclick = (event) => {
        if( JSON.parse(localStorage.getItem("isBackgroundModActive")) ){
            let SourceImg = event.target.src.slice(21);
            RecentBackgroundGame.style.backgroundImage = `url(${SourceImg})`;
            SaveRecentBackground(SourceImg);
        }
    }
}

function SaveRecentBackground(background){
    localStorage.setItem("backgroundIndex",background);
}

function LoadRecentBackground(){
    if( Boolean(localStorage.getItem("isBackgroundModActive")) ){
        let RecentImg = localStorage.getItem("backgroundIndex");
        RecentBackgroundGame.style.backgroundImage = `url(${RecentImg})`;
    }else{
        RecentBackgroundGame.style.backgroundColor = "white";
    }
}

// call load recent background as first time when opening page
LoadRecentBackground();