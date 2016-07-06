var menubar = require('menubar');
const {clipboard} = require('electron');
const ipcMain = require('electron').ipcMain;

ipcMain.on('ping', (event, arg) => {
    // open new browser window
    console.log('pin!!');
});

// ipcMain.send('poo');

var mb = menubar({
    dir: __dirname
});


mb.on('ready', function ready () {
    console.log('app is ready');

    console.log(mb);
    // mb.app.send('ping', 'whooo');
    // your app code here
});

mb.on('after-create-window', function () {
    let html = mb.window.webContents;
    // html.openDevTools({mode: 'detach'});
});


mb.on('after-show', function(){
    console.log("after-show");

    let html = mb.window.webContents;
    html.executeJavaScript(`
      run();
    `);
});

mb.on('after-hide', function(){
    let html = mb.window.webContents;
    html.executeJavaScript(`
      reset();
    `);
});