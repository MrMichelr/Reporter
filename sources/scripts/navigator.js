/**
 * This is the navigation controller
 * move, change, etc.
 * It's here ;)
 */

'use strict'

// REQUIRE



// CONSTANT



function Navigator (){
    // DEPENDENCIES

    // VARIABLES

    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.next_page = () => {
        const page = clamp(parseInt(reporter.project.index) + 1, 0, reporter.project.pages.length - 1)
        reporter.go.to_page(page, 0)
    }
    
    this.prev_page = () => {
        const page = clamp(parseInt(reporter.project.index) - 1, 0, reporter.project.pages.length - 1)
        reporter.go.to_page(page, 0)
    }


    function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}
module.exports = Navigator