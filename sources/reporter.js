/**
 * This doc is the controller for every scripts
 */

'use strict'

// REQUIRE
const Project = require('./scripts/project')
const Go = require('./scripts/go')
const AppMenu = require('./scripts/menu')
const Navigator = require('./scripts/navigator')


// CONSTANT
const BACK = "\n"


function Reporter (){
    // DEPENDENCIES
    this.project = new Project()
    this.go = new Go()
    this.menu = new AppMenu()
    this.navigator = new Navigator()

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
            this.update()
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

        // Find selection
        this.selection.word = this.active_word()
        this.selection.url = this.active_url()

        console.log (this.selected())

        // Update dependencies
        this.project.update()
    }

    this.load = (text) => {
        this.textarea.value = text || ''
        this.update()
    }
    this.reload = (force = false) => {
        this.project.page().reload(force)
        this.load(this.project.page().text)
    }

    this.reset = () => {
        //this.theme.reset()
        //this.font.reset()
        this.update()
    }

    // ==============================================
    // Location Functions
    // ==============================================
    
    this.active_line = () => {
        const lines = this.textarea.value.split(BACK)
        return lines[this.active_line_id()]
    }
    this.active_line_id = () => {
        const textCtnt = this.textarea.value.substr(0, this.textarea.selectionEnd)
        const numberOfLines = textCtnt.split(BACK)

        return numberOfLines.length - 1
    }
    this.active_url = () => {
        const words = this.active_line().split(' ')

        for (const id in words) {
            //search a web identifier
            if (words[id].indexOf("://") > -1 || words[id].indexOf("www.") > -1){
                return word[id]
            }
        }
        return null
    }
    this.active_word = () => {
        const letter = this.active_word_location()

        return this.textarea.value.substr(letter.from, letter.to)
    }
    this.active_word_location = (pos = this.textarea.selectionEnd) => {
        let from = pos - 1

        // Find beginning of the word
        // Search a non-letter character
        while (from > 0) {
            const char = this.textarea.value[from]
            if(!char || !char.match(/[a-z]/i)) { break }

            from -= 1
        }

        let to = from + 1
        // Find end of the word
        // Search the next non-letter character
        while (to < from + 30) {
            const char = this.textarea.value[to]
            if(!char || !char.match(/[a-z]/i)) { break }

            to += 1
        }

        return { from: from, to: to }
    }
    this.selected = () => {
        const from = this.textarea.selectionStart
        const to = this.textarea.selectionEnd
        const length = to - from
        return this.textarea.value.substr(from, length)
    }
    this.prev_character = () => {
        const l = this.active_word_location()
        return this.textarea.value.substr(l.from - 1, 1)
    }

    // ==============================================
    // USEFUL Functions
    // ==============================================

    this.find = (word) => {
        const text = this.textarea.value.toLowerCase()
        const parts = text.split(word.toLowerCase())
        const a = []
        let sum = 0
    
        for (const id in parts) {
          const p = parts[id].length
          a.push(sum + p)
          sum += p + word.length
        }
    
        a.splice(-1, 1)
    
        return a
    }
    this.replace_exp = (word) => {

    }

}
module.exports = Reporter