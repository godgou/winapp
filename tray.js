const {app, Menu, Tray ,nativeImage} = require('electron');
let t = null;
var i=1;
var tray=function(mainWindow){
	t = new Tray('./resources/app/imgs/32.ico');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', icon: './resources/app/imgs/16.png'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: '退出' , click: function () {app.quit();}}
  ]);
var t1="欢迎使用GG[godgou.com]\n",
    t2="GG当前版本:"+app.getVersion(),
	t3="\nelectron:"+process.versions.electron,
	t4="\nchrome:"+process.versions.chrome,
	t5="\nnode:"+process.versions.node,
	t6="\n单击:显示/隐藏程序",
	t7="\n右击:显示菜单";
  t.setToolTip(t1+t2+t3+t4+t5+t6+t7);
  t.setContextMenu(contextMenu);
  t.on('click', function(){if(mainWindow.isMinimized()){mainWindow.restore()}else{mainWindow.minimize()}});//最小化/还原窗口
  setInterval(function(){if(i==1){i=i+1;t.setImage('./resources/app/imgs/offline.ico')}else{i=i-1;t.setImage('./resources/app/imgs/32.ico');}},500);
}
module.exports = tray;