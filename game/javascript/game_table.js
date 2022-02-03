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

        this.reservedBlock = 0;
        this.playersTurns = document.querySelectorAll(".turn");

        // simple function for check if players data loaded form localDB or not
        this.get_player_data = (index = 1) =>{
            let player = index == 1 ? JSON.parse( localStorage.getItem("player1") ) : JSON.parse( localStorage.getItem("player2") );
           
            if(player == null) return (index == 1) ? new Player("guest_1",0,0) : new Player("guest_1",0,1);   
            else return player;
        }

        // game table object & all of it's elements 'blocks'
        this.table = {
            table : null,
            // table size range
            size_range : document.querySelector("#table_size_range"),
            size : null,
            setup_blocks : () => {
                for(let row of this.table.table.blocks){
                    for(let block of row){
                        block.dom.addEventListener("click" , this.events.on_click);
                        block.dom.addEventListener("mouseover", this.events.on_hover_in);
                        block.dom.addEventListener("mouseout", this.events.on_hover_out);
                    }
                }
            }
        }

        this.players = {
            // player  1 & 2 => "1 vs 1" 
            p1  : this.get_player_data(1) ,
            p2  : this.get_player_data(2) ,
            // player BOT for => "1 vs bot"
            bot : new BOT(this.table.table , this.table.size)
        }

        // go button => start new game 
        this.go_button = document.querySelector("#start_new_game");

        // 2 side as buttons for choosing game mode "1 vs 1" or "1 vs bot"
        [this.oneVsone_button , this.onVsbot_button] = document.querySelectorAll(".mods");
        
        // when user click "GO" that mean => "start a new game"
        this.go_button.addEventListener("click" , () => {

            // we starting a new game in case no game already playing 
            if(!this.inGame){
                // set & check table size 
                this.table.size  = Number.parseInt(this.table.size_range.value) 
                this.table.size  = (this.table.size < 3) ? 3 : this.table.size;
                // load game table
                this.table.table = new table(this.table.size , this.game_details_obj);
                
                // load players data
                if(this.game_mode == 1){
                        // 1 vs 1
                this.load_player_profile(1);
                this.load_player_profile(2);

                }
                else{
                        // 1 vs bot
                    this.load_player_profile(1);
                    this.load_bot_profile();
                }

                // load table as html/css 
                this.table.table.load_table();
                // setup events for each block in table
                this.table.setup_blocks();

                // start timer
                this.timer.start();
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
                if(this.table.table.blocks[x][y].empty){
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
                        this.playersTurns[0].src = "./graphics/" + ((this.players.p1.turn)  ? "go.png" : "stop.png");
                        this.playersTurns[1].src = "./graphics/" + ((this.players.bot.turn) ? "go.png" : "stop.png");    
                    } 
                    
                    this.table.table.blocks[x][y].empty = false;

                }
                
            },
            
            on_hover_in : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));

                if(this.table.table.blocks[x][y].empty && this.game_details_obj.hover_mod){
                    if(this.players.p1.turn){
                        this.blocks[x][y].dom.style.backgroundImage = "url('./graphics/x_HoverMod.png')";
                    }
                    else this.table.table.blocks[x][y].dom.style.backgroundImage = "url('./graphics/o_HoverMod.png')";
                }
            },

            on_hover_out : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));
                if(this.table.table.blocks[x][y].empty){
                    this.table.table.blocks[x][y].dom.style.backgroundImage = "url('#')";
                }
            }

        }
 
        // function must be run when user click on "GO button"
        // this function load player 1 or 2 profile in game table 'depened on game mode'
        this.load_player_profile = (index = 1) => {
            
            // profile in dom
            let profile = document.querySelectorAll(".player_profile")[index - 1];
            // set player values
            profile.querySelector(".player_pic_profile").src = (index == 1 ) ? this.players.p1.photo : this.players.p2.photo;
            profile.querySelector(".player_name").textContent = (index == 1 ) ? this.players.p1.name : this.players.p2.name;
        
        }

        // like the above function "load_player_profile" but this for bot 
        this.load_bot_profile = () => {
            
            // profile in dom
            let profile = document.querySelectorAll(".player_profile")[1];
            // set bot values
            profile.querySelector(".player_pic_profile").src  = this.players.bot.profile.photo;
            profile.querySelector(".player_name").textContent = this.players.bot.profile.name;
        
        }

    }
}
