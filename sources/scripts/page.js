/**
 * This is the Page Object
 */

'use strict'

// REQUIRE



// CONSTANT
const BACK = "\n"


function Page (text = '', path = null){
    // DEPENDENCIES

    // VARIABLES
    this.text = text.replace(/\r?\n/g, '\n') // We search All matches (g) for end line and go to the line
    this.path = path
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.name = () => {
        // IF no path => name = Untitled
        if (!this.path) { return 'Untitled' }

        // We check the path, we replace '\' by '/' and we split every parts
        const parts = this.path.replace(/\\/g, '/').split('/')
        return parts[parts.length - 1]
    }

    this.has_changes = () => {
        // IF it's not a save file (no path) 
        // AND IF The text exist => there are changes
        if (!this.path) {
            if (this.text && this.text.length > 0) { return true }
            return false
        }

        //If it's a load file => check if the text is the same
        //return this.load() !== this.text
    }
    
    this.commit = (text = reporter.textarea.value) => {
        this.text = text
        console.log(text)
    }

    this.load = function () {
        if (!this.path) { return }
        
        let data
        try {
          data = fs.readFileSync(this.path, 'utf-8')
        } catch (err) {
          this.path = null
          return
        }
        return data
      }

    this.reload = function (force = false) {
        if (!this.path) { return }
    
        if (!this.has_changes() || force) {
            //If This a non change or force = true => commit
          this.commit(this.load())
        }
      }

}
module.exports = Page