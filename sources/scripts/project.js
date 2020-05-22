/**
 * This is the project controller
 * Save, load, new, etc.
 * It's here ;)
 */

'use strict'

// REQUIRE
const fs = require('fs')
const { remote } = require('electron')
const { app, dialog } = remote

const Page = require('./page')
const EmptyDoc = require('./emptyDoc')


// CONSTANT



function Project (){
    // DEPENDENCIES

    // VARIABLES
    this.pages = []
    this.index = 0
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.start = () => {
        // If previous files => Load it
        if (localStorage.hasOwnProperty('paths')) {
            //Check if paths exist
            if (isJSON(localStorage.getItem('paths'))) {
                //There something in it ?
                const paths = JSON.parse(localStorage.getItem('paths'))

                for (const id in paths) {
                  reporter.project.add(paths[id])
                }

              }
        }

        // If nothing in the queue of pages => create the default doc
        if (this.pages.length === 0) {
            this.pages.push(new EmptyDoc)
        }

    }

    this.update = () => {
        // If no page => Missing page => return;
        if (!this.page()) { console.warn('Missing page'); return }
        
        // Commit the text in the actual doc
        this.page().commit(reporter.textarea.value)
        
    }
    this.page = () => {
        return this.pages[this.index]
      }
    this.paths = function () {
        const a = []
        for (const id in this.pages) {
          const page = this.pages[id]
          if (page.path) { a.push(page.path) }
        }
        return a
    }
    
    // ==============================================
    // BASIC Functions
    // ==============================================

    this.new = () => {
        console.log('New Page')

        this.add()
        reporter.reload()

        setTimeout(() => {reporter.navigator.next_page(), reporter.textarea.focus() }, 200) // Add a page change
    }
    this.open = () => {
        console.log('Open Pages')

        const paths = dialog.showOpenDialogSync(app.win, {
            title: "Open a file",
            properties: ["openFile", "multiSelections"],
            filters: [
                { name: "MR Text", extensions: ['mrtxt'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        })

        if (!paths) { console.log('Nothing to load'); return }

        for (const id in paths) {
            console.log(id)
            this.add(paths[id])
        }

        setTimeout(() => { reporter.navigator.next_page(); reporter.update() }, 200)
    }
    this.save = () => {
        console.log('Save Page')

        const page = this.page()

        if (!page.path) {
            //IF the page has no path
            this.save_as()
            return
        }

        // Nodejs FS framework to write the doc
        // file, content, option (here encoding) callback
        fs.writeFile(page.path, page.text, 'utf8', (err) => {
            if (err) {
                dialog.showErrorBox("We can't save!", "An error ocurred updating the file " + err.message)
                console.log(err)
                return
            }

            reporter.update()

            // ADD a feedback for the user
        })
    }
    this.save_as = () => {
        console.log('Save As Page')

        // Create a Window to save the page
        const page = this.page()
        const path = dialog.showSaveDialogSync(app.win, {
            properties: ["createDirectory"]
        })

        if (!path) { console.log('Nothing to save'); return }

        // Nodejs FS framework to write the doc
        // file, content, option (here encoding) callback
        fs.writeFile(path + '.mrtxt', page.text, 'utf8', (err) => {
            if (err) {
                dialog.showErrorBox("We can't save!", "An error ocurred creating the file " + err.message)
                return
            }

            if (!page.path) {
                //IF the page has no path
                page.path = path

            } else if (page.path !== path) {
                //IF the page path is not the same than the place we want
                reporter.project.pages.push(new Page(page.text, path))
            }

            reporter.update()

            // ADD a feedback for the user
        })

    }
    this.close = () => {
        if (this.pages.length === 1) { console.warn('Cannot close'); return }

        if (this.page().has_changes()) {
            
            const response = dialog.showMessageBoxSync(app.win, {
                type: "question",
                buttons: ['Yes', 'No'],
                defaultId: 1,
                title: "Are you sure?",
                message: "All your content will be lost",
                //icon: `${app.getAppPath()}/icon.png`,
            })

            if (response !== 0) {
                // IF reponse = NO
                return
            }
        }

        this.force_close()
        localStorage.setItem('paths', JSON.stringify(this.paths()))
    }
    this.force_close = () => {
        if (this.pages.length === 1) { this.quit(); return }

        console.log('Closing..')

        // Delete the index of the page from the array
        this.pages.splice(this.index, 1)
        reporter.go.to_page(this.index - 1)
    }
    this.discard = () => {
        if (this.page().has_changes()) {
            
            const response = dialog.showMessageBoxSync(app.win, {
                type: "question",
                buttons: ['Yes', 'No'],
                defaultId: 1,
                title: "Are you sure?",
                message: "Are you sure you want to discard changes?",
                //icon: `${app.getAppPath()}/icon.png`,
            })

            if (response === 0) {
                // IF reponse = Yes
                reporter.reload(true)
            }
        }
    }
    this.quit = () => {
        if (this.has_changes()) {
            this.quit_dialog()
          } else {
            app.exit()
          }
    }
    this.quit_dialog = () => {
        const reponse = dialog.showMessageBoxSync(app.win, {
            type: "warning",
            buttons: ['Yes', 'No'],
            defaultId: 1,
            title: "Are you sure?",
            message: "Unsaved data will be lost. Are you sure you want to quit?",
            icon: `${app.getAppPath()}/icon.png`,
        })

        if (response === 0) {
            // IF reponse = Yes
            app.exit()
        }
    }

    // ==============================================
    // OTHER Functions
    // ==============================================

    this.has_changes = () => {
        for (const id in this.pages) {
          if (this.pages[id].has_changes()) { return true }
        }
        return false
    }
    this.add = (path = null) => {
        console.log(`Adding page(${path})`)

        this.remove_EmptyDoc()
        let page = new Page()

        if (path) {
            if (this.paths().indexOf(path) > -1) { 
                //If path = a path in our library of path
                console.warn(`Already open(skipped): ${path}`); 
                return 
            }
            // If path exist => open it
            page = new Page(this.load(path), path)
        }

        this.pages.push(page)
        reporter.go.to_page(this.pages.length - 1)

        //Add a path in our library
        console.log(this.paths())
        localStorage.setItem('paths', JSON.stringify(this.paths()))
    }
    this.load = function (path) {
        console.log(`Load: ${path}`)
    
        let data
        try {
          data = fs.readFileSync(path, 'utf-8')
        } catch (err) {
          console.warn(`Could not load ${path}`)
          return
        }
        return data
      }
    this.remove_EmptyDoc = function () {
        for (const id in this.pages) {
          const page = this.pages[id]
          if (page.text === new EmptyDoc().text) {
            this.pages.splice(0, 1)
            return
          }
        }
    }

    function isJSON (text) {
         try { JSON.parse(text); return true } 
         catch (error) { return false } 
    }


}
module.exports = Project