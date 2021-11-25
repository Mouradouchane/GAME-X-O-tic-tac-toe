
// this moduel should load & control the hole "game details" in sitting side

// this obj for load & save game_deatils from localDB
class game_details_obj {

    constructor(){
        // the colors of squares in game table
        this.sqr1_color = "rgb(238, 24, 88)";
        this.sqr2_color = "rgb(85, 247, 99)";

        // hover mod mean when you hover on square you want to see little x or o
        this.hover_mod = true;

        // background it's just a theme 
        this.background_mod = false;
        this.background_id  = undefined;
    }

}


export class game_details_sitting{
    
    constructor(){
        // game obj
        this.game_details_obj = undefined;

        // === load elements ===

        // details side elements in DOM
        this.game_details_dom = document.querySelector("#GameDetails");
        [this.sqr1_input_color , this.sqr2_input_color] = this.game_details_dom.querySelectorAll(".BrowseInputs");
        [this.sqr1_input_color_result , this.sqr2_input_color_result ] = this.game_details_dom.querySelectorAll(".ExampleBlocks");
        [this.sqr1_hover,this.sqr2_hover] = this.game_details_dom.querySelectorAll(".Hover_ExampleBlocks");
        
        // background & backgrounds
        this.RecentBackgroundInGame = this.game_details_dom.querySelector("#RecentBackgroundGame");
        this.backgrounds = document.querySelectorAll(".backs");

        // check box's
        this.HoverModCheckBox     = this.game_details_dom.querySelector("#HoverModEffect");
        this.BackgrondModCheckBox = this.game_details_dom.querySelector("#BackgrondModCheckBox");

        // this function try to load saved "game_details_obj" in case no found it it return empty one
        this.load_details_obj = () => {
            // trying to load
            let temp_gd_obj = JSON.parse( localStorage.getItem("game_details_obj") );

            if(temp_gd_obj != null || temp_gd_obj  != undefined) {
                this.game_details_obj = temp_gd_obj;
            }
            else {  // in case not found
                this.game_details_obj = new game_details_obj();
                this.save_details_obj();
                console.warn("GAME : 'details object' not found in localDB , recreating new one");
            }
        }

        // simple function for saving "game_details_obj" to localDB
        this.save_details_obj = () => {
            localStorage.setItem("game_details_obj" , JSON.stringify(this.game_details_obj));
        }

        this.update_details_in_sitting_side = () => {
            this.sqr1_input_color_result.style.cssText = "background-color : " + this.game_details_obj.sqr1_color;
            this.sqr2_input_color_result.style.cssText = "background-color : " + this.game_details_obj.sqr2_color;
            
            this.sqr1_hover.style.cssText = "background-color : " + this.game_details_obj.sqr1_color;
            this.sqr2_hover.style.cssText = "background-color : " + this.game_details_obj.sqr2_color;

            this.HoverModCheckBox.checked     = this.game_details_obj.hover_mod;
            this.BackgrondModCheckBox.checked = this.game_details_obj.background_mod;

            // load background in sitting only in case backgorund_mod is on            
            if(this.game_details_obj.background_id != undefined && this.game_details_obj.background_mod){
                this.RecentBackgroundInGame.style.cssText = `background-image : url(${this.backgrounds[this.game_details_obj.background_id].src});`;
            }
            // otherwise
            else{
                this.RecentBackgroundInGame.style.cssText = "background-image : none; background-color:white;";
                this.game_details_obj.background_id = undefined;
            }

            this.save_details_obj();
        }

        // event when player take a new color 
        this.sqr1_input_color.addEventListener("change" , () => {
            this.game_details_obj.sqr1_color = this.sqr1_input_color.value ;
            this.update_details_in_sitting_side();
        })
        this.sqr2_input_color.addEventListener("change" , () => {
            this.game_details_obj.sqr2_color = this.sqr2_input_color.value ;
            this.update_details_in_sitting_side();
        })

        // event when player turn on/off check box's in sitting
        this.HoverModCheckBox.addEventListener("change" , () => {
            this.game_details_obj.hover_mod = this.HoverModCheckBox.checked;
            this.save_details_obj();
        })
        this.BackgrondModCheckBox.addEventListener("change" , () => {
            this.game_details_obj.background_mod = this.BackgrondModCheckBox.checked;
            // update + save
            this.update_details_in_sitting_side();            
        })


        // when player click on background => that mean he choose it 
        for(let b = 0 ; b < this.backgrounds.length ; b += 1){
            this.backgrounds[b].addEventListener("click" , () => {
                // the change happend if background mod active 
                if(this.game_details_obj.background_mod){
                    this.game_details_obj.background_id = b;
                    this.update_details_in_sitting_side();
                }
            })
        }


        // load "details obj" in creation time 
        this.load_details_obj();
        // update def value 
        this.update_details_in_sitting_side();

    }
}