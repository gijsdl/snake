class Snake {
    constructor(mapSize, tiles) {
        this.partArray = [];
        this.mapSize = mapSize;
        this.direction = "north";
        this.tiles = tiles;
        this.points = 0;
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
        let part = this.partArray[0];
        let grabbedApple = false;
        let oldLocation = part.location;
        switch (this.direction) {
            case "north":
                part.location -= this.mapSize;
                if (part.location < 0) {
                    this.openEnd();
                    return;
                }
                break;
            case "east":

                if (part.location % this.mapSize === this.mapSize - 1) {
                    this.openEnd();
                    return;
                }
                part.location++;
                break;
            case "south":
                part.location += this.mapSize;
                if (part.location > this.tiles.length) {
                    this.openEnd();
                    return;
                }
                break;
            case "west":
                if (part.location % this.mapSize === 0) {
                    this.openEnd();
                    return;
                }
                part.location--;

                break;
        }
        if (this.tiles[part.location].classList.contains("snake")) {
            this.openEnd();
            return;
        }
        if (this.tiles[part.location].classList.contains("apple")) {
            grabbedApple = true;
            this.grabApple(this.tiles[part.location], oldLocation);
            this.points += 100;
            this.drawPoints();
        }
        let border = this.getBorderSide(part.location - oldLocation);
        console.log(oldLocation - this.tiles[part.location])
        part.draw(border, oldLocation);
        if (!grabbedApple) {
            for (let i = this.partArray.length - 1; i > 0; i--) {
                let part = this.partArray[i];
                let border = "";
                let nextPartLocation;
                if (part.type === "tail") {
                    this.tiles[part.location].classList.remove("snake");
                    this.tiles[part.location].style.border = "1px solid black";
                }
                if (i === 1) {
                    part.location = oldLocation;
                } else {
                    part.location = this.partArray[i - 1].location;
                }

                if (part.type !== "tail") {
                    nextPartLocation = this.partArray[i + 1].location;
                    let locationDiff = part.location - nextPartLocation;
                    border = this.getBorderSide(locationDiff);
                }


                part.draw(border, nextPartLocation);
            }
        }
    }

    grabApple(tile, oldLocation) {
        tile.classList.remove("apple");
        this.partArray.splice(1, 0, new SnakePart(this.tiles, oldLocation, "body"));
    }


    changeDirection(direction) {
        this.direction = direction;
    }

    openEnd() {
        clearInterval(timer);
        openEndScreen(this.points);
    }

    getBorderSide(locationDiff) {
        switch (locationDiff) {
            case 1:
                return "left";
            case -1:
                return "right";
            case size:
                return "top";
            case -size:
                return "bottom"
        }
    }

    drawPoints(){
        const pointDiv = document.querySelector(".point");
        pointDiv.textContent = this.points;
    }
}