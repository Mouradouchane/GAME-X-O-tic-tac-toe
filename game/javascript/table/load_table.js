// this moduel should "load/generate" the hole game table with specific size & players data & ...

export class table{
    // game mode mean "1 vs 1" or "1 vs bot"
    constructor(game_mod  = 1 , game_table_size = 3){
        this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = (game_table_size < 3) ? 3 : game_table_size;
        this.blocks = [];

        this.table_dom = document.querySelector("#GAME_TABLE");
        
        // function must be run when user click on GO button
        // this function it's task only load game table with right style
        this.load_table_elements = () => {
            // setup table grid
            this.table_dom.style.cssText = `grid-template-columns : repeat(${this.game_table_size}, 1fr)`;
            
            // loading "game_details_obj" for using saved values from user "colors , background ..."
            let game_details_obj = JSON.parse( localStorage.getItem("game_details_obj") ); 
            
            // in case "game_details_obj" missing 
            if(game_details_obj == null || game_details_obj == undefined){
                console.error("GAME : missing 'game_details_obj' , go to sitting & make some changes");
            }

            let color1 = game_details_obj.sqr1_color;
            let color2 = game_details_obj.sqr2_color;

            // generate blocks
            for(let x = 1 ; x <= this.game_table_size*this.game_table_size ; x += 1){
                
                // a new block
                let element = document.createElement("div");
                // setup that new block
                    element.setAttribute("class","BLOCK_STYLE");
                    element.setAttribute("id","block"+x);
                    element.style.cssText = `background-color : ${(x % 2 != 0) ? color1 : color2}`;
                
                // add block to the game table
                this.table_dom.appendChild(element);  
                this.blocks.push(element);
            }
            
        }
        
        this.load_table_elements();
    }
}