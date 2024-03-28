import { Project } from './project.js';
import { Bin2dec } from './bin2dec.js';
import { BorderRadius } from './border-radius.js';
import { Calculator } from './calculator.js';
import { FirstDbApp } from './first-db-app.js';
import { HelloApp } from './hello-app.js';
import { DollarsToCents } from './dollars-to-cents.js';
import { CSV2JSON } from './csv2json.js';
import { JSON2CSV } from './json2csv.js';

(function () {

    new Project();

    new Bin2dec('bin2dec', 'Bin2dec');
    new BorderRadius('border-radius', 'Border-radius Previewer');
    new Calculator('calculator', 'Calculator');
    new FirstDbApp('first-db-app', 'First DB App');
    new HelloApp('hello-app', 'Hello APP');
    new DollarsToCents('dollars-to-cents', 'Dollars to Cents');
    new CSV2JSON('csv-2-json', 'CSV 2 JSON');
    new JSON2CSV('json-2-csv', 'JSON 2 CSV');

}());