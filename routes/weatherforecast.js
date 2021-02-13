const router = require('express').Router();
const logger = require('../logger');
const random = require('../utils/random');

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

const randomTemperature = () => random(-273, 1000);

module.exports = router;