/**
 * Created by i on 2015/3/14.
 */
var repl=require('repl');
var server =repl.start({});
var con=server.context;
con.name='liucc';
con.age=18;
con.speak=function(){
    console.log('hi,i am '+con.name);
};