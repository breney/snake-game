export default function player(){

  var state = {
      observers: [],
      playerId: null
  }
  
  function setPlayerId(playerId){
    state.playerId = playerId;
  }

  function subscrive(command){
    state.observers.push(command);
  }

  function notifyAll(command){
    for(var observerFunction in observers){
      observerFunction(command);
    }
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

  function score() {
    console.log('score');
  }

  function collectFruit(){
    console.log('collect fruit');
  }

  return {
    handleKeyDown,
    score,
    collectFruit
  }
}




  