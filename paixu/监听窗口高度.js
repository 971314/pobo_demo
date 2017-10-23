/**
 * Created by pobo on 2016/11/10.
 */
$(function(){
    var winHeight = $(document).height()-100+'px';
    winWidth = $(document).width();
    console.log(winHeight);
    $(".logreg_bg").css("height",winHeight);
    $(".logreg_bg").css("width",winWidth);
});
$(window).resize(function() {
    var winHeight = $(document).height()-100+'px';
    winWidth = $(document).width();
    console.log(winHeight);
    $(".logreg_bg").css("height",winHeight);
    $(".logreg_bg").css("width",winWidth);
});
