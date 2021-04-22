module.exports = {
     createGame: function() {
        var game = {
            width: 500,
            height: 500,
            players: {},
            fruits: {},
            addPlayer,
            removePlayer,
          
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

        return game;
    }
}

