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
        observers.forEach(function(observerFunction){
            observerFunction(command);
        })
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

    function handleKeyDown(command){
        notifyAll(command);
        var speed = 10;
        var currentPlayer = state.players[command.playerId];
        console.log(command.keyPressed);
        if(command.keyPressed == 'ArrowUp' && currentPlayer.y - speed > 0){
          currentPlayer.y -=speed;
          return
        }
        if(command.keyPressed == 'ArrowDown' && currentPlayer.y + speed < 500 - 20){
          currentPlayer.y +=speed;
          return
        }
        if(command.keyPressed == 'ArrowRight' && currentPlayer.x + speed < 500 - 20 ){
          currentPlayer.x +=speed;
          return
        }
        if(command.keyPressed == 'ArrowLeft' && currentPlayer.x - speed > 0){
          currentPlayer.x -=speed;
          return
        }
      }

    
    return {
        subscrive,
        setState,
        addPlayer,
        removePlayer,
        handleKeyDown,
        state
    }
}

   
        

