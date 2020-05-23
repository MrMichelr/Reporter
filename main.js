'use strict' // For more security

const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

//Different type of function
const WindowManager = require('./sources/window-manager');

this.windowManager = new WindowManager()


app.on('ready', () => {
    // WHEN THE APP IS RUNNING
    const windows = this.windowManager.getActiveWindows();

    if (windows.length === 0) {
        this.windowManager.createSplashWindow();
    } else {
        this.windowManager.createWindows(windows);
    }

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
  
    if (allWindows.length === 0) {
        this.windowManager.createSplashWindow();
    } else {
      allWindows[0].focus();
    }

});

ipcMain.on('openProject', (event, arg) => {
    console.log('receive: ' + arg)
    const res = this.windowManager.openWindow(arg);
    if (res) this.windowManager.closeSplashWindow();

    event.returnValue = "received";
    return res;
})