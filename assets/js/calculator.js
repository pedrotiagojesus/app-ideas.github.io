import { Core } from './core.js';

/**
 * Calculator
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 13-01-2024 First time this was introduced.
 */
class Calculator extends Core {

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
    _padEl = null;

    /**
     * Holds a reference to the DOM element object.
     *
     * @property {element}
     * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
     */
    _displayEl = {
        'accumulator': null,
        'total': null
    };

    count = [];

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

        this._padEl = this._el.querySelectorAll('.pad .btn');

        if (!this._padEl) {
            this.logErr('Pad button not found!');
            return;
        }

        this._displayEl.accumulator = this._el.querySelector('.display .accumulator');

        if (!this._displayEl.accumulator) {
            this.logErr('Display accumulator not found!');
            return;
        }

        this._displayEl.total = this._el.querySelector('.display .total');

        if (!this._displayEl.total) {
            this.logErr('Display total not found!');
            return;
        }

        this.setEventPad();

        this.logInfo('Loaded complete!');

    }

    setEventPad() {

        const scope = this;

        this._padEl.forEach(element => {

            element.addEventListener("click", function (event) {

                var total = scope._displayEl.total.innerHTML;
                var accumulator = scope._displayEl.accumulator.innerHTML;

                switch (this.value) {

                    case 'C':

                        if (total == '') {
                            accumulator = '';
                            scope.count = [];
                        }

                        total = total.substring(0, total.length - 1);

                        break;

                    case 'AC':
                        total = '';
                        accumulator = '';
                        scope.count = [];
                        break;

                    case '*':
                    case '/':
                    case '+':
                    case '-':

                        if (total == '') {
                            return;
                        }

                        scope.count.push(Number(total));
                        scope.count.push(this.value);

                        total += this.value;
                        accumulator += total;
                        total = '';
                        break;

                    case '=':

                        scope.count.push(Number(total));

                        total += this.value;
                        accumulator += total;
                        total = scope.calculate();

                        break;

                    case '%':

                        total = total / 100;
                        break;

                    default:
                        total += this.value;
                        break;
                }

                scope._displayEl.total.innerHTML = total.toString().substring(0, 8);
                scope._displayEl.accumulator.innerHTML = accumulator;

            });

        });

    }

    calculate() {
        let action = null
        let current = null

        let total = 0;

        if (isNaN(this.count[this.count.length - 1])) {
            this.count.pop()
        }

        this.count.forEach(n => {
            if (!isNaN(n)) {
                if (current == null) {
                    current = n
                } else {
                    total += this.processAction(current, n, action)
                    current = null
                }
            } else {
                action = n
            }
        })

        if (current != null) {
            total = this.processAction(total, current, action)
        }

        if (total.toString().length > 8) {
            total = 'ERR';
        }

        this.count = []
        return total;
    }

    processAction(num1, num2, action) {

        switch (action) {
            case '+': return num1 + num2
            case '-': return num1 - num2
            case '*': return num1 * num2
            case '/': return num1 / num2
        }
    }
}



export { Calculator };