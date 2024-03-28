import { Core } from './core.js';

/**
 * Projects
 *
 * Load JSON with the project data and display in menu and homepage.
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 14-02-2024 First time this was introduced.
 */
class Project extends Core {

    /**
     * Initializes the Menu Vertical.
     *
     * @returns {void}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    constructor() {

        super();

        this.homepage();
        this.verticalMenu();

    }

    async homepage() {

        const wrapper = document.querySelector('#homepage');

        if (wrapper) {

            var projectData = [];

            // Load JSON with the projects to display in menu vertical
            await fetch('./assets/js/project.json')
                .then((response) => response.json())
                .then((json) => projectData = json);


            for (const project of projectData) {

                var htmlTpl = wrapper.querySelector(`#tpl-homepage-entry`);

                var documentFragment = document.createDocumentFragment();
                var clon = htmlTpl.content.cloneNode(true);

                var anchorEl = clon.querySelector('[data-tpl="url"]');
                anchorEl.href = project.link;

                if (project.disabled) {
                    anchorEl.classList.add('disabled');
                }

                var nameEl = clon.querySelector('[data-tpl="name"]');
                nameEl.innerHTML = project.name;

                var descriptionEl = clon.querySelector('[data-tpl="description"]');
                descriptionEl.innerHTML = project.description;

                documentFragment.append(clon);

                wrapper.querySelector('#homepage-content').append(documentFragment);

            }

        }

        return;

    }

    async verticalMenu() {

        const wrapper = document.querySelector('#menu-vertical');

        if (wrapper) {

            var projectData = [];

            // Load JSON with the projects to display in menu vertical
            await fetch('./assets/js/project.json')
                .then((response) => response.json())
                .then((json) => projectData = json);


            for (const project of projectData) {

                var htmlTpl = wrapper.querySelector(`#tpl-menu-entry`);

                var documentFragment = document.createDocumentFragment();
                var clon = htmlTpl.content.cloneNode(true);

                var aEl = clon.querySelector('a');
                aEl.href = project.link;

                if (project.disabled) {
                    aEl.classList.add('disabled');
                }

                aEl.innerHTML = project.name;

                documentFragment.append(clon);

                wrapper.querySelector('#menu-vertical-content').append(documentFragment);

            }

        }

        return;

    }


}

export { Project };