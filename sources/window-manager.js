/**
 * This is the Window manager
 */

'use strict'

// REQUIRE
const {
    app,
    Menu,
    shell,
    dialog,
    BrowserWindow
  } = require('electron')


// CONSTANT



function WindowManager (){
    // DEPENDENCIES

    // VARIABLES
    this.splashWindow;
    const splashWindowSettings = {
        width: 500,
        height: 700,
        minWidth: 360,
        minHeight: 380,
        resizable: false,
        movable: true,
        minimizable: false,
        maximizable: false,
        //frame: false,
        titleBarStyle: 'hiddenInset',
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
    }
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================
    
    // Splash Window
    this.createSplashWindow = () => {
        if (this.splashWindow) {
            this.splashWindow.focus();
            return;
        }

        // CREATE new window
        this.splashWindow = new BrowserWindow(splashWindowSettings);

        // LOAD path to the index
        this.splashWindow.loadURL(`file://${__dirname}/Splash/index.html`)
        
        this.splashWindow.once('ready-to-show', () => { this.splashWindow.show() });
        this.splashWindow.on('closed', () => { this.splashWindow = null });

    }
    this.closeSplashWindow = () => {
        if (this.splashWindow) {
            this.splashWindow.close();
        }
    }

    // Editor window
    this.createEditorWindow = async (win) => {
        
        const w = new BrowserWindow({
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

        // Pass along the respective path to each window
        w.path = win.path


        // LOAD path to the index
        this.splashWindow.loadURL(`file://${__dirname}/index.html`)

        w.on('closed', () => {

             windows.delete(win.path);
            if (!quitFlag && windows.length() === 0) {
                this.createSplashWindow();
            }
        })

        return new Promise((resolve) => {
            w.once('ready-to-show', () => {
              setTimeout(() => { windows.get(win.path).show();  resolve()}, 400);
            })
        })
    }


    this.quitApp = () => {
        quitFlag = true;
        app.quit();
    }

    // ==============================================
    // BASIC Functions
    // ==============================================

    this.getActiveWindows = () => {
        // Returns an array of window objects that have active = true.

        if (!localStorage) { return [] }

        const wins = localStorage.length

        return wins
    }

    //New project

    // Open a new Project
    // Or open a dialog to open a new project
    this.openWindow = (p) => {
        console.log("openning " + p)

        let folderPath = p;

        //If Nothing Open 
        if (!folderPath) {
            folderPath = openDialog();
        }

        if (!folderPath) {
            return false;
        }

        // If already open =>

         // The path is not currently open, open a new window
         this.createEditorWindow(folderPath)
    }

}
module.exports = WindowManager