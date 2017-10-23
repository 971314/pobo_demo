

var arr = [
    {'159': '11:20:50'},
    {'159': '20:19:50'},
    {'159': '15:20:50'},
    {'159': '08:17:50'},
    {'159': '22:20:50'},
    {'159': '05:20:50'},
    {'159': '20:20:50'},
    {'159': '03:20:50'},
    {'159': '06:20:50'},
    {'159': '21:20:50'}
];
function sortEntrust(arr) {
    // var timeStr,
    //     time1,
    //     time2;
    // arr.filter(function (item) {
    //     timeStr = item['159'].replace(/\:/g, "");
    //     if(timeStr>'195959'){
    //         // time1 = timeStr.sort(function (a,b) {
    //         //     return b-a;
    //         // })
    //         // console.log(time1)
    //     }else if(timeStr<'200000'){
    //         // time2 = timeStr.sort(function (a,b) {
    //         //     return b-a
    //         // })
    //         // console.log(time2)
    //     }
    // });
    // return arr;
    var nightArr = arr.filter(function (item) {
        var timeStr = item['159'].replace(/\:/g, "");
        return timeStr > '195959';
    });
    var todayArr = arr.filter(function (item) {
        var timeStr = item['159'].replace(/\:/g,"");
        return timeStr < '200000';
    });
    nightArr.sort(function (item1, item2) {
        var time1 = item1['159'].replace(/\:/g, "");
        var time2 = item2['159'].replace(/\:/g, "");
        return time2 - time1;
    });
    todayArr.sort(function (item1, item2) {
        var time1 = item1['159'].replace(/\:/g, "");
        var time2 = item2['159'].replace(/\:/g, "");
        return time2 - time1;
    });
    var newArr = [];
    newArr = newArr.concat(todayArr, nightArr);
    return newArr;
}
sortEntrust(arr)
console.log(sortEntrust(arr))