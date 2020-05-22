/**
 * This is the Menu 
 * 
 */

'use strict'

// REQUIRE
const { remote } = require('electron')
const { app, Menu } = remote


// CONSTANT
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
              label: 'Open',
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
              label: 'Save As ...',
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
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                role: "selectall"
            }
        ]
    },

    //{ role: 'Help' }
    {
        label: 'Help',
        role: 'help',
        submenu: [
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