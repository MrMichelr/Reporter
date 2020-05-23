/**
 * This is the Menu 
 * 
 */

'use strict'

// REQUIRE
const { remote } = require('electron')
const { app, Menu } = remote


// CONSTANT
const BACK = "\n"
const isMac = process.platform === 'darwin'
const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
          {
              label: 'About ' + app.name,
              role: '', //about = new window with characteristics
              //toolTip: 'Learn more about me 😜',
              accelerator: '',
              icon: '',
              click: () => { shell.openExternal('https://github.com/MrMichelr') }
          },
          {   type: 'separator' },
          {   role: 'services'  },
          {   type: 'separator' },
          {   role: 'hide' },
          {   role: 'hideothers' },
          {   role: 'unhide' },
          {   type: 'separator' },
          {   role: 'quit' }
      ]
    }] : []),
    
    // { role: 'File' }
    {
      label: 'File',
      submenu: [
          {
              label: 'New',
              accelerator: 'CmdOrCtrl+N',
              icon: '',
              click: () => { reporter.project.new() }
          },
          {
              label: 'Open…',
              accelerator: 'CmdOrCtrl+O',
              icon: '',
              click: () => { reporter.project.open() }
          },
          { type: "separator" },
          {
              label: 'Save',
              accelerator: 'CmdOrCtrl+S',
              icon: '',
              click: () => { reporter.project.save() }
          },
          {
              label: 'Save As…',
              accelerator: 'CmdOrCtrl+Shift+S',
              icon: '',
              click: () => { reporter.project.save_as() }
          },
          { type: "separator" },
          {
              label: 'Discard Change',
              accelerator: '',
              icon: '',
              click: () => { reporter.project.discard() }
          },
          {
              label: 'Close File',
              accelerator: 'CmdOrCtrl+W',
              icon: '',
              click: () => { reporter.project.close() }
          },
          {
              label: 'Force Close',
              accelerator: '',
              icon: '',
              click: () => { reporter.project.force_close() }
          },
          { type: "separator" },
          {
            label: 'Reset Recent Document',
            accelerator: 'CmdOrCtrl+Backspace',
            icon: '',
            click: () => { reporter.reset()}
          } 
        
        ]
    },

    //{ role: 'Edit' }
    {
        label: 'Edit',
        submenu: [
            {
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
                role: "undo"
            },
            {
                label: "Redo",
                accelerator: "CmdOrCtrl+Shif+Z",
                role: "redo"
            },
            { type: "separator" },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
                role: "cut"
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
                role: "copy"
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
                role: "paste"
            },
            { type: "separator" },
            {
                label: "Find",
                accelerator: "CmdOrCtrl+F",
                click: () => {}
            },
            {
                label: "Replace",
                accelerator: "CmdOrCtrl+Shift+F",
                click: () => {}
            },
            { type: "separator" },
            {
                label: "Add a Linebreak",
                accelerator: 'CmdOrCtrl+Shift+Enter',
                click: () => {reporter.go.to_next(BACK, false); reporter.inject(BACK)}
            } 
        ]
    },

    //{ role: 'Selection' }
    {
        label: 'Selection',
        submenu: [
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                role: "selectall"
            },
            { type: "separator" },
            {
                label: "Copy Line Up",
                accelerator: 'Alt+Shift+Up',
                enabled: false, // make it grey
                click: () => {}
            },  
            {
                label: "Copy Line Down",
                accelerator: 'Alt+Shift+Up',
                enabled: false, //make it grey
                click: () => {}
            },
            { type: "separator" },
            {
                label: "Open URL",
                accelerator: 'CmdOrCtrl+B',
                click: () => {reporter.open_url()}
            }
        ]
    },

    //{ role: 'View' }
    {
        label: 'View',
        submenu: [
            {
                label: "Show Navigation Bar",
                accelerator: "CmdOrCtrl+<",
                type: "checkbox",
                checked: true,
                click: () => {reporter.navigator.toggle()}
            },
            { type: "separator" },
            {
                label: "Decrease Font size",
                accelerator: 'CmdOrCtrl+-',
                click: () => {},
                enabled: false, //make it grey
            },  
            {
                label: "Increase Font size",
                accelerator: 'CmdOrCtrl+numadd',
                click: () => {},
                enabled: false, //make it grey
            },  
            {
                label: "Reset Font size",
                click: () => {},
                enabled: false, //make it grey
            },  
            { type: "separator" },
            {
                label: "Appearance",
                submenu: [
                    {
                        label: "Theme…",
                        enabled: false, //make it grey
                    }
                ]
            }
        ]
    },

    //{ role: 'Help' }
    {
        label: 'Window',
        submenu: [
            {
                label: "Minimize",
                accelerator: "CmdOrCtrl+M",
                role: "minimize"
            },
            {
                label: "Toggle Fullscreen",
                accelerator: "CmdOrCtrl+Enter",
                role: "togglefullscreen"
            },
            { type: "separator" },
            {
                label: "Zoom In",
                accelerator: "",
                role: "zoomIn"
            },
            {
                label: "Zoom Out",
                accelerator: "",
                role: "zoomOut"
            },
            {
                label: "Reset Zoom",
                accelerator: "",
                role: "resetZoom"
            },
            { type: "separator" },
            {
                label: "Bring All to Front",
                accelerator: "",
                role: "front"
            },
            
        ]
    },

    //{ role: 'Help' }
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Go to Left Page',
                click: () => { shell.openExternal('https://hundredrabbits.itch.io/left') }
            },
            { type: "separator" },
            {
                label: 'Learn more',
                click: () => { shell.openExternal('https://github.com/MrMichelr') }
            },
            {
                label: 'Join me on Twitter',
                click: () => { shell.openExternal('https://twitter.com/MrMichelr') }
            }
        ]
    }
  ]



function AppMenu (){
    // DEPENDENCIES

    // VARIABLES
    
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.install = () => {
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }

}
module.exports = AppMenu