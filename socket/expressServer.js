var express=require('express');
var app=express();
app.use(express.static(__dirname));
app.get('/', function (req,res) {
    res.status(200).send('hello world');
});
var server =require('http').createServer(app);
var io=require('socket.io')(server);
io.on('connection',function(){

})