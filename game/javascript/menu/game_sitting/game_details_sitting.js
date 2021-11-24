
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

        // check box's
        this.HoverModCheckBox = this.game_details_dom.querySelector("#HoverModEffect");
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
                console.warn("missing sitting => 'details side' object from localDB recreating new one");
            }
        }

        // simple function for saving "game_details_obj" to localDB
        this.save_details_obj = () => {
            localStorage.setItem("game_details_obj" , JSON.stringify(this.game_details_obj));
        }

        this.update_details_side_in_sitting = () => {
            this.sqr1_input_color_result.style.cssText = "background-color : " + this.game_details_obj.sqr1_color;
            this.sqr2_input_color_result.style.cssText = "background-color : " + this.game_details_obj.sqr2_color;
            
            this.sqr1_hover.style.cssText = "background-color : " + this.game_details_obj.sqr1_color;
            this.sqr2_hover.style.cssText = "background-color : " + this.game_details_obj.sqr2_color;

            this.HoverModCheckBox.checked     = this.game_details_obj.hover_mod;
            this.BackgrondModCheckBox.checked = this.game_details_obj.background_mod;

            this.save_details_obj();
        }

        // event when player take a new color 
        this.sqr1_input_color.addEventListener("change" , () => {
            this.game_details_obj.sqr1_color = this.sqr1_input_color.value ;
            this.update_details_side_in_sitting();
        })
        this.sqr2_input_color.addEventListener("change" , () => {
            this.game_details_obj.sqr2_color = this.sqr2_input_color.value ;
            this.update_details_side_in_sitting();
        })

        // event when player turn on/off check box's in sitting
        this.HoverModCheckBox.addEventListener("change" , () => {
            this.game_details_obj.hover_mod = this.HoverModCheckBox.checked;
            this.save_details_obj();
        })
        this.BackgrondModCheckBox.addEventListener("change" , () => {
            this.game_details_obj.background_mod = this.BackgrondModCheckBox.checked;
            this.save_details_obj();
        })

        // load "details obj" in creation time 
        this.load_details_obj();
        // update def value 
        this.update_details_side_in_sitting();

   
    }
}