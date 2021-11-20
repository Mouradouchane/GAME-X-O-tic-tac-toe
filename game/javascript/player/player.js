
export class Player{

    constructor(name = "def" , wins = 0 , photo_path = "./graphics/pic_player.png"){
        this.name = name;
        this.wins = wins;
        this.photo = new Image(512,512);
        this.photo.src = photo_path;
    }

}