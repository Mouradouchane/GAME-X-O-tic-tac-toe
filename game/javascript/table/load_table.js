// this moduel should "load/generate" the hole game table with specific size ...
import {block} from "./blocks.js";

export class table{
    constructor(game_table_size = 3 , game_details_obj = {}){
        
        //this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = game_table_size;
        this.blocks = [];
        
        this.dom = document.querySelector("#GAME_TABLE");

        // both "player_profile" side in table
        // for loading players data on it
        [this.player_side_1 , this.player_side_2] = document.querySelectorAll(".player_profile");

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
                    
                    // set events to thi block
                    //BLOCK.dom.addEventListener("click"      , this.events.on_click);
                    //BLOCK.dom.addEventListener("mouseover"  , this.events.on_hover_in);
                    //BLOCK.dom.addEventListener("mouseout"   , this.events.on_hover_out);

                    // insert it in dom & reserved blocks
                    this.dom.appendChild(BLOCK.dom);  
                    this.blocks[i][c] = BLOCK; 
                }
            }
            
            // load background if user allow that 
            let table_background = document.querySelector("#game_tabel");
            
            if(this.game_details_obj.background_mod && this.game_details_obj.background_id != undefined){
                 table_background.style.backgroundImage = `url("./graphics/backgrounds/background_${this.game_details_obj.background_id + 1}.jpg")`;
            }
            else table_background.style.backgroundColor = `white`;
           
            /*
            // call load players data depened on mod
            //debugger
            // 1 ==> 1 vs 1 mod
            if(this.game_mode == 1){
                this.load_player_data(1);
                this.load_player_data(2);

                // game start always with player 1 turn
                //this.player1.turn = true;  // :)
                //this.player2.turn = false; // :(
            }
            // else mean 1 vs bot mod
            else{
                this.load_player_data(1);
                this.load_bot_data();

                //this.player1.turn = true; // :)
                //this.bot.turn = false;    // :|
            }
            */
        }

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

        this.load_table();
    }
}