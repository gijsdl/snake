console.log("loaded");
const size = 32;
const main = document.querySelector('main');
let snake = null;
let tiles = null;
let timer = 0;
createMap();

function createMap() {
    main.style.gridTemplateColumns = `repeat(${size}, 1fr`;
    main.style.gridTemplateRows = `repeat(${size}, 1fr`;
    for (let x = 1; x <= size; x++) {
        for (let y = 1; y <= size; y++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.gridArea = `${x}/${y}/${x + 1}/${y + 1}`
            main.appendChild(tile);
        }
    }
    tiles = document.querySelectorAll(".tile");
    snake = new Snake(size, tiles);
    snake.createSnake();
}

start();

function start() {
    timer = setInterval(() => {
        if (!snake.alive) {
            clearInterval(timer);
        } else {
            snake.move();
        }
        console.log(snake.alive);

    }, 1000)
}