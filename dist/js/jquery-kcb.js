!function($){function get(t){return document.getElementById(t)}function funclass(opts,obj){opts||(opts={});var me=this,rand=js.getrand(),formdiv='<div  style="padding:10px;" class="kcb_params_set_div"><form><table cellspacing="0" width="80%" border="0" cellpadding="0"><tr><td  colspan="14"><div class="inputtitle">课表属性:(设置每周上课天数，每天上课节数)</div></td></tr><tr><td class="tdinput" colspan="14" style="display:none;">课表方案名称：<input id="kbtitle_'+rand+'" class="form-control" style="width:200px;"></td></tr>';formdiv+=' <tr><td class="tdinput">工作日：<select name="workday" class="form-control" style="width:100px"  id="wordkday_'+rand+'"></select></td>',formdiv+='<td class="tdinput">早读：<select id="zdjie_'+rand+'" class="form-control" style="width:100px;" ></select> </td>',formdiv+=' <td class="tdinput">上午：<select id="swjie_'+rand+'" class="form-control" style="width:100px;" ></select></td>',formdiv+='<td class="tdinput">中午：<select id="zwjie_'+rand+'" class="form-control" style="width:100px;" /></select> </td>',formdiv+='<td class="tdinput">下午：<select id="xwjie_'+rand+'" class="form-control" style="width:100px;" /></select></td>',formdiv+='<td class="tdinput">晚自习：<select id="wxjie_'+rand+'" class="form-control" style="width:100px;" /></select></td> </tr>',formdiv+='<tr><td colspan="14"><div class="inputtitle" style="padding:10px 0;"><button type="button" class="btn btn-primary" id="save_kcb_params_'+rand+'" style="width:100px"><i class="icon-save" ></i>&nbsp;保存信息</button>',formdiv+='&nbsp;<button type="reset" class="btn btn-danger" style="width:100px">重置</button></div></td></tr> </table></form></div>',formdiv+='<div class="kcb_other_params_set_div"><table class="stable3"width="100%"><thead><tr><th style="text-align:left"colspan="2"><div class="inputtitle"style="padding:10px 0;">课表展示:&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;"class="btn btn-success"id="comm_jie_set_'+rand+'">公告时段设置</a>&nbsp;|&nbsp;&nbsp;<a href="javascript:;"class="btn btn-info"id="jie_time_set_'+rand+'">节次时间设置</a>&nbsp;|&nbsp;&nbsp;<a href="javascript:;"class="btn btn-default btn-kcb_refer" id="kcb_refer_'+rand+'">刷新课程表</a><input type="hidden"id="commjie_'+rand+'"value=""/><input type="hidden"id="commjiename_'+rand+'"value=""/></div></th></tr></thead></table></div>';var startstr='<link href="webmain/css/kcb.css" rel="stylesheet" type="text/css"/><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>',tabstr='<tr style="background:#EBF7D9"><td  style="background:#EBF7D9;border-left:none;height:30px;line-height:30px" align="center">时间/星期</td>';this.saveurl=js.getajaxurl("SaveKbParams","pk","main"),this.paramsurl=js.getajaxurl("getkbparam","pk","main"),this.xgkcurl=js.getajaxurl("xgkc","userinfo","main"),this.mykcburl=js.getajaxurl("mykcb","userinfo","main"),this.myClassurl=js.getajaxurl("myClass","userinfo","main"),this.loadkcburl=js.getajaxurl("loadkcb","userinfo","main"),this.loadclasskcburl=js.getajaxurl("loadclasskcb","classmanage","system"),this.timeset1url="index.php?a=timeset&m=pk&d=main&ajaxurl=true&rnd="+Math.random()+"&act=comm",this.timeset2url="index.php?a=timeset&m=pk&d=main&ajaxurl=true&rnd="+Math.random()+"&act=jie",this.kcbselect="kcbselect",this.cselect="cselect",this.BOT="r",this.workend=30,this.jend=6,this.zdobj={},this.workdayobj={},this.swobj={},this.zwobj={},this.xwobj={},this.wxobj={},this.commjieobj={},this.commjienameobj={},this.savebtnobj={},this.commjiesetobj={},this.jietimesetobj={},this.kcbreferobj={},this.workday=0,this.zdjie=0,this.swjie=0,this.zwjie=0,this.xwjie=0,this.wxjie=0,this.kcbda="",this.classid=0,this.divid="",this.kcbtime={},this.userid=0,this.init=function(){for(var t in opts)this[t]=opts[t];"w"==this.BOT?($("#"+me.divid).after('<div><!--科目选择--><select  id="kcbselect" style="display:none"></select><!--班级选择--><select id="cselect" style="display:none"></select></div>'),$.post(this.mykcburl,function(t){"no"!=t&&$("#"+me.kcbselect).html(t)}),$.post(this.myClassurl,function(t){t&&$("#"+me.cselect).html(t)}),this.loadparam(),this.gettabstr(this.workday,startstr+tabstr),this.events()):"r"==this.BOT?($("#"+me.divid).before(formdiv),this.workdayobj=$("#wordkday_"+rand),this.zdobj=$("#zdjie_"+rand),this.swobj=$("#swjie_"+rand),this.zwobj=$("#zwjie_"+rand),this.xwobj=$("#xwjie_"+rand),this.wxobj=$("#wxjie_"+rand),this.commjieobj=$("#commjie_"+rand),this.commjienameobj=$("#commjiename_"+rand),this.savebtnobj=$("#save_kcb_params_"+rand),this.commjiesetobj=$("#comm_jie_set_"+rand),this.jietimesetobj=$("#jie_time_set_"+rand),this.kcbreferobj=$("#kcb_refer_"+rand),this.workdaylist(),me.jielist(this.zdobj),me.jielist(this.swobj),me.jielist(this.zwobj),me.jielist(this.xwobj),me.jielist(this.wxobj),me.loadparam(),this.gettabstr(this.workdayobj.val(),startstr+tabstr),this.events()):"a"!=this.BOT&&"rc"!=this.BOT||(this.loadparam(),this.gettabstr(this.workday,startstr+tabstr))},this.events=function(){"w"==me.BOT?($(".upkm_"+rand).dblclick(function(){var t=parseInt($(this).attr("temp")),e=parseInt($(this).attr("data-grop-i")),s=parseInt($(this).attr("data-grop-j")),i=$(this).attr("type");isNaN(t)&&(t=0),$(this).text("");var a="subjectid",r="<select class='form_select select_subject_"+rand+"' name='km'  style='width:5em;'>"+$("#"+me.kcbselect).html()+"</select>";$(this).html(r),$(".select_subject_"+rand).change(function(){me.xgkc(t,e,s,this,a,i)})}),$(".upbj_"+rand).dblclick(function(){var t=parseInt($(this).attr("temp")),e=parseInt($(this).attr("data-grop-i")),s=parseInt($(this).attr("data-grop-j")),i=$(this).attr("type");isNaN(t)&&(t=0),$(this).text("");var a="classid",r="<select  class='form_select select_classid_"+rand+"' name='bj'  style='width:5em;'>"+$("#cselect").html()+"</select>";$(this).html(r),$(".select_classid_"+rand).change(function(){me.xgkc(t,e,s,this,a,i)})})):"r"==me.BOT&&(this.savebtnobj.click(function(){me.saveparam()}),this.workdayobj.change(function(){me.tableview(me.workdayobj)}),this.zdobj.change(function(){me.tableview2(me.zdobj,"zd")}),this.swobj.change(function(){me.tableview2(me.swobj,"sw")}),this.zwobj.change(function(){me.tableview2(me.zwobj,"zw")}),this.xwobj.change(function(){me.tableview2(me.xwobj,"xw")}),this.wxobj.change(function(){me.tableview2(me.wxobj,"wx")}),this.commjiesetobj.click(function(){var t="公共时段设置";layer.open({type:2,title:t,shadeClose:!0,shade:.8,area:["500px","80%"],content:me.timeset1url})}),this.jietimesetobj.click(function(){var t="节次时间设置";layer.open({type:2,title:t,shadeClose:!0,shade:.8,area:["500px","80%"],content:me.timeset2url})}),this.kcbreferobj.click(function(){$(".kcb_params_set_div").remove(),$(".kcb_other_params_set_div").remove(),me.init()})),$(".kcbmovertd").mouseover(function(){this.style.cursor="pointer"})},this.loadparam=function(){$.ajax({type:"POST",async:!1,url:this.paramsurl,dataType:"json",success:function(t){"r"==me.BOT&&(me.commjieobj.val(t.str),me.commjienameobj.val(t.str2),me.workdayobj.children("option").each(function(){this.value==t.workday&&(this.selected=!0)}),me.zdobj.children("option").each(function(){this.value==t.zdjie&&(this.selected=!0)}),me.swobj.children("option").each(function(){this.value==t.swjie&&(this.selected=!0)}),me.zwobj.children("option").each(function(){this.value==t.zwjie&&(this.selected=!0)}),me.xwobj.children("option").each(function(){this.value==t.xwjie&&(this.selected=!0)}),me.wxobj.children("option").each(function(){this.value==t.wxjie&&(this.selected=!0)})),me.commjie=t.str,me.commjiename=t.str2,me.workday=t.workday,me.zdjie=t.zdjie,me.swjie=t.swjie,me.zwjie=t.zwjie,me.xwjie=t.xwjie,me.wxjie=t.wxjie,me.kcbtime=t.kcbtime}})},this.workdaylist=function(){var t=1,e=me.workend,s="";for(t;t<=e;t++){var i="";5==t&&(i="selected"),s+="<option value='"+t+"' "+i+">"+t+"</option>"}me.workdayobj.html(s)},this.jielist=function(t){var e="<option value='0'>0</option>",s=1;for(end=me.jend,s;s<=end;s++)e+="<option value='"+s+"'>"+s+"</option>";t.html(e)},this.saveparam=function(){var t=$("select[name='workday']").val(),e=me.zdobj.val(),s=me.swobj.val(),i=me.zwobj.val(),a=me.xwobj.val(),r=me.wxobj.val(),d={title:title,workday:t,zdjie:e,swjie:s,zwjie:i,xwjie:a,wxjie:r};d=JSON.stringify(d),$.post(this.paramsurl,{arr:d},function(t){js.msg(t.msg,t.msgc)},"json")},this.reload=function(){me.workdaylist(),me.jielist(me.zdobj),me.jielist(me.swobj),me.jielist(me.zwobj),me.jielist(me.xwobj),me.jielist(me.wxobj),me.loadparam(),this.gettabstr(me.workdayobj.val(),startstr+tabstr)},this.gettabstr=function(rows,str){"r"==this.BOT&&(this.zdjie=me.zdobj.val(),this.swjie=me.swobj.val(),this.zwjie=me.zwobj.val(),this.xwjie=me.xwobj.val(),this.wxjie=me.wxobj.val());var j=1;for(j;j<=rows;j++){if(rows>7){var day=j;week="大周"}else{var day=js.NumberToChinese(j);7==j&&(day="日");var week="星期"}str+='<td  style="height:30px;line-height:30px" align="center">'+week+day+"</td>"}if("r"!=this.BOT){var url="",data={};"w"==this.BOT?url=this.loadkcburl:"a"==this.BOT?(url=this.loadclasskcburl,data={classid:me.classid}):"rc"==this.BOT&&(url=this.loadkcburl,data={userid:me.userid}),jQuery.ajax({type:"POST",dataType:"json",async:!1,url:url,data:data,success:function(da,status){me.kcbda=eval(da)},error:function(t,e,s){alert(t.status),alert(t.readyState),alert(e)}})}me.zdjie>0&&(str+=this._settd(me.zdjie,rows,"早读","zd")),me.swjie>0&&(str+=this._settd(me.swjie,rows,"上午","sw")),me.zwjie>0&&(str+=this._settd(me.zwjie,rows,"中午","zw")),me.xwjie>0&&(str+=this._settd(me.xwjie,rows,"下午","xw")),me.wxjie>0&&(str+=this._settd(me.wxjie,rows,"晚自习","wx")),str+="</tbody></table>",$("#"+me.divid).html(str),$("#"+me.divid).show()},this._settd=function(t,e,s,i){var a="";if("r"==this.BOT)var r=me.commjieobj.val(),d=me.commjienameobj.val();else var r=me.commjie,d=me.commjiename;var o=[],n=[];""!=r&&(o=r.split(",")),""!=d&&(n=d.split(",")),"zd"!=i&&t>0&&(a="<tr class='kongbai_"+i+"'><td colspan='"+(parseInt(e)+1)+"' style='height:15px;background-color:#eee'></td></tr>");for(var l=1;l<=t;l++){var m="";for(var c in me.kcbtime){var h=me.kcbtime[c];h.timelx==i+"jie"&&h.timevalue==i+"jie_"+l&&(m=" "+h.starttime+"~"+h.endtime)}a+="<tr id='kcb_jie_"+i+"_"+l+"' class='kcb_jie_"+i+"'><td>"+s+"第"+js.NumberToChinese(l)+"节"+m+"</td>";for(var j=1;j<=e;j++)if("r"==me.BOT)a+="<td></td>";else{var b="",w="",p="",v=me.kcbda,u=v[i+"-"+l+"-"+j],x=v["zy-"+i+"-"+l+"-"+j],f=v["time-"+i+"-"+l+"-"+j];void 0!=f&&null!=f||(f=""),1==x&&(b="color:red;",w='<li style="border-bottom:1px dashed #999999;">('+f+")</li>");var k=v["kcbid-"+i+"-"+l+"-"+j];"undefined"!=u&&""!=u&&null!=u||(u="");var _="",y="",g="";if("w"==me.BOT){var z=v["bjm-"+i+"-"+l+"-"+j];"undefined"!=z&&""!=z&&null!=z||(z=""),g=z,_='class="upkm_'+rand+'" temp="'+k+'" title="双击修改科目" data-grop-i="'+l+'" data-grop-j="'+j+'" type="'+i+'"',y='class="upbj_'+rand+'" temp="'+k+'"  title="双击修改班级" data-grop-i="'+l+'" data-grop-j="'+j+'" type="'+i+'"'}else if("a"==me.BOT||"rc"==me.BOT){var T=v["teacher-"+i+"-"+l+"-"+j];"undefined"!=T&&""!=T&&null!=T||(T=""),g=T}"rc"==me.BOT&&""!=u&&(p="<input type='radio' name='mykcb' onclick='getkbz(this)' value=\""+l+"-"+i+"-"+j+'"/>   ');var B=w+'<li style="'+b+'border-bottom:1px dashed #999999;height:25px;line-height: 25px ;"  '+_+">"+p+u+"</li>",O='<li style="font-size:12px;color:#999999;height:25px;line-height: 25px ;" '+y+">"+g+"</li>",I=B+O,C='<td style="" align="center" class="tdtext kcbmovertd"  valign="top"   >'+I+"</td>";a+=C}if(a+="</tr>",o.length>0)for(var N=0;N<o.length;N++){var S=o[N].split("_"),E=S[0].substr(0,2),P=l;E==i&&P==S[1]&&(a+="<tr><td colspan='"+(parseInt(e)+1)+"'>"+n[N]+"</td></tr>")}}return a},this.rlname=function(t){return"zd"==t||"zdjie"==t?"早读":"sw"==t||"swjie"==t?"上午":"zw"==t||"zwjie"==t?"中午":"xw"==t||"xwjie"==t?"下午":"wx"==t||"wxjie"==t?"晚自习":void 0},this.gettabstr2=function(t,e){var s=1;for(s;s<=t;s++){if(t>7){var i=s;a="大周"}else{var i=js.NumberToChinese(s);7==s&&(i="日");var a="星期"}e+='<td  style="height:30px;line-height:30px" align="center">'+a+i+"</td>"}return e},this.tableview=function(t){this.gettabstr(t.val(),startstr+tabstr)},this.tableview2=function(t,e){var s=me.workdayobj.val(),i=this.gettabstr2(s,startstr+tabstr);if("r"==this.BOT&&(this.zdjie=me.zdobj.val(),this.swjie=me.swobj.val(),this.zwjie=me.zwobj.val(),this.xwjie=me.xwobj.val(),this.wxjie=me.wxobj.val()),"zd"==e){var a="早读";i+=this._settd(t.val(),s,a,e),me.swjie>0&&(i+=this._settd(me.swjie,s,"上午","sw")),me.zwjie>0&&(i+=this._settd(me.zwjie,s,"中午","zw")),me.xwjie>0&&(i+=this._settd(me.xwjie,s,"下午","xw")),me.wxjie>0&&(i+=this._settd(me.wxjie,s,"晚自习","wx"))}else if("sw"==e){var a="上午";me.zdjie>0&&(i+=this._settd(me.zdjie,s,"早读","zd")),i+=this._settd(t.val(),s,a,e),me.swjie>0&&(i+=this._settd(me.zwjie,s,"中午","zw")),me.xwjie>0&&(i+=this._settd(me.xwjie,s,"下午","xw")),me.wxjie>0&&(i+=this._settd(me.wxjie,s,"晚自习","wx"))}else if("zw"==e){var a="中午";me.zdjie>0&&(i+=this._settd(me.zdjie,s,"早读","zd")),me.swjie>0&&(i+=this._settd(me.swjie,s,"上午","sw")),i+=this._settd(t.val(),s,a,e),me.xwjie>0&&(i+=this._settd(me.xwjie,s,"下午","xw")),me.wxjie>0&&(i+=this._settd(me.wxjie,s,"晚自习","wx"))}else if("xw"==e){var a="下午";me.zdjie>0&&(i+=this._settd(me.zdjie,s,"早读","zd")),me.swjie>0&&(i+=this._settd(me.swjie,s,"上午","sw")),me.zwjie>0&&(i+=this._settd(me.zwjie,s,"中午","zw")),i+=this._settd(t.val(),s,a,e),me.wxjie>0&&(i+=this._settd(me.wxjie,s,"晚自习","wx"))}else if("wx"==e){var a="晚自习";me.zdjie>0&&(i+=this._settd(me.zdjie,s,"早读","zd")),me.swjie>0&&(i+=this._settd(me.swjie,s,"上午","sw")),me.zwjie>0&&(i+=this._settd(me.zwjie,s,"中午","zw")),me.xwjie>0&&(i+=this._settd(me.xwjie,s,"下午","xw")),i+=this._settd(t.val(),s,a,e)}i+="</tbody></table>",$("#"+me.divid).html(i),$("#"+me.divid).show()},this.xgkc=function(t,e,s,i,a,r){var d=parseInt($(i).val()),o=($(i).find("option:selected").text(),{id:t,value:d,jie:e,week:s,type:r,key:a});console.log(o),$.ajax({type:"post",url:me.xgkcurl,data:o,success:function(t){return console.log(t),"no"==t?(js.msg("msg","新增出错了"),me.gettabstr(me.workday,startstr+tabstr),void me.events()):"error"==t?(js.msg("msg","修改出错了"),me.gettabstr(me.workday,startstr+tabstr),void me.events()):"cf1"==t?(js.msg("msg","不能重复添加"),me.gettabstr(me.workday,startstr+tabstr),void me.events()):"cf2"==t?(js.msg("msg","该班这节课已经被其它老师设置，您不能设置了"),me.gettabstr(me.workday,startstr+tabstr),void me.events()):(me.gettabstr(me.workday,startstr+tabstr),void me.events())}})}}$.kcbview=function(t){var e=new funclass(t,(!1));return e.init(),e},$.fn.kcbview=function(t){var e=new funclass(t,$(this));return e.init(),e}}(jQuery);