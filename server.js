const nm_dependencies = ['socket.io']; 
const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var game = require('./src/game').createGame();
var path = require('path');

nm_dependencies.forEach(dep => {   app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)))});

app.set('io',io);

app.use(express.static('src'))

app.get('/', function(req,res){
    res.sendFile(__dirname + '/src/views/game.html');

})

io.on('connection', function(socket){
    
    console.log('connected');
    game.addPlayer(socket.id);

    socket.emit('setup', game);
    
    socket.on('disconnect', () => {
        console.log('disconnect');
        game.removePlayer(socket.id);
    })
});




http.listen(3000, () => {   console.log('Example app listening at http://localhost:3000')});