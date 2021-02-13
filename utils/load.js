const fetch = require('node-fetch');
const random = require('./random');

const HOST='localhost';
const PORT=5000;
const cities = ['Moscow', 'Paris', 'Beijing', 'Washington'];
const periods = ['today', 'tomorrow', 'next3days'];

const waitFor = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () => random(50, 500);
const randomCity = () => cities[random(0, cities.length)];
const randomPeriod = () => periods[random(0, periods.length)];

const fetchEndpoint = async (currentRequests = 0) => {
    const URL = `http://${HOST}:${PORT}/weatherforecast/${randomCity()}/${randomPeriod()}`;

    await fetch(URL);
    currentRequests++;

    if (currentRequests % 10 == 0) {
        console.log(`Sent ${currentRequests} requests...`);
    }

    await waitFor(randomDelay());
    await fetchEndpoint(currentRequests);
};

fetchEndpoint();
fetchEndpoint();
fetchEndpoint();