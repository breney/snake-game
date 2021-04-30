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

    function startGame(){
        var interval = 1000;

        setInterval(spawnFruits,interval);
    }

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

        checkColision(command);
      }

      function spawnFruits(command){

        var fruitId = command ? command.fruitId : Math.floor(Math.random() * 1000)
        var fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width - 150);
        var fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height - 150);

        console.log(!state.fruits.length);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
        
       
        notifyAll({
            type: "add-fruit",
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruit(command){
        delete state.fruits[command.fruitId];

        notifyAll({
            type : 'remove-fruit',
            fruitId : command.fruitId
        });
    }

    function checkColision(command){

        var currentPlayer = state.players[command.playerId];

        for(var fruitId in state.fruits){
            var fruit = state.fruits[fruitId];
            if(currentPlayer.x >= fruit.x - 10 && currentPlayer.x <= fruit.x +10){
                if(currentPlayer.y >= fruit.y - 10 && currentPlayer.y <= fruit.y + 10 ){
                    removeFruit({fruitId : fruitId});
                }
            }
        }
        
    }

    
    return {
        startGame,
        subscrive,
        setState,
        addPlayer,
        removePlayer,
        handleKeyDown,
        removeFruit,
        spawnFruits,
        state
    }
}

   
        

