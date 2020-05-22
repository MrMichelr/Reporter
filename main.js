'use strict' // For more security

const { app, BrowserWindow } = require('electron')
const path = require('path')

app.win = null

app.on('ready', () => {
    // WHEN THE APP IS RUNNING

    // Create a window
    app.win = new BrowserWindow({
        width: 500,
        height: 700,
        minWidth: 360,
        minHeight: 380,
        resizable: true,
        movable: true,
        minimizable: true,
        maximizable: true,
        frame: false,
        backgroundColor: '#000',
        title: "Reporter",
        //icon: path.join(__dirname, { darwin: 'icon.icns', linux: 'icon.png',win32: 'icon.ico' }[process.platform] || 'icon.ico'),
        skipTaskbar: process.platform === 'darwin',
        autoHideMenuBar: process.platform === 'darwin',
        webPreferences: { 
          zoomFactor: 1.0, 
          nodeIntegration: true, 
          backgroundThrottling: false 
        }
      })

    // and load the index.html of the app.
    app.win.loadURL(`file://${__dirname}/sources/index.html`)
    app.inspect()

    // Quit when all windows are closed.
    app.win.on('window-all-closed', () => {

        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
  })
})

app.inspect = () => {
    app.win.toggleDevTools()
}
  
app.toggleFullscreen = () => {
    app.win.setFullScreen(!app.win.isFullScreen())
}
  
app.toggleMenubar = () => {
    app.win.setMenuBarVisibility(!app.win.isMenuBarVisible())
}