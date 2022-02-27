class SnakePart {
    constructor(tiles, location, type) {
        this.tiles = tiles;
        this.type = type;
        this.location = location;
    }

    draw(border, nextTileLocation) {

        let tile = this.tiles[this.location];
        let nextTile;
        if (nextTileLocation !== null) {
            nextTile = this.tiles[nextTileLocation];
        }
        tile.classList.add("snake");
        switch (border) {
            case "right":

                tile.style.borderRight = "1px solid green";
                if (nextTile) {
                    nextTile.style.borderLeft = "1px solid green";
                }
                break;
            case "left":
                tile.style.borderLeft = "1px solid green";
                if (nextTile) {
                    nextTile.style.borderRight = "1px solid green";
                }
                break;
            case "bottom":
                tile.style.borderBottom = "1px solid green";
                if (nextTile) {
                    nextTile.style.borderTop = "1px solid green";
                }
                break;
            case "top":
                tile.style.borderTop = "1px solid green";
                if (nextTile) {

                    nextTile.style.borderBottom = "1px solid green";
                }
                break;
        }
    }


}