/**
 * Created by i on 2015/3/15.
 */
/**
 * Created by i on 2015/3/15.
 */
var fs=require('fs');
var out =fs.createReadStream('./err.txt',{start:3,end:6});
out.on('open',function(){
    console.log('open')

});
out.on('data', function (data) {
    console.log('数据读取到'+data);
});
out.on('end',function(){
    console.log('读取完毕')
});