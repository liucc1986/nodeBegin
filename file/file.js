/**
 * Created by i on 2015/3/16.
 */
var fs=require('fs');
fs.readdir('../haha',function(err,files){
    if(err){
        console.log(err.status+'--'+err.message);
        return;
    }
    console.log(files);
});
fs.exists('../预习',function(exists){
   console.log(exists)
});
fs.realpath('../预习',function(err,resolvedPath){
    console.log(resolvedPath);
});
fs.utimes('./file.js',new Date(2016,0,12,22,19,35),new Date(),function(){

});
var path='../test.txt';
fs.stat(path,function(err,stats){
    console.log(stats.size);
    fs.truncate(path,8,function(err){
        fs.stat(path, function (err,stats) {
            console.log(stats.size)
        })
    })
});
fs.watchFile(path,function(before,after){
    if(Date.parse(after.mtime)!==Date.parse(before.mtime)){
        fs.rename(path,'../test2.txt',function(err){
            console.log(err);
        });
    }
})