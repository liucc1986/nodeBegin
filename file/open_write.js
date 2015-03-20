/**
 * Created by i on 2015/3/16.
 */
var fs=require('fs');
fs.open('../open','w',0666,function(err,fd){
    var buff=new Buffer('liucc');
    console.log(buff.length)
    fs.write(fd,buff,2,2,2,function(err,written,buf1){//一定要用记事本打开文件看效果
        console.log(written);
    })
})