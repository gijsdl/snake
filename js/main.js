console.log("loaded");
const size = 16;
const gameDive = document.querySelector('.game');
const endScreen = document.querySelector('.end-screen');
const resetBtn = document.querySelector('.restart');
let snake = null;
let tiles = null;
let timer = 0;
let changedLocation = false;
create();

function create() {
    gameDive.style.gridTemplateColumns = `repeat(${size}, 1fr`;
    gameDive.style.gridTemplateRows = `repeat(${size}, 1fr`;
    for (let x = 1; x <= size; x++) {
        for (let y = 1; y <= size; y++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.gridArea = `${x}/${y}/${x + 1}/${y + 1}`
            gameDive.appendChild(tile);
        }
    }
    tiles = document.querySelectorAll(".tile");
    snake = new Snake(size, tiles);
    snake.createSnake();
    document.addEventListener("keydown", checkArrow);
    resetBtn.addEventListener("click", reset)
}

function checkArrow(e) {
    let direction = "";
    switch (e.code) {
        case "ArrowUp":
            if (snake.direction !== "south") {
                direction = "north";
            }
            break;
        case "ArrowRight":
            if (snake.direction !== "west") {
                direction = "east";
            }
            break;
        case "ArrowDown":
            if (snake.direction !== "north") {
                direction = "south";
            }
            break;
        case "ArrowLeft":
            if (snake.direction !== "east") {
                direction = "west";
            }
            break;
    }
    if (direction !== "" && !changedLocation) {
        snake.changeDirection(direction);
        changedLocation = true;
    }
}

start();

function start() {
    timer = setInterval(() => {

        snake.move();

        if (!document.querySelector(".apple")) {
            createApple();
        }
        changedLocation = false;
    }, 200);
}


function createApple() {
    const tiles = document.querySelectorAll(".tile:not(.snake)");
    const random = Math.floor(Math.random() * tiles.length);
    tiles[random].classList.add("apple");
}


function openEndScreen() {
    endScreen.classList.remove("hide")
}

function reset(){
    delete snake;
    tiles.forEach(tile=>{
        tile.classList.remove("snake");
        tile.classList.remove("apple");
    });
    snake = new Snake(size, tiles);
    snake.createSnake();
    start();
    endScreen.classList.add("hide");
}