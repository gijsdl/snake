class SnakePart{
    constructor(tiles, location, type) {
        this.tiles = tiles;
        this.type = type;
        this.location = location;
    }

    draw(){
        this.tiles[this.location].classList.add("snake");
    }


}