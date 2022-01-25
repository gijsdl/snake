class Snake {
    constructor(mapSize, tiles) {
        this.partArray = [];
        this.mapSize = mapSize;
        this.direction = "north";
        this.tiles = tiles;
        this.alive = true;
    }

    createSnake() {
        const length = 3;
        for (let i = 0; i < length; i++) {
            let type = "";
            switch (i) {
                case 0:
                    type = "head";
                    break;
                case length - 1:
                    type = "tail";
                    break;
                default:
                    type = "body";

            }
            this.partArray.push(new SnakePart(this.tiles, Math.floor(this.tiles.length / 3 * 2 + size * i), type));
        }
        this.partArray.forEach(part => {
            part.draw();
        });
    }

    move() {
        for (let i = this.partArray.length - 1; i >= 0; i--) {
            let part = this.partArray[i];
            if (part.type === "head") {
                switch (this.direction) {
                    case "north":
                        part.location -= this.mapSize;
                        if (part.location < 0) {
                            this.alive = false;
                        }
                        break;
                    case "east":

                        if (part.location% this.mapSize  === this.mapSize -1) {
                            this.alive = false;
                        }
                        part.location ++;
                        break;
                    case "south":
                        part.location += this.mapSize;
                        if (part.location > this.tiles.length) {
                            this.alive = false;
                        }
                        break;
                    case "west":
                        if (part.location% this.mapSize  === 0) {
                            this.alive = false;
                        }
                        part.location --;

                        break;
                }
            } else {
                if (part.type === "tail") {
                    this.tiles[part.location].classList.remove("snake");
                }
                part.location = this.partArray[i-1].location;
            }
            part.draw();
        }
    }

    changeDirection(direction){
        this.direction = direction;
    }
}