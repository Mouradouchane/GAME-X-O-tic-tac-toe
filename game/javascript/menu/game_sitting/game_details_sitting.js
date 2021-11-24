
// this moduel should load & control the hole "game details" in sitting side

// this obj for load & save game_deatils from localDB
class game_details_obj {

    constructor(){
        // the colors of squares in game table
        this.sqr1_color = "black";
        this.sqr2_color = "white";

        // hover mod mean when you hover on square you want to see little x or o
        this.hover_mod = true;

        // background it's just a theme 
        this.background_mod = false;
        this.background_id = undefined;
    }

}


export class game_details_sitting{
    
    constructor(){

        this.game_details_obj = undefined;

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

        // load "details obj" in creation time 
        this.load_details_obj();

        // load elements
    }
}