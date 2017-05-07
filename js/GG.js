var version=201704192055;//版本号
const electron = require('electron');
const remote = electron.remote;//主进程和渲染进程(网页)通信
const BrowserWindow = remote.BrowserWindow;
const ipc = electron.ipcRenderer;////主进程和渲染进程(网页)通信
const app = remote.app;
const fs = require('fs');
const http = require('http') ;
const shell = electron.shell;
const mainWindow =remote.getCurrentWindow()//返回该网页所属的 BrowserWindow 对象。
//可调用dll的模块
var addon = require('./node_modules/myaddon/build/Release/myaddon.node');

//-------------------利用node-ffi模块调用dll函数------------------------
/*--'dll库名','函数名':['返回值类型',['参数1类型','参数2类型','参数3类型','参数n类型']]--*/
//var user32 =ffi.Library('user32', {'MessageBoxW':['int32', [ 'int32', 'string', 'string', 'int32' ]]
//});
//尺寸
var winh=window.screen.availHeight,winw=window.screen.availWidth;
//----------------------------------------------时间
var date = new Date(),h=date.getHours(), m=date.getMinutes(),s=date.getSeconds(),hms=h+':'+m+':'+s;
//----------------------------------------
  window.addEventListener('online', function(){});//监听上线
  window.addEventListener('offline', function(){});//监听离线
//----------------------自定义 jq function
var debug;
//-------------------自定义 js function
//窗口最小化
function winmize(){ipc.send('mini-window');}
//用默认浏览器打开链接
function openurl(url){shell.openExternal(url);}
//ffi传参用的字符串要转换
//function TEXT(text){
   //return new Buffer(text, 'ucs2').toString('binary');
//}
//初始进度条
mainWindow.setProgressBar(0.1);
//--------------------------------------------JQ start
$(document).ready(function(){
	//首页进度条50%
	$('#pro_val').html('50%');$('#pro_w').css('width','50%');mainWindow.setProgressBar(0.5);
	//---------------------------------------
	if (navigator.onLine) {//网络状态检测 
		$.ajax({
			type: "GET",
			url:"http://42.51.158.129/app/app.php?type=ping_net",//判断服务器是否正常
			success:function(data){
			//首页进度条100%
	$('#pro_val').html('100%');$('#pro_w').css('width','100%');$('#first_h').html('GG加载完毕!');
	//---显示导航页
	  mainWindow.setProgressBar(1);
	$('#first').hide();	$('#wrapper1').show();
	//是否设置这个窗口始终在其他窗口之上
	//mainWindow.setAlwaysOnTop(true);
	//重新设置窗口的宽高值，并且移动到指定的 x, y 位置
	mainWindow.setBounds({x:0,y:winh-42,width:winw,height:42});
      mainWindow.setProgressBar(-1);
if(app.getVersion()<data){alert('','发现新版本');}},//版本校对
		    error:function(xhr){$('#first_h').html("错误提示： " + xhr.status + " " + xhr.statusText+"(服务器不通，请稍后重试)");}
		});
	} 
	else {
	$('#first_h').html('网络不通,看下你家网线是不是给老鼠咬断了');
	}
//--------------------------------------------
	$("#loadfile").click(function(){//最新hosts
		$.ajax({
			type: "GET",
			url:"http://42.51.158.129/hosts/hosts.php",
			success:function(data){ $("#content").val(data);alert("获取最新hosts成功");},
		    error:function(xhr){alert(xhr.status + " " + xhr.statusText);}
		});
});
//--------------------------------------------
	$("#now_hosts").click(function(){//当前hosts
	
	fs.readFile('C:\\Windows\\System32\\drivers\\etc\\hosts','utf8',function(err,data){
	 if(err){debug("获取当前hosts失败",err);
 }else{
  $("#content").val(data);debug("It's OK","获取当前hosts成功");
    }
	});
});
//--------------------------------------------
	$("#app").click(function(){//替换hosts
	fs.writeFile('C:\\Windows\\System32\\drivers\\etc\\hosts', $("#content").val(), function (err){
  if (err) {alert("应用hosts失败:"+err);}else{
  alert("应用hosts成功");
  }
});
	
});
//-------------------/////////////////C++ and ffi
//$('*****').click(function(){
	
	//alert(addon.getval(3,2));
	//addon(function(msg){alert(msg);});
	//var OK_or_Cancel = user32.MessageBoxW(0,TEXT('I am Node.JS!'),TEXT('Hello, World!'), 1);
//});
//--------------------------------------------
//加载页面
$('#first').css({"height":winh/2+"px","width":winw/2+"px","top":0+"px","left":0+"px"});
//导航页面
$('#navigation').css({"height":winh/2+"px","width":winw/2+"px","top":"0","left":"0"});
//--------自定义函数start----------------
function debug(title,txt){
	$('#myModalLabel').html(title);$('.modal-body').html(txt);
	    $('#myModal').modal({
        keyboard: true
    });
}
//--------自定义函数end----------------
});