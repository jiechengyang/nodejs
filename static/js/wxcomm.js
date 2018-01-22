// JavaScript Document
var myCookie={
	getCookie:function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	},
	delCookie:function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();		
	},
	setCookie:function(name,value,time){
		var strsec = myCookie.getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();	
	},
	getsec:function(){
		//alert(str);
		var str1=str.substring(1,str.length)*1;
		var str2=str.substring(0,1);
		if (str2=="s")
		{
		return str1*1000;
		}
		else if (str2=="h")
		{
		return str1*60*60*1000;
		}
		else if (str2=="d")
		{
		return str1*24*60*60*1000;
		}	
	}
}
var CDBJS = function(){
	{
		//是否显示
		this.showflag=0;
		//用户的openID
		this.openid = '';
		//初始化表单数组
		this.headarr= new Array();
		//产品列表提交的地址
		this.ajaxurl = "?c=wx&a=cplistAjax";
		var _self = this;	
	}
	//类型
	this.lx = 'cg';
	this.changeshow=function(flag,id,pr){
		$("#"+pr+""+id+"").toggle();
	}
	//表单序列化
	this.formser = function(form){
		var form=document.getElementById(form);
		var arr={};
		for (var i = 0; i < form.elements.length; i++) {
			var feled=form.elements[i];
			switch(feled.type) {
				case undefined:
				case 'button':
				case 'file':
				case 'reset':
				case 'submit':
				break;
				case 'checkbox':
				case 'radio':
							if (!feled.checked)break;
				default:
							if (arr[feled.name]) {
								arr[feled.name]=arr[feled.name]+','+feled.value;
							}else{
								arr[feled.name]=feled.value;		
							} 
			}  
		}
		return arr;	
	}
	//现金流明细
	this.openxiang=function(id){
			layer.open({
				content: '请选择下一步操作？',
				btn: ['账单明细', '取消'],
				shadeClose: true,
				yes: function(){
					window.location.href="?c=wxmsg&a=openxiang&id="+id+"";
				}, no: function(){
					$(this).hide();
				}
			});
	}
	//采购/领用---新增行
	this.addrow=function(obj,id){
		var xuhao = parseInt($("#"+id+"").find("tr.newtrtable:last").find("td input").attr('value'))+1;
		var htmls = cdbjs.createTr(xuhao);
		$("#"+id).append(htmls);
	}
	//采购/领用---删除行
	this.delrow=function(obj,xuhao){
		//删除行需要重新计算
		if($(".inittable tr.newtrtable").length==1)return;
		_self.jsuan();_self.mingxi();
		$(obj).parent().parent().nextAll().each(function() {
           var myval = $(this).find("td:eq(0) input").val();
		   myval -=1;
		   $(this).find("td:eq(0) input").val(myval);
        });
		$(obj).parent().parent().remove();
	}
	//采购/领用---单子表格
	this.inittable=function(title,headarr,id){
		  _self.headarr = headarr;
		  var titlediv = '<div><b>'+title+'</b></div>';
		  var tabhtml = '<table class="tablesub" id="'+id+'" style="width:100%;" cellspacing="0" cellpadding="0" border="0"><tbody><td nowrap="" width="10%">序号</td>';
		  for(var p in headarr){tabhtml += '<td nowrap="">'+headarr[p].head+'</td>';}		  
		  tabhtml += '<td nowrap="" width="5%">操作</td></tr>';
		  var bxtr=_self.createTr(1);
		  tabhtml += bxtr+'</tbody></table>';
		  titlediv += tabhtml+'<div><a href="javascript:;" onclick="cdbjs.addrow(this,\''+id+'\')">＋新增</a></div>';
		  return titlediv; 
	}
	//采购/领用---每行表格td
	this.createTr=function(xuhao){
			//每行行都要newtrtable
		  	var bxtr = '<tr class="newtrtable" chosed="0"><td ><input class="inputs" style="text-align:center" readonly="" temp="xuhao" value="'+xuhao+'" name="items.xuhao[]" type="text" /><input value="0" name="items.id[]" type="hidden" /></td>';	
			var othtml = '';
			var headarr = _self.headarr;
			for(var p in headarr){
				var type = headarr[p].type;
				var name = headarr[p].name;
				var readonly = headarr[p].readonly?'readonly':'';
				var value  = type=='text'?'':0;
				var class2 = headarr[p].class!=undefined?headarr[p].class:'';
				if(type=='auto'){
					othtml += '<td><table cellpadding="0" border="0" width="98%"><tbody><tr><td width="100%"><input onblur="cdbjs.mingxi()" class="inputs '+name+'" style="width:99%" value=""  name="items.'+name+'[]" type="text" '+readonly+'/></td><td nowrap=""><a href="javascript:;" onclick="cdbjs.chosecp(this)" class="webbtn webbtn-chose">选择</a></td></tr></tbody></table>';
				}else{				
					var focuskeyup = '';
					if(_self.lx=='cg'){
						if(name=='cgnum'||name=='cgprice')focuskeyup=' onchange="cdbjs.jsuan();cdbjs.mingxi()" onkeyup="cdbjs.jsuan();cdbjs.mingxi()"  onblur="cdbjs.jsuan()" ';					
					}else if(_self.lx=='receive'){
						if(name=='cgnum')focuskeyup=' onchange="cdbjs.mingxi()" onkeyup="cdbjs.mingxi()"';
					}
					othtml += '<td><input class="inputs '+class2+' '+name+'" value="'+value+'" maxlength="10" '+focuskeyup+' name="items.'+name+'[]" type="'+type+'" '+readonly+'/></td>';
				}	
			}
			return bxtr+othtml+'<td><a href="javascript:;" onclick="cdbjs.delrow(this,'+xuhao+')">删</a></td></tr>';
	}
	//采购/领用---计算单子总金额
	this.jsuan=function(){
		window.setTimeout(function(){
			$('#DzMoney').val(0);
			var he = 0;
			$(".inittable .cgnum").each(function(index){				
				var cgnum = parseInt(this.value);				
				if(cgnum==undefined || cgnum==null || cgnum=='')cgnum=0;
				var price =  parseFloat($(".inittable .cgprice:eq("+index+")").val());
				if(price==undefined || price==null || price=='')price=0;
				he += cgnum*price;
				if(isNaN(he))he=0;
			});
			$('#DzMoney').val(parseFloat(he));
		},500);	
	}
	//采购/领用---列出明细
	this.mingxi=function(){
		window.setTimeout(function(){
			var str2 = '';
			$(".inittable .cgname").each(function(index){
				var cgnum = parseInt($(".inittable .cgnum:eq("+index+")").val());
				if(cgnum==undefined || cgnum==null || cgnum=='' || isNaN(cgnum))cgnum=0;
				var price =  parseFloat($(".inittable .cgprice:eq("+index+")").val());
				if(price==undefined || price==null || price=='' || isNaN(price))price=0;
				if(_self.lx=='cg'){
					if(cgnum!=0)str2 += this.value+cgnum+$(".inittable .cgunit:eq("+index+")").val()+"共计:"+cgnum*price+"元\r\n";
				}else if(_self.lx=='receive'){
					var kc = parseInt($(".inittable .cgkc:eq("+index+")").val());
					if(kc<cgnum){
						  layer.open({
							content: '库存不足,'+this.value+'剩余库存量:'+kc
							,skin: 'footer'
						  });	
						  return;					
					}
					if(cgnum!=0)str2 += this.value+cgnum+$(".inittable .cgunit:eq("+index+")").val()+"\r\n";
				}
			});
			$(".cgmingxi").val(str2);
		},500);
	}
	//采购/领用---changekey---搜索
	this.changekey=function(){
		var keywords = jQuery("#changekey").val();
		layer.closeAll();
		$.post(_self.ajaxurl,{'openid':_self.openid,'keywords':keywords},function(da){
			layer.open({
				type: 1,
				title: '产品选择',
				maxmin: true,
				shadeClose: false, //开启点击遮罩关闭层
				area : ['1000px', '700px'],
				content:da
			});										
		});
	}
	//采购/领用---changereload---刷新
	this.changereload=function(){
		layer.closeAll();
		$.post(_self.ajaxurl,{'openid':this.openid},function(da){
			layer.open({
				type: 1,
				title: '产品选择',
				maxmin: true,
				shadeClose: false, //开启点击遮罩关闭层
				area : ['1000px', '700px'],
				content:da
			});										
		});
	}
	//采购/领用---changecancl---取消
	this.changecancl=function(){
		layer.closeAll();
	}
	//采购/领用---changeok---确定
	this.changeok=function(_this,xuhao){
		var checkedraido = $("input[name='changecpinput']:checked").length;
		if(checkedraido==0){
			  //底部提示
			  layer.open({
				content: '请选择产品'
				,skin: 'footer'
			  });
		}else{
			var units =$("input[name='changecpinput']:checked").attr('tmp');
			var id = $("input[name='changecpinput']:checked").val();
			var name = $("input[name='changecpinput']:checked").attr('xname');
			$(".inittable tr[chosed='1']").find("input[name='items.cgname[]']").val(name);
			$(".inittable tr[chosed='1']").find("input[name='items.cgname[]']").css('width','75px');
			$(".inittable tr[chosed='1']").find("input[name='items.id[]']").val(id);
			$(".inittable tr[chosed='1']").find("input[name='items.cgunit[]']").val(units);
			if(_self.lx=='receive'){
				var kc = $("input[name='changecpinput']:checked").attr('kc');
				$(".inittable tr[chosed='1']").find("input[name='items.cgkc[]']").val(kc);
			}
			layer.closeAll();
		}
	}
	//事件初始化
	this.initevent=function(){	
		if($(".ZoomImg").length>0){
			$(".ZoomImg").attr('onclick',"cdbjs.ZoomImg(this)");
		}
	}
	this.ZoomImg=function(obj){
		var fpath = $(obj).attr('src');
		$.imgview({url:fpath});
		return false;
	}
	//采购/领用---选择产品
	this.chosecp=function(_this){
		$(".inittable tr").attr('chosed',0);
		$(_this).parent().parent().parent().parent().parent().parent().attr('chosed',1);
		$.post(_self.ajaxurl,{'openid':this.openid},function(da){
			layer.open({
				type: 1,
				title: '产品选择',
				maxmin: true,
				shadeClose: false, //开启点击遮罩关闭层
				area : ['1000px', '700px'],
				content:da
			});										
		}); 	
	}
}
var cdbjs = new CDBJS();
CDBJS.prototype.delksinfo=function(id,title,href,other){
	  alertMsg.confirm(title, {
			okCall: function(){
				  var url = href+'&id='+id;
				  $.post(href,{'id':id},function(da){
				  	if(da.statusCode==200){
						alertMsg.correct(da.message);
						$.pdialog.reload(other, {data:{}, dialogId:"", callback:null});
						navTabPageBreak();
					}else{
						alertMsg.error(da.message);
					}
				  },'json');
			}
	  });
};
window.cdbjs = cdbjs;
window.onload=function(){
	//采购/领用---初始化表格
	if(document.getElementsByClassName('inittable').length>0){
		var headarr = [
						{'head':'<font color=\'red\'>*</font>物品','name':'cgname','readonly':true,'type':'auto','class':'required'},
						{'head':'<font color=\'red\'>*</font>采购数量','name':'cgnum','readonly':false,'type':'number','class':'required'},
						{'head':'单位','name':'cgunit','readonly':true,'type':'text'},
						{'head':'单价','name':'cgprice','readonly':false,'type':'text','class':'required'},
					  ];
		var title = '采购物品';
		var id = 'tablelist1';
		var lx = $(".inittable").attr('data');
		if(lx==''||lx==null || lx==undefined)lx='cg';
		if(lx=='receive'){//如果是物品领用	
			headarr = [
				{'head':'<font color=\'red\'>*</font>物品','name':'cgname','readonly':true,'type':'auto','class':'required'},
				{'head':'<font color=\'red\'>*</font>领用数量','name':'cgnum','readonly':false,'type':'number','class':'required'},
				{'head':'单位','name':'cgunit','readonly':true,'type':'text'},
				{'head':'库存','name':'cgkc','readonly':true,'type':'text','class':'required'},
			];	
			title = '领用物品';
			id = 'tablelist2';		
		}
		cdbjs.lx = lx;
		var tablehtml = cdbjs.inittable(title,headarr,id);		
		cdbjs.openid= $(".inittable").attr('tmp');
		$(".inittable").html(tablehtml);
	}
}