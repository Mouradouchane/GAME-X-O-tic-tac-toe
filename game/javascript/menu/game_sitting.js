import {Player} from "../player/player.js";

export class game_sitting_side{

    constructor(){

        this.sitting_side   = document.querySelector("#sitting");
        this.back_button    = this.sitting_side.querySelector("#sitting_back_button");
        this.sitting_button = document.querySelector("#SittingButton");
        this.player1_data = new Player() ;
        this.player2_data = new Player() ;

        // click on sitting button make "sitting_side" visible
        this.sitting_button.addEventListener("click" , () => {
                this.sitting_side.style.cssText = "visibility: visible";
        });

        // click on back button in "sitting_side" make "sitting_side" hidden
        this.back_button.addEventListener("click" , () => {
                this.sitting_side.style.cssText = "visibility: hidden";
        });
        

        // function change/update player name & win counts in sitting side
        this.updatePlayerDataInSitting = (idx = 1) => {
            //debugger
            let userPart = document.querySelectorAll(".PartOfSitting")[(idx == 1 ? 0 : 1)];
            let nameArea = userPart.querySelector((idx == 1 ) ? "#PlayerOneStandarUsername" : "#PlayerTowStandarUsername");
            let winsArea = userPart.querySelector((idx == 1 ) ? "#PlayerOneStandarScore" : "#PlayerTowStandarScore");

            nameArea.textContent = (idx == 1) ? this.player1_data.name : this.player2_data.name ;
            winsArea.textContent = (idx == 1) ? this.player1_data.wins : this.player2_data.wins ;
        }

        // function load player obj from localDB in case not found it's make a new player obj
        this.loadPlayerData = (idx = 1) => {
            //debugger
            let player_data = (idx == 1 ) ? localStorage.getItem("player1") : localStorage.getItem("player2");

            player_data = (player_data != null) ? JSON.parse(player_data) : new Player();

            // update values in dom
            this.updatePlayerDataInSitting( (idx == 1) ? 1 : 2 );

            return player_data;
        }

        // function save player obj to localDB
        this.savePlayerData = (index = 1) => {
            localStorage.setItem(`player${index}` , JSON.stringify( (index == 1) ? this.player1_data : this.player2_data) );
        }

        // load player 1 & 2
        this.player1_data = this.loadPlayerData(1);
        this.player2_data = this.loadPlayerData(2);

        // those inputs for changing player 1 & 2 names
        this.inputName_P1 = document.querySelector("#PlayerOneName");
        this.inputName_P2 = document.querySelector("#PlayerTowName");

 
        // event when user change name in input filed we update it in localDB        
        this.inputName_P1.addEventListener("keyup" , () => {
            // load player data
            this.player1_data = this.loadPlayerData(1);

            // edit player name
            this.player1_data.name = this.inputName_P1.value;

            // save player data 
            this.savePlayerData(1);

            // update values in dom
            this.updatePlayerDataInSitting(1);
        });

        // same event in input 2
        this.inputName_P2.addEventListener("keyup" , () => {
            // load player data
            this.player2_data = this.loadPlayerData(2);

            // edit player name
            this.player2_data.name = this.inputName_P2.value;

            // save player data 
            this.savePlayerData(2);

            // update values in dom
            this.updatePlayerDataInSitting(2);
        });


        // photo player inputs 
        this.player1_photo_input = document.querySelector("#PlayerOnePicture");
        this.player2_photo_input = document.querySelector("#PlayerTowPicture");

        this.player1_photo_input.addEventListener("change" , (e) => {
            let photo_file = e.target.files[0];

            let file = new FileReader();
            console.log( file.readAsArrayBuffer(photo_file) ) ;
        });

        // update values in dom
        this.updatePlayerDataInSitting(1);
        this.updatePlayerDataInSitting(2);
    }

}
