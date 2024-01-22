import { Core } from './core.js';

/**
 * BIN to Dec
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
            this.logErr('Formulary not found!');
            return;
        }

        this._binaryInputEl = this._el.querySelector('#binary');

        if (!this._binaryInputEl) {
            this.logErr('Binary input not found!');
            return;
        }

        this._decimalInputEl = this._el.querySelector('#decimal');

        if (!this._decimalInputEl) {
            this.logErr('Decimal input not found!');
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

            scope._binaryValue = this.value;

            if (!await scope.isBinary()) {
                scope._binaryInputEl.classList.add('is-invalid');
                scope._decimalValue = null;
                scope.updateDecimal();
                return;
            }

            scope._binaryInputEl.classList.remove('is-invalid');

            if (scope._binaryValue != '') {
                scope._decimalValue = scope.convertBin2Dec();
            } else {
                scope._decimalValue = '';
            }

            scope.updateDecimal();

        });

        return this;

    }

    updateDecimal() {

        this._decimalInputEl.value = this._decimalValue;

    }

    convertBin2Dec() {

        var binary = this._binaryValue.split('').reverse();
        var decimal = 0;

        for (let i = 0; i < binary.length; i++) {


            decimal += Number(binary[i] * (2 ** i));

        }

        return decimal;
    }

    async isBinary() {

        var str = this._binaryValue;

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