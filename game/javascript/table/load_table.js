import {BOT} from "../bot/bot.js";

// this moduel should "load/generate" the hole game table with specific size & players data & ...

export class table{
    // game mode mean "1 vs 1" or "1 vs bot"
    constructor(game_mod  = 1 , game_table_size = 3){

        this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = (game_table_size < 3) ? 3 : game_table_size;

        this.blocks = [];
        this.table_dom = document.querySelector("#GAME_TABLE");
        
        // all players data include BOT :)
        this.player1 = null;
        this.player2 = null;
        this.bot = new BOT();

        // both "player_profile" side in table
        // for loading players data on it
        [this.player_side_1 , this.player_side_2] = document.querySelectorAll(".player_profile");

        // loading "this.game_details_obj" for using saved values from user "colors , background ..."
        this.game_details_obj = JSON.parse( localStorage.getItem("game_details_obj") ); 

        // function must be run when user click on "GO button"
        // this function it's task only load game table with right style
        this.load_table_elements = () => {
            //debugger    
            
            // setup table grid
            this.table_dom.style.cssText = `grid-template-columns : repeat(${this.game_table_size}, 1fr)`;
            
            // in case "this.game_details_obj" missing 
            if(this.game_details_obj == null || this.game_details_obj == undefined){
                console.error("GAME : missing 'game_details_obj' , go to sitting & make some changes");
            }

            let color1 = this.game_details_obj.sqr1_color;
            let color2 = this.game_details_obj.sqr2_color;

            // generate blocks + neede stuff with each block 
            for(let x = 1 ; x <= this.game_table_size*this.game_table_size ; x += 1){
                
                // a new block
                let element = document.createElement("div");
                // setup that new block
                    element.setAttribute("class","BLOCK_STYLE");
                    element.setAttribute("id","block"+x);
                    element.setAttribute("index", x);
                    element.setAttribute("empty", 0);
                    element.style.cssText = `background-color : ${(x % 2 != 0) ? color1 : color2}`;

                // setup events on that 
                    // when user hover in  that block
                    element.addEventListener("mouseover", () => {
                        if(element.getAttribute("empty") == "0" && this.game_details_obj.hover_mod){
                            if(this.player1.turn){
                                 element.style.backgroundImage = "url('./graphics/x_HoverMod.png')";
                            }
                            else element.style.backgroundImage = "url('./graphics/o_HoverMod.png')";
                        }
                    });

                    // when user hover out of that block
                    element.addEventListener("mouseout", () => {
                        if(element.getAttribute("empty") == "0"){
                            element.style.backgroundImage = "url('#')";
                        }
                    });

                    // when user click on that block
                    element.addEventListener("click", () => {
                        if(element.getAttribute("empty") == "0"){
                            
                            if(this.player1.turn){
                                element.style.backgroundImage = "url('./graphics/x.png')";
                            }
                            else element.style.backgroundImage = "url('./graphics/o.png')";

                            [this.player1.turn , this.player2.turn] = [this.player2.turn , this.player1.turn];
                        }

                        element.setAttribute("empty" , 1);
                    });

                // add block to the game table
                this.table_dom.appendChild(element);  
                this.blocks.push(element);
            }
            
            // load background if user allow that 
            let table_background = document.querySelector("#game_tabel");
            
            if(this.game_details_obj.background_mod && this.game_details_obj.background_id != undefined){
                 table_background.style.backgroundImage = `url("./graphics/backgrounds/background_${this.game_details_obj.background_id + 1}.jpg")`;
            }
            else table_background.style.backgroundColor = `white`;
           

            // call load players data depened on mod

            // 1 ==> 1 vs 1 mod
            if(this.game_mode == 1){
                this.load_player_data(1);
                this.load_player_data(2);

                // game start always with player 1 turn
                this.player1.turn = true;  // :)
                this.player2.turn = false; // :(
            }
            // else mean 1 vs bot mod
            else{
                this.load_player_data(1);
                this.load_bot_data();

                this.player1.turn = true; // :)
                this.bot.turn = false;    // :|
            }
        }



        // function must be run when user click on "GO button"
        // this function load player 1 or 2 data to the game tabel 'depened on game mode'
        this.load_player_data = (player_index = 1) => {
            
            // load player data from localDB "depened on player index"
            (player_index == 1) ? this.player1 = JSON.parse( localStorage.getItem("player1") ) : this.player2 = JSON.parse( localStorage.getItem("player2") );
            
            //console.log( (player_index == 1) ? this.player1 : this.player2 );
            // after getting player data , then we must filling it in DOM 
            if(player_index == 1){
                this.player_side_1.querySelectorAll(".player_name")[0].textContent = this.player1.name;
                this.player_side_1.querySelectorAll(".player_pic_profile")[0].src  = this.player1.photo;
            }
            else{
                this.player_side_2.querySelectorAll(".player_name")[0].textContent = this.player2.name;
                this.player_side_2.querySelectorAll(".player_pic_profile")[0].src  = this.player2.photo;
            }
            
        }

        // like the above function "load_player_data"  
        this.load_bot_data = () => {
            
            this.player_side_2.querySelectorAll(".player_name")[0].textContent = this.bot.profile.name;
            this.player_side_2.querySelectorAll(".player_pic_profile")[0].src  = this.bot.profile.photo;
            
        }

        this.load_table_elements();
    }
}