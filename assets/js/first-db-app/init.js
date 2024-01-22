import { Core } from '../core.js';
import { Customer } from './customer.js';

// Web page event handlers
const DBNAME = 'first_db_app';

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

        // cache elements
        this._loadDbEl = this._el.querySelector('#load-db');

        if (this._loadDbEl === undefined || this._loadDbEl === null) {
            this.logErr('Load DB not loaded!');
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

        this._customerDatabase = new Customer(DBNAME);

        this.setEventLoadDb();
        this.setEventClearDb();

        this.logInfo('Loaded complete!');

    }

    setEventLoadDb() {

        const scope = this;

        this._loadDbEl.addEventListener("click", function (event) {

            scope.log('Load the Customers database');
            scope.addNotification(`Load the Customers database`);

            // Customers to add to initially populate the database with
            const customerData = [
                {
                    userid: '444',
                    name: 'Bill',
                    email: 'bill@company.com'
                },
                {
                    userid: '555',
                    name: 'Donna',
                    email: 'donna@home.org'
                }
            ];

            scope._customerDatabase.initialLoad(customerData);
            scope._customerDatabase.bulkAddCustomer(customerData);

            scope.log('Customers loaded');
            scope.addNotification(`Customers loaded`);

        });

    }

    setEventClearDb() {

        const scope = this;

        this._clearDbEl.addEventListener("click", function (event) {

            scope.log('Delete all rows from the Customers database');
            scope.addNotification(`Delete all rows from the Customers database`);

            scope._customerDatabase.removeAllRows();

            scope.log('Customers clear');
            scope.addNotification(`Customers clear`);

        });

    }

    setEventQueryDb() {

        const scope = this;

        this._queryDbEl.addEventListener("click", function (event) {

            scope.log('Start query all customers');
            scope.addNotification(`Start query all customers`);

            // scope._customerDatabase.removeAllRows();

            scope.log('Finished query all customers');
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

        this._notificationEl.querySelector('tbody').append(documentFragment);

    }

    displayCustomer(customerData) {

        var lineTpl = this._el.querySelector(`#${this._customerLineTplId}`);

        var documentFragment = document.createDocumentFragment();
        var clon = lineTpl.content.cloneNode(true);

        var userIdEl = clon.querySelector('[data-tpl="user-id"]');
        userIdEl.innerHTML = customerData.userid;

        var userNameEl = clon.querySelector('[data-tpl="user-name"]');
        userNameEl.innerHTML = customerData.name;

        var userEmailEl = clon.querySelector('[data-tpl="user-email"]');
        userEmailEl.innerHTML = customerData.email;

        documentFragment.append(clon);

        this._customerEl.querySelector('tbody').append(documentFragment);

    }
}

export { FirstDbApp };