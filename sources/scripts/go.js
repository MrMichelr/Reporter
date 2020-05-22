/**
 * This is the navigator controller
 * to switch for doc to doc, line to line, etc.
 */

'use strict'

// REQUIRE


// CONSTANT
const BACK = "\n"


function Go (){
    // DEPENDENCIES

    // VARIABLES
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.to = (from, to) => {

        //If we know the begining and the end of the textarea => select a range
        if (reporter.textarea.setSelectionRange) {
            reporter.textarea.setSelectionRange(from, to)
        }

        reporter.textarea.focus()

        return from === -1 ? null : from // If from is -1 null else return from
    }
    
    this.to_line = (id) => {

        // Split every line in the limit of line needed (id + 1)
        const lineArr = reporter.textarea.value.split(BACK, parseInt(id) + 1)

        //Merge the array and add \n at the end of the lines
        const arrJoin = lineArr.join(BACK)

        //Search the line
        const from = arrJoin.length - lineArr[id].length
        const to = arrJoin.length

        this.to(from, to)
    }

    this.to_page = (id = 0, line = 0) => {
        //Check if the active project is between 0 and the number of pages
        reporter.project.index = clamp(parseInt(id), 0, reporter.project.pages.length - 1)
        console.log(`Go to page:${reporter.project.index}/${reporter.project.pages.length}`)

        const page = reporter.project.page()

        //Check if the page exist
        if (!page) { console.warn('Missing page', this.index); return }

        reporter.load(page.text)
        reporter.go.to_line(line)
        reporter.update()
    }

    
    function clamp (v, min, max) { return v < min ? min : v > max ? max : v } // Math library ?
}
module.exports = Go