import {Player} from "../player/player.js";

export class player_sitting{

    constructor(){
        
        // just tow object for dealing with saved in localDB such => name,win's,photo
        this.player1_data = new Player() ;
        this.player2_data = new Player() ;
        
        // === function change/update player name & win & photo in sitting side === 
        
        this.loadPlayerDataInSitting = (idx = 1) => {
            //debugger
            let userPart = document.querySelectorAll(".PartOfSitting")[(idx == 1 ? 0 : 1)];
            // player name 
            let nameArea = userPart.querySelector((idx == 1 ) ? "#PlayerOneStandarUsername" : "#PlayerTowStandarUsername");
            // player win's
            let winsArea = userPart.querySelector((idx == 1 ) ? "#PlayerOneStandarScore" : "#PlayerTowStandarScore");
            // player photo
            let userphoto = userPart.querySelector((idx == 1) ? "#ProfilePicterPlayer1" : "#ProfilePicterPlayer2");

            // update name in dom
            nameArea.textContent = (idx == 1) ? this.player1_data.name : this.player2_data.name ;
            // update wins count in dom
            winsArea.textContent = (idx == 1) ? this.player1_data.wins : this.player2_data.wins ;

            // update pic in dom 
            userphoto.src = (idx == 1 ) ? this.player1_data.photo : this.player2_data.photo;
            
            // just a simple warning in case no real data founded 

            // part 1 of check
            let isDefName  = (idx == 1) ? this.player1_data.name == "def" : this.player2_data.name == "def";
            let isDefPhoto = (idx == 1) ? this.player1_data.photo.endsWith("pic_player.png") : this.player2_data.photo.endsWith("pic_player.png");
            // part 2 of check depend on part 1 :) 
            if((idx == 1) ? (isDefName && isDefPhoto ) : (isDefName && isDefPhoto )){
                console.warn("GAME : missing player " + idx + " data ! try to make new profile in sitting -> 'player " + idx + "' .");
            }
            

        }

        // function load player obj from localDB in case not found it's make a new player obj
        this.loadPlayerData = (idx = 1) => {
            //debugger
            let player_data = (idx == 1 ) ? localStorage.getItem("player1") : localStorage.getItem("player2");

            player_data = (player_data != null) ? JSON.parse(player_data) : new Player();

            // update values in dom
            // this.loadPlayerDataInSitting( (idx == 1) ? 1 : 2 );

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
            this.loadPlayerDataInSitting(1);
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
            this.loadPlayerDataInSitting(2);
        });


        // photo player inputs 
        this.player1_photo_input = document.querySelector("#PlayerOnePicture");
        this.player2_photo_input = document.querySelector("#PlayerTowPicture");

        // this function works when playr 1 change his profile photo
        this.player1_photo_input.addEventListener("change" , (e) => {
            // trying to load photo
            let photo_file = e.target.files[0];
            let file = new FileReader();
            
            // in case user upload a valid photo
            if( photo_file ){
                file.readAsDataURL(photo_file);
            }
            
            // then we load that valid image & save player data in localDB  
            file.onload = (e) => {

                this.player1_data.photo = file.result;

                this.savePlayerData(1);
                this.loadPlayerData(1);
                this.loadPlayerDataInSitting(1);

            }
        });


        // this function works when playr 2 change his profile photo
        this.player2_photo_input.addEventListener("change" , (e) => {
            // trying to load photo
            let photo_file = e.target.files[0];
            let file = new FileReader();
            
            // in case user upload a valid photo
            if( photo_file ){
                file.readAsDataURL(photo_file);
            }
            
            // then we load that valid image & save player data in localDB  
            file.onload = (e) => {

                this.player2_data.photo = file.result;

                this.savePlayerData(2);
                this.loadPlayerData(2);
                this.loadPlayerDataInSitting(2);


            }
        });


        // update values in dom
        this.loadPlayerDataInSitting(1);
        this.loadPlayerDataInSitting(2);
    }
}