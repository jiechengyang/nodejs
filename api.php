<?php

class api extends control {

	

	private $wxmemberModel,$wxmsgModel,$gameorderModel,$qiangzModel,$gameorderlistModel,$optionModel,$timeoutModel,$chongzModel;



	/**

	 * 判断用户是否登录

	 */

	public function __construct() {

	     $this->wxmemberModel = model('wxmember');

       $this->wxmsgModel = model('wxmsg');

       $this->gameorderModel = model('gameorder');

       $this->qiangzModel = model('qiangz');

       $this->optionModel = model('option');

       $this->gameorderlistModel = model('gameorderlist');

       $this->timeoutModel = model('timeout');

       $this->chongzModel=model('chongz');

	}

    function getdata(){

		global $_G;

		$abd=file_get_contents("php://input");

		writefiles('111.txt',$abd);

		exit('work!');

	}

	public function index(){

		global $_G;

		if(!empty($_POST)){

            $str = '';

            $cururl = curPageURL();

            //echo '{"rs":1,"tip":"[结束][img]'.$cururl.'/upfile/md.jpg[/img]","end":0}';

            $pstr = '';

            $_POST['realname_all'] =unicode2utf8($_POST['realname_all']);

            $_POST['nickname_all'] =unicode2utf8($_POST['nickname_all']);

            $a3['wxuin']=$s2['wxuin']=$s1['wxuin']=trim($_POST['wxuin']);

            $a4['gid']=$a3['gid']=$s2['gid'] = $s1['gid']=trim($_POST['gid']);

            $s1['gname']=unicode2utf8(trim($_POST['gname']));

            $a4['wxuid']=$a3['wxuid']=$s2['wxuid']=$s1['wxuid']=trim($_POST['as']);

            $s2['nickname']=$s1['nickname'] =unicode2utf8(trim($_POST['nickname']));

            $s2['nickname_all'] = $_POST['nickname'];

            $relname = str_replace("\"","",$_POST['realname']);

            $relname = str_replace("?","",$relname);

            $relname = str_replace("\"","",$relname);

            $relname = str_replace("&amp;","",$relname);

            $relname = unicode2utf8($relname);

            $relname = stripslashes($relname);

            SUITable('everyday','gid',$s1['gid']);//每次进来会记录当前允许的群

            $s2['relname']=$s1['realname'] = $relname;

            $a4['name'] = $a3['name']= $relname;

            $s1['nickname'] = str_replace("\\",'',$s1['nickname']);

            $a5['zje']=$a4['xzje']=$a3['je'] = $s2['content']=unicode2utf8(trim($_POST['content']));

            $s2['content'] = str_replace("\\",'',$s2['content']); 

            $s1['atmod'] = trim($_POST['atmod']);

            $a4['addtime']=$a3['addtime']=$s2['addtime']=$s1['addtime'] = date('Y-m-d H:i:s');

            $a4['optdt'] = date('Y-m-d');

            $s2['msgid'] = trim($_POST['msgid']);

            $s1['robotnickname'] = str_replace("\"","",$_POST['robotnickname']);

            $s1['robotnickname'] = str_replace("?","",$s1['robotnickname']);

            $s1['robotnickname'] = str_replace("&amp;","&",$s1['robotnickname']);

            $s1['robotnickname'] = unicode2utf8(trim($s1['robotnickname']));
            $s1['gname'] = stripslashes($s1['gname']);

            $s1['robotnickname'] = stripslashes($s1['robotnickname']);

            $s2['nickname'] = stripslashes($s2['nickname']);

            $kpdt = SUITable('config','kpdt');//开盘时间

            $fpdt = SUITable('config','fpdt');//封盘时间

            $kdt = $kpdt;

            $edt = $fpdt;

            $pattern = "/[a-zA-z]+:\/\/emoji.qpic.cn[^\s]*/";
            if (strpos($s2['content'],'<msg>') !== false) {
                    preg_match($pattern,$s2['content'],$matches);
                    $imgsrc = $matches[0];
                    $s2['imgkey'] = md5($imgsrc);                
            } else {
                    $s2['imgkey'] = md5($s2['content']);
            }

            $gf = SUITable2('config','gf','',2);
            $keyarr = explode('|',KEYARR);
            $jqr = SUITable('qxpz','jqr');
            $fbs = SUITable('qxpz','fbs');
            $s2['memberlist']=$_POST['memberlist'];
            $psql = "SELECT pname FROM `jc_public` WHERE `ptype`='imgkey' AND `pvalue`='".$s2['imgkey']."'";
            $pkey = db::get_row($psql);
            $pa = array('a2','a3','a4','a5','a6','a7','a8','a9');
            if($jqr==$s1['wxuid']&&(!in_array($pkey['pname'],$pa))){//接受群成员&&$s2['content']=='b1'

                echo '{"rs":10,"tip":"","end":0}';                 

                $msgrows = $this->wxmsgModel->get(array('memberlist'),"content='b1' and memberlist !='' and gid='".$s1['gid']."' ORDER BY id DESC",0,1000); //and memberlist is not null

                $memberlist = '';

                $memberlist = $s2['memberlist'];

                $wxuserarrs = getwxusers($memberlist);              

                $mywxusers = $this->wxmemberModel->get(array('wxuid,id')," gid='".$s1['gid']."' and wxuid!='system'",0,1000);

                $this->wxmemberModel->mod(array('status'=>0),"gid='".$s1['gid']."'");

                if($mywxusers['count']){

                    foreach($mywxusers['data'] as $mwv){

                        $f2 = $this->isexistmem($mwv['wxuid'],$wxuserarrs);

                        if(!array_key_exists($mwv['wxuid'],$wxuserarrs)){

                            $this->wxmemberModel->mod(array('status'=>1),"id='".$mwv['id']."'");

                        }

                    }

                }

                if(count($wxuserarrs)){

                    foreach($wxuserarrs as $wk=>$wv){

                       $ba  =  $this->wxmemberModel->get(array('id'),"  `wxuid`='".$wk."' and `gid`='".$s1['gid']."'");

                       $sb1['nickname'] = stripslashes($wv);

                       $sb1['wxuid'] = $wk;

                       $sb1['addtime'] = $s1['addtime'];

                       $sb1['atmod'] = 1;

                       $sb1['wxuin'] = $s1['wxuin'];

                       $sb1['gid'] = $s1['gid'];

                       $sb1['robotnickname']=$s1['robotnickname'];

                       $sb1['gname'] = $s1['gname'];

                       $sb1['status'] = 0;

                       if(!$ba){$balid=$this->wxmemberModel->add($sb1);}

                       else $this->wxmemberModel->mod($sb1,"id='".$ba['id']."'");

                       

                    }                     

                }          

            }

            $wxmsgid = $this->wxmsgModel->add($s2); 

            $rs = $this->wxmemberModel->get(array('count(*) as count')," `wxuid`='".$s1['wxuid']."' and `gid`='".$s1['gid']."'");

            $s1['nickname'] = $s2['relname'];

            if ($s1['wxuid']!='system') {

                if(!$rs['count'])$this->wxmemberModel->add($s1); 

                else $this->wxmemberModel->mod(array('status'=>0),"wxuid='".$s1['wxuid']."' and `gid`='".$s1['gid']."'");

            }        

            if ($jqr == $s2['wxuid']) {

                $sql = "SELECT pname FROM `jc_public` WHERE `ptype`='imgkey' AND `pvalue`='".$s2['imgkey']."'";//-".$jqr."

                $key = db::get_row($sql);

                $chexiao = $this->ischeh($jqr,$s1['gid'],$gf);//撤销

                //writefiles('../chexiao.txt',$chexiao);

                if($chexiao==1){//如果开始抢庄撤销

                   SUITable2('config','gf',-1,1);
        				   $sql = "update jc_qiangz set isdel=0";
        				   db::query($sql);
                   $sql  = "select id,zjid from jc_gameorder order by id desc limit 1";
                   $grs = db::get_row($sql);
                   if(!empty($kdt))$where .= " and addtime >='".$kdt."'";
                   if(!empty($edt))$where .= " and addtime <='".$edt."'";

                   $sql2 = "select count(*) as count from jc_gameorder where 1 $where";

                   $allrs = db::get_row($sql2);

                   if($allrs['count']==0){

                     SUITable2('config','ZJID',-1,1); 

                   }else{

                     SUITable2('config','ZJID',-1,1); 

                   }                   

                   SUITable2('config','JuID',-1,1);//

                   $nowlun = SUITable2('config','nowlun','',2);

                   $nowlun-=1;

                   SUITable2('config','nowlun',$nowlun,1);

                }elseif($chexiao==2){//如果结束抢庄撤销

                    SUITable2('config','gf',1,1);

                    SUITable2('config','ZJID',-1,1);

                }elseif($chexiao==3){//如果开始下注撤销

                   SUITable2('config','gf',2,1); 

                   $sql  = "select id,num from jc_gameorder order by id desc limit 1";

                   //writefiles('../delsql.log',$sql);

                   $grs = db::get_row($sql);

                   $grs['num']-=1;

                   $sql2 = "select id from jc_gameorder where num='".$grs['num']."' order by id desc limit 1";

                   $ogrs = db::get_row($sql2);

                   SUITable2('config','JuID',$ogrs['id'],1);

                   $sql4 = "delete from jc_gameorderlist where goid='".$grs['id']."'";

                   $sql3 = "delete from jc_gameorder where id='".$grs['id']."'";

                   writefiles('../delsql.log',$sql3);

                   $del['id'] = $grs['id'];

                   $this->gameorderlistModel->del(array('goid'=>$grs['id']));

                   $this->gameorderModel->del($del);

                }elseif($chexiao==4){//如果结束下注撤销

                    SUITable2('config','gf',3,1); 

                    $sql  = "select id,zjid2 from jc_gameorder order by id desc limit 1";

                    $grs = db::get_row($sql);

                    $this->gameorderlistModel->del(array('id'=>$grs['zjid2']));

                    $this->gameorderModel->mod(array('gf'=>3,'zjid'=>0,'zddt'=>''),"id='".$grs['id']."'");

                }elseif($chexiao==5){

                    SUITable2('config','gf',4,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>4),"id='".$grs['id']."'");                   

                }elseif($chexiao==6){

                    SUITable2('config','gf',5,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>5),"id='".$grs['id']."'");                     

                }elseif($chexiao==7){

                    SUITable2('config','gf',6,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>6),"id='".$grs['id']."'");                       

                }elseif($chexiao==8){

                    SUITable2('config','gf',7,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>7),"id='".$grs['id']."'");                       

                }elseif($chexiao==9){

                    SUITable2('config','gf',8,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>8),"id='".$grs['id']."'");                       

                }elseif($chexiao==10){

                    SUITable2('config','gf',9,1);

                   $sql  = "select id from jc_gameorder order by id desc limit 1";

                   $grs = db::get_row($sql); 

                   $this->gameorderModel->mod(array('gf'=>9),"id='".$grs['id']."'");                       

                }

                writefiles('../pname.txt',$key['pname']);

                if($key['pname']=='a1'){//抢庄start

                    SUITable2('config','gf',1,1);
          					$sql = "update jc_qiangz set isdel=1";
          					db::query($sql);
                    $nowlun = SUITable2('config','nowlun','',2);
                    if(empty($nowlun))$nowlun = $this->createlnum(1);

                    $nowlun +=1;

                    SUITable2('config','nowlun',$nowlun,1);

                    SUITable2('config','ZJID',-1,1);

                    SUITable2('config','JuID',-1,1);

                }elseif($key['pname']=='a2'){//抢庄end

                    SUITable2('config','gf',2,1);

                    $zjid = SUITable2('config','ZJID','',2);//当前的庄家ID 

                    $zjname = ShowType($zjid,'name','jc_qiangz');

                    $zj_je = ShowType($zjid,'je','jc_qiangz');

                    echo '{"rs":1,"tip":"[结束]本轮庄家是:'.$zjname.'@'.$zjname.':'.$zj_je.'的包庄","end":0}'; 

                }elseif($key['pname']=='a3'){//下注start

                    SUITable2('config','gf',3,1);

                    $zjid = SUITable2('config','ZJID','',2);//当前的庄家ID               

                    $sn = $this->createsn();

                    $a41['sn'] = $sn;

                    $a41['num'] = $this->createnum(1);

                    $a41['addtime'] = date('Y-m-d H:i:s');

                    $a41['optdt'] = date('Y-m-d');

                    $a41['zddt'] =date('Y-m-d H:i:s');

                    $a41['gf'] = 3;

                    $a41['gid'] = $s1['gid'];

                    if(!empty($zjid))$a41['zjid'] = $zjid;

                    $this->gameorderModel->add($a41);

                    $lastid = db::insert_id();                

                    SUITable2('config','JuID',$lastid,1);

                }elseif($key['pname']=='a4'){//下注end

                    SUITable2('config','gf',4,1);

                    $zjid = SUITable2('config','ZJID','',2);//当前的庄家ID

                    $jid = SUITable2('config','JuID','',2);//当前局

                    $zjrs = $this->qiangzModel->get(array('wxuid,name')," id='".$zjid."'");

                    $zjwxid = showtype2('jc_qiangz','wxuid','id',$zjid);

                    $zjnickname = showtype2('jc_qiangz','name','id',$zjid);

                    $zjarr =array('wxuid'=>$zjrs['wxuid'],'addtime'=>date('Y-m-d H:i:s'),'lx'=>2,'gid'=>$s1['gid'],'goid'=>$jid,'name'=>$zjrs['name'],'optdt'=>date('Y-m-d'));

                    $sql = "SELECT id FROM `jc_gameorderlist` WHERE lx=2 and gid='".$s1['gid']."' and goid='".$jid."' and wxuid='".$zjrs['wxuid']."' ";

                    //writefiles('../sql.log',$sql);

                    $res = db::get_row($sql);

                    if(!$res){

                      $this->gameorderlistModel->add($zjarr);

                      $lid = db::insert_id();  

                    }else{

                        $lid = $res['id'];

                    }

                    $adtime = date('Y-m-d H:i:s');

                    $this->gameorderModel->mod(array('zjid'=>$zjid,'zjid2'=>$lid,'zddt'=>$adtime,'gf'=>4),"id='".$jid."'");

                    $this->start($zjid,$jid);

                    writefiles('../pname2.log',$cururl);

                    echo '{"rs":1,"tip":"[结束][img]'.$cururl.'/upfile/md.jpg[/img]","end":0}';

                }elseif($key['pname']=='a5'){//庄家核对下注人数

                    SUITable2('config','gf',5,1);

                    $jid = SUITable2('config','JuID','',2);//当前局

                    $this->gameorderModel->mod(array('gf'=>5),"id='".$jid."'");

                }elseif($key['pname']=='a6'){//看图下包

                    SUITable2('config','gf',6,1);

                    $jid = SUITable2('config','JuID','',2);//当前局

                    $this->gameorderModel->mod(array('gf'=>6),"id='".$jid."'");                    

                }elseif($key['pname']=='a7'){//未下注别点包

                    SUITable2('config','gf',7,1);

                    $jid = SUITable2('config','JuID','',2);//当前局

                    $this->gameorderModel->mod(array('gf'=>7),"id='".$jid."'"); 

                }elseif($key['pname']=='a8'){//超时算输

                    $jid = SUITable2('config','JuID','',2);//当前局

                    //$sql = "select id from jc_gameorder order by id desc limit 0,1";

                    $this->gameorderModel->mod(array('gf'=>8),"id='".$jid."'"); 

                }elseif($key['pname']=='a9'){//核对分数

                    SUITable2('config','gf',-1,1);

                    $zjid = SUITable2('config','ZJID','',2);//当前的庄家ID

                    $jid = SUITable2('config','JuID','',2);

                    $this->gameorderModel->mod(array('gf'=>9),"id='".$jid."'"); 

                    $rs = $this->gameorderModel->get(array('id,zjid,zjws'),"1 order by id desc");

                    $zjwxid = showtype2('jc_qiangz','wxuid','id',$rs['zjid']);

                    $go_rs = $this->gameorderlistModel->get(array('wshu,dshu,iscs'),"goid='".$rs['id']."' and wxuid='".$zjwxid."'");

                     $jres = ($go_rs['wshu']+$rs['zjws'])%10;

                    $str = '';

                    if($jres==1){

                        $str = '[结束][img]'.$cururl.'/images/p1.gif[/img]';

                    }elseif($jres==2){

                        $str = '[结束][img]'.$cururl.'/images/p2.gif[/img]';

                    }elseif($jres==3){

                        $str = '[结束][img]'.$cururl.'/images/p3.gif[/img]';

                    }elseif($jres==0){

                            $str = '[结束]庄家10点10倍';                      

                    }else{

                            $str = '[结束]庄家'.$jres.'点'.$jres.'倍'; 

                    }

                   // $this->result($zjid,$jid);

                    echo '{"rs":1,"tip":"[结束][img]'.$cururl.'/upfile/rs.jpg[/img]'.$str.'","end":0}';              

                }elseif($key['pname']=='a10'){//开盘

                    SUITable('config','kpdt',date('Y-m-d H:i:s'));

                    $sql = "delete from jc_public where ptype='config' and pname='fpdt'";

                    db::query($sql);

                }elseif($key['pname']=='a11'){//封盘

                    SUITable('config','fpdt',date('Y-m-d H:i:s'));

                    SUITable2('config','gf',-1,1);

                }            

            }

            if($gf==1){

                $a3['je'] = str_replace('<br/>','',$a3['je']);

                if(is_numeric($a3['je'])&&$s2['wxuid']!=$jqr&&$s2['wxuid']!=$fbs){

                    $cr = $this->chongzModel->get(array('ye'),"wxuid='".$s1['wxuid']."' and gid='".$s1['gid']."' order by id desc");

                    $sxed = $cr['ye'];

                        if($sxed<$a3['je']){

                           echo '{"rs":1,"tip":"[结束]对不起,您本次抢庄已经超过您的余额:'.$sxed.',请重新抢庄@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit; 

                        }

                    $nowlun = SUITable2('config','nowlun','',2);

                    $a3['num'] = $nowlun; 
					$a3['isdel'] = 0;

                    if(!empty($kdt))$where.= " and addtime >='".$kdt."'"; 

                    if(!empty($edt))$where.= " and addtime <='".$edt."'";                  

                    //$rows = $this->qiangzModel->get(array('id')," gid='".$a3['gid']."' and `wxuid`='".$a3['wxuid']."' and addtime>='".$kdt."' and addtime<='".$edt."' and num='".$a3['num']."'");

                    $rows = $this->qiangzModel->get(array('id')," gid='".$a3['gid']."' and `wxuid`='".$a3['wxuid']."'  and num='".$a3['num']."' and isdel=0 $where");

                    if($rows!=false){

                        $this->qiangzModel->mod($a3,"id='".$rows['id']."'");

                    }else{

                        $this->qiangzModel->add($a3);

                    }                               

                }else{

                    if($s2['wxuid']!='system'||$s2['wxuid']!=$jqr)echo '{"rs":1,"tip":"[结束]请输入数字@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit; 

                }

            }elseif($gf==2){

                

            }elseif($gf==3){//玩家下注

                $JuID = SUITable2('config','JuID','',2);

                $a4['goid'] = $JuID;

                $zjid = SUITable2('config','ZJID','',2);

                $zjwxuid = ShowType($zjid,'wxuid','jc_qiangz');

                $a4['xzje'] = str_replace('<br/>','',$a4['xzje']);

                $isexistje = $this->chongzModel->get(array('id'),"gid='".$s1['gid']."' and wxuid='".$s1['wxuid']."'");

                if(is_numeric($a4['xzje'])&&($JuID!=-1)&&$s2['wxuid']!=$jqr){

                        if($zjwxuid==$s2['wxuid']){

                             echo '{"rs":1,"tip":"[结束]庄家不能下注@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit; 

                        }

                        if(!$isexistje){

                            echo '{"rs":1,"tip":"[结束]玩家@'.str_replace("\\","",$s1['nickname']).'未充值积分","end":0}';exit; 

                        }

                        $cr = $this->chongzModel->get(array('ye'),"wxuid='".$s1['wxuid']."' and gid='".$s1['gid']."' order by id desc");

                        $sxed = $cr['ye'];

                        $sxed = round($sxed/10);                    

                        $edflag = $this->pdje($JuID,$zjid,$a4['xzje'],$s2['wxuid'],$s1['gid']);

                        if($sxed<$a4['xzje']){

                          if($s2['wxuid']!='system') echo '{"rs":1,"tip":"[结束]对不起,您本次下注金额已经超过您的授信额度,最高下注:'.$sxed.'请重新下注@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit; 

                        }

                        if($edflag['a']==1){

                            if($s2['wxuid']!='system')echo '{"rs":1,"tip":"庄家最大赔付金额:'.$edflag['zjzdpf'].'玩家@'.str_replace("\\","",$s1['nickname']).'最大下注金额为:'.$edflag['str'].'","end":0}';exit; 

                        }elseif($edflag['a']==2){

                             echo '{"rs":1,"tip":"'.$edflag['str'].'@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit;

                        }

                    $rows = $this->gameorderlistModel->get(array('id')," gid='".$a4['gid']."' and `wxuid`='".$a4['wxuid']."'  and goid='".$JuID."'");//and addtime>='".$kdt."' and addtime<='".$edt."'

                    if($rows!=false)$this->gameorderlistModel->mod($a4,"id='".$rows['id']."'");                                   else $this->gameorderlistModel->add($a4); 

                }else{

                    if($s2['wxuid']!='system'||$s2['wxuid']!=$jqr)echo '{"rs":1,"tip":"[结束]请输入数字@'.str_replace("\\","",$s1['nickname']).'","end":0}';exit; 

                }               

            }elseif($gf==4){//结束下注

                //@unlink(WEB.'upfile/md.jpg');

            }elseif($gf==5){//庄家认多少,同时下调玩家的下注金额

                $JuID = SUITable2('config','JuID','',2);

                if(!empty($a5['zje'])){

                    if(is_numeric($a5['zje'])){

                        $zjid = SUITable2('config','ZJID','',2);

                        $zjwxuid = ShowType($zjid,'wxuid','jc_qiangz');

                        if($zjwxuid==$s2['wxuid']){

                            $this->gameorderModel->mod(array('zjmaxje'=>$a5['zje']),"id='".$JuID."'"); 

                            $orderlist = $this->gameorderlistModel->get(array('xzje,id'),"goid='".$JuID."'",0,1000);                            

                           // writefiles('../orderlist.log',$orderlist['count'].'}'.$a5['zje']);

                            if($orderlist['count']){

                                foreach($orderlist['data'] as $ok=>$ov){

                                    if($ov['xzje']>$a5['zje']){

                                        $this->gameorderlistModel->mod(array('xzje'=>$a5['zje']),"id='".$ov['id']."'");

                                    }

                                }

                            }

                        }                    

                        $this->start2($zjid,$JuID);

                        echo '{"rs":1,"tip":"[结束][img]'.$cururl.'/upfile/nmd.jpg[/img]","end":0}';                              

                    }                     

                }                   

            } 

            $fbs = SUITable('qxpz','fbs');

            //if($fbs==$s1['wxuid']){

                if($s1['wxuid']=='system'){

                    SUITable2('config','gf',6,1);

                    //echo '{"rs":1,"tip":"[结束][img]'.$cururl.'/images/msg7.gif[/img]","end":0}'; 

                }                 

            //}            

		}else{

            writefiles('../2.txt',"POST过来的是空数据");

		}

	}

	public function result($zjid,$juid){

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

	    $rs = $this->gameorderModel->get(array('*'),"id='".$juid."'");

        $zjrs=$this->qiangzModel->get(array('name,wxuid'),"id='".$zjid."'");

        $zjwxid = ShowType($zjid,'wxuid','jc_qiangz');

        $sq = "select gid from jc_wxmember order by id desc";

        $lr = db::get_row($sq);

        $zjrone = $this->gameorderlistModel->get(array('*'),"id='".$rs['zjid2']."' and gid='".$rs['gid']."'"); //庄家每局情况wxuid='".$zjwxid."' and lx=2 and goid='".$juid."'

        $prevnum = $rs['num']-1;

        $previd = $this->gameorderModel->get(array('id'),"num='".$prevnum."' $where  order by id desc");

        $zrjf = $this->return2jf($zjwxid,$juid,$rs['gid']);

        $zjrone['prevjf']=$zrjf['pjf'];

        $zjrone['alljf']=$zrjf['ajf'];

        $rows = $this->gameorderlistModel->get(array('*'),"goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."' order by jf desc",0,1000);

        $sql = "SELECT sum(xzje) as je FROM `jc_gameorderlist` WHERE goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."'";

        $jers = db::get_row($sql);//本局投注总额

        //$ljsq = $this->js_ljsq();//累计水钱

        $ljsq = $rs['lsmon'];

        if(intval($zjrone['prevjf'])<0)$fontcolorz1=$red;else $fontcolorz1=$black;

        if(intval($zjrone['alljf'])<0)$fontcolorz2=$red;else $fontcolorz2=$black;

        if(intval($zjrone['jf'])<0)$fontcolorz3=$red;else $fontcolorz3=$black;
        $zlen = mb_strlen($zjrs['name'],'utf-8');
        if($zlen>4)$zjrs['name'] = mb_substr($zjrs['name'],0,4,'utf-8').'...'; 
        $img = imagecreatetruecolor(800, 1600);//图片尺寸

        $white = imagecolorallocate($img, 255, 255, 255);

        $cornflowerblue = imagecolorallocate($img, 100,149,237);//图片背景色

        imagefill($img, 0, 0, $white);  //填充背景色

        $black = imagecolorallocate($img, 0, 0, 0);

        $red = imagecolorallocate($img, 255, 0, 0);

        $yellow = imagecolorallocate($img, 255, 255, 0);//填充黄色		

        $bgcolor1 = imagecolorallocate($img, 163, 163, 115);//填充黄色

        $bgcolor2 = imagecolorallocate($img, 163, 163, 244);//填充黄色

        $bgcolor3 = imagecolorallocate($img, 229, 238, 255);//填充黄色

        $bgcolor4 = imagecolorallocate($img, 153, 153, 153);//填充黄色

    		imagefilledrectangle($img, 0, 30, 1000, 1, $black);//第一黄条

    		imagettftext($img, 18, 0, 50, 24, $white, "2.ttf", "第".$rs['num']."局");

    		imagettftext($img, 18, 0, 500, 24, $white, "2.ttf", "账单日期：".$rs['zddt']."");		

    		imagefilledrectangle($img, 0, 60, 1000, 32, $black);//第2黄条

    		imagettftext($img, 18, 0, 50, 54, $white, "2.ttf", "本局水钱");

    		imagettftext($img, 18, 0, 250, 54, $white, "2.ttf", "累计水钱");

    		imagettftext($img, 18, 0, 450, 54, $white, "2.ttf", "下注人数");

    		imagettftext($img, 18, 0, 650, 54, $red, "2.ttf", "最佳尾数");

    		imagefilledrectangle($img, 0, 90, 800, 62, $white);//第3黄条

    		imagettftext($img, 18, 0, 60, 84, $black, "2.ttf", "");

    		imagettftext($img, 18, 0, 270, 84, $black, "2.ttf", "");

    		imagettftext($img, 18, 0, 470, 84, $black, "2.ttf", $rows['count']);

    		imagettftext($img, 18, 0, 685, 84, $red, "2.ttf", $rs['zjws']);

    		imagefilledrectangle($img, 0, 120, 800, 92, $black);//第4黄条

    		imagettftext($img, 18, 0, 50, 114, $white, "2.ttf", "庄家昵称");

    		imagettftext($img, 18, 0, 180, 114, $white, "2.ttf", "投注金额");

    		imagettftext($img, 18, 0, 300, 114, $white, "2.ttf", "尾数");

    		imagettftext($img, 18, 0, 380, 114, $white, "2.ttf", "点数");

    		imagettftext($img, 18, 0, 470, 114, $white, "2.ttf", "庄家盈亏");

    		imagettftext($img, 18, 0, 580, 114, $white, "2.ttf", "上局积分");

    		imagettftext($img, 18, 0, 700, 114, $white, "2.ttf", "剩余积分");

    		imagefilledrectangle($img, 0, 150, 800, 122, $white);//第5黄条

    		imagettftext($img, 18, 0, 50, 144, $black, "2.ttf", $zjrs['name']);

    		imagettftext($img, 18, 0, 200, 144, $black, "2.ttf", $jers['je']);

    		imagettftext($img, 18, 0, 310, 144, $black, "2.ttf", $zjrone['wshu']);

    		imagettftext($img, 18, 0, 380, 144, $black, "2.ttf", $zjrone['dshu'].'倍');

    		imagettftext($img, 18, 0, 475, 144, $fontcolorz3, "2.ttf", $zjrone['jf']);

    		imagettftext($img, 18, 0, 605, 144, $fontcolorz1, "2.ttf", $zjrone['prevjf']);

    		imagettftext($img, 18, 0, 710, 144, $fontcolorz2, "2.ttf", $zjrone['alljf']);

    		imagefilledrectangle($img, 0, 180, 800, 152, $black);//第6黄条

    		imagettftext($img, 18, 0, 10, 174, $white, "2.ttf", "序号");

    		imagettftext($img, 18, 0, 65, 174, $white, "2.ttf", "玩家昵称");

    		imagettftext($img, 18, 0, 185, 174, $white, "2.ttf", "下注金额");

    		imagettftext($img, 18, 0, 300, 174, $white, "2.ttf", "尾数");

    		imagettftext($img, 18, 0, 375, 174, $white, "2.ttf", "点数");

    		imagettftext($img, 18, 0, 470, 174, $white, "2.ttf", "本局输赢");

    		imagettftext($img, 18, 0, 590, 174, $white, "2.ttf", "上局积分");

    		imagettftext($img, 18, 0, 700, 174, $white, "2.ttf", "剩余积分");

        $i = 1;$y2 = 204;$y3 = 182; $y4=210;

        $wxids = '';

        if($rows['count']){

            foreach($rows['data'] as $rk=>$rv){

                $wxids .= '\''.$rv['wxuid'].'\',';

                $myjfs = $this->return2jf($rv['wxuid'],$rs['id'],$rs['gid']);

                $rv['prevjf'] = $myjfs['pjf'];

                $rv['alljf'] = $myjfs['ajf'];

                if(intval($rv['prevjf'])<0)$fontcolor1=$red;else $fontcolor1=$black;

                if(intval($rv['alljf'])<0)$fontcolor2=$red;else $fontcolor2=$black;

                if(intval($rv['jf'])<0)$fontcolor3=$red;else $fontcolor3=$black;

                $nickname = $rv['name'];

                $len = mb_strlen($nickname,'utf-8');

                if($len>4)$nickname = mb_substr($nickname,0,4,'utf-8').'...'; 

                if($i%2==0){

                   imagefilledrectangle($img, 0, $y4, 800, $y3, $bgcolor3);//第6黄条

                }else{

                    imagefilledrectangle($img, 0, $y4, 800, $y3, $white); 

                }

            		imagettftext($img, 18, 0, 18, $y2, $black, "2.ttf", "".($i++)."");

            		imagettftext($img, 18, 0, 65, $y2, $black, "2.ttf", $nickname);

            		imagettftext($img, 18, 0, 200, $y2, $black, "2.ttf", $rv['xzje']);

            		imagettftext($img, 18, 0, 310, $y2, $black, "2.ttf", $rv['wshu']);

            		imagettftext($img, 18, 0, 380, $y2, $black, "2.ttf", $rv['dshu'].'倍');

            		imagettftext($img, 18, 0, 500, $y2, $fontcolor3, "2.ttf", $rv['jf']);

            		imagettftext($img, 18, 0, 600, $y2, $fontcolor1, "2.ttf", $rv['prevjf']);

            		imagettftext($img, 18, 0, 710, $y2, $fontcolor2, "2.ttf", $rv['alljf']);

            		//imagefilledrectangle($img, 0, 240, 800, $y3, $bgcolor2);//第5黄条 

                $y2+=30;$y3+=30;$y4+=30;               

            }

        }

        $wxids = rtrim($wxids,',');

        if(empty($wxids))$s= '1';else $s = " wxuid not in(".$wxids.")";

        $nomore = SUITable('Pconfig','nomore');

        $nomore = unserialize($nomore);

        $nstr = '';

        foreach($nomore as $nk=>$nv){

            $nstr .= '\''.$nv['wxuid'].'\',';

        }

        $nstr = rtrim($nstr,',');

        if(!empty($nstr))$s .= " and wxuid not in(".$nstr.")";

        $sql = "select gid from jc_wxmember order by id desc";

        $l_rs = db::get_row($sql);

        $s .= " and gid='".$rs['gid']."'";

        $s.= " and wxuid!='".$zjwxid."'";

        $wxuseras = $this->wxmemberModel->get(array('*')," $s order by id desc",0,1000);

        $j = $i;

        $yy2= $y2;

        $yy3 = $y3;

        $yy4 = $y4;

        if($wxuseras['count']){

            foreach($wxuseras['data'] as $wxk=>$wxv){

                $myjfs = $this->return2jf2($wxv['wxuid'],$rs['id'],$rs['gid']);

                $rv['prevjf'] = $myjfs['pjf'];

                $rv['alljf'] = $myjfs['ajf'];

                if(intval($rv['prevjf'])<0)$fontcolor1=$red;else $fontcolor1=$black;

                if(intval($rv['alljf'])<0)$fontcolor2=$red;else $fontcolor2=$black;

                if(intval($rv['jf'])<0)$fontcolor3=$red;else $fontcolor3=$black;

                $nickname = $wxv['nickname'];

                $len = mb_strlen($nickname,'utf-8');

                if($j%2==0){

                   imagefilledrectangle($img, 0, $yy4, 800, $yy3, $bgcolor3);//第6黄条

                }else{

                    imagefilledrectangle($img, 0, $yy4, 800, $yy3, $white); 

                }

                if(empty($rv['prevjf']))$rv['prevjf']=0;

                if(empty($rv['alljf']))$rv['alljf']=0;

                if($len>4)$nickname = mb_substr($nickname,0,4,'utf-8').'...'; 

            		imagettftext($img, 18, 0, 18, $yy2, $black, "2.ttf", "".($j++)."");

            		imagettftext($img, 18, 0, 65, $yy2, $black, "2.ttf", $nickname);

            		imagettftext($img, 18, 0, 200, $yy2, $black, "2.ttf", "");

            		imagettftext($img, 18, 0, 310, $yy2, $black, "2.ttf", "");

            		imagettftext($img, 18, 0, 380, $yy2, $black, "2.ttf", "");

            		imagettftext($img, 18, 0, 500, $yy2, $black, "2.ttf", 0);

            		imagettftext($img, 18, 0, 600, $yy2, $fontcolor1, "2.ttf", $rv['prevjf']);

            		imagettftext($img, 18, 0, 710, $yy2, $fontcolor2, "2.ttf", $rv['alljf']);

                $yy2+=30;$yy3+=30;$yy4+=30;                

            }

        }

          $height = ($rows['count']+$wxuseras['count'])*30;

          imageline($img,55,180,55,180+$height,$bgcolor4);

          imageline($img,175,180,175,180+$height,$bgcolor4);

          imageline($img,280,180,280,180+$height,$bgcolor4);

          imageline($img,360,180,360,180+$height,$bgcolor4);

          imageline($img,440,180,440,180+$height,$bgcolor4);

          imageline($img,580,180,580,180+$height,$bgcolor4);

          imageline($img,690,180,690,180+$height,$bgcolor4);

          imagepng($img,WEB.'upfile/rs.jpg');

          imagedestroy($img);

	}

    private function isexistmem($val,$arr){

        $flag = false;

        foreach($arr as $k=>$v)if($k==$val)$flag= true;

        return $flag;

    }

    private function createsn(){

        $sn = jcguid();

        $rs = $this->gameorderModel->get(array('count(*) as count'),"sn='".$sn."'");

        if(!$rs['count'])return $sn;else $this->createsn();

    }

    private function createnum($num=1){//创建局数

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kpdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        $sql = "SELECT num FROM `jc_gameorder` WHERE  1 $where order by id desc limit 0,1";

        $rs = db::get_row($sql);

        if(!$rs){

          return 1;

        }else{

          return $rs['num']+1;  

        }        

        //if(!$rs)return $num; else{$rs['num']++;return $rs['num'];} 

    }

    private function return2jf2($wxuid,$juid,$gid){

        $row = $this->chongzModel->get(array('ye,je,id'),"wxuid='".$wxuid."'  and gid='".$gid."' order by id desc");

        $pjf = $row['ye'];

        return array('pjf'=>$pjf,'ajf'=>$row['ye']);

    }

    private function createlnum($num=1){//创建轮数

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;
		$gid = SUITable('everyday','gid');//当前群

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        //and addtime between '$kdt' and '$edt' and gid ='".$gid."'

        $sql = "SELECT COUNT(*) as count FROM `jc_qiangz` WHERE num='".$num."'  $where and isdel=0";

        $rs = db::get_row($sql);

        if(!$rs['count'])return $num;else{$num++;$this->createlnum($num);} 

        

    }

    private function pdje($juid,$zjid,$nowje,$now_uid,$gid){

            $alls = $this->gameorderlistModel->get(array('xzje'),'goid='.$juid." and gid='".$gid."'",0,100);//获取当局下注金额

            //当前庄家的剩余积分

            $zjwxuid = ShowType($zjid,'wxuid','jc_qiangz');

            //$kdt = date('Y-m-d').' 00:00:00';

            //$edt = date('Y-m-d').' 23:59:59';

            $kpdt = SUITable('config','kpdt');//开盘时间

            $fpdt = SUITable('config','fpdt');//封盘时间

            if(!empty($kdt))$where .= " and addtime >='".$kpdt."'";

            if(!empty($edt))$where .= " and addtime <='".$edt."'";

            //and addtime between '$kdt' and '$edt'

            $sql = "SELECT sum(jf) as ajfs FROM `jc_gameorderlist` WHERE wxuid='".$zjwxuid."' and lx=2  and gid='".$gid."' $where";

            $zjf = db::get_row($sql);

            $zjf['alljf'] = empty($zjf['ajfs'])?0:$zjf['ajfs'];     

            $one = $this->chongzModel->get(array('ye')," wxuid='".$zjwxuid."' and gid='".$gid."' order by id desc");

            $list = $this->optionModel->get(array('*'),"is_qy=1");

            $data = array();

            $data['pf'] = unserialize($list['pf']);

            $a=array();

            $b = $one['ye']*1;

            $zjzdpf = $b/10;

            foreach ($data['pf'] as $k => $v){$a[$k]=$v['beis'];}

            $wjxz = $this->gameorderlistModel->get(array('sum(xzje) as sje'),"goid='".$juid."' and wxuid!='".$now_uid."' and lx=1 and gid='".$gid."'");

            $pos = array_search(max($a), $a);

            $maxbl = 10;

            $zpf=intval($nowje);

            $min=$b*1;

            $min=round($min/$maxbl)-$wjxz['sje'];

            $max =$b*1.5;

            $max=round($max/$maxbl)-$wjxz['sje'];

            $da=array();

            /*

                && round($zpf)<$max

                elseif (round($zpf)>$max) {//

                    $da['str'] = '请重新推选庄家,已经超过庄家的最大赔付';

                    $da['a'] =2;

                    return $da;

                }

            */

            if (round($zpf)>$min){

                $prev = $min;

                $da['str'] = ceil($prev);

                $da['a'] =1;

                $da['zjzdpf']=round($zjzdpf);

                return $da;

            }else{

                $da['a'] =3;

                $da['zjzdpf']=round($zjzdpf);

                return $da;

            }

    }

	//确定下注金额

	public function start($zjid,$juid){

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        $jqr = SUITable('qxpz','jqr');

        $fbs = SUITable('qxpz','fbs');

        $sq = "select gid from jc_wxmember order by id desc";

        $lr = db::get_row($sq);

	    $rs = $this->gameorderModel->get(array('*'),"id='".$juid."'");

        $zjrs=$this->qiangzModel->get(array('name,wxuid'),"id='".$zjid."'");

        $zjwxid = ShowType($zjid,'wxuid','jc_qiangz');

        $zjrone = $this->gameorderlistModel->get(array('*'),"id='".$rs['zjid2']."' and gid='".$rs['gid']."'"); //庄家每局情况wxuid='".$zjwxid."' and lx=2 and goid='".$juid."'

        $prevnum = $rs['num']-1;

        $previd = $this->gameorderModel->get(array('id'),"num='".$prevnum."' $where order by id desc");

        $rows = $this->gameorderlistModel->get(array('*'),"goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."' order by xzje desc",0,1000);//and wxuid!='".$jqr."' and wxuid!='".$fbs."'

        $sql = "SELECT sum(xzje) as je FROM `jc_gameorderlist` WHERE goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."'";

        //$zjrone['prevjf'] = $zjrone['alljf']-$zjrone['jf'];

        $jers = db::get_row($sql);//本局投注总额

        $zrjf = $this->return2jf($zjwxid,$juid,$rs['gid']);

        $zjrone['prevjf']=$zrjf['pjf'];

        $zjrone['alljf']=$zrjf['ajf'];

        if(intval($zjrone['prevjf'])<0)$fontcolorz1=$red;else $fontcolorz1=$black;

        if(intval($zjrone['alljf'])<0)$fontcolorz2=$red;else $fontcolorz2=$black;

        if(intval($zjrone['jf'])<0)$fontcolorz3=$red;else $fontcolorz3=$black;
		$zlen = mb_strlen($zjrs['name'],'utf-8');
		if($zlen>4)$zjrs['name'] = mb_substr($zjrs['name'],0,4,'utf-8').'...'; 
        $height=1000+$rows['count']*60;

		$img = imagecreatetruecolor(800, $height);//图片尺寸       

        $white = imagecolorallocate($img, 255, 255, 255);

		$cornflowerblue = imagecolorallocate($img, 100,149,237);//图片背景色

		imagefill($img, 0, 0, $white);  //填充背景色

		$black = imagecolorallocate($img, 0, 0, 0);

		$red = imagecolorallocate($img, 255, 0, 0);

		$yellow = imagecolorallocate($img, 255, 255, 0);//填充黄色		

		$bgcolor1 = imagecolorallocate($img, 163, 163, 115);//填充黄色

		$bgcolor2 = imagecolorallocate($img, 163, 163, 244);//填充黄色

        $bgcolor3 = imagecolorallocate($img, 229, 238, 255);//填充黄色

        $bgcolor4 = imagecolorallocate($img, 153, 153, 153);//填充黄色
		$blue = imagecolorallocate($img, 0,0,255);//蓝色

		imagefilledrectangle($img, 0, 30, 1000, 1, $black);//第一黄条

		imagettftext($img, 18, 0, 50, 24, $white, "2.ttf", "第".$rs['num']."局");

		imagettftext($img, 18, 0, 500, 24, $white, "2.ttf", "下单日期：".$rs['zddt']."");		

		imagefilledrectangle($img, 0, 60, 1000, 32, $black);//第2黄条

		imagettftext($img, 18, 0, 50, 54, $white, "2.ttf", "本局水钱");

		imagettftext($img, 18, 0, 250, 54, $white, "2.ttf", "累计水钱");

		imagettftext($img, 18, 0, 450, 54, $white, "2.ttf", "下注人数");

		imagettftext($img, 18, 0, 650, 54, $red, "2.ttf", "最佳尾数");

		imagefilledrectangle($img, 0, 90, 800, 62, $white);//第3黄条

		imagettftext($img, 18, 0, 60, 84, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 270, 84, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 470, 84, $black, "2.ttf", "".$rows['count']."");

		imagettftext($img, 18, 0, 685, 84, $red, "2.ttf", "");

		imagefilledrectangle($img, 0, 120, 800, 92, $black);//第4黄条

		imagettftext($img, 18, 0, 50, 114, $white, "2.ttf", "庄家昵称");

		imagettftext($img, 18, 0, 180, 114, $white, "2.ttf", "投注金额");

		imagettftext($img, 18, 0, 300, 114, $white, "2.ttf", "尾数");

		imagettftext($img, 18, 0, 380, 114, $white, "2.ttf", "点数");

		imagettftext($img, 18, 0, 470, 114, $white, "2.ttf", "庄家盈亏");

		imagettftext($img, 18, 0, 580, 114, $white, "2.ttf", "上局积分");

		imagettftext($img, 18, 0, 700, 114, $white, "2.ttf", "剩余积分");

		imagefilledrectangle($img, 0, 150, 800, 122, $white);//第5黄条

		imagettftext($img, 18, 0, 50, 144, $black, "2.ttf", $zjrs['name']);
		if($jers['je']>0){
			$zjcolor = $blue;
		}
else{
			$zjcolor = $red;
		}
		imagettftext($img, 18, 0, 200, 144, $zjcolor, "2.ttf", $jers['je']);

		imagettftext($img, 18, 0, 310, 144, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 380, 144, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 475, 144, $fontcolorz3, "2.ttf", "");

		imagettftext($img, 18, 0, 605, 144, $fontcolorz1, "2.ttf", $zjrone['prevjf']);

		imagettftext($img, 18, 0, 710, 144, $fontcolorz2, "2.ttf", $zjrone['alljf']);

		imagefilledrectangle($img, 0, 180, 800, 152, $black);//第6黄条

		imagettftext($img, 18, 0, 10, 174, $white, "2.ttf", "序号");

		imagettftext($img, 18, 0, 65, 174, $white, "2.ttf", "玩家昵称");

		imagettftext($img, 18, 0, 185, 174, $white, "2.ttf", "下注金额");

		imagettftext($img, 18, 0, 300, 174, $white, "2.ttf", "尾数");

		imagettftext($img, 18, 0, 375, 174, $white, "2.ttf", "点数");

		imagettftext($img, 18, 0, 470, 174, $white, "2.ttf", "本局输赢");

		imagettftext($img, 18, 0, 590, 174, $white, "2.ttf", "上局积分");

		imagettftext($img, 18, 0, 700, 174, $white, "2.ttf", "剩余积分");

		//imagefilledrectangle($img, 0, 210, 800, 182, $bgcolor1);//第5黄条

        $i = 1;$y2 = 204;$y3 = 182; $y4=210;

        $wxids = '';

        if($rows['count']){

            foreach($rows['data'] as $rk=>$rv){

                $myjfs = $this->return2jf($rv['wxuid'],$rs['id'],$rs['gid']);

                $rv['prevjf'] = $myjfs['pjf'];

                $rv['alljf'] = $myjfs['ajf'];

                if(intval($rv['prevjf'])<0)$fontcolor1=$red;else $fontcolor1=$black;

                if(intval($rv['alljf'])<0)$fontcolor2=$red;else $fontcolor2=$black;

                if(intval($rv['jf'])<0)$fontcolor3=$red;else $fontcolor3=$black;

                $nickname = $rv['name'];

                $len = mb_strlen($nickname,'utf-8');

                if($len>4)$nickname = mb_substr($nickname,0,4,'utf-8').'...'; 

                if($i%2==0){

                   imagefilledrectangle($img, 0, $y4, 800, $y3, $bgcolor3);//第6黄条

                }else{

                    imagefilledrectangle($img, 0, $y4, 800, $y3, $white); 

                }

                if(empty($rv['prevjf']))$rv['prevjf']=0;

                if(empty($rv['alljf']))$rv['alljf']=0;

        		imagettftext($img, 18, 0, 18, $y2, $black, "2.ttf", "".($i++)."");

        		imagettftext($img, 18, 0, 65, $y2, $black, "2.ttf", $nickname);

        		imagettftext($img, 18, 0, 200, $y2, $black, "2.ttf", "".$rv['xzje']."");

        		imagettftext($img, 18, 0, 310, $y2, $black, "2.ttf", "");

        		imagettftext($img, 18, 0, 380, $y2, $black, "2.ttf", "");

        		imagettftext($img, 18, 0, 500, $y2, $fontcolor3, "2.ttf", 0);

        		imagettftext($img, 18, 0, 600, $y2, $fontcolor1, "2.ttf", $rv['prevjf']);

        		imagettftext($img, 18, 0, 710, $y2, $fontcolor2, "2.ttf", $rv['alljf']);

        		//imagefilledrectangle($img, 0, 240, 800, $y3, $bgcolor2);//第5黄条 

                $y2+=30;$y3+=30;$y4+=30;               

            }

        }

         $height = ($rows['count'])*30;

         imageline($img,55,180,55,180+$height,$bgcolor4);

         imageline($img,175,180,175,180+$height,$bgcolor4);

         imageline($img,280,180,280,180+$height,$bgcolor4);

         imageline($img,360,180,360,180+$height,$bgcolor4);

         imageline($img,440,180,440,180+$height,$bgcolor4);

         imageline($img,580,180,580,180+$height,$bgcolor4);

         imageline($img,690,180,690,180+$height,$bgcolor4);

         //imageline($img,800,180,800,180+$height,$bgcolor4);

         //imageline($img,875,180,875,180+$height,$bgcolor4);

        imagepng($img,WEB.'/upfile/md.jpg');

		imagedestroy($img);

	}

	public function start2($zjid,$juid){

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        $jqr = SUITable('qxpz','jqr');

        $fbs = SUITable('qxpz','fbs');

        $sq = "select gid from jc_wxmember order by id desc";

        $lr = db::get_row($sq);

	    $rs = $this->gameorderModel->get(array('*'),"id='".$juid."'");

        $zjrs=$this->qiangzModel->get(array('name,wxuid'),"id='".$zjid."'");

        $zjwxid = ShowType($zjid,'wxuid','jc_qiangz');

        $zjrone = $this->gameorderlistModel->get(array('*'),"id='".$rs['zjid2']."' and gid='".$rs['gid']."'"); //庄家每局情况wxuid='".$zjwxid."' and lx=2 and goid='".$juid."'

        $prevnum = $rs['num']-1;

        $previd = $this->gameorderModel->get(array('id'),"num='".$prevnum."' $where order by id desc");

        $rows = $this->gameorderlistModel->get(array('*'),"goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."' order by xzje desc",0,1000);//and wxuid!='".$jqr."' and wxuid!='".$fbs."'

        $sql = "SELECT sum(xzje) as je FROM `jc_gameorderlist` WHERE goid='".$juid."' and lx=1 and wxuid!='".$zjrs['wxuid']."' and gid='".$rs['gid']."'";

        //$zjrone['prevjf'] = $zjrone['alljf']-$zjrone['jf'];

        $jers = db::get_row($sql);//本局投注总额

        $zrjf = $this->return2jf($zjwxid,$juid,$rs['gid']);

        $zjrone['prevjf']=$zrjf['pjf'];

        $zjrone['alljf']=$zrjf['ajf'];

        if(intval($zjrone['prevjf'])<0)$fontcolorz1=$red;else $fontcolorz1=$black;

        if(intval($zjrone['alljf'])<0)$fontcolorz2=$red;else $fontcolorz2=$black;

        if(intval($zjrone['jf'])<0)$fontcolorz3=$red;else $fontcolorz3=$black;
		$zlen = mb_strlen($zjrs['name'],'utf-8');
		if($zlen>4)$zjrs['name'] = mb_substr($zjrs['name'],0,4,'utf-8').'...'; 

        $height=1000+$rows['count']*60;

		$img = imagecreatetruecolor(800, $height);//图片尺寸       

        $white = imagecolorallocate($img, 255, 255, 255);

		$cornflowerblue = imagecolorallocate($img, 100,149,237);//图片背景色

		imagefill($img, 0, 0, $white);  //填充背景色

		$black = imagecolorallocate($img, 0, 0, 0);

		$red = imagecolorallocate($img, 255, 0, 0);

		$yellow = imagecolorallocate($img, 255, 255, 0);//填充黄色		

		$bgcolor1 = imagecolorallocate($img, 163, 163, 115);//填充黄色

		$bgcolor2 = imagecolorallocate($img, 163, 163, 244);//填充黄色

        $bgcolor3 = imagecolorallocate($img, 229, 238, 255);//填充黄色

        $bgcolor4 = imagecolorallocate($img, 153, 153, 153);//填充黄色
		$blue = imagecolorallocate($img, 0,0,255);//蓝色

		imagefilledrectangle($img, 0, 30, 1000, 1, $black);//第一黄条

		imagettftext($img, 18, 0, 50, 24, $white, "2.ttf", "第".$rs['num']."局");

		imagettftext($img, 18, 0, 500, 24, $white, "2.ttf", "下单日期：".$rs['zddt']."");		

		imagefilledrectangle($img, 0, 60, 1000, 32, $black);//第2黄条

		imagettftext($img, 18, 0, 50, 54, $white, "2.ttf", "本局水钱");

		imagettftext($img, 18, 0, 250, 54, $white, "2.ttf", "累计水钱");

		imagettftext($img, 18, 0, 450, 54, $white, "2.ttf", "下注人数");

		imagettftext($img, 18, 0, 650, 54, $red, "2.ttf", "最佳尾数");

		imagefilledrectangle($img, 0, 90, 800, 62, $white);//第3黄条

		imagettftext($img, 18, 0, 60, 84, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 270, 84, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 470, 84, $black, "2.ttf", "".$rows['count']."");

		imagettftext($img, 18, 0, 685, 84, $red, "2.ttf", "");

		imagefilledrectangle($img, 0, 120, 800, 92, $black);//第4黄条

		imagettftext($img, 18, 0, 50, 114, $white, "2.ttf", "庄家昵称");

		imagettftext($img, 18, 0, 180, 114, $white, "2.ttf", "投注金额");

		imagettftext($img, 18, 0, 300, 114, $white, "2.ttf", "尾数");

		imagettftext($img, 18, 0, 380, 114, $white, "2.ttf", "点数");

		imagettftext($img, 18, 0, 470, 114, $white, "2.ttf", "庄家盈亏");

		imagettftext($img, 18, 0, 580, 114, $white, "2.ttf", "上局积分");

		imagettftext($img, 18, 0, 700, 114, $white, "2.ttf", "剩余积分");

		imagefilledrectangle($img, 0, 150, 800, 122, $white);//第5黄条
		if($jers['je']>0){
			$zjcolor = $blue;
		}
		else{
			$zjcolor = $red;
		}
		imagettftext($img, 18, 0, 50, 144, $black, "2.ttf", $zjrs['name']);

		imagettftext($img, 18, 0, 200, 144, $zjcolor, "2.ttf", $jers['je']);

		imagettftext($img, 18, 0, 310, 144, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 380, 144, $black, "2.ttf", "");

		imagettftext($img, 18, 0, 475, 144, $fontcolorz3, "2.ttf", "");

		imagettftext($img, 18, 0, 605, 144, $fontcolorz1, "2.ttf", $zjrone['prevjf']);

		imagettftext($img, 18, 0, 710, 144, $fontcolorz2, "2.ttf", $zjrone['alljf']);

		imagefilledrectangle($img, 0, 180, 800, 152, $black);//第6黄条

		imagettftext($img, 18, 0, 10, 174, $white, "2.ttf", "序号");

		imagettftext($img, 18, 0, 65, 174, $white, "2.ttf", "玩家昵称");

		imagettftext($img, 18, 0, 185, 174, $white, "2.ttf", "下注金额");

		imagettftext($img, 18, 0, 300, 174, $white, "2.ttf", "尾数");

		imagettftext($img, 18, 0, 375, 174, $white, "2.ttf", "点数");

		imagettftext($img, 18, 0, 470, 174, $white, "2.ttf", "本局输赢");

		imagettftext($img, 18, 0, 590, 174, $white, "2.ttf", "上局积分");

		imagettftext($img, 18, 0, 700, 174, $white, "2.ttf", "剩余积分");

		//imagefilledrectangle($img, 0, 210, 800, 182, $bgcolor1);//第5黄条

        $i = 1;$y2 = 204;$y3 = 182; $y4=210;

        $wxids = '';

        if($rows['count']){

            foreach($rows['data'] as $rk=>$rv){

                $myjfs = $this->return2jf($rv['wxuid'],$rs['id'],$rs['gid']);

                $rv['prevjf'] = $myjfs['pjf'];

                $rv['alljf'] = $myjfs['ajf'];

                if(intval($rv['prevjf'])<0)$fontcolor1=$red;else $fontcolor1=$black;

                if(intval($rv['alljf'])<0)$fontcolor2=$red;else $fontcolor2=$black;

                if(intval($rv['jf'])<0)$fontcolor3=$red;else $fontcolor3=$black;

                $nickname = $rv['name'];

                $len = mb_strlen($nickname,'utf-8');

                if($len>4)$nickname = mb_substr($nickname,0,4,'utf-8').'...'; 

                if($i%2==0){

                   imagefilledrectangle($img, 0, $y4, 800, $y3, $bgcolor3);//第6黄条

                }else{

                    imagefilledrectangle($img, 0, $y4, 800, $y3, $white); 

                }

                if(empty($rv['prevjf']))$rv['prevjf']=0;

                if(empty($rv['alljf']))$rv['alljf']=0;

        		imagettftext($img, 18, 0, 18, $y2, $black, "2.ttf", "".($i++)."");

        		imagettftext($img, 18, 0, 65, $y2, $black, "2.ttf", $nickname);

        		imagettftext($img, 18, 0, 200, $y2, $black, "2.ttf", "".$rv['xzje']."");

        		imagettftext($img, 18, 0, 310, $y2, $black, "2.ttf", "");

        		imagettftext($img, 18, 0, 380, $y2, $black, "2.ttf", "");

        		imagettftext($img, 18, 0, 500, $y2, $fontcolor3, "2.ttf", 0);

        		imagettftext($img, 18, 0, 600, $y2, $fontcolor1, "2.ttf", $rv['prevjf']);

        		imagettftext($img, 18, 0, 710, $y2, $fontcolor2, "2.ttf", $rv['alljf']);

        		//imagefilledrectangle($img, 0, 240, 800, $y3, $bgcolor2);//第5黄条 

                $y2+=30;$y3+=30;$y4+=30;               

            }

        }

         $height = ($rows['count'])*30;

         imageline($img,55,180,55,180+$height,$bgcolor4);

         imageline($img,175,180,175,180+$height,$bgcolor4);

         imageline($img,280,180,280,180+$height,$bgcolor4);

         imageline($img,360,180,360,180+$height,$bgcolor4);

         imageline($img,440,180,440,180+$height,$bgcolor4);

         imageline($img,580,180,580,180+$height,$bgcolor4);

         imageline($img,690,180,690,180+$height,$bgcolor4);

         //imageline($img,800,180,800,180+$height,$bgcolor4);

         //imageline($img,870,180,875,180+$height,$bgcolor4);

        imagepng($img,WEB.'/upfile/nmd.jpg');

		imagedestroy($img);

	}

     private function js_ljsq(){

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        $rows = $this->gameorderModel->get(array('id,shuiq'),"1 $where",0,1000);//addtime between '$kdt' and '$edt'

        $ljsq = 0;

        if($rows['count']){

            foreach($rows['data'] as $ck=>$cv){

                $ljsq += $cv['shuiq'];

            }

        }

        return $ljsq;        

    }

     private function js_alljs($wxuid,$gid){

        //$kdt = date('Y-m-d').' 00:00:00';

        //$edt = date('Y-m-d').' 23:59:59';

        $kpdt = SUITable('config','kpdt');//开盘时间

        $fpdt = SUITable('config','fpdt');//封盘时间

        $kdt = $kpdt;

        $edt = $fpdt;

        if(!empty($kdt))$where .= " and addtime >='".$kdt."'";

        if(!empty($edt))$where .= " and addtime <='".$edt."'";

        $rows = $this->gameorderlistModel->get(array('jf')," wxuid='".$wxuid."'  and gid='".$gid."' $where",0,1000);//and lx=1and addtime between '$kdt' and '$edt' 

        $ljsq = 0;

        if($rows['count']){

            foreach($rows['data'] as $ck=>$cv){

                $ljsq += $cv['jf'];

            }

        }

        $sql = "select sxed from jc_wxmember where wxuid='".$wxuid."' and gid='".$gid."'";

        $rr = db::get_row($sql);

        $ljsq = $rr['sxed']+$ljsq;

        return $ljsq;         

    }

    private function return2jf($wxuid,$juid,$gid){

        $row = $this->chongzModel->get(array('ye,je,id'),"wxuid='".$wxuid."'  and gid='".$gid."' order by id desc");//and num='".$juid."'-$row['je']

        $pjf = $row['ye'];

        return array('pjf'=>$pjf,'ajf'=>$row['ye']);

    }

    private function ischeh($jqr,$gid,$gf){//判断操盘手是否测回了信息

        $fr = '<sysmsg type=revokemsg>';

        $msgrows = $this->wxmsgModel->get(array('content,msgid,wxuid,addtime,id'),"  wxuid='".$jqr."' and gid='".$gid."' and content like '<sysmsg%</sysmsg>' order by id desc");//and

        $i=0;

        $parrn = "/<msgid>([0-9]+)<\/msgid>/";

        preg_match($parrn,$msgrows['content'],$matches);

        $matches[0] = str_replace("<msgid>","",$matches[0]);

        $matches[0] = str_replace("</msgid>","",$matches[0]);

        $sql = "select imgkey from jc_wxmsg where  wxuid='".$jqr."' and msgid='".$matches[0]."'";

        $rs = db::get_row($sql);

        $sql2 = "SELECT pname from jc_public where ptype='imgkey'  and pvalue='".$rs['imgkey']."'";

        $rs2 = db::get_row($sql2); 

        $dtc = time()-$msgrows['addtime'];

        /*if($dtc>5){

            return 0;

        }*/

        db::query("delete from jc_wxmsg where id='".$msgrows['id']."'");          

        if($rs2['pname']=='a1'){

            return 1;

        }elseif($rs2['pname']=='a2'){

            return 2;

        }elseif($rs2['pname']=='a3'){

            return 3;

        }elseif($rs2['pname']=='a4'){

            return 4;

        }elseif($rs2['pname']=='a5'){

            return 5;

        }elseif($rs2['pname']=='a6'){

            return 6;

        }elseif($rs2['pname']=='a7'){

            return 7;

        }elseif($rs2['pname']=='a8'){

            return 8;

        }elseif($rs2['pname']=='a9'){

            return 9;

        }elseif($rs2['pname']=='a10'){

            return 10;

        }else{

            return 0;

        }

    }

}



