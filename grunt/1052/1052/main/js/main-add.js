Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function delIcon(item, array) {  //在array中删除title值为item的项
  for (var i = 0; i < array.length; i++) {
    if (array[i]['title'] == item) {
      array.remove(array[i]);
      return array;
    }
  }
}

var byId = function (id) { return document.getElementById(id); };

function processConfig(){
  var icon = iconInit.contents;
  var iconAdd = [], notAddArr = []; //分别保存已添加，未添加的图标
  var addList = "", notAdd = "";  //分别保存已添加和未添加的title
  for (var i = 0; i < icon.length; i++) {
    if (icon[i]['checked'] == 1) {
      addList += '<li class="a2 lh50"><img src="" class="delete" width="26" height="26">' + icon[i]['title'] + '<span class="drag-handle pull-right"></span></li>';
      iconAdd.push(icon[i]);
    } else {
      notAdd += '<li class="a2 lh50"><img src="" class="add" width="26" height="26">' + icon[i]['title'] + '<span class="drag-handle pull-right"></span></li>';
      notAddArr.push(icon[i]);
    }
  }

  $('#added').prepend(addList);
  $('#added>li>img').attr('src', '../../images/sub.png');
  $('#not-added').prepend(notAdd);
  $('#not-added>li>img').attr('src', '../../images/add.png');

  var shiftAN = function() {  //点击减号删除已添加
    var txt = $(this).parent().text().substring(0, $(this).parent().text().length); //获取添加的title
    delIcon(txt, iconAdd);  //从已添加数组中删除本项
    for (var i = 0; i < icon.length; i++) { //未添加数组的头部增加本项
      if (icon[i]['title'] == txt) {
        icon[i]['checked'] = '0';
        notAddArr.unshift(icon[i]);
      }
    }
    /*$(this).removeClass('delete');
    $(this).addClass('add');*/
    var $pel = $(this).parent();
    $(this).parent().remove();
    $('#not-added').prepend($pel);
    $('#not-added>li:first-child>img').removeClass('delete');
    $('#not-added>li:first-child>img').addClass('add');
    $('#not-added>li:first-child>img').attr('src', '../../images/add.png');
    $('#not-added>li:first-child>img').click(shiftNA);  //从已添加删除的项加上点击事件
    icon = Array.prototype.concat.apply(iconAdd, notAddArr);
    iconInit.contents = icon;
    if(isPoboApp)  
      pbSYS.writeLocalFile('main', 1, JSON.stringify(iconInit));
  };

  var shiftNA = function() {  //点击加号添加
    var txt2 = $(this).parent().text().substring(0, $(this).parent().text().length);
    delIcon(txt2, notAddArr);
    for (var i = 0; i < icon.length; i++) {
      if (icon[i]['title'] == txt2) {
        icon[i]['checked'] = '1';
        iconAdd.push(icon[i]);
      }
    }
    var $peln = $(this).parent();
    $(this).parent().remove();
    $peln.removeClass('add');
    $peln.addClass('delete');
    $('#added').append($peln);
    $('#added>li:last-child>img').removeClass('add');
    $('#added>li:last-child>img').addClass('delete');
    $('#added>li:last-child>img').attr('src', '../../images/sub.png');
    $('#added>li:last-child>img').click(shiftAN);
    icon = Array.prototype.concat.apply(iconAdd, notAddArr);
    iconInit.contents = icon;
    if(isPoboApp)
      pbSYS.writeLocalFile('main', 1, JSON.stringify(iconInit));
  };

  $('.delete').click(shiftAN);  //为已添加和未添加列表绑定图标点击事件
  $('.add').click(shiftNA);

  Sortable.create(byId('added'), {  //已添加列表的拖拽
    handle: '.drag-handle', //Drag handle selector within list items
    animation: 150,
    group: "sorting",
    sort: true, //sorting inside list
    /*onStart: function() {
      len = $('#added>li').length;
    },*/
    onEnd: function () {
      var len = iconAdd.length; //拖拽前已添加列表的长度
      var lenDrag = $('#added>li').length;
      var arr = [], arrNot = [];
      if (lenDrag < len) {  //拖拽到了未添加列表中
        $('#not-added>li>img').attr('src', '../../images/add.png');
      }
      $.each($('#added>li'), function() {
        var item = $(this).text().substring(0, $(this).text().length);
        for (var i = 0; i < iconAdd.length; i++) {
          if(iconAdd[i]['title'] == item) {
            iconAdd[i]['checked'] = '1';
            arr.push(iconAdd[i]);
            break;
          }
        }
      });
      iconAdd = arr;
      $.each($('#not-added>li'), function() {
        var item = $(this).text().substring(0, $(this).text().length);
        for (var i = 0; i < icon.length; i++) {  
          if(icon[i]['title'] == item) {
            icon[i]['checked'] = '0';
            arrNot.push(icon[i]);
            break;
          }
        }
      });
      notAddArr = arrNot;
      icon = Array.prototype.concat.apply(iconAdd, notAddArr);
      iconInit.contents = icon;
      if(isPoboApp)
        pbSYS.writeLocalFile('main', 1, JSON.stringify(iconInit));
    }
  });

  Sortable.create(byId('not-added'), {
    handle: '.drag-handle',
    animation: 150,
    group: "sorting",
    sort: true,
    onEnd: function () {
      var len = notAddArr.length; //拖拽前未添加列表的长度
      var lenDrag = $('#not-added>li').length;
      var arr = [], arrNot = [];
      if (lenDrag < len) {  //拖拽到了已添加列表中
        $('#added>li>img').attr('src', '../../images/sub.png');
      }
      $.each($('#not-added>li'), function() {
        var item = $(this).text().substring(0, $(this).text().length);
        for (var i = 0; i < notAddArr.length; i++) {
          if(notAddArr[i]['title'] == item) {
            notAddArr[i]['checked'] = '0';
            arrNot.push(notAddArr[i]);
            break;
          }
        }
      });
      notAddArr = arrNot;
      $.each($('#added>li'), function() {
        var item = $(this).text().substring(0, $(this).text().length);
        for (var i = 0; i < icon.length; i++) {  
          if(icon[i]['title'] == item) {
            icon[i]['checked'] = '1';
            arr.push(icon[i]);
            break;
          }
        }
      });
      iconAdd = arr;
      icon = Array.prototype.concat.apply(iconAdd, notAddArr);
      iconInit.contents = icon;
      if(isPoboApp)
        pbSYS.writeLocalFile('main', 1, JSON.stringify(iconInit));
    }
  });
}

var isPoboApp = typeof pbE != "undefined";
var iconInit;
if (isPoboApp) {
  var pbSYS = pbE.SYS();
  if(pbSYS.isHasLocalFile('main', 1)) {
      iconInit = pbSYS.readLocalFile('main', 1);
      if (iconInit)
          iconInit = JSON.parse(iconInit);
  }
  if(!iconInit) {
      iconInit = JSON.parse(pbSYS.readConfig("main/conf/main.json")).customs;
  }
  processConfig();
}else
  $.get("../conf/main.json?" + Date.now(), function(config){
      iconInit = config.customs;
      processConfig();
  })




