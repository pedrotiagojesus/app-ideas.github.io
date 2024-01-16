import { Core } from '../core.js';
import { Customer } from './customer.js';

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

        this.logInfo('Loaded complete!');

    }
}

export { FirstDbApp };