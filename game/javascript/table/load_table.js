// this moduel should "load/generate" the hole game table with specific size & players data & ...

export class table{
    // game mode mean "1 vs 1" or "1 vs bot"
    constructor(game_mod  = 1 , game_table_size = 3){
        this.game_mode = (game_mod == 1) ? 1 : 2;
        this.game_table_size = (game_table_size < 3) ? 3 : game_table_size;
        this.blocks = [];

        this.table_dom = document.querySelector("#GAME_TABLE");

        
        this.load_table_elements = () => {
            // setup table grid
            this.table_dom.style.cssText = `grid-template-columns : repeat(${this.game_table_size}, 1fr)`;
            
            //debugger
            for(let x = 1 ; x <= this.game_table_size*this.game_table_size ; x += 1){
                let element = document.createElement("div");
                    element.setAttribute("class","BLOCK_STYLE");
                    element.setAttribute("id","block"+x);

                this.table_dom.appendChild(element);  
                this.blocks.push(element);
            }
            
        }
        
        this.load_table_elements();
    }
}