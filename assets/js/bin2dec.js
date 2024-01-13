import { Core } from './core.js';

/**
 * IMC Calculator
 *
 * Allow the user to know IMC result of the calculation.
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 13-01-2024 First time this was introduced.
 */
class Bin2dec extends Core {

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _el = null;

    /**
     * Holds formulary DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _formEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _binaryInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _decimalInputEl = null;

    /**
     * Holds the binary value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _binaryValue = null;

    /**
     * Holds the decimal value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _decimalValue = null;

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

        this._formEl = this._el.querySelector('form');

        if (!this._formEl) {
            this.logInfo('Formulary not found!');
            return;
        }

        this._binaryInputEl = this._el.querySelector('#binary');

        if (!this._binaryInputEl) {
            this.logInfo('Binary input not found!');
            return;
        }

        this._decimalInputEl = this._el.querySelector('#decimal');

        if (!this._decimalInputEl) {
            this.logInfo('Decimal input not found!');
            return;
        }

        this.onInputBinary();

        this.logInfo('Loaded complete!');

    }

    /**
     * Callback function that handles the input binary.
     *
     * @return {Bin2dec}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputBinary() {

        const scope = this;

        this._binaryInputEl.addEventListener("input", async function (event) {

            event.preventDefault();

            this._binaryValue = this.value;

            if (!await scope.isBinary(this._binaryValue)) {
                scope._binaryInputEl.classList.add('is-invalid');
            } else {
                scope._binaryInputEl.classList.remove('is-invalid');
            }

        });

        return this;

    }

    async isBinary(str) {

        for (let i = 0; i < str.length; i++) {
            if (str[i] == "0" || str[i] == "1") {
            } else {
                return false;
            }
        }

        return true;

    }
}

export { Bin2dec };