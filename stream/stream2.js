/**
 * Created by i on 2015/3/17.
 */
var fs= require('fs');
var from =fs.createReadStream('../stream.txt');
var to=fs.createWriteStream('./to.txt');
from.on('readable',function(){
console.log('-readable-----------------------');
    var c;
    while((c=from.read(100000000))!==null){
        to.write(c);
    }
});