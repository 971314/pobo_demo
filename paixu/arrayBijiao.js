/**
 * Created by pobo on 2017/3/22.
 */
var a = [{a:'2',b:'3'},{a:'1',b:'2'}],b = [{a:'2',b:'3'},{a:'4',b:'3'}],c = [];
for(var i = 0; i < a.length; i++){
    var obj = a[i];
    var num = obj.a;
    var isExist = false;
    for(var j = 0; j < b.length; j++){
        var aj = b[j];
        var n = aj.a;
        if(n == num){
            isExist = true;
            break;
        }
    }
    if(!isExist){
        c.push(obj);
    }
}
console.log(c,c.length);