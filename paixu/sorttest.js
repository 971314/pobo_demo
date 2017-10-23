var arr = [
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
    '63': '10001',
    '503': '2'
  },
  {
    '63': '10002',
    '503': '0'
  }
];
function aa(arr) {
  var obj = {};	//合约代码为key，相同合约的对象组成数组为value
  for (var i=0,l=arr.length; i<l; i++) {
    var code = arr[i]['63'];
    if (!obj.hasOwnProperty(code)) {
      obj[code] = arr.filter(function (item) {
        return item['63'] == code;
      });
    }
  }
  for (var key in obj) {
    obj[key].sort(function (item1, item2) {
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
    for (var key in obj) {
      isEmptyObj = false;
    }
    if (isEmptyObj) {
      break;
    }
    if (obj.hasOwnProperty(code)) {
      newArr = newArr.concat(obj[code]);
      delete obj[code];
    }
  }
  return newArr
}

console.dir(aa(arr));