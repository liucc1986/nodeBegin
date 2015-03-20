/**
 * Created by i on 2015/3/13.
 */
var fs=require('fs');

fs.readFile('log.txt','utf-8',function(err,data){
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
    //console.log(data.toString());


});
var data=fs.readFileSync('log.txt','utf-8');
console.log('同步sync:'+data);