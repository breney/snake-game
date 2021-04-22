console.log('ola');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var game = require('./src/game');


app.get('/', function(req,res){
    res.sendFile(__dirname + '/src/views/game.html');
    console.log(__dirname);
})

io.on('connection', function(socket){
    console.log(game);
});

app.listen(3000, () => {   console.log('Example app listening at http://localhost:3000')});