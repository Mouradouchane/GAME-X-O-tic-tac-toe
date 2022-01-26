
export class block{

    constructor(id = "" , x = 0, y = 0 , color = "black" | "white"){

        this.dom = document.createElement("div");

        this.color = color;
        this.id = id;
        this.empty = false;
        // type 1 mean x , 0 mean O
        this.type = null;
        // x & y index as coordinates in tabel
        this.indexs = {
            x : x , 
            y : y ,
        };
    
        // setup block
        this.dom.setAttribute("class","BLOCK_STYLE");
        this.dom.setAttribute("id",this.id);
        this.dom.setAttribute("x",this.indexs.x);
        this.dom.setAttribute("y",this.indexs.y);
        this.dom.style.cssText = `background-color : ${this.color}`;

        // setup events for this block 
        // when user hover in  that block
        /*
        this.dom.addEventListener("mouseover", this.events.on_hover);

        // when user hover out of that block
        this.dom.addEventListener("mouseout", this.events.on_hover_out);

        // when user click on that block
        this.dom.addEventListener("click", this.events.onclick);
        */
       
    }
}