class Snake {
    constructor(mapSize, tiles) {
        this.partArray = [];
        this.mapSize = mapSize;
        this.movement = "north";
        this.tiles = tiles;
        this.alive = true;
    }

    createSnake() {
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                console.log(this.tiles)
                this.partArray.push(new SnakePart(this.tiles, Math.floor(this.tiles.length / 3 * 2), true, this.movement));
            } else {
                this.partArray.push(new SnakePart(this.tiles, Math.floor(this.tiles.length / 3 * 2 + this.mapSize * i), false));
            }
        }
        this.partArray.forEach(part => {
            part.draw();
        });
    }

    move() {
        this.partArray.forEach(part => {
            if (part.head) {
                switch (part.direction) {
                    case "north":
                        part.location -= this.mapSize;
                        if (part.location < 0) {
                            this.alive = false;
                        }
                }
            }
            part.draw();
        })
    }
}