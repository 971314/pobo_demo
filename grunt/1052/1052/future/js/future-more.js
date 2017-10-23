function cancel() {
  $('.my-modal').addClass('hide');
}

function confirm() {
  $('.my-modal').removeClass('hide');
}

function logout() {
  pbE.WT().wtLoginOut(CID);
  pbE.WT().wtSetCurrentAccLoginOutState();
}

$('.my-modal-backdrop').click(cancel);
if(typeof pbE == 'undefined'){
  $('#goBack').click(function () {
    location.href = document.referrer;
  });
  $.get('../conf/future.json',process);
}else{
  $('#goBack').click(function () {
    location.href = 'goBack';
  })
  process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
}
function process(data) {
  var e = data.more;
  console.log(e.stacked)
  var s = '';
  e.stacked.forEach(function (i) {
    s += '<li class="login"><a href="'+i.url+'">'+i.name+'<img class="more" src="../images/more.png" alt="详细"></a></li>'
  })
  $('.nav-stacked').html(s);
}