
export class block{

    constructor(id = "" , x = 0, y = 0 , color = "black" | "white"){

        this.dom = document.createElement("div");

        this.color = color;
        this.id = id;
        this.empty = true;
        //  1 mean x , 2 mean O
        this.owner = null;
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
       
    }
}