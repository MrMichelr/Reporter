/**
 * This is the Default doc
 */

'use strict'

// REQUIRE
const Page = require('./page')



// CONSTANT



function EmptyDoc (){
    // DEPENDENCIES

    // VARIABLES
    this.path = null
    this.text = "Hello World"
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    Page.call(this, this.text, this.path)

    this.name = () => {
        return 'Welcome to Reporter'
    }
    this.has_changes = function () {
        return false
    }

}
module.exports = EmptyDoc