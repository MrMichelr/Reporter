/**
 * This is the project controller
 * Save, load, new, etc.
 * It's here ;)
 */

'use strict'

// REQUIRE
const Page = require('./page')



// CONSTANT



function EmptyDoc (){
    // DEPENDENCIES

    // VARIABLES
    this.path = null
    this.text = ''
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    Page.call(this, "Hello World", this.path)

    this.name = () => {
        return 'New Document'
    }
    this.has_changes = function () {
        return false
    }

}
module.exports = EmptyDoc