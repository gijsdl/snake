console.log("loaded");
const size = 16;
const gameDive = document.querySelector('.game');
const endScreen = document.querySelector('.end-screen');
const startScreen = document.querySelector('.start-screen');
const resetBtn = document.querySelector('.restart');
const startBtn = document.querySelector('.start');
const submitBtn = document.querySelector('.submit');
const nameInput = document.querySelector('.name');
const point = document.querySelector('.point');
const endScreenPoints = document.querySelector('.end-screen-points');
const addScoreDiv = document.querySelector(".add-score");
const topTenDiv = document.querySelector(".top-10");
let snake = null;
let tiles = null;
let player = null;
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
    player = new Player();
    snake.createSnake();
    document.addEventListener("keydown", checkArrow);
    resetBtn.addEventListener("click", reset);
    submitBtn.addEventListener("click", addPlayer);
    nameInput.addEventListener("keypress", e=>{
        if (e.key === "Enter"){
            addPlayer();
        }
    })
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

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hide");
    start();
});

function start() {
    timer = setInterval(() => {

        snake.move();

        if (!document.querySelector(".apple")) {
            createApple();
            if (!document.querySelector(".bonus")){
                createBonus();
            }
        }
        changedLocation = false;
    }, 200);

}

function createApple() {
    const tiles = document.querySelectorAll(".tile:not(.snake):not(.bonus)");
    const random = Math.floor(Math.random() * tiles.length);
    tiles[random].classList.add("apple");
}

function createBonus(){
    const random = Math.floor(Math.random() * 5);
    if (random === 1) {
        const tiles = document.querySelectorAll(".tile:not(.snake):not(.apple)");
        const randomPlace = Math.floor(Math.random() * tiles.length);
        tiles[randomPlace].classList.add("bonus");
    }
}

function openEndScreen(points) {
    endScreen.classList.remove("hide");
    endScreenPoints.textContent = `U heeft ${points} punten behaald`;
    showTopTen();
}

function reset() {
    delete snake;
    delete player;
    player = new Player();
    tiles.forEach(tile => {
        tile.classList.remove("snake");
        tile.classList.remove("apple");
    });
    snake = new Snake(size, tiles);
    snake.createSnake();
    start();
    endScreen.classList.add("hide");
    point.textContent = 0;
    addScoreDiv.classList.remove("hide");
}

function addPlayer() {
    const name = nameInput.value;
    if (name !== "") {
        player.addData(name, snake.points);
        localStorage.setItem("players", JSON.stringify(player.getPlayerList()));
        nameInput.value = "";
        addScoreDiv.classList.add("hide");
        showTopTen();
    }
}

function showTopTen() {
    topTenDiv.textContent = "";
    const players = player.getPlayerList().sort((a, b) => b.points - a.points);
    let length = players.length;
    if (length > 0) {
        if (length > 10) {
            length = 10;
        }
        const table = document.createElement("table");
        for (let i = 0; i < length; i++) {
            const tr = document.createElement("tr");
            if (players[i] === player) {
                tr.classList.add("highlight");
            }
            const tdIndex = document.createElement("td");
            tdIndex.classList.add("td-index");
            tdIndex.textContent = i + 1;
            const tdName = document.createElement("td");
            tdName.classList.add("td-name");
            tdName.textContent = players[i].name;
            const tdPoints = document.createElement("td");
            tdPoints.classList.add("td-points")
            tdPoints.textContent = players[i].points;
            tr.appendChild(tdIndex);
            tr.appendChild(tdName);
            tr.appendChild(tdPoints);
            table.appendChild(tr);
        }
        topTenDiv.appendChild(table);
    } else {
        const p = document.createElement("p");
        p.textContent = "Er zijn op dit moment nog geen scores";
        topTenDiv.appendChild(p)
    }
}