const router = require('express').Router();
const logger = require('../logger');
const { random, addDays } = require('../utils');

const randomTemperature = () => random(-273, 1000);

router.get('/:city/today', (req, res) => {
    const today = new Date();
    const period = 'today';
    const city = req.params.city;
    const forecast = [{
        date: today,
        temperature: randomTemperature()
    }]

    logger.log({
        level: "info",
        period,
        city,
        forecast,
        message: `weather forecast for ${period} was called for city ${city}`,
        url: req.url,
        method: req.method
    });

    res.json({
        city,
        forecast
    });
});

router.get('/:city/tomorrow', (req, res) => {
    const today = new Date();
    const period = 'tomorrow';
    const city = req.params.city;
    const forecast = [{
        date: addDays(today, 1),
        temperature: randomTemperature()
    }];

    logger.log({
        level: "info",
        period,
        city,
        forecast,
        message: `weather forecast for ${period} was called for city ${city}`,
        url: req.url,
        method: req.method
    });

    res.json({
        city,
        forecast
    });
});

router.get('/:city/next3days', (req, res) => {
    const today = new Date();
    const period = 'next3days';
    const city = req.params.city;
    const forecast = [{
        date: addDays(today, 1),
        temperature: randomTemperature()
    }, {
        date: addDays(today, 2),
        temperature: randomTemperature()
    }, {
        date: addDays(today, 3),
        temperature: randomTemperature()
    }];

    logger.log({
        level: "info",
        period,
        city,
        forecast,
        message: `weather forecast for ${period} was called for city ${city}`,
        url: req.url,
        method: req.method
    });

    res.json({
        city,
        forecast
    });
});

module.exports = router;