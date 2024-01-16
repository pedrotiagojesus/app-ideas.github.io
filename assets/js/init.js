import { Bin2dec } from './bin2dec.js';
import { BorderRadius } from './border-radius.js';
import { Calculator } from './calculator.js';
import { FirstDbApp } from './first-db-app/init.js';

(function () {

    new Bin2dec('bin2dec', 'Bin2dec');
    new BorderRadius('border-radius', 'Border-radius Previewer');
    new Calculator('calculator', 'Calculator');
    new FirstDbApp('first-db-app', 'First DB App');

}());