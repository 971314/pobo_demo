var Api = {
	baseUrl:'http://app.htfutures.com:28081/index.php/Api/',
	indexurl:'indexData',
	huodong:{
		list:'huodong_list',
		detial:'huodong_detial'
	},
	zuanti:{
		list:'zuanlan_list',
		detial:'zuanlan_detial'
	},
	getlist:'getlist',
	gonggao:{
		list:'gonggao_list',
		detial:'gonggao_detial'
	},
	
	getcatelist: 'getcatelist' ,
	shipan:'shipan',
	
	doPost:function(api,parm,fn){
		$.post(Api.baseUrl+api,parm,function(obj){ fn(obj); },'json')
	}
}
