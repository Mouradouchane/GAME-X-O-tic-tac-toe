import {table} from "./table/load_table.js";
import {timer} from "./table/timer.js";
import {BOT} from "./bot/bot.js";
import {Player} from "./player/player.js";

export class game_table{

    constructor(){
    
        // game status
        this.inMatch = false;
        // game time
        this.timer  = new timer();

        // load "game_details_obj" from localDB for "background-image , colors , ..."
        this.game_details_obj = JSON.parse( localStorage.getItem("game_details_obj") ); 

        // var important for knowing - in wich mod user want to start a new game "1 vs 1" or "1 vs bot"
        this.game_mode = 1;

        this.reservedBlock = 0;
        this.playersTurns = document.querySelectorAll(".turn");

        /* 
            -1 = no match yet
            0  = match is pause
            1  = match is playing
            2  = match is end winner/draw
        */
        this.match_status = -1;

        // game table object & all of it's elements 'blocks'
        this.table = {
            table : null,
            // table size range
            size_range : document.querySelector("#table_size_range"),
            size : null,
            setup_blocks : () => {
                for(let row of this.table.table.blocks){
                    for(let block of row){
                        block.dom.addEventListener("click" ,    this.events.on_click);
                        block.dom.addEventListener("mouseover", this.events.on_hover_in);
                        block.dom.addEventListener("mouseout",  this.events.on_hover_out);
                    }
                }
            },
            // remove all event on each block
            unsetup_blocks : () => {
                for(let row of this.table.table.blocks){
                    for(let block of row){
                        block.dom.removeEventListener("click" , this.events.on_click);
                        block.dom.removeEventListener("mouseover", this.events.on_hover_in);
                        block.dom.removeEventListener("mouseout",  this.events.on_hover_out);
                    }
                }
                // reset blocks counter
                this.reservedBlock = 0;
            },
            delete_blocks : () => {
                for(let r = 0 ; r < this.table.table.blocks.length ; r += 1){
                    //debugger
                    for(let b = 0 ; b < this.table.table.blocks[r].length ; b += 1){
                        this.table.table.blocks[r][b].delete();
                    }
                }
                this.table.table.blocks = [];
            },
            // remove + clean block 
            reset_blocks : () => {
                for(let row of this.table.table.blocks){
                    for(let block of row){
                        block.clean();
                    }
                }
            },

            // when player click on pause
            pause_on   : () =>{
                // update match status
                this.match_status = 0;
                // display pause menu
                this.table.table.pause.background.style.display = "block";
                this.table.table.pause.menu.style.display = "block";

                // stop timer
                this.timer.stop();
            },
            // when player click to back to resume game
            pause_off  : () =>{
                // hide pause menu
                this.table.table.pause.background.style.display = "none";    
                this.table.table.pause.menu.style.display = "none";    
                this.table.table.winner_dom.ui.style.display = "none";    
                
                // stop timer only if players playing
                if(this.match_status != -1 || this.match_status != 2){
                    this.timer.start();

                    // update match status
                    this.match_status = 1;
                }
            },
            // when player click on quit button
            on_quit : () =>{
                // update game status
                this.match_status = -1;
                this.inMatch = false;

                // hide pause menu
                this.table.table.hide_table();
                this.timer.hide();

                // reset timer
                this.timer.reset();

                this.table.unsetup_blocks();
                this.table.delete_blocks();
                delete this.table.table;
                this.table.table = null;
                
            },
            // when player click on continue button same as pause_off
            on_continue : () => {
                this.table.pause_off();
            },

            // when player click reset button 
            on_reset : () => {
                this.match_status = 1;
                // reset timer
                this.timer.reset();
                // reset table & it's block's "for new game"
                this.table.reset_blocks();
                this.table.setup_blocks();

                this.table.pause_off();

                // reset blocks counter
                this.reservedBlock = 0 ;
            },
            // when player press new game button
            on_new_game_pressed : () =>{
                this.table.on_reset();
            },

            // when player press esc key
            on_esc_pressed : () =>{
                
                if(this.match_status != -1){
                    // we toggle between pause on/off depened on match_status
                    if(this.match_status == 1){
                        this.table.pause_on();
                    }
                    else this.table.pause_off();
                }

            },
          
        }
        // set esc event to the document object
        document.body.addEventListener("keydown" , (e) => {
            if(e.key == "Escape") this.table.on_esc_pressed();
        });

        // save players obj in localDB
        this.save_player_data = (index = 1) => {
            localStorage.setItem(`player${index}` , JSON.stringify( (index == 1) ? this.players.p1 : this.players.p2) );
        }

        // load players obj from loaclDB or load new instance 
        this.get_player_data  = (index = 1) =>{
            let player = index == 1 ? JSON.parse( localStorage.getItem("player1") ) : JSON.parse( localStorage.getItem("player2") );

            if(player == null) return (index == 1) ? new Player("guest_1",0,0) : new Player("guest_1",0,1);   
            else return player;
        }

        // players objects
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
            
            // update players data in case there is any changes
            this.players.p1 = this.get_player_data(1);
            this.players.p2 = this.get_player_data(2);

            // we starting a new game in case no game already playing 
            if(!this.inMatch && this.match_status == -1){
                this.match_status = 1;
                // set & check table size 
                this.table.size  = Number.parseInt(this.table.size_range.value);
                this.table.size  = (this.table.size < 3) ? 3 : this.table.size;
                // load game table
                this.table.table = new table(this.table.size , this.game_details_obj);
                
                // setup pause menu
                this.table.table.pause.pause_button.addEventListener("click" , this.table.pause_on);
                this.table.table.pause.background.addEventListener("click" , this.table.pause_off);
                this.table.table.pause.quit_button.addEventListener("click" , this.table.on_quit);
                this.table.table.pause.contine_button.addEventListener("click" , this.table.on_continue);
                this.table.table.pause.restart_Button.addEventListener("click" , this.table.on_reset);
                // setup winner menu
                this.table.table.winner_dom.newgame.addEventListener("click" , this.table.on_new_game_pressed);
                
                // hide menu elements
                let sitting_background = document.querySelector("#sitting_background");
                    sitting_background.style.display = "none";

                // set who is gonna play first
                let rand = Number.parseInt((Math.random() * 100 + 1));

                // load players data & set startup

                if( rand % 2 == 0) this.players.p1.turn = true;
                else (this.game_mode == 1) ? this.players.p2.turn = true : this.players.bot.turn = true;

                // load profiles in dom
                this.load_player_profile(1);
                (this.game_mode == 1) ? this.load_player_profile(2) : this.load_bot_profile();
                // load turns in dom
                this.update_turns();

                // load table as html/css 
                this.table.table.load_table();
                
                // setup events for each block in table
                this.table.setup_blocks();

                // start timer
                this.timer.start();
            }
            else console.warn("GAME : you are already in game right know !");

            // switch it to true :)
            this.inMatch = true;
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
                    
                    // switch turn depend on game mod
                    if(this.game_mode == 1){
                        this.table.table.blocks[x][y].dom.style.backgroundImage = (this.players.p1.turn) ? "url('./graphics/x.png')" : "url('./graphics/o.png')";
                        this.table.table.blocks[x][y].owner = (this.players.p1.turn) ? 1 : 2;
                        [this.players.p1.turn , this.players.p2.turn] = [this.players.p2.turn , this.players.p1.turn];
                        
                        this.update_turns();
                        this.table.table.blocks[x][y].empty = false;
                        
                    }
                    else{
                        if(this.players.p1.turn){
                            this.table.table.blocks[x][y].dom.style.backgroundImage = (this.players.p1.turn) ? "url('./graphics/x.png')" : "url('./graphics/o.png')";
                            this.table.table.blocks[x][y].type = (this.players.p1.turn) ? 1 : 2;
                            [this.players.p1.turn , this.players.bot.turn] = [this.players.bot.turn , this.players.p1.turn];
                            
                            this.update_turns();
                            this.table.table.blocks[x][y].empty = false;
                             
                        }
                    } 
                    
                    // check is someone win or tie      "if yes then stop timer"
                    (this.is_win() || this.is_draw()) ? this.timer.stop() : null;
                }
                
            },
            
            on_hover_in : (e) => {
                let x = Number.parseInt(e.target.getAttribute("x"));
                let y = Number.parseInt(e.target.getAttribute("y"));

                if(this.table.table.blocks[x][y].empty && this.game_details_obj.hover_mod){
                    if(this.players.p1.turn){
                        this.table.table.blocks[x][y].dom.style.backgroundImage = "url('./graphics/x_HoverMod.png')";
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

        this.update_turns = () => {
            this.playersTurns[0].src = (this.players.p1.turn) ? "./graphics/go.png" : "./graphics/stop.png";
            
            if(this.game_mode == 1){
                this.playersTurns[1].src = (this.players.p2.turn) ? "./graphics/go.png" : "./graphics/stop.png";
            }
            else{
                this.playersTurns[1].src = (this.players.bot.turn) ? "./graphics/go.png" : "./graphics/stop.png";
            }
        }

        // check is player draw/tie or not
        this.is_draw = () => {
            let len =  this.table.table.blocks.length;
            if(this.reservedBlock == len * len){
                console.log("game is draw !!!");
                this.table.unsetup_blocks();
                return true;
            }
            else return false;
        }

        // function who check if there's a winner 
        this.is_win = () => {
            let gp = true;
            let owner = null;
            
            // *** check horizontal ***
            // loop over row's & check tow by tow until end
            for(let row of this.table.table.blocks){
                for(let i = 0 ; i < row.length - 1 ; i += 1){
                    // if element is null or not equal to their neighbor that mean invalid row for win ;)
                    if(row[i].owner != row[i+1].owner || row[i].owner == null) {
                        // set winner/owner to null & reset flag gp & skip to next row
                        gp = false;
                        owner = null;
                        break;
                    }
                    // else mean valid pattren soo if that keep like that till the end then we have valid row for winner
                    gp = true;
                    owner = row[i].owner;
                }
                
                // if winner found 
                if(gp) {
                    console.log( "winner is => " , (owner == 1) ? "Player 1" : "Player 2");
                    // remove all event's in each block because game is over 
                    this.table.unsetup_blocks();

                    // win ++ to the winner :)
                    if (owner == 1) {
                        // when player 1 is win
                        this.players.p1.wins += 1;
                        this.save_player_data(1);
                        this.players.p1 = this.get_player_data(1);
                        // render winner in screen
                        this.table.table.winner_dom.winner_is(this.players.p1);
                    }
                    else {
                        // when player 2 is win
                        this.players.p2.wins += 1;
                        this.save_player_data(2);
                        this.players.p2 = this.get_player_data(2);
                        // render winner in screen
                        this.table.table.winner_dom.winner_is(this.players.p2);
                    }

                    // confirmation 
                    return true;
                }
            }
            
            // *** check vertical ***
            // ==> like horizonal concept
            for(let x = 0 ; x < this.table.table.blocks.length ; x += 1){
                for(let y = 0 ; y < this.table.table.blocks.length - 1; y += 1){
                    if( this.table.table.blocks[y][x].owner != this.table.table.blocks[y+1][x].owner ||
                        this.table.table.blocks[y][x].owner == null )
                    {
                        gp = false;
                        owner = null;
                        break;
                    }

                    gp = true;
                    owner = this.table.table.blocks[y][x].owner;
                }

                if(gp){
                    console.log( "winner is => " , (owner == 1) ? "Player 1" : "Player 2");
                    this.table.unsetup_blocks();

                    // win ++ to the winner :)
                    if (owner == 1) {
                        // when player 1 is win
                        this.players.p1.wins += 1;
                        this.save_player_data(1);
                        this.players.p1 = this.get_player_data(1);
                        // render winner in screen
                        this.table.table.winner_dom.winner_is(this.players.p1);
                    }
                    else {
                        // when player 2 is win
                        this.players.p2.wins += 1;
                        this.save_player_data(2);
                        this.players.p2 = this.get_player_data(2);
                        // render winner in screen
                        this.table.table.winner_dom.winner_is(this.players.p2);
                    }

                    return true;
                }
            }

            // check row  ==> \ 
            for(let l = 0 ; l < this.table.table.blocks.length - 1 ; l += 1){
                if( this.table.table.blocks[l][l].owner != this.table.table.blocks[l+1][l+1].owner  || 
                    this.table.table.blocks[l][l].owner == null)
                {
                    gp = false;
                    owner = null;
                    break;
                }

                gp = true;
                owner = this.table.table.blocks[l][l].owner;
            }

            if(gp){
                console.log( "winner is => " , (owner == 1) ? "Player 1" : "Player 2");
                this.table.unsetup_blocks();

                // win ++ to the winner :)
                if (owner == 1) {
                    // when player 1 is win
                    this.players.p1.wins += 1;
                    this.save_player_data(1);
                    this.players.p1 = this.get_player_data(1);
                    // render winner in screen
                    this.table.table.winner_dom.winner_is(this.players.p1);
                }
                else {
                    // when player 2 is win
                    this.players.p2.wins += 1;
                    this.save_player_data(2);
                    this.players.p2 = this.get_player_data(2);
                    // render winner in screen
                    this.table.table.winner_dom.winner_is(this.players.p2);
                }

                return true;
            }

            // check row  ==> /
            for(let r = this.table.table.blocks.length-1 , l = 0 ; l < this.table.table.blocks.length -1; l += 1 , r -= 1){
                //debugger
                if( this.table.table.blocks[l][r].owner != this.table.table.blocks[l+1][r-1].owner  || 
                    this.table.table.blocks[l][r].owner == null)
                {
                    gp = false;
                    owner = null;
                    break;
                }

                gp = true;
                owner = this.table.table.blocks[l][r].owner;

            }

            if(gp){
                console.log( "winner is => " , (owner == 1) ? "Player 1" : "Player 2");
                this.table.unsetup_blocks();

                // win ++ to the winner :)
                if (owner == 1) {
                    // when player 1 is win
                    this.players.p1.wins += 1;
                    this.save_player_data(1);
                    this.players.p1 = this.get_player_data(1);
                    // render winner in screen
                    this.table.table.winner_dom.winner_is(this.players.p1);
                }
                else {
                    // when player 2 is win
                    this.players.p2.wins += 1;
                    this.save_player_data(2);
                    this.players.p2 = this.get_player_data(2);
                    // render winner in screen
                    this.table.table.winner_dom.winner_is(this.players.p2);
                }

                return true;
            }

            // confirmation => "no winner found"
            return false;
        }


    }
}
