/**
 * This is the counter doc
 * number of word, % of scroll, etc.
 * It's here ;)
 */

'use strict'

// REQUIRE


// CONSTANT
const BACK = "\n"


function Informator (){
    // DEPENDENCIES

    // VARIABLES
    this.el = document.createElement('stats')
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.install = () => {
        document.getElementsByTagName("footer")[0].appendChild(this.el)
    }
    this.update = () => {
        if (reporter.selection.url) {
            console.log('url')
            this.el.innerHTML = this._url()
        }else if (reporter.textarea.selectionStart !== reporter.textarea.selectionEnd) {
            this.el.innerHTML = this._selection()
        }else {
            this._default()
        }
    }


    // ==============================================
    // CONSTRUCT Functions
    // ==============================================


    this._default = () => {
        const stats = this.parse(reporter.selected())
        let html = stats.line + 'l'
        html += stats.word + 'w'
        html += stats.char + 'c'
        html += stats.percent + '%'

        return html
    }
    this._selection = () => {
        // [0, 0] 
        return `<b>[${reporter.textarea.selectionStart},${reporter.textarea.selectionEnd}]</b> ${this._default()}`
    }
    this._url = () => {
        let html = 'Open '
        html += `<b onclick="alert('You have clicked the circle.')">` + reporter.selection.url + '</b>'
        return html
      }

    // ==============================================
    // OTHER Functions
    // ==============================================


    this.parse = (text = reporter.textarea.value) => {
        text = text.trim() //Del begin & end space

        const stats = {}
        stats.line = text.split(BACK).length
        stats.word = text.split(" ").length
        stats.char = text.length
        stats.percent = stats.char > 0 ? clamp((reporter.textarea.selectionEnd / stats.char) * 100, 0, 100).toFixed(2) : 0
        return stats
    }

    function clamp (v, min, max) { return v < min ? min : v > max ? max : v } // Math library ?

}
module.exports = Informator