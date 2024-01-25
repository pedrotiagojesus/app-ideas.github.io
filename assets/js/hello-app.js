import { Core } from './core.js';

/**
 * Hello APP
 *
 * @author Pedro Jesus <pedrotiagojesus1995@gmail.com>
 * @since 13-01-2024 First time this was introduced.
 */
class HelloApp extends Core {

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
    _map = null;

    _countryList = [
        {
            "iso2": "sk",
            "lat": 48.145892,
            "lng": 17.107137
        },
        {
            "iso2": "uk",
            "lat": 51.511214,
            "lng": -0.119824
        },
        {
            "iso2": "ru",
            "lat": 55.755826,
            "lng": 37.617300
        },
        {
            "iso2": "jp",
            "lat": 35.689487,
            "lng": 139.691706
        },
        {
            "iso2": "fr",
            "lat": 48.856614,
            "lng": 2.352222
        },
        {
            "iso2": "af",
            "lat": 34.528455,
            "lng": 69.171703
        },
        {
            "iso2": "au",
            "lat": -35.282000,
            "lng": 149.128684
        },
        {
            "iso2": "ne",
            "lat": 13.512668,
            "lng": 2.112516,
        },
        {
            "iso2": "ca",
            "lat": 45.421530,
            "lng": -75.697193,
        },
        {
            "iso2": "us",
            "lat": 38.907231,
            "lng": -77.036464
        },
        {
            "iso2": "cn",
            "lat": 39.904030,
            "lng": 116.407526
        },
        {
            "iso2": "br",
            "lat": -15.792110,
            "lng": -47.897751
        },
        {
            "iso2": "mx",
            "lat": 19.432608,
            "lng": -99.133208
        },
        {
            "iso2": "cl",
            "lat": -33.469120,
            "lng": -70.641997
        },
        {
            "iso2": "co",
            "lat": 4.570868,
            "lng": -74.297333
        },
        {
            "iso2": "za",
            "lat": -25.731340,
            "lng": 28.218370
        },
        {
            "iso2": "ke",
            "lat": -1.292066,
            "lng": 36.821946
        },
        {
            "iso2": "eg",
            "lat": 30.044420,
            "lng": 31.235712
        },
        {
            "iso2": "id",
            "lat": -6.208763,
            "lng": 106.845599
        },
        {
            "iso2": "sa",
            "lat": 24.711667,
            "lng": 46.724167
        },
        {
            "iso2": "in",
            "lat": 28.635308,
            "lng": 77.224960
        },
        {
            "iso2": "pt",
            "lat": 38.722252,
            "lng": -9.139337
        },
        {
            "iso2": "it",
            "lat": 41.892916,
            "lng": 12.482520
        },
        {
            "iso2": "pe",
            "lat": -12.047816,
            "lng": -77.062203
        },
        {
            "iso2": "ao",
            "lat": -8.838333,
            "lng": 13.234444
        },
        {
            "iso2": "bo",
            "lat": -19.042139,
            "lng": -65.255882
        },
        {
            "iso2": "is",
            "lat": 64.135338,
            "lng": -21.895210
        },
        {
            "iso2": "se",
            "lat": 59.328930,
            "lng": 18.064910
        },
        {
            "iso2": "ua",
            "lat": 50.450100,
            "lng": 30.523400
        }
    ];

    /**
     * Initializes the Hello App.
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

        this.loadMap();

        this.getHello();

        this.logInfo('Loaded complete!');

    }

    loadMap() {

        const option = {
            // dragging: false,
            // zoomControl: false,
        }

        this._map = L.map('map', option).setView([45, 0], 2);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this._map);

    }

    async getHello() {

        const scope = this;

        for (const index in this._countryList) {

            let country = this._countryList[index];

            const response = await fetch("https://hellosalut.stefanbohacek.dev/?cc=" + country.iso2);
            const json = await response.json();
            await this.setMarker(country, json.hello)
        }

    }

    async setMarker(country, hello) {

        const scope = this;

        return new Promise(async (resolve, reject) => {

            setTimeout(async () => {

                var marker = new L.popup()
                .setLatLng([country.lat, country.lng])
                .setContent(`<div clss="d-flex align-item-center"><img src="https://flagcdn.com/16x12/${country.iso2}.png" class="me-2">${hello}</div>` )
                .addTo(scope._map);

                console.log(country, hello);
                resolve();

            }, 2000);
        });
    }
}

export { HelloApp };