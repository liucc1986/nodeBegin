/**
 * Created by i on 2015/3/13.
 */
function sum(n){
    var result=0;
    for(var i = 0;i < n+1;i++){
        result+=i;
    }
    return result;
}
exports.sum=sum;