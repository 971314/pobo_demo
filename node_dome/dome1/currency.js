/**
 * Created by pobo on 2017/2/9.
 */
//对加元和美元进行互换
var canadianDollar = 0.91;
 function roundTwoDecimals(amount) {
     return Math.round(amout * 100) / 100;
 }
 exports.canadianToUS = function (canadian) {//canadianToUS 函数设定在exports模块中，所以引入这个模块的代码可以使用它
     return roundTwoDecimals(canadian * canadianDollar);
 };
 exports.USToCanadian = function (us) {//USToCanadian也设定在exports模块中
     return roundTwoDecimals(us / canadianDollar);
 };