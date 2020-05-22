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

        // If nothing in the queue of pages => create the default doc
        if (this.pages.length === 0) {
            this.pages.push(new EmptyDoc)
        }

    }

    this.update = () => {
        // If no page => Missing page => return;
        
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

        setTimeout(() => {left.textarea_el.focus() }, 200) // Add a page change
    }
    this.open = () => {}
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
            title: "Save a MR Text",
            message: "message test", //MacOS only
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
    this.close = () => {}
    this.quit = () => {}
    this.quit_dialog = () => {}

    // ==============================================
    // OTHER Functions
    // ==============================================

    this.has_changes = function () {
        for (const id in this.pages) {
          if (this.pages[id].has_changes()) { return true }
        }
        return false
    }


}
module.exports = Project