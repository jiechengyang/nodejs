/**
*	课程表查看
*	createname：杨boom
*	homeurl：http://www.jcheg.net/
*	Copyright (c) 2017 yjc (jcheg.net)
*	Date:2017-09-13
*/
(function ($) {
	function get(id){return document.getElementById(id)};
	function funclass(opts,obj){
		if(!opts)opts={};
		var me = this;
		var rand=js.getrand();//随机数
		var formdiv = '<div  style="padding:10px;" class="kcb_params_set_div"><form><table cellspacing="0" width="80%" border="0" cellpadding="0"><tr><td  colspan="14"><div class="inputtitle">课表属性:(设置每周上课天数，每天上课节数)</div></td></tr><tr><td class="tdinput" colspan="14" style="display:none;">课表方案名称：<input id="kbtitle_'+rand+'" class="form-control" style="width:200px;"></td></tr>';
		formdiv += ' <tr><td class="tdinput">工作日：<select name="workday" class="form-control" style="width:100px"  id="wordkday_'+rand+'"></select></td>';
		formdiv += '<td class="tdinput">早读：<select id="zdjie_'+rand+'" class="form-control" style="width:100px;" ></select> </td>';
		formdiv += ' <td class="tdinput">上午：<select id="swjie_'+rand+'" class="form-control" style="width:100px;" ></select></td>';
		formdiv += '<td class="tdinput">中午：<select id="zwjie_'+rand+'" class="form-control" style="width:100px;" /></select> </td>';
		formdiv += '<td class="tdinput">下午：<select id="xwjie_'+rand+'" class="form-control" style="width:100px;" /></select></td>';     	
		formdiv += '<td class="tdinput">晚自习：<select id="wxjie_'+rand+'" class="form-control" style="width:100px;" /></select></td> </tr>';       
		formdiv += '<tr><td colspan="14"><div class="inputtitle" style="padding:10px 0;"><button type="button" class="btn btn-primary" id="save_kcb_params_'+rand+'" style="width:100px"><i class="icon-save" ></i>&nbsp;保存信息</button>';         
		formdiv += '&nbsp;<button type="reset" class="btn btn-danger" style="width:100px">重置</button></div></td></tr> </table></form></div>';
		formdiv += '<div class="kcb_other_params_set_div"><table class="stable3"width="100%"><thead><tr><th style="text-align:left"colspan="2"><div class="inputtitle"style="padding:10px 0;">课表展示:&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;"class="btn btn-success"id="comm_jie_set_'+rand+'">公告时段设置</a>&nbsp;|&nbsp;&nbsp;<a href="javascript:;"class="btn btn-info"id="jie_time_set_'+rand+'">节次时间设置</a>&nbsp;|&nbsp;&nbsp;<a href="javascript:;"class="btn btn-default btn-kcb_refer" id="kcb_refer_'+rand+'">刷新课程表</a><input type="hidden"id="commjie_'+rand+'"value=""/><input type="hidden"id="commjiename_'+rand+'"value=""/></div></th></tr></thead></table></div>';
		var startstr = '<link href="webmain/css/kcb.css" rel="stylesheet" type="text/css"/><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>';
		var tabstr = '<tr style="background:#EBF7D9"><td  style="background:#EBF7D9;border-left:none;height:30px;line-height:30px" align="center">时间/星期</td>';
		this.saveurl = js.getajaxurl('SaveKbParams','pk','main');//课程表基础数据设置URL
		this.paramsurl = js.getajaxurl('getkbparam','pk','main');//获取课表基础参数URL
		this.xgkcurl = js.getajaxurl('xgkc','userinfo','main');//修改个人课表URL
		this.mykcburl = js.getajaxurl('mykcb','userinfo','main');//获取个人课表数据URL
		this.myClassurl = js.getajaxurl('myClass','userinfo','main');//获取个人教授班级URL
		this.loadkcburl = js.getajaxurl('loadkcb','userinfo','main');//获取个人所授科目URL
		this.loadclasskcburl = js.getajaxurl('loadclasskcb','classmanage','system');//获取班级课表数据URL
		this.timeset1url = 'index.php?a=timeset&m=pk&d=main&ajaxurl=true&rnd='+Math.random()+'&act=comm';//公共时段URL
		this.timeset2url = 'index.php?a=timeset&m=pk&d=main&ajaxurl=true&rnd='+Math.random()+'&act=jie';//节次时间URL
		this.kcbselect = 'kcbselect';
		this.cselect = 'cselect';
		this.BOT = 'r';//模式(r:读取模式用于排课系统->基础数据,w:操作模式用于个人办公->个人课表用户课表设置,a:班级课程表读取模式用于个人办公->班级课程表,rc:个人课程表选择模式用户调课(课表关联))
		this.workend = 30;//工作日最大值
		this.jend = 6;//节次最大值
		this.zdobj ={};//早读jquery对象
		this.workdayobj={};//早读jquery对象
		this.swobj = {};//工作日jquery对象
		this.zwobj = {};//上午jquery对象
		this.xwobj = {};//下午jquery对象
		this.wxobj = {};//晚自习jquery对象
		this.commjieobj ={};//公共时段jquery对象
		this.commjienameobj = {};//公共时段名juqery对象
		this.savebtnobj = {};//保存课表参数设置
		this.commjiesetobj = {};//保存公共时段
		this.jietimesetobj = {};//保存节次时间
		this.kcbreferobj = {};//刷新课表
		this.workday = 0;//工作日
		this.zdjie = 0;//早读节次
		this.swjie = 0;//上午节次
		this.zwjie = 0;//中午节次
		this.xwjie = 0;//下午节次
		this.wxjie = 0;//晚自习节次
		this.kcbda = '';//个人课程表数据
		this.classid=0;//班级ID
		this.divid ='';//div对象
		this.kcbtime = {};//课表时间
		this.userid = 0;//用户ID
		this.init=function(){
			for(var i in opts)this[i]=opts[i];
			if(this.BOT=='w'){
				$("#"+me.divid+"").after('<div><!--科目选择--><select  id="kcbselect" style="display:none"></select><!--班级选择--><select id="cselect" style="display:none"></select></div>');
				$.post(this.mykcburl,function(data){
					if(data != 'no'){
						$("#"+me.kcbselect+"").html(data);
					}
				});
				$.post(this.myClassurl,function(data){
					if(data){
						$("#"+me.cselect+"").html(data);
					}
				});	
				this.loadparam();
				this.gettabstr(this.workday,startstr+tabstr);	
				this.events();
			}else if(this.BOT=='r'){
				$("#"+me.divid+"").before(formdiv);
				this.workdayobj = $("#wordkday_"+rand+"");
				this.zdobj = $("#zdjie_"+rand+"");
				this.swobj = $("#swjie_"+rand+"");
				this.zwobj = $("#zwjie_"+rand+"");
				this.xwobj = $("#xwjie_"+rand+"");
				this.wxobj = $("#wxjie_"+rand+"");
				this.commjieobj =$("#commjie_"+rand+"");;
				this.commjienameobj = $("#commjiename_"+rand+"");
				this.savebtnobj = $("#save_kcb_params_"+rand+"");
				this.commjiesetobj = $("#comm_jie_set_"+rand+"");
				this.jietimesetobj = $("#jie_time_set_"+rand+"");
				this.kcbreferobj = $("#kcb_refer_"+rand+"");
				this.workdaylist();
				me.jielist(this.zdobj);
				me.jielist(this.swobj);
				me.jielist(this.zwobj);
				me.jielist(this.xwobj);
				me.jielist(this.wxobj);
				me.loadparam();
				this.gettabstr(this.workdayobj.val(),startstr+tabstr);
				this.events();
			}else if(this.BOT=='a' || this.BOT == 'rc'){
				this.loadparam();
				this.gettabstr(this.workday,startstr+tabstr);					
			}
		};
		this.events=function(){
			if(me.BOT=='w'){
				$(".upkm_"+rand+"").dblclick(function(){
					var id = parseInt($(this).attr('temp'));
					var jie = parseInt($(this).attr('data-grop-i'));
					var week = parseInt($(this).attr('data-grop-j'));
					var type = $(this).attr('type');
					if(isNaN(id))id = 0;
					$(this).text('');
					var key = 'subjectid';
					//onchange='writeobj.xgkc("+id+","+jie+","+week+",this,"+key+")'
					var kcstr = "<select class='form_select select_subject_"+rand+"' name='km'  style='width:5em;'>"+$("#"+me.kcbselect+"").html()+"</select>";
					$(this).html(kcstr);
					$(".select_subject_"+rand+"").change(function(){
						me.xgkc(id,jie,week,this,key,type);
					});	
				});
				$(".upbj_"+rand+"").dblclick(function(){
					var id = parseInt($(this).attr('temp'));
					var jie = parseInt($(this).attr('data-grop-i'));
					var week = parseInt($(this).attr('data-grop-j'));
					var type = $(this).attr('type');
					if(isNaN(id))id = 0;
					$(this).text('');
					var key = 'classid';
					//onchange='writeobj.xgkc("+id+","+jie+","+week+",this,"+key+")'
					var classliststr = "<select  class='form_select select_classid_"+rand+"' name='bj'  style='width:5em;'>"+$("#cselect").html()+"</select>";
					$(this).html(classliststr);
					$(".select_classid_"+rand+"").change(function(){
						me.xgkc(id,jie,week,this,key,type);
					});
				});
			}else if(me.BOT =='r'){
				this.savebtnobj.click(function(){
					me.saveparam();
				});
				this.workdayobj.change(function(){
					me.tableview(me.workdayobj);
				});
				this.zdobj.change(function(){
					me.tableview2(me.zdobj,'zd');
				});
				this.swobj.change(function(){
					me.tableview2(me.swobj,'sw');
				});
				this.zwobj.change(function(){
					me.tableview2(me.zwobj,'zw');
				});
				this.xwobj.change(function(){
					me.tableview2(me.xwobj,'xw');
				});	
				this.wxobj.change(function(){
					me.tableview2(me.wxobj,'wx');
				});																
				this.commjiesetobj.click(function(){
					var title ='公共时段设置';
					layer.open({
					  type: 2,
					  title: title,
					  shadeClose: true,
					  shade: 0.8,
					  area: ['500px', '80%'],
					  content: me.timeset1url 
					});	
				}); 
				this.jietimesetobj.click(function(){
					var title ='节次时间设置';
					layer.open({
					  type: 2,
					  title: title,
					  shadeClose: true,
					  shade: 0.8,
					  area: ['500px', '80%'],
					  content: me.timeset2url  
					});
				});
				this.kcbreferobj.click(function(){
					$(".kcb_params_set_div").remove();
					$(".kcb_other_params_set_div").remove();
					me.init();
				});
			}
			$(".kcbmovertd").mouseover(function(){
				this.style.cursor = 'pointer';
			});
		}
		this.loadparam=function(){
			$.ajax({
				type:'POST',
				async:false,
				url:this.paramsurl,
				dataType:"json",
				success: function(da){
					if(me.BOT=='r'){
						//$("#"+me.kbtitle+"").val(da.title);//kbtitle_{rand}
						me.commjieobj.val(da.str);//commjie_{rand}
						me.commjienameobj.val(da.str2);//commjiename_{rand}					
						/*$+" option").each(function(){//select[name='workday'] option
							if(this.value==da.workday)this.selected=true;
						});*/
						me.workdayobj.children("option").each(function(){
							if(this.value==da.workday)this.selected=true;
						});
						me.zdobj.children("option").each(function(){//zdjie_{rand} option
							if(this.value==da.zdjie)this.selected=true;
						});
						me.swobj.children("option").each(function(){//swjie_{rand} option
							if(this.value==da.swjie)this.selected=true;
						});
						me.zwobj.children("option").each(function(){//zwjie_{rand} option
							if(this.value==da.zwjie)this.selected=true;
						});
						me.xwobj.children("option").each(function(){//xwjie_{rand} option
							if(this.value==da.xwjie)this.selected=true;
						});
						me.wxobj.children("option").each(function(){//wxjie_{rand} option
							if(this.value==da.wxjie)this.selected=true;
						});	
					}
						me.commjie = da.str;
						me.commjiename = da.str2;
						me.workday = da.workday;
						me.zdjie  = da.zdjie;
						me.swjie  = da.swjie;
						me.zwjie  = da.zwjie;
						me.xwjie  = da.xwjie;
						me.wxjie  = da.wxjie;
						me.kcbtime = da.kcbtime;
				}
			});		
		};
		this.workdaylist=function(){
			var i=1,end=me.workend,str='';			
			for(i;i<=end;i++){
				var selected = '';
				if(i==5)selected = 'selected';
				str += "<option value='"+i+"' "+selected+">"+i+"</option>";
			}
			me.workdayobj.html(str);		
		};
		this.jielist=function(obj){
			var str = '<option value=\'0\'>0</option>';
			var i=1;end=me.jend;
			for(i;i<=end;i++){
				str += "<option value='"+i+"'>"+i+"</option>";
			}
			obj.html(str);	
		};
		this.saveparam=function(){
			var workday  = $("select[name='workday']").val();
			var zdjie = me.zdobj.val();
			var swjie = me.swobj.val();
			var zwjie = me.zwobj.val();
			var xwjie = me.xwobj.val();
			var wxjie = me.wxobj.val();
			var arr = {'title':title,'workday':workday,'zdjie':zdjie,'swjie':swjie,'zwjie':zwjie,'xwjie':xwjie,'wxjie':wxjie};
			arr = JSON.stringify(arr);
			$.post(this.paramsurl,{'arr':arr},function(da){
				js.msg(da.msg,da.msgc);
			},'json');
		};
		this.reload=function(){
			me.workdaylist();
			me.jielist(me.zdobj);
			me.jielist(me.swobj);
			me.jielist(me.zwobj);
			me.jielist(me.xwobj);
			me.jielist(me.wxobj);
			me.loadparam();
			this.gettabstr(me.workdayobj.val(),startstr+tabstr);		
		};
		this.gettabstr=function(rows,str){
			if(this.BOT=='r'){
				this.zdjie = me.zdobj.val();
				this.swjie = me.swobj.val();
				this.zwjie = me.zwobj.val();
				this.xwjie = me.xwobj.val();
				this.wxjie = me.wxobj.val();
			}
			var j=1;
			for(j;j<=rows;j++){
				if(rows>7){
					var day = j;
					week = '大周';
				}else{
					var day = js.NumberToChinese(j);
					if(j==7)day='日';
					var week = '星期';		
				}
				str += '<td  style="height:30px;line-height:30px" align="center">'+week+day+'</td>';	
			}
			if(this.BOT!='r'){
				var url ='';
				var data = {};
				if(this.BOT=='w'){
					url = this.loadkcburl;
				}else if(this.BOT =='a'){
					url = this.loadclasskcburl;
					data = {classid:me.classid};
				}else if(this.BOT == 'rc'){
					url = this.loadkcburl;
					data = {'userid':me.userid};
				}
				jQuery.ajax({
					type:'POST',
					dataType:"json",
					async:false,
					url:url,
					data:data,
					success: function(da,status){
						me.kcbda = eval(da);
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
					 alert(XMLHttpRequest.status);
					 alert(XMLHttpRequest.readyState);
					 alert(textStatus);						
					}
				});
			}
			if(me.zdjie>0)str += this._settd(me.zdjie,rows,'早读','zd');
			if(me.swjie>0)str += this._settd(me.swjie,rows,'上午','sw');
			if(me.zwjie>0)str += this._settd(me.zwjie,rows,'中午','zw');
			if(me.xwjie>0)str += this._settd(me.xwjie,rows,'下午','xw');
			if(me.wxjie>0)str += this._settd(me.wxjie,rows,'晚自习','wx');
			str += '</tbody></table>';
			$("#"+me.divid+"").html(str);
			$("#"+me.divid+"").show();
		};
		//设置课表td内容
		this._settd=function(cols,rows,tname,lx){
			var str ='';
			if(this.BOT=='r'){
				var commjie = me.commjieobj.val();
				var commjiename = me.commjienameobj.val();			
			}else{
				var  commjie = me.commjie;
				var  commjiename = me.commjiename;
			}
			var arr = [],arr2 = [];
			if(commjie!='')arr = commjie.split(',');
			if(commjiename!='')arr2 = commjiename.split(',');
			//console.log(me.kcbtime);
			if(lx!='zd'&&cols>0)str = "<tr class='kongbai_"+lx+"'><td colspan='"+(parseInt(rows)+1)+"' style='height:15px;background-color:#eee'></td></tr>";
			for(var i=1;i<=cols;i++){			
				var ts = '';
				for(var p in me.kcbtime){
					var tarr =  me.kcbtime[p];
					if(tarr.timelx==lx+'jie' && tarr.timevalue ==lx+'jie_'+i)ts = ' '+tarr.starttime+'~'+tarr.endtime;
				}
				str += "<tr id='kcb_jie_"+lx+"_"+i+"' class='kcb_jie_"+lx+"'><td>"+tname+"第"+js.NumberToChinese(i)+"节"+ts+"</td>";
				for(var j=1;j<=rows;j++){
					if(me.BOT=='r'){
						str += "<td></td>";
					}else{
						var zystr = '',timestr='',radiostr='';
						var data = me.kcbda;
						var kbz = data[(lx)+'-'+(i)+'-'+(j)];
						var zy = data['zy-'+(lx)+'-'+(i)+'-'+(j)];
						var endtime = data['time-'+(lx)+'-'+(i)+'-'+(j)];
						if(endtime == undefined || endtime == null)endtime = '';
						if(zy==1){zystr='color:red;';timestr='<li style="border-bottom:1px dashed #999999;">('+endtime+')</li>';}
						var kcbid = data['kcbid-'+(lx)+'-'+(i)+'-'+(j)];
						if(kbz == 'undefined' || kbz == '' || kbz == null){
							kbz = '';
						}
						var chuli1='',chuli2='',value2='';
						if(me.BOT=='w'){
							var bjm = data['bjm-'+(lx)+'-'+(i)+'-'+(j)];
							if(bjm == 'undefined' || bjm == '' || bjm == null){
								bjm = '';
							}
							value2 = bjm;
							chuli1 = 'class="upkm_'+rand+'" temp="'+kcbid+'" title="双击修改科目" data-grop-i="'+i+'" data-grop-j="'+j+'" type="'+lx+'"';
							chuli2 = 'class="upbj_'+rand+'" temp="'+kcbid+'"  title="双击修改班级" data-grop-i="'+i+'" data-grop-j="'+j+'" type="'+lx+'"';
						}else if(me.BOT=='a' || me.BOT == 'rc'){
							var teacher = data['teacher-'+(lx)+'-'+(i)+'-'+(j)];
							if(teacher == 'undefined' || teacher == '' || teacher == null){
								teacher = '';
							}
							value2 = teacher;
						}
						if(me.BOT=='rc' && kbz != '')radiostr = '<input type=\'radio\' name=\'mykcb\' onclick=\'getkbz(this)\' value="'+i+'-'+lx+'-'+j+'"/>   ';
						var spanstr = timestr+'<li style="'+zystr+'border-bottom:1px dashed #999999;height:25px;line-height: 25px ;"  '+chuli1+'>'+radiostr+kbz+'</li>';// ondblclick="writeobj.upkcb(this,'+i+','+j+')"
						var spanstr2 = '<li style="font-size:12px;color:#999999;height:25px;line-height: 25px ;" '+chuli2+'>'+value2+'</li>';//ondblclick="writeobj.upbj(this,'+i+','+j+')"
						var sstr = spanstr+spanstr2;
						var ssss ='<td style="" align="center" class="tdtext kcbmovertd"  valign="top"   >'+sstr+'</td>';//onmouseover="writeobj.upstyle(this)"					
						str += ssss;					
					}					
				}
				str += "</tr>";
				if(arr.length>0){
					for(var k=0;k<arr.length;k++){
						var barr = arr[k].split('_');
						var bva1 = barr[0].substr(0,2);	
						var bikey = i;			
						if(bva1==lx && bikey==barr[1] ){					
							str += "<tr><td colspan='"+(parseInt(rows)+1)+"'>"+arr2[k]+"</td></tr>";
						}
					}
				}
			}
			return str;
		};
	this.rlname=function(val){
		if(val=='zd'||val=='zdjie')return '早读';
		else if(val=='sw'||val=='swjie')return '上午';
		else if(val=='zw'||val=='zwjie')return '中午';
		else if(val=='xw'||val=='xwjie')return '下午';
		else if(val=='wx'||val=='wxjie')return '晚自习';		
	};
	this.gettabstr2=function(rows,str){
		var j=1;
		for(j;j<=rows;j++){
			if(rows>7){
				var day = j;
				week = '大周';
			}else{
				var day = js.NumberToChinese(j);
				if(j==7)day='日';
				var week = '星期';		
			}
			str += '<td  style="height:30px;line-height:30px" align="center">'+week+day+'</td>';	
		}
		return str;	
	};
	this.tableview=function(obj){
		this.gettabstr(obj.val(),startstr+tabstr);
	};
	this.tableview2=function(obj,lx){
		var rows = me.workdayobj.val();
		var str =this.gettabstr2(rows,startstr+tabstr);
		if(this.BOT=='r'){
			this.zdjie = me.zdobj.val();
			this.swjie = me.swobj.val();
			this.zwjie = me.zwobj.val();
			this.xwjie = me.xwobj.val();
			this.wxjie = me.wxobj.val();			
		}
		if(lx=='zd'){
			var tname = '早读';
			str += this._settd(obj.val(),rows,tname,lx);
			if(me.swjie>0)str += this._settd(me.swjie,rows,'上午','sw');
			if(me.zwjie>0)str += this._settd(me.zwjie,rows,'中午','zw');
			if(me.xwjie>0)str += this._settd(me.xwjie,rows,'下午','xw');
			if(me.wxjie>0)str += this._settd(me.wxjie,rows,'晚自习','wx');
		}else if(lx=='sw'){
			var tname = '上午';
			if(me.zdjie>0)str += this._settd(me.zdjie,rows,'早读','zd');
			str += this._settd(obj.val(),rows,tname,lx);
			if(me.swjie>0)str += this._settd(me.zwjie,rows,'中午','zw');
			if(me.xwjie>0)str += this._settd(me.xwjie,rows,'下午','xw');
			if(me.wxjie>0)str += this._settd(me.wxjie,rows,'晚自习','wx');
		}else if(lx=='zw'){
			var tname = '中午';
			if(me.zdjie>0)str += this._settd(me.zdjie,rows,'早读','zd');
			if(me.swjie>0)str += this._settd(me.swjie,rows,'上午','sw');
			str += this._settd(obj.val(),rows,tname,lx);
			if(me.xwjie>0)str += this._settd(me.xwjie,rows,'下午','xw');
			if(me.wxjie>0)str += this._settd(me.wxjie,rows,'晚自习','wx');
		}else if(lx=='xw'){
			var tname = '下午';
			if(me.zdjie>0)str += this._settd(me.zdjie,rows,'早读','zd');
			if(me.swjie>0)str += this._settd(me.swjie,rows,'上午','sw');
			if(me.zwjie>0)str += this._settd(me.zwjie,rows,'中午','zw');
			str += this._settd(obj.val(),rows,tname,lx);
			if(me.wxjie>0)str += this._settd(me.wxjie,rows,'晚自习','wx');	
		}else if(lx=='wx'){
			var tname = '晚自习';	
			if(me.zdjie>0)str += this._settd(me.zdjie,rows,'早读','zd');
			if(me.swjie>0)str += this._settd(me.swjie,rows,'上午','sw');
			if(me.zwjie>0)str += this._settd(me.zwjie,rows,'中午','zw');
			if(me.xwjie>0)str += this._settd(me.xwjie,rows,'下午','xw');	
			str += this._settd(obj.val(),rows,tname,lx);
		}
		str+='</tbody></table>';
		$("#"+me.divid+"").html(str);
		$("#"+me.divid+"").show();		
	};
	//修改课表值
	this.xgkc = function(kcbid,jie2,week2,obj,key,type2){
			var xgvalue = parseInt($(obj).val());
			var subname = $(obj).find("option:selected").text();
			var data = {'id':kcbid,'value':xgvalue,'jie':jie2,'week':week2,'type':type2,'key':key};
			console.log(data);
			//return;
			$.ajax({
				type:'post',
				url:me.xgkcurl,
				data:data,
				success:function(msg){
					console.log(msg);
					if(msg == 'no'){
						js.msg('msg','新增出错了');me.gettabstr(me.workday,startstr+tabstr);me.events();return;
					}else if(msg == 'error'){
						js.msg('msg','修改出错了');me.gettabstr(me.workday,startstr+tabstr);me.events();return;
					}else if(msg == 'cf1'){
							js.msg('msg','不能重复添加');me.gettabstr(me.workday,startstr+tabstr);me.events();return;
					}else if(msg == 'cf2'){
							js.msg('msg','该班这节课已经被其它老师设置，您不能设置了');me.gettabstr(me.workday,startstr+tabstr);me.events();return;
					}else{
						me.gettabstr(me.workday,startstr+tabstr);me.events();
					}
				}
			});	
	};
}
	$.kcbview	  = function(options){
		var cls = new funclass(options,false);
		cls.init();
		return cls;
	}
	$.fn.kcbview	  = function(options){
		var cls = new funclass(options, $(this));
		cls.init();
		return cls;
	}	
})(jQuery);     
 