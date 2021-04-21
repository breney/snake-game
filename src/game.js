function createGame(){
    var game = {
        width: 35,
        height: 30,
        players: {
            x : 0,
            y : 0,
            score : 0
        },
        fruits: {},
        addPlayer,
        removePlayer
    }
}

function addPlayer(socketId){
    return game.players[socketId] = {
        x : (Math.random() * game.width),
        y : (Math.random() * game.height)
    };
}

function removePlayer(socketId){
    delete game.players[socketId];
}