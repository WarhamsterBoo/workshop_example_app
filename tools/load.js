const fetch = require('node-fetch');
const { random } = require('../utils');

const HOST = 'localhost';
const PORT_0 = 5000;
const PORT_1 = 5001;
const cities = ['Moscow', 'Paris', 'Beijing', 'Washington'];
const periods = ['today', 'tomorrow', 'next3days'];
let currentRequests = 0;

const waitFor = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () => random(50, 250);
const randomCity = () => cities[random(0, cities.length)];
const randomPeriod = () => periods[random(0, periods.length)];

const fetchEndpoint = async (host, port) => {
    const URL = `http://${host}:${port}/weatherforecast/${randomCity()}/${randomPeriod()}`;

    await fetch(URL);
    currentRequests++;

    if (currentRequests % 10 == 0) {
        console.log(`Sent ${currentRequests} requests...`);
    }

    await waitFor(randomDelay());
    await fetchEndpoint(host, port);
};

fetchEndpoint(HOST, PORT_0);
fetchEndpoint(HOST, PORT_1);