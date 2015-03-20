/**
 * Created by i on 2015/3/15.
 */

var fs=require('fs');
var src=fs.createReadStream('./log.txt');
var target=fs.createWriteStream('./other.txt');
target.on('open',function(){

});
src.on('data',function(data){
    target.write(data);
});
src.on('end',function(){
    console.log('ccc');
    target.on('close',function(){
        console.log('接受完成')
    });
    target.end('再见',function(){
        console.log('结束 了')
    });
});