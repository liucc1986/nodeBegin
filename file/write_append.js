/**
 * Created by i on 2015/3/16.
 */
var fs= require('fs');
fs.writeFile('../open','heiheiheiei',function(err){
    console.log(err);
});
fs.appendFile('../open','最后六点',function(err){
    console.log(err);
});
fs.readFile('../pay.png','base64',function(err,data){
    console.log(data);
    fs.writeFile('./haha.png',data,'base64',function(err){
       console.log(err);
    });

});