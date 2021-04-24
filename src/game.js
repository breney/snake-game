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

    function handleKeyDown(event){
        var speed = 10;
        console.log('test');
        if(event.key == 'ArrowUp' && currentPlayer.y - speed > 0){
          currentPlayer.y -=speed;
          return
        }
        if(event.key == 'ArrowDown' && currentPlayer.y + speed < height - 20){
          currentPlayer.y +=speed;
          return
        }
        if(event.key == 'ArrowRight' && currentPlayer.x + speed < width - 20 ){
          currentPlayer.x +=speed;
          return
        }
        if(event.key == 'ArrowLeft' && currentPlayer.x - speed > 0){
          currentPlayer.x -=speed;
          return
        }
      }

    
    return {
        setState,
        addPlayer,
        removePlayer,
        handleKeyDown,
        state
    }
}

   
        

