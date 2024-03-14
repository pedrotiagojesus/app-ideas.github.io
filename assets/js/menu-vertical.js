import { Core } from './core.js';

// Web page event handlers
const DB_NAME = 'app_ideas';
const DB_VERSION = 1;
const DB_STORE_NAME = 'project';

/**
 * Menu Verical
 *
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 23-01-2024 First time this was introduced.
 */
class MenuVertical extends Core {

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _el = null;

    DBOpenRequest = null;
    db = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _menuEntryplId = 'tpl-menu-entry';

    /**
     * Initializes the Menu Vertical.
     *
     * @returns {void}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    constructor(id = '', name = '') {

        super(id, name);

        // cache elements
        this._el = document.getElementById(id);

        if (this._el === undefined || this._el === null) {
            this.logInfo('Class not loaded!');
            return;
        }

        this.logInfo('Loading...');

        this.loadDb();

        this.logInfo('Loaded complete!');

    }

    loadDb() {

        const scope = this;

        return new Promise(async (resolve, reject) => {

            if (!window.indexedDB) {
                window.alert(
                    "Your browser doesn't support a stable version of IndexedDB. \
                    Such and such feature will not be available."
                );
            }

            scope.DBOpenRequest = await indexedDB.open(DB_NAME, DB_VERSION);
            scope.DBOpenRequest.onupgradeneeded = function (event) {

                const result = event.target.result;

                const objectStore = result.createObjectStore(DB_STORE_NAME, { keyPath: 'project_id' });

                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('link', 'link', { unique: false });
                objectStore.createIndex('disabled', 'disabled', { unique: false });

                resolve(scope.DBOpenRequest);
            };

            scope.DBOpenRequest.onsuccess = function () {

                scope.db = scope.DBOpenRequest.result;

                resolve(scope.DBOpenRequest);

                scope.insertData();
            };

            scope.DBOpenRequest.onerror = function (event) {
                reject('error opening database ' + event.target.errorCode);
            }

        });
    }

    async insertData() {

        const scope = this;

        return new Promise(async (resolve, reject) => {

            fetch('./app-ideas.json')
            .then((response) => response.json())
            .then((json) => console.log(json));

            // Customers to add to initially populate the database with
            const projectData = [
                { project_id: 1, name: 'Bin2Dec', link: './bin2dec.html', disabled: false },
                { project_id: 2, name: 'Border Radius Previewer', link: './border-radius.html', disabled: false },
                { project_id: 3, name: 'Calculator', link: './calculator.html', disabled: false },
                { project_id: 4, name: 'Christmas Lights', link: './christmas-lights.html', disabled: true },
                { project_id: 5, name: 'Cause Effect APP', link: './cause-effect.html', disabled: true },
                { project_id: 6, name: 'Color Cycle', link: './color-cycle.html', disabled: true },
                { project_id: 7, name: 'Countdown Timer', link: './countdown-timer.html', disabled: true },
                { project_id: 8, name: 'CSV2JSON APP', link: './csv-json.html', disabled: true },
                { project_id: 9, name: 'Dollars to Cents', link: './dollar-cent.html', disabled: true },
                { project_id: 10, name: 'Dynamic CSS Variables', link: './dynamic-css-variable.html', disabled: true },
                { project_id: 11, name: 'First BD APP', link: './first-db-app.html', disabled: false },
                { project_id: 12, name: 'Hello APP', link: './hello-app.html', disabled: false },
            ];

            var transaction = scope.db.transaction(DB_STORE_NAME, 'readwrite');
            var objectStore = transaction.objectStore(DB_STORE_NAME);

            for (const project of projectData) {

                // Add the current timestamp to IndexedDB.
                await objectStore.put(project);

                scope.displayMenuEntry(project);
            }

        });
    }

    async displayMenuEntry(project) {

        const scope = this;

        return new Promise(async (resolve, reject) => {

            var lineTpl = scope._el.querySelector(`#${scope._menuEntryplId}`);

            var documentFragment = document.createDocumentFragment();
            var clon = lineTpl.content.cloneNode(true);

            var aEl = clon.querySelector('a');
            aEl.href = project.link;

            if (project.disabled) {
                aEl.classList.add('disabled');
            }

            aEl.innerHTML = project.name;

            documentFragment.append(clon);

            this._el.querySelector('#menu-vertical-content').append(documentFragment);

        });
    }
}

export { MenuVertical };