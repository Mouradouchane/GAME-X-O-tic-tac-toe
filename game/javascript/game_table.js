import {table} from "./table/load_table.js";
import {time} from "./table/time.js";
import {BOT} from "./bot/bot.js";
import {Player} from "./player/player.js";

export class game_table{

    constructor(){
    
        // game status
        this.inGame = false;
        // game time
        this.timer  = new time();

        // saved values from user changes in sitting "colors , background ..."
        this.game_details_obj = JSON.parse( localStorage.getItem("game_details_obj") ); 

        // var important for knowing - in wich mod user want to start a new game "1 vs 1" or "1 vs bot"
        this.game_mode = 1;

        // game table object & all of it's elements 'blocks'
        this.table = {
            table : null,
            // table size range
            size_range : document.querySelector("#table_size_range"),
            size : null,
        };

        // go button => start new game 
        this.go_button = document.querySelector("#start_new_game");

        // 2 side as buttons for choosing game mode "1 vs 1" or "1 vs bot"
        [this.oneVsone_button , this.onVsbot_button] = document.querySelectorAll(".mods");
        
        // when user click go that mean => "start a new game"
        this.go_button.addEventListener("click" , () => {

            // we starting a new game in case no game already playing 
            if(!this.inGame){
                // set & check table size 
                this.table.size  = Number.parseInt(this.table.size_range.value) 
                this.table.size  = (this.table.size < 3) ? 3 : this.table.size;
                // load game table
                this.table.table = new table(this.table.size , this.game_details_obj);
                
                // start timer
                //this.timer.start();
            }
            else console.warn("GAME : you are already in game right know !");

            // switch it to true :)
            this.inGame = true;
            
        })

        this.oneVsone_button.addEventListener("click" , () => {
            this.game_mode = 1;
        });

        this.onVsbot_button.addEventListener("click" , () => {
            this.game_mode = 2;
        });
        
        // block's events
        this.events = {
            on_click : (e) => {
                // x & y corrdiantes comming from event for knowing wihch block are clicked
                
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));
                
                // in case block empty
                if(!this.table.table.blocks[x][y].empty){
                    //debugger
                    this.reservedBlock += 1;
 
                    this.table.table.blocks[x][y].dom.style.backgroundImage = (this.players.p1.turn) ? "url('./graphics/x.png')" : "url('./graphics/o.png')";
                    
                    // if  1 vs 1 mod
                    if(this.game_mode == 1){
                        [this.players.p1.turn , this.players.p2.turn] = [this.players.p2.turn , this.players.p1.turn];
                        this.playersTurns[0].src = "./graphics/" + ((this.players.p1.turn) ? "go.png" : "stop.png");
                        this.playersTurns[1].src = "./graphics/" + ((this.players.p2.turn) ? "go.png" : "stop.png");
                    }
                    // if 1 vs bot mod
                    else{
                        [this.players.p1.turn , this.players.bot.turn] = [this.players.bot.turn , this.players.p1.turn];
                        this.playersTurns[0].src = "./graphics/" + ((this.player1.turn) ? "go.png" : "stop.png");
                        this.playersTurns[1].src = "./graphics/" + ((this.bot.turn) ? "go.png" : "stop.png");    
                    } 
                    
                    this.table.table.blocks[x][y].empty = true;

                }
                
            },
            
            on_hover_in : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));

                if(!this.table.table.blocks[x][y].empty && this.game_details_obj.hover_mod){
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
        // this function load player 1 or 2 data to the game tabel 'depened on game mode'
        this.load_player_data = (player_index = 1) => {
            //debugger;
            let player;

            // load player data from localDB "depened on player index"
            if(player_index == 1){
                // try load
                player = JSON.parse( localStorage.getItem("player1") );
                // in case failed load def player object & log warning
                if(player == null || player == undefined){
                    player = new Player();
                    console.warn("player 1 data , removed or missing !");
                }
            }
            else{ // samething 
                player = JSON.parse( localStorage.getItem("player2") );

                if(player == null || player == undefined){
                    player = new Player();
                    console.warn("player 2 data , removed or missing !");
                }
            } 

            // after player data get loaded, then => fill empty profile's in DOM 
            if(player_index == 1){
                this.player_side_1.querySelectorAll(".player_name")[0].textContent = player.name;
                this.player_side_1.querySelectorAll(".player_pic_profile")[0].src  = player.photo;
            }
            else{
                this.player_side_2.querySelectorAll(".player_name")[0].textContent = player.name;
                this.player_side_2.querySelectorAll(".player_pic_profile")[0].src  = player.photo;
            }
            
        }

        // like the above function "load_player_data"  
        this.load_bot_data = () => {
            let bot = new BOT();
            this.player_side_2.querySelectorAll(".player_name")[0].textContent = bot.profile.name;
            this.player_side_2.querySelectorAll(".player_pic_profile")[0].src  = bot.profile.photo;
        }

        this.reservedBlock = 0;
        this.playersTurns = document.querySelectorAll(".turn");
 
        this.players = {
            // player  1 & 2 => "1 vs 1" 
            p1  : JSON.parse( localStorage.getItem("player1") ),
            p2  : JSON.parse( localStorage.getItem("player2") ),
            // player BOT in case game => "1 vs bot"
            bot : (this.game_mode != 1) ? new BOT(this.table.table , this.table.size) : null
        }

        this.setup;
    }
}
