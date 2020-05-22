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
          {
              label: 'Discard Change',
              accelerator: '',
              icon: '',
              click: () => { reporter.project.discard() }
          },
          {
              label: 'Close File',
              accelerator: '',
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

    //{ role: 'Help' }
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click: () => { shell.openExternal('https://github.com/MrMichelr') }
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