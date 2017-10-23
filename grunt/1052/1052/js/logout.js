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