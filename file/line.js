/**
 * Created by i on 2015/3/18.
 */
var RETURN = 0x0d;
var NEWLINE = 0x0a;
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
function LineReader(path){
    this.path=path;
}
util.inherits(LineReader,EventEmitter);
LineReader.prototype.on('newListener',function(name,fn){
    var that=this;
    if(name=='newLine'){
        fs.open(this.path, 'r', function (err, fd) {
            if(err){
                console.log(err);
                return;
            }
            var line = [];
            console.log('begin---');
            fsRead();
            function fsRead(){
                var buff = new Buffer(1);
                fs.read(fd,buff,0,1,null,function(err,bytesRead,buffer){
                    if(bytesRead){
                        if(buffer[0]===RETURN || buffer[0]===NEWLINE){
                            if(line.length){
                                that.emit('newLine',Buffer.concat(line).toString());
                                line=[];
                            }
                        }else{
                            line.push(buffer);
                        }
                        fsRead();
                    }else{
                        if(line.length){//避免最后输出空行
                            that.emit('newLine',Buffer.concat(line).toString());
                        }

                        that.emit('end');
                    }

                });
            }
        });

    }

});
var reader=new LineReader('../open');

reader.on('newLine',function(data){
    console.log(data);
});
reader.on('end',function(){
    console.log('---end');
});