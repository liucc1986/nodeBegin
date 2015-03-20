/**
 * Created by i on 2015/3/15.
 */
var RETURN=0X0d;
var NEWLINE=0X0a;
var fs=require('fs');
var util=require('util')
var EventEmiter=require('events').EventEmitter;
function LineReader(path){
    this._rs=fs.createReadStream(path);
}
util.inherits(LineReader,EventEmiter);
LineReader.prototype.on('newEmiter',function(name,){
    if(name=='newLine'){

    }
})