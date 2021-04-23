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
                x : Math.round((Math.random()   * game.width - 10),1),
                y : Math.round((Math.random()  * game.height - 10),1)
            };
        }
    
        function removePlayer(socketId){
            delete game.players[socketId];
        }

        
        return game;
    }
}

