  
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


app.use(express.static('src'))

app.get('/', function(req,res){
    res.sendFile( __dirname +'/src/views/game.html');

})

socket.on('connection', function(io){
    
    console.log('connected');
    
    game.addPlayer({playerId : io.id});

    io.emit('setup', game.state);
    
    io.on('disconnect', () => {
        console.log('disconnect');
        game.removePlayer({playerId : io.id});
    })
});




server.listen(3000, () => {   console.log('Example app listening at http://localhost:3000')});