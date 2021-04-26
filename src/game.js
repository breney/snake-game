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
        var playerX = 'playerX' in command ? command.playerX : Math.round(Math.random()   * state.screen.width);
        var playerY = 'playerY' in command ? command.playerY :  Math.round(Math.random()  * state.screen.height);

        state.players[playerId] = {
            x : playerX,
            y : playerY
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

        notifyAll({
            type : 'remove-player',
            playerId: command.playerId
        })
    }

    function handleKeyDown(command){
        var speed = 10;
 
        notifyAll(command);
     
        var currentPlayer = state.players[command.playerId];

        if(command.keyPressed == 'ArrowUp' && currentPlayer.y - speed > 0){
          currentPlayer.y -=speed;
        }
        if(command.keyPressed == 'ArrowDown' && currentPlayer.y + speed < state.screen.width - 20){
          currentPlayer.y +=speed;
        }
        if(command.keyPressed == 'ArrowRight' && currentPlayer.x + speed < state.screen.width - 20 ){
          currentPlayer.x +=speed;
        }
        if(command.keyPressed == 'ArrowLeft' && currentPlayer.x - speed > 0){
          currentPlayer.x -=speed;
        }
        console.log('x' + currentPlayer.x + ' y ' + currentPlayer.y);
        
        
       
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

   
        

