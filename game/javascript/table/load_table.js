// this moduel should "load/generate" the hole game table with specific size ...
import {block} from "./blocks.js";

export class table{
    constructor(game_table_size = 3 , game_details_obj = {}){
        
        //this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = game_table_size;
        this.blocks = [];
        
        this.dom = document.querySelector("#GAME_TABLE");
        this.background = document.querySelector("#game_tabel");

        // saved values from user changes in sitting "colors , background ..."
        this.game_details_obj = game_details_obj; 

        // function must be run when user click on "GO button"
        // this function it's task only load game table with right style
        this.load_table = () => {
            //debugger    
            
            // setup table grid
            this.dom.style.cssText = `grid-template-columns : repeat(${this.game_table_size}, 1fr)`;
            
            // in case "this.game_details_obj" missing 
            if(this.game_details_obj == null || this.game_details_obj == undefined){
                console.error("GAME : missing 'game_details_obj' , go to sitting & make some changes");
            }

            let color1 = this.game_details_obj.sqr1_color;
            let color2 = this.game_details_obj.sqr2_color;

            // fill talbe => generate block's
            for(let i = 0 ; i < this.game_table_size; i += 1){
                this.blocks[i] = [];
                
                for(let c = 0 ; c < this.game_table_size; c += 1){
                    // create new block
                    let BLOCK = new block( "block"+i*c , i , c , ((i+1*c+1) % 2 != 0) ? color1 : color2);
 
                    // insert it in dom & reserved blocks
                    this.dom.appendChild(BLOCK.dom);  
                    this.blocks[i][c] = BLOCK; 
                }
            }
            
            // load background if user allow that 
            if(this.game_details_obj.background_mod && this.game_details_obj.background_id != undefined){
                 this.background.style.backgroundImage = `url("./graphics/backgrounds/background_${this.game_details_obj.background_id + 1}.jpg")`;
            }
            else this.background.style.backgroundColor = `white`;
           
        }
        // clean all blocks in table for new game
        /*
        this.clean_table = () => {
            for(let i = 0 ; i < this.game_table_size ; i += 1){
                for(let c = 0 ; c < this.game_table_size ; c += 1){
                    this.blocks[i][c].dom.style.backgroundImage = "none"; 
                }
            }
        }
        */

        // destory all blocks in table "when player click on quit button"
        this.destory_blocks = () => {
            for(let i = 0 ; i < this.game_table_size ; i += 1){
                for(let c = 0 ; c < this.game_table_size ; c += 1){
                    this.blocks[i][c].dom.parentNode.removeChild(this.blocks[i][c].dom);
                    this.blocks[i][c] = null;
                }
            }
        }

        this.hide_table = () => {
            this.pause.menu.style.display = "none"; 
            this.background.style.display = "none"; 
            
            let profiles = document.querySelectorAll(".player_profile");
            let new_game_table_size = document.querySelector("#new_game_table_size");
            
            profiles[0].style.display = "none"; 
            profiles[1].style.display = "none"; 
            new_game_table_size.style.display = "none"; 
        }

        // pause menu elements
        this.pause = {
            pause_button    : document.querySelector("#pauseButton"),
            background      : document.querySelector("#pause_bg"),
            quit_button     : document.querySelector("#quitButton"),
            contine_button  : document.querySelector("#continueButton"),
            menu            : document.querySelector("#pause_menu"),
            restart_Button  : document.querySelector("#restartButton"),
            matchs_result   : document.querySelector("#matchs_result"),
        }

        // winner ui
        this.winner_dom = {
            ui   : document.querySelector("#winner_ui"),
            img  : document.querySelector("#winner_img"),
            name : document.querySelector("#winner_name"),
            newgame : document.querySelector("#NewGame"),
            quitgame : document.querySelector("#QuitGame"),

            // function for drawing winner name & img
            winner_is : (winner = {} ) => {
                
                // if invalid winner object then we throw error
                if(winner.photo == null || winner.name == null) {
                    throw new Error("invalid winner object ? - we need player object");    
                }
                
                // otherwise

                // display full winner ui
                winner_ui.style.display = "block";
                // set name & img
                winner_img.src = winner.photo;
                winner_name.textContent = winner.name;

            }
        }

    }
}