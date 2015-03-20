/**
 * Created by i on 2015/3/15.
 */
var net =require('net');
var  server=net.createServer(function(socket){
    console.log(socket.address());
    server.getConnections()
}).listen(8888,function(){
    console.log('start listen')
});
