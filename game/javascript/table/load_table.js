// this moduel should "load/generate" the hole game table with specific size & players data & ...
import {block} from "./blocks.js";
import {BOT} from "../bot/bot.js";

export class table{
    // game mode mean "1 vs 1" or "1 vs bot"
    constructor(game_mod = 1 , game_table_size = 3){
        
        this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = (game_table_size < 3) ? 3 : game_table_size;

        // table proprties
        this.blocks = [];

        // virtual 2d array for keep tracking the game & deciding 
        this.virtualtable = [];

        // fill virtual table by "0's"
        this.filltable = () => {
            for(let i = 0 ; i < game_table_size ; i += 1){
                this.virtualtable[i] = [];
                for(let c = 0 ; c < game_table_size ; c += 1){
                    this.virtualtable[i][c] = 0;
                }
            }
        }
        this.filltable();
            
        this.table_dom = document.querySelector("#GAME_TABLE");
        this.reservedBlock = 0;

        this.playersTurns = document.querySelectorAll(".turn");

        // all players data include BOT :)
        this.player1 = null;
        this.player2 = null;
        this.bot = (game_mod == 1) ? null : new BOT(this , game_table_size);

        // both "player_profile" side in table
        // for loading players data on it
        [this.player_side_1 , this.player_side_2] = document.querySelectorAll(".player_profile");

        // loading "this.game_details_obj" for using saved values from user "colors , background ..."
        this.game_details_obj = JSON.parse( localStorage.getItem("game_details_obj") ); 

        // block's events
        this.events = {
            on_click : (e) => {
                // x & y corrdiantes comming from event for knowing wihch block are clicked
                
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));
                
                // in case block empty
                if(!this.blocks[x][y].empty){
                    //debugger
                    this.reservedBlock += 1;
 
                    this.blocks[x][y].dom.style.backgroundImage = (this.player1.turn) ? "url('./graphics/x.png')" : "url('./graphics/o.png')";
                    
                    // if  1 vs 1 mod
                    if(this.game_mode == 1){
                        [this.player1.turn , this.player2.turn] = [this.player2.turn , this.player1.turn];
                        this.playersTurns[0].src = "./graphics/" + ((this.player1.turn) ? "go.png" : "stop.png");
                        this.playersTurns[1].src = "./graphics/" + ((this.player2.turn) ? "go.png" : "stop.png");
                    }
                    // if 1 vs bot mod
                    else{
                        [this.player1.turn , this.bot.turn] = [this.bot.turn , this.player1.turn];
                        this.playersTurns[0].src = "./graphics/" + ((this.player1.turn) ? "go.png" : "stop.png");
                        this.playersTurns[1].src = "./graphics/" + ((this.bot.turn) ? "go.png" : "stop.png");    
                    } 
                    
                    this.blocks[x][y].empty = true;

                }
                
            },
            
            on_hover_in : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));

                if(!this.blocks[x][y].empty && this.game_details_obj.hover_mod){
                    if(this.player1.turn){
                        this.blocks[x][y].dom.style.backgroundImage = "url('./graphics/x_HoverMod.png')";
                    }
                    else this.blocks[x][y].dom.style.backgroundImage = "url('./graphics/o_HoverMod.png')";
                }
            },

            on_hover_out : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));
                if(!this.blocks[x][y].empty){
                    this.blocks[x][y].dom.style.backgroundImage = "url('#')";
                }
            }

        }
     
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
            for(let i = 0 ; i < this.game_table_size; i += 1){
                this.blocks[i] = [];
                
                for(let c = 0 ; c < this.game_table_size; c += 1){
                    // create new block
                    let BLOCK = new block( "block"+i*c , i , c , ((i+1*c+1) % 2 != 0) ? color1 : color2);
                    
                    // set events to thi block
                    BLOCK.dom.addEventListener("click" , this.events.on_click);
                    BLOCK.dom.addEventListener("mouseover" , this.events.on_hover_in);
                    BLOCK.dom.addEventListener("mouseout" , this.events.on_hover_out);

                    // insert it in dom & reserved blocks
                    this.table_dom.appendChild(BLOCK.dom);  
                    this.blocks[i][c] = BLOCK; 
                }
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

        this.clean_table = () => {
            for(let i = 0 ; i < this.game_table_size ; i += 1){
                for(let c = 0 ; c < this.game_table_size ; c += 1){
                    this.virtualtable[i][c] = 0;
                    this.blocks[i][c] 
                }
            }
        }

        // function responsible for logic , win , tie , ...
        this.check_game = () =>{

        }

        this
    }
}