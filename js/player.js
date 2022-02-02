class Player {
    static playerList = [];

    constructor() {
        this.name = "";
        this.points = 0;
    }

    addPlayer() {
        Player.playerList.push(this);
    }

    addData(name, points) {
        this.name = name;
        this.points = points;
        this.addPlayer();
    }


    getPlayerList() {
        if (Player.playerList.length === 0) {
            const players = JSON.parse(localStorage.getItem("players"));
            if (players) {
                players.forEach(player => {
                    Player.playerList.push(player);
                });
            }
        }
        return Player.playerList;
    }
}