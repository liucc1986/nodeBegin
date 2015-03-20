/**
 * Created by i on 2015/3/16.
 */
var fs=require('fs');
var out=fs.createReadStream('../stream.txt',{start:3,end:90});
out.on('open',function(){
    console.log('打开了');
});
out.pause();
setTimeout(function(){
    out.resume();
},3000);
out.on('data',function(data){
    console.log('读取到数据：'+data)
});
out.on('end',function(){
    console.log('读取完毕');
});
out.on('close',function(){
    console.log('文件关闭');
});
out.on('error',function(err){
   console.log('出错了'+err)
});