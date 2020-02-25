
// full side "GameDetails" sitting part
const GameDetails = document.querySelector("#GameDetails");
const [blockOne , blockTow] = GameDetails.querySelector("#ExampleBlocksFull").children;

const [inputOne , inputTow] = GameDetails.querySelectorAll(".BrowseInputs");

function SetRecentColor(index = 1){

    let DefaultColorFromLoacalDB = "";

    if(index == 1){
        DefaultColorFromLoacalDB = localStorage.getItem("GameDeatils_ColorBlockOne");
        blockOne.style.backgroundColor = DefaultColorFromLoacalDB;
    }
    if(index == 2){
        DefaultColorFromLoacalDB = localStorage.getItem("GameDeatils_ColorBlockTow");
        blockTow.style.backgroundColor = DefaultColorFromLoacalDB;
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
