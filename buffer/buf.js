/**
 * Created by i on 2015/3/16.
 */
var buf= new Buffer(8);
buf.fill('哈哈',0,4);
console.log(buf);

var buf2=new Buffer([9,8,7,6]);
console.log(buf2);

var buf3=new Buffer('liucc','utf8');
console.log(buf3.toString());


var buf4=new Buffer(1);
buf4[0]=15;
console.log(buf4)