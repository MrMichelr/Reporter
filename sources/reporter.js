/**
 * This doc is the controller for every scripts
 */

'use strict'

// REQUIRE
const Project = require('./scripts/project')
const Go = require('./scripts/go')
const AppMenu = require('./scripts/menu')


// CONSTANT



function Reporter (){
    // DEPENDENCIES
    this.project = new Project()
    this.go = new Go()
    this.menu = new AppMenu()

    // VARIABLES
    this.textarea = document.createElement('textarea')
    this.selection = {word: null, index: 1}

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.install = (host = document.getElementsByTagName("main")[0]) => {
        //Install Menu
        this.menu.install()

        // Add a text area inside our main
        host.appendChild(this.textarea)

        host.className = window.location.hash.replace('#', '')

        // Add some attributes
        this.textarea.setAttribute('autocomplete', 'off')
        this.textarea.setAttribute('autocorrect', 'off')
        this.textarea.setAttribute('autocapitalize', 'off')
        this.textarea.setAttribute('spellcheck', 'false')
        this.textarea.setAttribute('type', 'text')
        
        // Triggers some events
        this.textarea.addEventListener('scroll', (event) => {

        })

        this.textarea.addEventListener('select', (event) => {

        })

        this.textarea.addEventListener('input', (event) => {
            this.project.page().commit()
        })

        //Install Theme

    }

    this.start = () => {
        // Start Dependencies
        this.project.start()

        this.go.to_page()

        // Setup the cursor
        this.textarea.focus()
        this.textarea.setSelectionRange(0, 0)

        // Call Important Update
        this.update()
    }

    this.update = () => {

        // Update dependencies
        this.project.update()
    }

    this.load = (text) => {
        this.textarea.value = text || ''
        this.update()
    }
    this.reload = function (force = false) {
        this.project.page().reload(force)
        this.load(this.project.page().text)
    }

}
module.exports = Reporter