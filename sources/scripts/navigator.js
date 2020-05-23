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
    this.el = document.createElement('nav')
    
    

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================

    this.install = (host) => {
        host.appendChild(this.el)
    }

    this.update = () => {
        let html = ''
        const current = this.anchor() // Where I am?

        for (const page_id in reporter.project.pages) {
            const page = reporter.project.pages[page_id]

            // IF NO page
            if (!page) { continue }

            // Make Page List
            html += `<ul class="${reporter.project.index === parseInt(page_id) ? 'active' : ''}">`
            html += this._page(parseInt(page_id), page)

            const anchors = page.anchors()

            // Mahe Anchor List
            for (const i in anchors) {
                const anchor = anchors[i]
                html += this._anchor(page_id, current, anchor, anchors)
            }

            html += '</ul>' // Close the list
        }

        this.el.innerHTML = html
    }

    this.next_page = () => {
        const page = clamp(parseInt(reporter.project.index) + 1, 0, reporter.project.pages.length - 1)
        reporter.go.to_page(page, 0)
    }
    
    this.prev_page = () => {
        const page = clamp(parseInt(reporter.project.index) - 1, 0, reporter.project.pages.length - 1)
        reporter.go.to_page(page, 0)
    }
    // ==============================================
    // CONSTRUCT Functions
    // ==============================================


    this.anchor = () => {
        // IF no page
        if (!reporter.project.page()) { return [] }

        const anchors = reporter.project.page().anchors()
        const pos = reporter.active_line_id()

        //IF NO anchor
        if (anchors.length < 1) { return }

        for (const id in anchors) {
            const anchor = anchors[id]
            if (anchor.line > pos) { return anchors[parseInt(id) - 1] }
        }

        return anchors[anchors.length - 1]
    }
    this._page = function (id, page) {
        // Make the link to the page
        return `<li class='page ${page.has_changes() ? 'changes' : ''}' onclick='reporter.go.to_page(${id})'>${page.name()}</li>`
    }
    this._anchor = function (page_id, current, anchor, anchors) {
        // Make the link to the anchor
        return `<li class='marker ${anchor.type} ${current && current.line === anchor.line ? 'active' : ''}' onclick='reporter.go.to_page(${page_id}, ${anchor.line})'><span>${anchor.text}</span></li>`
      }

    // ==============================================
    // OTHER Functions
    // ==============================================

    
    this.on_scroll = function () {
        const scrollDistance = reporter.textarea.scrollTop
        const scrollMax = reporter.textarea.scrollHeight - reporter.textarea.offsetHeight
        const scrollPerc = Math.min(1, (scrollMax === 0) ? 0 : (scrollDistance / scrollMax))
        const naviOverflowPerc = Math.max(0, (reporter.navi.el.scrollHeight / window.innerHeight) - 1)
    
        reporter.navi.el.style.transform = 'translateY(' + (-100 * scrollPerc * naviOverflowPerc) + '%)'
    }

    function clamp (v, min, max) { return v < min ? min : v > max ? max : v } // Math library ?
}
module.exports = Navigator