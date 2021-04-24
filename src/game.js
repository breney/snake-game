export default function createGame(){
    var state = {
        players: {},
        fruits: {},
        screen: {
            width: 500,
            height: 500
        }
    }

    var observers = [];

    function subscrive(observerFunction){
        observers.push(observerFunction);
    }

    function notifyAll(command){
        for(observerFunction in observers){
            observerFunction(command);
        }
    }

    function setState(newState) {
        Object.assign(state,newState);
    }

    function addPlayer(command){
        var playerId = command.playerId;
  
        state.players[playerId] = {
            x : Math.round((Math.random()   * state.screen.width - 10),1),
            y : Math.round((Math.random()  * state.screen.height - 10),1)
        };

        notifyAll({
            type: 'add-player',
            playerId:playerId,
            playerX: state.players[playerId].x,
            playerY: state.players[playerId].y
        })
    }

    function removePlayer(command){
        delete state.players[command.playerId];
    }

    
    return {
        setState,
        addPlayer,
        removePlayer,
        state
    }
}

   
        

