console.log('ola');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var game = require('./src/game');

app.get('/', function(req,res){
    res.send(__dirname + '/views/game.html');
    console.log(__dirname);
})

io.on('connection', function(socket){

});