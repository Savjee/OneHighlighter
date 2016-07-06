const menubar = require('menubar');
const {clipboard} = require('electron');

let mb = menubar({
    dir: __dirname,
    transparent: true,
    icon: 'img/IconTemplate.png'
});

mb.on('ready', function ready () {
    console.log('app is ready');
});

mb.on('after-create-window', function () {
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