/**
 * Created by i on 2015/3/13.
 */
var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
    fs.readFile('log.txt','utf-8',function(err,data){
        res.end(data);
    });
    //res.end('<html><head><meta charset="utf-8"/></head><body>这十个测试页面</body></html>');
}).listen(8888);
