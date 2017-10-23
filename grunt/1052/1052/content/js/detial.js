$(function(){
	$('#loadMark,#loading').on('touchmove',function(e){ e.preventDefault(); return false; }); 
	setTimeout(function(){ $('#loadMark,#loading').fadeOut(); },200); 
	var parm = getParm();
	var id = parm[1];
	Api.doPost(Api.huodong.detial,{id:id},function(obj){
		if(obj.s){
			$.each(obj.d,function(i,d){
				$('.'+i).html(d);
			});
		}
	});
	
});


function getParm (){
	var hash = location.hash.split('#');
	if(hash.length>1){
		var parm = hash[1].split('/');
		return parm;
	}
	
}