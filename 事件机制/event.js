/**
 * Created by i on 2015/3/16.
 */
function Event(){
    this._events={};
}
Event.prototype.addListener=function(type,handler){
    if(typeof handler !== 'function'){
        throw TypeError('handler must be a function')
    }
    if(this._events[type]){
        this._events[type].push(handler);
    }else{
        this._events[type]=[handler];
    }
};
Event.prototype.emit=function(type){
    var handler=this._events[type];
    console.dir(arguments);
    var params=[];
    for(var j=1;j<arguments.length;j++){
        params[j-1]=arguments[j];
    }
    for(var i=0;i<handler.length;i++){
        handler[i].apply(this,params);
    }


};

function Car(){

}
Car.prototype=new Event();
Car.prototype.run=function(speed){
    console.log('haha,我跑起来了时速'+speed);
};
function Engine(){

}
Engine.prototype=new Event();
Engine.prototype.start=function(zhuantai){
    console.log('打火,机器状态：'+zhuantai );
};
var bmw=new Car();
var engine=new Engine();
bmw.addListener('打火',engine.start);
bmw.emit('打火','良好');
engine.addListener('加油',bmw.run);
engine.emit('加油',80);