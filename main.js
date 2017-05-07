const electron = require('electron');
// Module to control application life.
const app = electron.app;
//const screen=electron.screen;
//const tray = electron.Tray;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
//主进程
const ipc = electron.ipcMain;
//node模块
const path = require('path');
const url = require('url');
//------------------本地模块-------------
const robot = require('robotjs');
//可调用dll的模块
var ffi = require('ffi');
//自定义托盘模块
const tray = require('./tray.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

//setInterval(function(){robot.moveMouse(200, 50);},1000);
//---------------------------监听网页发送过来的指令
//最小化
ipc.on('mini-window',() => {
        mainWindow.minimize();
		//var OK_or_Cancel = user32.MessageBoxW(0, "TEXT('I am Node.JS!')", "TEXT('Hello, World!')", 1);
});
ipc.on('hide-window', () => {
    mainWindow.minimize();
});
//最大化
ipc.on('show-window', () => {
    mainWindow.maximize();
});
//还原
ipc.on('orignal-window', () => {
    mainWindow.unmaximize();
});
//监听鼠标进入事件
ipc.on('mouseover', () => {
  //--------------------鼠标位置-----------------------
//mainWindow.setPosition(electron.screen.getCursorScreenPoint().x-20,electron.screen.getCursorScreenPoint().y-20);
});


var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  if (mainWindow) {  // 当另一个实例运行的时候，这里将会被调用，我们需要激活应用的窗口
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  return true;
});

// 这个实例是多余的实例，需要退出
if (shouldQuit) {
  app.quit();
  return;
}


function createWindow () {
  //获取电脑屏幕窗口
  var WindowSize = electron.screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.new BrowserWindow 创建一个窗口
  mainWindow = new BrowserWindow({width:WindowSize.width/2, height:WindowSize.height/2,resizable:false,transparent:true,frame: false})//alwaysOnTop:true,
    //mainWindow.maximize()//窗口最大化
	//mainWindow.setFullScreen(true);//设置窗口为全屏模式覆盖windows系统的任务栏

  // and load the index.html of the app.mainWindow.loadURL 加载一个url,可以是本地文件或者是远程url.
  //mainWindow.loadURL('http://42.51.158.129/app/main.html')
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'GG.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Open the DevTools.开启调试窗口
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  //robot.moveMouse(100, 100);
  //---------------------自定义模块的一些事件处理
  //置托盘图标
tray(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 创建窗口、继续加载应用、应用逻辑等……
app.on('ready', createWindow)
//程序退出之前
app.on('before-quit', () => {
  
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
	mainWindow.webContents.session.clearCache(function(){
//some callback.
});

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//-------------------利用node-ffi模块调用dll函数------------------------
/*--'dll库名','函数名':['返回值类型',['参数1类型','参数2类型','参数3类型','参数n类型']]--*/
//var user32 =ffi.Library('user32', {
//	'MessageBoxW':['int', [ 'int', 'string', 'string', 'int' ]],
//	'SetWindowsHookExW':['long',['int','pointer','int','int']]
//});
//hook鼠标事件全局钩子
//var hook=user32.SetWindowsHookExW(14,MouseProc, 0, 0);
 //function MouseProc(va1,va2,va3){if(va1==14){}}

