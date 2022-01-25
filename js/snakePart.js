class SnakePart{
    constructor(tiles, location, head, direction) {
        this.tiles = tiles;
        this.head = head;
        this.location = location;
        if (this.head) {
            this.direction = direction;
        }
    }

    draw(){
        console.log(this.location)
        this.tiles[this.location].classList.add("snake");
    }


}