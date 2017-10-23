/**
 * Created by pobo on 2017/2/9.
 */
var currency = require('./currency');//用路径./表明模块跟程序脚本放在同一目录下

console.log('50 Canadian dollars equals this amont of us dollars:');
console.log(currency.canadianToUS(50));//使 用 currency 模块的canadianToUS函数

console.log('30 US dollars equals this amout of Candian dollars:');
console.log(currency.USToCanadian(30));//使用currency模块的USToCanadian函数