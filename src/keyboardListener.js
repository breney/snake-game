export default function keyboardListener(){

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
    state.observers.forEach(function(observerFunction) {
      observerFunction(command);
    })
  }
 
  document.addEventListener('keydown',handleKeyDown);

  function handleKeyDown(event){

      var keyPressed = event.key;

      var command = {
        type: 'move-player',
        playerId: state.playerId,
        keyPressed
      }

      notifyAll(command);
  }

  return {
    subscrive,
    setPlayerId
  }
}




  