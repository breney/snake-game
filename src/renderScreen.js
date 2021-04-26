export default function renderScreen(screen,game,requestAnimationFrame,socketId){
    
    screen.fillStyle = " #f0f0f5";
    screen.fillRect(0, 0, game.state.screen.width, game.state.screen.height);

    var currentPlayer = game.state.players[socketId];

    for(var playerId in game.state.players){
      var player = game.state.players[playerId];
      screen.fillStyle = '#ff9999';
      screen.fillRect(player.x,player.y,20,20);   
    }

    for(var fruitId in game.state.fruits){
      var fruit = game.state.fruits[fruitId];
      screen.fillStyle = '#00ff00'
      screen.fillRect(fruit.x,fruit.y,20,20);
    }

    if(currentPlayer){
        screen.fillStyle = "#0000ff"; 
        screen.fillRect(currentPlayer.x,currentPlayer.y,20,20);   
    }
    
    requestAnimationFrame(() => {
      renderScreen(screen,game,requestAnimationFrame,socketId);
    })
}