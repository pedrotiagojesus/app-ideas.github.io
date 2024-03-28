import { Core } from './core.js';

/**
 * Dollars to Cents
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 16-03-2024 First time this was introduced.
 */
class DollarsToCents extends Core {

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
    _dollarInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _centInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _quarterInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _dimeInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _nickelInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _pennyInputEl = null;

    /**
     * Holds the dollar value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _dollarValue = null;

    /**
     * Holds the cent value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _centValue = null;

    /**
     * Initializes the Bin2dec.
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

        // Get dollar input
        this._dollarInputEl = this._el.querySelector('#dollar');

        if (!this._dollarInputEl) {
            this.logErr('Dollar input not found!');
            return;
        }

        // Get cent input
        this._centInputEl = this._el.querySelector('#cent');

        if (!this._centInputEl) {
            this.logErr('Cent input not found!');
            return;
        }

        // Get quarter input
        this._quarterInputEl = this._el.querySelector('#quarter');

        if (!this._quarterInputEl) {
            this.logErr('Quarter input not found!');
            return;
        }

        // Get dimme input
        this._dimeInputEl = this._el.querySelector('#dime');

        if (!this._dimeInputEl) {
            this.logErr('Dime input not found!');
            return;
        }

        // Get nickel input
        this._nickelInputEl = this._el.querySelector('#nickel');

        if (!this._nickelInputEl) {
            this.logErr('Nickel input not found!');
            return;
        }

        // Get penny input
        this._pennyInputEl = this._el.querySelector('#penny');

        if (!this._pennyInputEl) {
            this.logErr('Penny input not found!');
            return;
        }

        // Set event input dollar
        this.onInputDollar();

        this.logInfo('Loaded complete!');

    }

    /**
     * Callback function that handles the input dollar.
     *
     * @return {DollarsToCents}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputDollar() {

        const scope = this;

        this._dollarInputEl.addEventListener("input", async function (event) {

            event.preventDefault();

            scope._dollarValue = this.value;

            scope._centValue = scope.convertDollarToCent();
            scope._centInputEl.value = scope._centValue;

            scope.splitCoins();

        });

        return this;

    }

    convertDollarToCent() {

        var value = (this._dollarValue + '').replace(/[^\d.-]/g, '');

        if (value && value.includes('.')) {
          value = value.substring(0, value.indexOf('.') + 3);
        }

        return value ? Math.round(parseFloat(value) * 100) : 0;
    }

    splitCoins() {

        var penny = 0;
        var nickel = 0;
        var dime = 0;
        var quarter = 0;
        var balance = 0;

        quarter = Math.floor(this._centValue / 25);
        balance = this._centValue % 25;

        this._quarterInputEl.value = quarter;

        dime = Math.floor(balance / 10);
        balance = balance % 10;

        this._dimeInputEl.value = dime;

        nickel = Math.floor(balance / 5);
        balance = balance % 5;

        this._nickelInputEl.value = nickel;

        penny = Math.floor(balance / 1);

        this._pennyInputEl.value = penny;

    }

}



export { DollarsToCents };