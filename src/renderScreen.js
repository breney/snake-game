export default function renderScreen(screen,game){
    
    screen.fillStyle = " #f0f0f5";
    screen.fillRect(0, 0, 500, 500);
    

    for(player in game.players){
      var players = game.players[player];
      screen.fillStyle = '#ff9999'
      screen.fillRect(players.x,players.y,20,20);
     
    }
    for(fruit in game.fruits){
      var fruits = game.fruits[fruit];
      screen.fillStyle = '#99ff99'
      screen.fillRect(fruits.x,fruits.y,20,20);
    }
    
    requestAnimationFrame(() => {
        renderScreen(screen,game);
    });
}