
export class Player{

    constructor(name = "def" , wins = 0 , index = 0){
        this.name = name;
        this.wins = wins;
        this.photo = "./graphics/pic_player.png";
        this.turn = false;
        this.index = index;
       
        // HTML ELEMENTS
        this.html = {
            photo : null,
            name : null,
            turn : null,
        };

        // get html profile
        this.getUI = () => {
            debugger
            // get dom ui's
            let uis = document.querySelectorAll(".player_profile");

            // select depened on player index
            this.html.photo = uis[this.index].querySelector(".player_pic_profile");
            this.html.name  = uis[this.index].querySelector(".player_name");
            this.html.turn  = uis[this.index].querySelector(".turn");
            
        };
        this.getUI();

        this.loadUI = function(){
            debugger
            (this.html.photo != null) ? this.html.photo.src = this.photo : console.warn("missing player " + this.index + " photo");
            (this.html.name  != null) ? this.html.name.textContext = this.name : console.warn("missing player " + this.index  + " name");
        };

        this.loadUI();
    }

}