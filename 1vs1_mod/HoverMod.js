import {AllGameBlock} from "./audio.js";

export const Source_XO_HoverEffect = ["../graphics/o_HoverMod.png" , "../graphics/x_HoverMod.png"];

const ReservedGraphics = ["../graphics/o.png","../graphics/x.png"];

function SetHoverMod(event = event){
    if( 
        event.target.style.backgroundImage != `url(${ReservedGraphics[0]})` 
        || 
        event.target.style.backgroundImage != `url(${ReservedGraphics[1]})` 
    ){
        this.style.backgroundImage = `url(${Source_XO_HoverEffect[1]})`;
    }
}

function RemoveHoverMod(event = event){
    if( 
        event.target.style.backgroundImage != `url(${ReservedGraphics[0]})` 
        && 
        event.target.style.backgroundImage != `url(${ReservedGraphics[1]})`    
    ){
        this.style.backgroundImage = `none`;
    }
}

export {SetHoverMod , RemoveHoverMod};

for(let i = 0 ; i < AllGameBlock.length ; i += 1){
    if( JSON.parse(localStorage.getItem("isHoverModActive")) ){
        // when mouse hover set Effect
        AllGameBlock[i].addEventListener("mouseover", SetHoverMod);
        // when mouse leave deleted Effect
        AllGameBlock[i].addEventListener("mouseleave", RemoveHoverMod);
    }
} 
