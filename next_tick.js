/**
 * Created by i on 2015/3/14.
 **/
console.log('this first');

process.nextTick(function(){
    console.log('this is nextTick');
    setImmediate(function(){
        console.log('haha2');
    });
});
console.log('second');

setImmediate(function(){
    console.log('haha');
});