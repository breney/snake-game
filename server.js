const nm_dependencies = ['socket.io']; 
const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var game = require('./src/game').createGame();
var path = require('path');

nm_dependencies.forEach(dep => {   app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)))});

console.log(game.width);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/src/views/game.html');

})

io.on('connection', function(socket){
    
});

io.on('test' , function(){
    console.log('test');
})

app.listen(3000, () => {   console.log('Example app listening at http://localhost:3000')});