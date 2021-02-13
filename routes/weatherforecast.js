var router = require('express').Router();

router.get('/:city/today', (req, res) => {
    const today = new Date();
    res.json({
        city: req.params.city,
        forecast: [{
            date: today,
            city: req.params.city,
            temperature: randomTemperature()
        }]
    });
});

router.get('/:city/tomorrow', (req, res) => {
    const today = new Date();
    res.json({
        city: req.params.city,
        forecast: [{
            date: addDays(today, 1),
            city: req.params.city,
            temperature: randomTemperature()
        }]
    });
});

router.get('/:city/next3days', (req, res) => {
    const today = new Date();
    res.json({
        city: req.params.city,
        forecast: [{
            date: addDays(today, 1),
            city: req.params.city,
            temperature: randomTemperature()
        }, {
            date: addDays(today, 2),
            city: req.params.city,
            temperature: randomTemperature()
        }, {
            date: addDays(today, 3),
            city: req.params.city,
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