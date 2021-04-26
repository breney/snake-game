export default function renderScreen(screen,game,requestAnimationFrame,socketId){
    
    screen.fillStyle = " #f0f0f5";
    screen.fillRect(0, 0, 500, 500);

    for(var playerId in game.state.players){
      var player = game.state.players[playerId];

      if(game.state.players[socketId]){
        screen.fillStyle = "#0000ff"; 
      }else{
        screen.fillStyle = '#ff9999';
      }
     
      screen.fillRect(player.x,player.y,20,20);   
    }

    for(var fruit in game.fruits){
      var fruits = game.fruits[fruit];
      screen.fillStyle = '#99ff99'
      screen.fillRect(fruits.x,fruits.y,20,20);
    }

    
    
    requestAnimationFrame(() => {
      renderScreen(screen,game,requestAnimationFrame,socketId);
    })
}