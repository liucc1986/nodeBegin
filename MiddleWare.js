/**
 * Created by i on 2015/3/29.
 */

var MiddleWare=function(){
    this._stack=[];
}
MiddleWare.prototype.use=function(cb){
    this._stack.push(cb);
}
MiddleWare.prototype.run=function(callback){
    var index=0;
    var that=this;
    function next(){
        if(index<that._stack.length){
            that._stack[index++](next);
        }else{
            callback();
        }

    }
    next();
};
var ware=new MiddleWare();
ware.use(function(next){
    console.log('test1');
    next();
});
ware.use(function(next){
    console.log('test2');
    next();
});
ware.run(function(){
    console.log('over');
});


