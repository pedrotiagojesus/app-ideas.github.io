import { Core } from './core.js';

/**
 * CSV 2 JSON
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 16-03-2024 First time this was introduced.
 */
class JSON2CSV extends Core {

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
    _csvInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _jsonInputEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _alertEmptyFieldEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _alertInvalidDataEl = null;

    /**
     * Holds the CSV value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _csvValue = null;

    /**
     * Holds the JSON value.
     *
     * @property {number}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _jsonValue = null;

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

        // Get csv input
        this._csvInputEl = this._el.querySelector('#csv');

        if (!this._csvInputEl) {
            this.logErr('CSV input not found!');
            return;
        }

        // Get json input
        this._jsonInputEl = this._el.querySelector('#json');

        if (!this._jsonInputEl) {
            this.logErr('JSON input not found!');
            return;
        }

        // Get alert empty field
        this._alertEmptyFieldEl = this._el.querySelector('#empty-field');

        if (!this._alertEmptyFieldEl) {
            this.logErr('Alert empty field not found!');
            return;
        }

        // Get alert invalid data
        this._alertInvalidDataEl = this._el.querySelector('#invalid-data');

        if (!this._alertInvalidDataEl) {
            this.logErr('Alert invalid data not found!');
            return;
        }

        this.onConvert();
        this.onClear();

        this.logInfo('Loaded complete!');

    }

    /**
     * Callback function that handles the convert form.
     *
     * @return {CSV2JSON}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onConvert() {

        const scope = this;

        var btnConvert = this._el.querySelector('button[type="button"][data-tpl="convert"]');

        if (!btnConvert) {
            return;
        }

        btnConvert.addEventListener("click", async function (event) {

            event.preventDefault();

            if (scope._csvInputEl.value == '') {
                scope._alertEmptyFieldEl.classList.remove('d-none');
                return;
            } else {
                scope._alertEmptyFieldEl.classList.add('d-none');
            }

            if (! await scope.validateCsv()) {
                scope._alertInvalidDataEl.classList.remove('d-none');
                return;
            } else {
                scope._alertInvalidDataEl.classList.add('d-none');
            }

            scope._jsonInputEl.value = scope.csvJSON();

        });

        return this;

    }

    validateCsv() {

        var csv = this._csvInputEl.value;
        csv = csv.replaceAll('\'', '');
        csv = csv.replaceAll('"', '');

        var lineArr = csv.split('\n');

        const numCollumn = lineArr[0].split(',').length;

        for (const line of lineArr) {

            // Empty line
            if (line.trim().length === 0) {
                return false;
            }

            const columnArr = line.split(',');

            // Number of columns
            if (columnArr.length !== numCollumn) {
                return false;
            }

            // Empty collumn
            for (const column of columnArr) {

                if (column.trim().length === 0) {
                   return false;
                }
            }
        }

        return true;

    }

    //var csv is the CSV file with headers
    csvJSON(){

        var csv = this._csvInputEl.value;
        csv = csv.replaceAll('\'', '');
        csv = csv.replaceAll('"', '');

        var lineArr = csv.split('\n');

        var result = [];

        var headers = lineArr[0].split(",");

        for(var i=1; i < lineArr.length; i++){

            var obj = {};
            var currentLine = lineArr[i].split(",");

            if (currentLine[0].trim() == '') {
                continue;
            }

            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentLine[j];
            }

            result.push(obj);

        }

        var json = JSON.stringify(result);

        return json;
    }

    /**
     * Callback function that handles the clear csv field.
     *
     * @return {CSV2JSON}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onClear() {

        const scope = this;

        var btnClear = this._el.querySelector('button[type="button"][data-tpl="clear"]');

        if (!btnClear) {
            return;
        }

        btnClear.addEventListener("click", async function (event) {

            event.preventDefault();

            scope._csvInputEl.value = '';
            scope._jsonInputEl.value = '';

            scope._alertEmptyFieldEl.classList.add('d-none');

        });

        return this;

    }

}

export { JSON2CSV };