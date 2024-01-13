import { Core } from './core.js';

/**
 * Border radius
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 13-01-2024 First time this was introduced.
 */
class BorderRadius extends Core {

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _el = null;

    /**
     * Holds object of border radius.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _borderRadius = {
        'top': {
            'left': {
                'el': null,
                'value': 0
            },
            'right': {
                'el': null,
                'value': 0
            }
        },
        'bottom': {
            'left': {
                'el': null,
                'value': 0
            },
            'right': {
                'el': null,
                'value': 0
            }
        }
    };

    /**
     * Holds object of preview.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _preview = {
        'el': null
    };

    /**
     * Holds object of display code.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _displayCode = {
        'el': null
    };

    /**
     * Initializes the BorderRadius.
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

        /**
         * Border radius top left
         */
        this._borderRadius.top.left.el = this._el.querySelector('#border-radius-top-left');

        if (!this._borderRadius.top.left.el) {
            this.logInfo('Border radius top left not found!');
            return;
        }

        this._borderRadius.top.left.value = this._borderRadius.top.left.el.value;

        /**
         * Border radius top right
         */
        this._borderRadius.top.right.el = this._el.querySelector('#border-radius-top-right');

        if (!this._borderRadius.top.right.el) {
            this.logInfo('Border radius top right not found!');
            return;
        }

        this._borderRadius.top.right.value = this._borderRadius.top.right.el.value;

        /**
         * Border radius bottom right
         */
        this._borderRadius.bottom.right.el = this._el.querySelector('#border-radius-bottom-right');

        if (!this._borderRadius.bottom.right.el) {
            this.logInfo('Border radius bottom right not found!');
            return;
        }

        this._borderRadius.bottom.right.value = this._borderRadius.bottom.right.el.value;

        /**
         * Border radius bottom left
         */
        this._borderRadius.bottom.left.el = this._el.querySelector('#border-radius-bottom-left');

        if (!this._borderRadius.bottom.left.el) {
            this.logInfo('Border radius bottom left not found!');
            return;
        }

        this._borderRadius.bottom.left.value = this._borderRadius.bottom.left.el.value;

        this._preview.el = this._el.querySelector('#preview');

        if (!this._preview.el) {
            this.logInfo('Border radius preview not found!');
            return;
        }

        this._displayCode.el = this._el.querySelector('#display-code pre');

        if (!this._displayCode.el) {
            this.logInfo('Display code of border radius not found!');
            return;
        }

        this.updatePreview()

        this.onInputBrTopLeft();
        this.onInputBrTopRight();
        this.onInputBrBottomRight();
        this.onInputBrBottomLeft();

        this.logInfo('Loaded complete!');


    }

    /**
     * Callback function that handles the border radius top left.
     *
     * @return {BorderRadius}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputBrTopLeft() {

        const scope = this;

        this._borderRadius.top.left.el.addEventListener("input", function (event) {

            this.value = parseFloat(scope.stripNonNumeric(this.value));

            if (this.value == '') {
                this.value = 0;
            }

            scope._borderRadius.top.left.value = this.value;

            scope.updatePreview()

        });

        return this;

    }

    /**
     * Callback function that handles the border radius top right.
     *
     * @return {BorderRadius}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputBrTopRight() {

        const scope = this;

        this._borderRadius.top.right.el.addEventListener("input", function (event) {

            this.value = parseFloat(scope.stripNonNumeric(this.value));

            if (this.value == '') {
                this.value = 0;
            }

            scope._borderRadius.top.right.value = this.value;

            scope.updatePreview()

        });

        return this;

    }

    /**
     * Callback function that handles the border radius bottom right.
     *
     * @return {BorderRadius}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputBrBottomRight() {

        const scope = this;

        this._borderRadius.bottom.right.el.addEventListener("input", function (event) {

            this.value = parseFloat(scope.stripNonNumeric(this.value));

            if (this.value == '') {
                this.value = 0;
            }

            scope._borderRadius.bottom.right.value = this.value;

            scope.updatePreview()

        });

        return this;

    }

    /**
     * Callback function that handles the border radius bottom left.
     *
     * @return {BorderRadius}
     * @author Pedro Jesus <pedro.jesus@magicbrain.pt>
     */
    onInputBrBottomLeft() {

        const scope = this;

        this._borderRadius.bottom.left.el.addEventListener("input", function (event) {

            this.value = parseFloat(scope.stripNonNumeric(this.value));

            if (this.value == '') {
                this.value = 0;
            }

            scope._borderRadius.bottom.left.value = this.value;

            scope.updatePreview()

        });

        return this;

    }

    updatePreview() {

        var borderRadiusArr = [
            this._borderRadius.top.left.value + 'px',
            this._borderRadius.top.right.value + 'px',
            this._borderRadius.bottom.right.value + 'px',
            this._borderRadius.bottom.left.value + 'px',
        ]

        var borderRadius = borderRadiusArr.join(' ');

        if (borderRadiusArr.every(elemento => elemento === borderRadiusArr[0])) {
            borderRadius = [...new Set(borderRadiusArr)];
        }

        this._preview.el.style.borderRadius = borderRadius;
        this._displayCode.el.innerHTML = 'border-radius: ' + borderRadius;

    }

    stripNonNumeric(value) {
        return Number(value.replace(/\D+/g, ''));
    }
}

export { BorderRadius };