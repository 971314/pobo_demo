/**
 * Created by pobo on 2016/11/10.
 */
function sortPosition(arr) {
    var empty = {};
    for (var i=0,l=arr.length; i<l; i++) {
        var code = arr[i]['63'];
        if (!empty.hasOwnProperty(code)) {
            empty[code] = arr.filter(function (item) {
                return item['63'] == code;
            });
        }
    }

    for (var key in empty) {
        console.log(empty[key])
        empty[key].sort(function (item1, item2) {
            if (item2['503'] == '1') {
                return 1;
            } else {
                return 0;
            }
        });
    }

    var newArr = [];
    for (var i=0,l=arr.length; i<l; i++) {
        var code = arr[i]['63'];
        var isEmptyObj = true;
        for (var key in empty) {
            isEmptyObj = false;
        }
        if (isEmptyObj) {
            break;
        }
        if (empty.hasOwnProperty(code)) {
            newArr = newArr.concat(empty[code]);
            delete empty[code];
        }
    }
    return newArr
}
var arr = [
    {
        '63': '10001',
        '503': '2'
    },
    {
        '63': '10006',
        '503': '1'
    },
    {
        '63': '10005',
        '503': '1'
    },
    {
        '63': '10001',
        '503': '1'
    },
    {
        '63': '10002',
        '503': '1'
    },
    {
        '63': '10003',
        '503': '1'
    },
    {
        '63': '10004',
        '503': '1'
    },
    {
        '63': '10002',
        '503': '2'
    },
    {
        '63': '10002',
        '503': '0'
    }
];
console.dir(sortPosition(arr))
