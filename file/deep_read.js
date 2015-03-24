/**
 * Created by i on 2015/3/20.
 */
var fs=require('fs');
var path=require('path');
function deep_read(dir){
    console.log(dir);
    var stat=fs.statSync(dir);
    if(stat.isDirectory()){
        var files=fs.readdirSync(dir);
        for(var i=0;i<files.length;i++){
            deep_read(path.join(dir,files[i]));
        }
    }
}

deep_read('../buffer');