  
import express from 'express'
import http from 'http'
import createGame from './src/game.js'
import * as io from "socket.io"
import path  from 'path';

var app = express()
var server = http.createServer(app)
var socket = new io.Server(server)

var game = createGame();
var __dirname = path.resolve();

game.subscrive( (command) => {
    console.log(`> Emitting ${command.type}`);
    socket.emit(command.type, command);
})



app.use(express.static('src'))

app.get('/', function(req,res){
    res.sendFile( __dirname +'/src/views/game.html');

})


game.startGame();

socket.on('connection', function(io){
    
    var playerName = io.id;

    io.on('playerName', (name) =>{
        playerName = name;
    })
    
    game.addPlayer({playerId : playerName});

    io.emit('setup', game.state);
    
    io.on('disconnect', () => {
        console.log('disconnect');
        game.removePlayer({playerId : io.id});
    })

    io.on('move-player', (command) => {
        command.type = "move-player";
        command.playerId = io.id;
        game.handleKeyDown(command);
    })
});




server.listen(3000, () => {   console.log('Example app listening at http://localhost:3000')});