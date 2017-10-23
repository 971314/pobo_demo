var olist = [
    {"63":"10001","503":"2"},
    {"63":"10001","503":"1"},
    {"63":"10005","503":"2"},
    {"63":"10002","503":"2"},
    {"63":"10002","503":"1"}
];
var ct = olist.length;
var nlist = [];
var nlist1 = [];
var list = [];
for(var i=0;i < olist.length;i++){
    var obj = olist[i];
    if(obj["503"] != "1"){
        nlist.push(obj)
    }
}
for(var i = 0;i < olist.length;i++){
    var obj = olist[i];
    if(obj["503"]!="1"){
        nlist.push(obj)
    }
}
for(var i = 0;i<nlist.length;i++){
    nlist1.push(nlist[i])
}
for(var i = 0;i < nlist1.length;i++){
    list.push(nlist1[i]);
    for(var j = i+1;j<nlist.length-1;j++){
        if(nlist[j]["63"]==nlist[i]["63"]){
            list.push(nlist[j]);
            nlist.splice(j,1);
            if(j < (ct-1)){
                j--;
            }
        }
    }
}
console.log(list);