import { Core } from './core.js';

// Web page event handlers
const DB_NAME = 'first_db_app';
const DB_VERSION = 1;
const DB_STORE_NAME = 'customer';

/**
 * First DB APP
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 13-01-2024 First time this was introduced.
 */
class FirstDbApp extends Core {


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
    _loadDbEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _clearDbEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _notificationEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _notificationLineTplId = 'tpl-notification-line';

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _customerEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _customerLineTplId = 'tpl-customer-line';

    /**
     * Customer database
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _customerDatabase = null;

    /**
     * Initializes the FirstDbApp.
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

        this.loadElement();
        this.loadDb();

        this.setEventLoadDb();
        this.setEventQueryDb();
        this.setEventClearDb();

        this.logInfo('Loaded complete!');

    }

    loadElement() {

        // cache elements
        this._loadDbEl = this._el.querySelector('#load-db');

        if (this._loadDbEl === undefined || this._loadDbEl === null) {
            this.logErr('Load DB not loaded!');
            exit();
            return;
        }

        this._clearDbEl = this._el.querySelector('#clear-db');

        if (this._clearDbEl === undefined || this._clearDbEl === null) {
            this.logErr('Clear DB not loaded!');
            return;
        }

        this._queryDbEl = this._el.querySelector('#query-db');

        if (this._queryDbEl === undefined || this._queryDbEl === null) {
            this.logErr('Query DB not loaded!');
            return;
        }

        this._notificationEl = this._el.querySelector('#notification-wrapper');

        if (this._notificationEl === undefined || this._notificationEl === null) {
            this.logErr('Notification wrapper not loaded!');
            return;
        }

        this._customerEl = this._el.querySelector('#customer-wrapper');

        if (this._customerEl === undefined || this._customerEl === null) {
            this.logErr('Customer wrapper not loaded!');
            return;
        }
    }

    loadDb() {

        const scope = this;

        return new Promise(function (resolve, reject) {

            if (!window.indexedDB) {
                window.alert(
                    "Your browser doesn't support a stable version of IndexedDB. \
                    Such and such feature will not be available."
                );
            }

            scope.DBOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);
            scope.DBOpenRequest.onupgradeneeded = function (event) {

                const result = event.target.result;

                const objectStore = result.createObjectStore(DB_STORE_NAME, { keyPath: 'userid' });

                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('email', 'email', { unique: false });

                resolve(scope.DBOpenRequest);
            };

            scope.DBOpenRequest.onsuccess = function () {

                scope.db = scope.DBOpenRequest.result;

                scope._loadDbEl.disabled = false;
                scope._queryDbEl.disabled = false;
                scope._clearDbEl.disabled = true;

                resolve(scope.DBOpenRequest);
            };

            scope.DBOpenRequest.onerror = function (event) {
                reject('error opening database ' + event.target.errorCode);
            }

        });
    }

    setEventLoadDb() {

        const scope = this;

        this._loadDbEl.addEventListener("click", async function (event) {

            scope.addNotification(`Start add customer to data basebase table.`);

            // Customers to add to initially populate the database with
            const customerData = [
                { userid: 1, name: 'Ana Oliveira', email: 'ana.oliveira@example.com' },
                { userid: 2, name: 'Carlos Santos', email: 'carlos.santos@example.com' },
                { userid: 3, name: 'Mariana Silva', email: 'mariana.silva@example.com' },
                { userid: 4, name: 'Rui Pereira', email: 'rui.pereira@example.com' },
                { userid: 5, name: 'Sofia Costa', email: 'sofia.costa@example.com' },
                { userid: 6, name: 'Paulo Rodrigues', email: 'paulo.rodrigues@example.com' },
                { userid: 7, name: 'Catarina Almeida', email: 'catarina.almeida@example.com' },
                { userid: 8, name: 'Hugo Martins', email: 'hugo.martins@example.com' },
                { userid: 9, name: 'Lúcia Pereira', email: 'lucia.pereira@example.com' },
                { userid: 10, name: 'Fernando Oliveira', email: 'fernando.oliveira@example.com' },
                { userid: 11, name: 'Marta Santos', email: 'marta.santos@example.com' },
                { userid: 12, name: 'Ricardo Silva', email: 'ricardo.silva@example.com' },
                { userid: 13, name: 'Beatriz Costa', email: 'beatriz.costa@example.com' },
                { userid: 14, name: 'André Rodrigues', email: 'andre.rodrigues@example.com' },
                { userid: 15, name: 'Inês Almeida', email: 'ines.almeida@example.com' },
                { userid: 16, name: 'Diogo Martins', email: 'diogo.martins@example.com' },
                { userid: 17, name: 'Sara Pereira', email: 'sara.pereira@example.com' },
                { userid: 18, name: 'José Santos', email: 'jose.santos@example.com' },
                { userid: 19, name: 'Patrícia Costa', email: 'patricia.costa@example.com' },
                { userid: 20, name: 'Nuno Silva', email: 'nuno.silva@example.com' },
                { userid: 21, name: 'Mónica Oliveira', email: 'monica.oliveira@example.com' },
                { userid: 22, name: 'Gonçalo Rodrigues', email: 'goncalo.rodrigues@example.com' },
                { userid: 23, name: 'Rita Almeida', email: 'rita.almeida@example.com' },
                { userid: 24, name: 'Manuel Costa', email: 'manuel.costa@example.com' },
                { userid: 25, name: 'Isabel Santos', email: 'isabel.santos@example.com' },
            ];

            var transaction = scope.db.transaction(DB_STORE_NAME, 'readwrite');
            var objectStore = transaction.objectStore(DB_STORE_NAME);

            for (const customer of customerData) {

                // Add the current timestamp to IndexedDB.
                await objectStore.put(customer);
                scope.addNotification(`Added customer #${customer.userid} to database table.`);
            }

            scope._loadDbEl.disabled = true;
            scope._queryDbEl.disabled = false;
            scope._clearDbEl.disabled = false;

            scope.addNotification(`All customers added to database table.`);

        });

    }

    setEventClearDb() {

        const scope = this;

        return new Promise(async (resolve, reject) => {

            scope._clearDbEl.addEventListener("click", async function (event) {

                scope.addNotification(`Start deleting all customers from databse.`);

                var transaction = scope.db.transaction(DB_STORE_NAME, 'readwrite');
                var objectStore = transaction.objectStore(DB_STORE_NAME);

                var getAllKeysRequest = await objectStore.getAllKeys();

                getAllKeysRequest.onerror = function (event) {
                    reject('error getting all keys request ' + event.target.errorCode);
                }

                getAllKeysRequest.onsuccess = (event) => {
                    getAllKeysRequest.result.forEach(key => {
                        objectStore.delete(key);
                    });
                }

                scope.clearCustomerData();

                scope._loadDbEl.disabled = false;
                scope._queryDbEl.disabled = false;
                scope._clearDbEl.disabled = true;

                scope.addNotification(`All customers deleted.`);

            });

        });

    }

    setEventQueryDb() {

        const scope = this;

        this._queryDbEl.addEventListener("click", async function (event) {

            scope.addNotification(`Start quering all customers from databse.`);

            var transaction = scope.db.transaction(DB_STORE_NAME, 'readonly');
            var objectStore = transaction.objectStore(DB_STORE_NAME);

            var getAllRequest = await objectStore.getAll();

            getAllRequest.onerror = function (event) {
                reject('error getting all rows request ' + event.target.errorCode);
            }

            getAllRequest.onsuccess = (event) => {

                scope.clearCustomerData();

                getAllRequest.result.forEach(row => {
                    scope.displayCustomerData(row);
                });

                scope._loadDbEl.disabled = true;
                scope._queryDbEl.disabled = false;
                scope._clearDbEl.disabled = false;
            }

            scope.addNotification(`Finished query all customers`);

        });

    }

    addNotification(message = '') {

        var lineTpl = this._el.querySelector(`#${this._notificationLineTplId}`);

        var documentFragment = document.createDocumentFragment();
        var clon = lineTpl.content.cloneNode(true);

        var messageEl = clon.querySelector('[data-tpl="message"]');
        messageEl.innerHTML = message;
        documentFragment.append(clon);

        this._notificationEl.querySelector('tbody').prepend(documentFragment);

    }

    displayCustomerData(customerData) {

        var lineTpl = this._el.querySelector(`#${this._customerLineTplId}`);

        var documentFragment = document.createDocumentFragment();
        var clon = lineTpl.content.cloneNode(true);

        var useridEl = clon.querySelector('[data-tpl="user-id"]');
        useridEl.innerHTML = customerData.userid;

        var userNameEl = clon.querySelector('[data-tpl="user-name"]');
        userNameEl.innerHTML = customerData.name;

        var userEmailEl = clon.querySelector('[data-tpl="user-email"]');
        userEmailEl.innerHTML = customerData.email;

        documentFragment.append(clon);

        this._customerEl.querySelector('tbody').append(documentFragment);

    }

    clearCustomerData() {

        this._customerEl.querySelector('tbody').innerHTML = '';

    }
}

export { FirstDbApp };