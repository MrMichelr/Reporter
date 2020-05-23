'use strict'

// REQUIRE
const path = require('path')
const { ipcRenderer } = require ('electron')
const Reporter = require('../reporter')


// CONSTANT
const aside = document.querySelector('aside');
const footer = document.querySelector('footer');
//const spinner = document.querySelector('.spinner');


function Splash() {

    this.reporter = new Reporter()

    // ============================================================================================================
    //  METHODS
    // ============================================================================================================


    this.install = () => {

        this.init_listener()
        this.add_sidebar_content()
        console.log(localStorage)
    }

    // Setup all the listener in the doc
    this.init_listener = () => {

        // Triggers some events
        footer.addEventListener('click', (event) => {
            //open folder
        })

         // Open the window for double-clicked items
        window.addEventListener('dblclick', (e) => {
         const element = e.target.closest('.list-item');

            if (element) {
                console.log('Open ' + element.getAttribute('data-path'))
                ipcRenderer.send('openProject', element.getAttribute('data-path'))
            }
        })
    }

    // ==============================================
    // USEFUL Functions
    // ==============================================


    // Create a new list-item div from the given path and return it.
    this.list_item = (p) => {
        const itemDiv = document.createElement('li');
        const nameDiv = document.createElement('div');
        const pathDiv = document.createElement('div');

        itemDiv.classList.add('list-item')
        itemDiv.setAttribute('data-path', p)

        nameDiv.classList.add('name');
        nameDiv.innerText = path.basename(p, '.mrtxt')

        pathDiv.classList.add('path');
        pathDiv.innerText = path.dirname(p)

        itemDiv.appendChild(nameDiv)
        itemDiv.appendChild(pathDiv)

        return itemDiv
    }
    // Creates and appends a new list-item div for each window
    this.add_sidebar_content = () => {
         // Reset the content.
        aside.innerHTML = '';

        if (localStorage.hasOwnProperty('paths')) {
            //If old documents

            const paths = localStorage
            console.log(paths);
            //FIND A WAY TO SORT LINKS

            if (paths.length === 0) {
            aside.innerHTML = '<div class="no-recent">No Recent Projects</div>';

            } else {
            
            //Create a list
            const list = document.createElement('ul');
            list.classList.add('list');

            for(var i = 0; i < paths.length; i++){
                const item = this.list_item(localStorage.getItem(localStorage.key(i)));
                list.appendChild(item);
            }

            list.children[0].classList.add('active');

            aside.appendChild(list);
            }
        } else {
            aside.innerHTML = '<div class="no-recent">No Recent Projects</div>';
        }


    }



    // ==============================================
    // OTHER Functions
    // ==============================================

}
module.exports = Splash
