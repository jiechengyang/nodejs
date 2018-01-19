// 小案例---递归遍历目录
var fs = require('fs');
var dateformat = require('dateformat');
var path = './dist';
if (!fs.existsSync(path)) {
	return console.error('目录不存在！');
}
var deep = 0, pid = 0,index = 1;
var fileList = [];
// [
// 	{'id': 1, 'pid': 0, 'name': 't1'},
// 	{'id': 2, 'pid': 1, 'name': 'tt1'},
// 	{'id': 3, 'pid': 0, 'name': 't2'},
// 	{'id': 4, 'pid': 0, 'name': 't3'},
// 	{'id': 5, 'pid': 0, 'name': 't4'},
// ]
function readDirctory(path, deep, pid) 
{
	 var files = fs.readdirSync(path);
     files.forEach((file) => {
		 var stats = fs.statSync(path + "/" + file);
	        if(stats.isDirectory()){  
	            console.log("dir: "+file)  
	            readDirctory(path+"/"+file);  
	        }else{  
	            console.log("file: "+file)  
	        }     
     })
	// fs.readdir(path, function(err, files) {
	//    if (err) {
	//        return console.error(err);
	//    }

	//    files.forEach((file) => {
	//    	var arr = [];
	//     fs.stat(path + '/' + file, function(err, stats) {
	// 		if (err) {
	// 		   return console.error(err);
	// 		}

	// 		if (stats.isDirectory()) {
	// 			//console.log(repeat("\t", deep) + '名称:' + path + '/' + file +'-|-类型:文件夹' + '-|-创建时间:' + dateformat(stats.ctimeMs, 'yyyy-mm-dd HH:MM:ss') + '-|-修改时间:' + dateformat(stats.mtimeMs, 'yyyy-mm-dd, HH:MM:ss') + '-|-大小:'); 
	// 			readDirctory(path + '/' + file, ++deep, deep);
	// 		} else {
	// 			var fileExt = getFileExt(file);
	// 			//console.log(repeat("\t", deep) + '名称:' + path + '/' + file +'-|-类型:'+ fileExt.toUpperCase() + '-|-创建时间:' + dateformat(stats.ctimeMs, 'yyyy-mm-dd HH:MM:ss') + '-|-修改时间:' + dateformat(stats.mtimeMs, 'yyyy-mm-dd, HH:MM:ss') + '-|-大小:' + filesizeFormat(stats.size));   
	// 		} 
	// 		var arr = {'id': index++, 'pid': pid, 'name': file};
	//      });
	//    });
	// });
}

/**
 * getFileExt
 * @param filename 文件名,
 * @return 文件后缀 string
*/
function getFileExt(filename)
{
	var arr = filename.split('.');
	if (arr.length == 1) {
		return '文件夹';
	}
	return arr[arr.length-1];
}

/**
 * repeat
 * @param 重复某个字符串n次
 * @return  string
*/
function repeat(str, n)
{

	return new Array(n+1).join(str);

}

/**
 * ucfirst
 * @param 英文字符串首字母大写
 * @return  string
*/
function ucfirst(str) 
{
	var str = str.toLowerCase();
	str = str.replace(/\b\w+\b/g, function(word){
	  return word.substring(0,1).toUpperCase()+word.substring(1);
	});

	return str;
}

/**
 * filesizeFormat
 * @param filesize 文件大小,
 * @return 格式后的文件大小 string
*/
function filesizeFormat(filesize)
{
    var arr = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e      = Math.floor(Math.log(filesize)/ Math.log(1024));

    return numberFormat((filesize / Math.pow(1024, Math.floor(e))), 2, '.', '') + ' ' + arr[e];
}

/**
 * numberFormat
 * @param number 传进来的数,
 * @param bit 保留的小数位,默认保留两位小数,
 * @param sign 为整数位间隔符号,默认为空格
 * @param gapnum 为整数位每几位间隔,默认为3位一隔
 * @type arguments的作用：arguments[0] == number(之一)
*/
function numberFormat(number,bit,sign,gapnum)
{
    //设置接收参数的默认值
    var bit    = arguments[1] ? arguments[1] : 2 ;
    var sign   = arguments[2] ? arguments[2] : ' ' ;
    var gapnum = arguments[3] ? arguments[3] : 3 ;
    var str    = '' ;

    number     = number.toFixed(bit);//格式化
    realnum    = number.split('.')[0];//整数位(使用小数点分割整数和小数部分)
    decimal    = number.split('.')[1];//小数位
    realnumarr = realnum.split('');//将整数位逐位放进数组 ["1", "2", "3", "4", "5", "6"]
    
    //把整数部分从右往左拼接，每bit位添加一个sign符号
    for (var i=1; i<=realnumarr.length; i++){
        str = realnumarr[realnumarr.length-i] + str ;
        if (i % gapnum == 0){
            str = sign+str;//每隔gapnum位前面加指定符号
        }
    }
    
    //当遇到 gapnum 的倍数的时候，会出现比如 ",123",这种情况，所以要去掉最前面的 sign
    str = (realnum.length % gapnum == 0) ? str.substr(1) : str;
    //重新拼接实数部分和小数位
    realnum = str + '.' + decimal;

    return realnum;
}

readDirctory(path, deep, pid);
console.log(fileList);

