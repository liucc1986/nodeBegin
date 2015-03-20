/**
 * Created by i on 2015/3/16.
 */
var fs=require('fs');
fs.open('../open','r',function(err,fd){
    var buff=new Buffer(10);
    fs.read(fd,buff,0,3,0,function(err,bytesRead,buffer){
        console.log(bytesRead);
        console.log(buff.toString());
        fs.read(fd,buff,3,3,null,function(err,bytesRead,buffer){
            console.log(buff.toString());
        })
    })
});