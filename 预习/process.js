/**
 * Created by i on 2015/3/12.
 */
//process.stdout.write('test\n');
//process.stderr.write('error');
process.stdin.setEncoding('utf-8');
//process.stdin.on('data',function(data){
//    console.log(data);
//});
process.stdin.on('readable',function(){
    var d=process.stdin.read();
    console.log(d);
});
//process.on('exit',function(){
//    console.log('process will exit');
//});
process.on('SIGINT',function(){//signal interrupted
    console.log('zhongduan');
    process.exit();
});
