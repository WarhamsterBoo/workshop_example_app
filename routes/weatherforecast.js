const router = require('express').Router();
const logger = require('../logger');

router.get('/:city/today', (req, res) => {
    const period = 'today';
    const city = req.params.city;
    logger.log({
        level: "info",
        period,
        city,
        message: `weather forecast for ${period} was called for city ${city}`
    });
    const today = new Date();

    res.json({
        city: city,
        forecast: [{
            date: today,
            temperature: randomTemperature()
        }]
    });
});

router.get('/:city/tomorrow', (req, res) => {
    const period = 'tomorrow';
    const city = req.params.city;
    logger.log({
        level: "info",
        period,
        city,
        message: `weather forecast for ${period} was called for city ${city}`
    });
    const today = new Date();

    res.json({
        city: city,
        forecast: [{
            date: addDays(today, 1),
            temperature: randomTemperature()
        }]
    });
});

router.get('/:city/next3days', (req, res) => {
    const period = 'next3days';
    const city = req.params.city;
    logger.log({
        level: "info",
        period,
        city,
        message: `weather forecast for ${period} was called for city ${city}`
    });
    const today = new Date();

    res.json({
        city: city,
        forecast: [{
            date: addDays(today, 1),
            temperature: randomTemperature()
        }, {
            date: addDays(today, 2),
            temperature: randomTemperature()
        }, {
            date: addDays(today, 3),
            temperature: randomTemperature()
        }]
    });
});

const addDays = (date, days) => {
    const resDate = new Date();
    resDate.setDate(date.getDate() + days);
    return resDate;
}

const randomTemperature = () => {
    const MIN_TEMPERATURE = -273;
    const MAX_TEMPERATURE = 1000;
    return MIN_TEMPERATURE + Math.floor((MAX_TEMPERATURE - MIN_TEMPERATURE) * Math.random());
}

module.exports = router;