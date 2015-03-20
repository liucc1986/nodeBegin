/**
 * Created by i on 2015/3/15.
 */
var fs=require('fs');var fs=require('fs');
var out =fs.createReadStream('./err.txt',{start:3,end:6});
var bower=[];
out.on('readable',function(){
   var spoon;
    while(null!=(spoon=out.read(10))){

        bower.push(spoon);
    }
}).on('end',function(){
    var b=Buffer.concat(bower);
    console.log(b.toString());
})