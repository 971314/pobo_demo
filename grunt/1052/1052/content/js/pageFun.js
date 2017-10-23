var pageFun = {
	indexList:function(){
		Api.doPost(Api.indexurl,{},function(obj){
			pageFun.initIndexList(obj.d);
		});
	},
	gonggaoList:function(){
		Api.doPost(Api.gonggao.list,{},function(obj){
			pageFun.initList(obj.d,'gonggaoDetial');
		});
	},
	gonggaoDetial:function(){
		pageFun.initDetial(Api.gonggao.detial);
	},
	huodongList:function(){
		Api.doPost(Api.huodong.list,{},function(obj){
			pageFun.initList(obj.d,'huodongDetial');
		});
	},
	huodongDetial:function(){
		pageFun.initDetial(Api.huodong.detial);
	},
	zuanlanList:function(){
		Api.doPost(Api.zuanti.list,{},function(obj){
			pageFun.initList(obj.d,'zuanlanDetial');
		});
	},
	zuanlanDetial:function(){
		pageFun.initDetial(Api.zuanti.detial);
	},
	shipanDetial:function(){
		pageFun.initshiapnDetial(Api.shipan);
	},
	initIndexList:function(data){
		var gonggaoL = data.gonggao;
		var huodongL = data.huodong;
		$.each(gonggaoL,function(i,d){
			html = '<dd>'
				+'<a href="pobo:pageId=900004&title='+ d.title.substr(0,8) +'&url=content/gonggaoDetial.html#/'+ d.id +'">'
				//+'<a href="/html/gonggaoDetial.html#/'+ d.id +'">'
				+'<em style="background-image: url('+ d.face_img +');"></em>'
				+'<h2>'+ d.title +'</h2>'
				+'<p>'+ d.desc +'</p>'
				+'</a>'
				+'</dd>';
			$('#gg').append(html);
		}); 
		$.each(huodongL,function(i,d){
			html = '<dd>'
				+'<a href="pobo:pageId=900004&title='+ d.title.substr(0,8) +'&url=content/huodongDetial.html#/'+ d.id +'">'
				//+'<a href="/html/huodongDetial.html#/'+ d.id +'">'
				+'<em style="background-image: url('+ d.face_img +');"></em>'
				+'<h2>'+ d.title +'</h2>'
				+'<p>'+ d.desc +'</p>'
				+'</a>'
				+'</dd>';
			$('#hd').append(html);
		}); 
	},
	initList :function(data,detial){
		$('#hd').empty();
		var html="";
		$.each(data,function(i,d){
			html += '<dd>'
				+'<a href="pobo:pageId=900004&title='+ d.title.substr(0,8) +'&url=content/'+detial+'.html#/'+ d.id +'">'
				//+'<a href="/html/'+detial+'.html#/'+ d.id +'">'
				+'<em style="background-image: url('+ d.face_img +');"></em>'
				+'<h2>'+ d.title +'</h2>'
				+'<p>'+ d.desc +'</p>'
				+'</a>'
				+'</dd>';
		});
		$('#hd').html(html);
	},
	initDetial:function(url){
		var parm = pageFun.getParm();
		var id = parm[1];
		Api.doPost(url,{id:id},function(obj){
			if(obj.s){
				$.each(obj.d,function(i,d){
					$('.'+i).html(d);
				});
			}
		});
	},
	initshiapnDetial:function(url){ 
		Api.doPost(url,{},function(obj){
			if(obj.s){
				$.each(obj.d,function(i,d){
					$('.'+i).html(d);
				});
			}
		});
	}, 
	getParm: function  (){
		var hash = location.hash.split('#');
		if(hash.length>1){
			var parm = hash[1].split('/');
			return parm;
		}
	} ,
	initSchool : function(){
		Api.doPost(Api.getcatelist,{},function(obj){
			pageFun.initMenuList(obj.d.list);
		});
	},
	initMenuList : function (data){ 
		$('#menuList').html('<center>正在加载中...</center>'); 
		var html = '';
		$.each(data,function(i,d){
			html += ' <div class="swiper-slide" d_id="'+d.id+'"><b>'+d.title+'</b><div class="mdropdown">';
			$.each(d.list,function(ii,dd){ html += '<a href="javascript:void(0)" d_id="'+dd.id+'" >'+dd.title+'</a>'; }); 
	    	html += '<span></span></div></div>';
		});
		$('#menuList').html(html); 
	    var mySwiper = new Swiper('.swiper-container',{ slidesPerView : 4 });
	    $('.swiper-slide').on('click',function(){
	        $('.swiper-slide.open').removeClass('open');
	        $('#menuMark').fadeOut();
	    });
	    var subClick = false;
	    $('.swiper-slide').on('click',function(){
	    	if(subClick){ setTimeout(function(){ subClick = false; } , 100) ; return false;  }
	    	subClick = false;
	    	$(this).addClass('open'); 
	    	if($(this).find('div a').length>0){ 
		        $('#menuMark').fadeIn();
			}else{ 
		        var id = $(this).attr('d_id');
		    	$('#cur_title').text($(this).text()); 
		    	$('#listBox dd').html('<dd style="padding:0px;"><center>正在加载...</center></dd>');
		    	Api.doPost(Api.getlist,{id:id},function(obj){
					pageFun.initContentList(obj.d);
				});
			}
	    });
	    $('.mdropdown a').on('click',function(ev){
	    	subClick = true; 
	    	var id = $(this).attr('d_id'); 
		    $('#menuMark').fadeOut();
	    	$('#cur_title').text($(this).text()); 
	    	$(this).parents('.swiper-slide').removeClass('open');
	    	$('#menuMark').click();
	    	$('#listBox dl').html('<dd style="padding:20px 0px;"><center>正在加载...</center></dd>');
	    	Api.doPost(Api.getlist,{id:id},function(obj){
				pageFun.initContentList(obj.d);
			});
			ev.preventDefault();
	    });
	    $('#menuMark').on('touchmove',function(ev){ ev.preventDefault(); }).on('click',function(){
	        $('.swiper-slide.open').removeClass('open');
	        $('#menuMark').fadeOut();
	    });
	    
	    $($($('.swiper-slide'))[0]).click();
	},
	initContentList:function(data){
		if(data.length>0){
			$('#listBox').empty();
			var html="";
			$.each(data,function(i,d){
				html += '<dd>'
					+'<a href="pobo:pageId=900004&title='+ d.title.substr(0,8) +'&url=content/trainingDetial.html#/'+ d.id +'">'
					//+'<a href="/html/schoolDetial.html#/'+ d.id +'">'
					+'<em style="background-image: url('+ d.face_img +');"></em>'
					+'<h2>'+ d.title +'</h2>'
					+'<p>'+ d.desc +'</p>'
					+'</a>'
					+'</dd>';
			}); 
			$('#listBox').html(html);
		}else{
			$('#listBox').html('<dd style="padding:20px 0px;"><center>暂无数据</center></dd>');
		}
	}
};