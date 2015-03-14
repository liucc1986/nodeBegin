/**
 * Created by i on 2015/3/14.
 */
function Event(){

}
Event.prototype.addListener=function(type,listener){
    if(typeof listener !=='function'){
        throw TypeError('监听器必须是函数');
    }
    if(!this._events){
        this._events=[];
    }
    if(this._events[type]){
        this._events[type].push(listener);
    }else{
        this._events[type]=[listener];
    }
    Event.prototype.emeit=function(type){

    }

}