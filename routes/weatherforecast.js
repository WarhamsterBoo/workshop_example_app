var router = require('express').Router();

router.get('/:city/today', (req, res) => {
    const today = new Date();
    res.json({
        city: req.params.city,
        forecast: [{
            date: today,
            city: req.params.city,
            temperature: -20
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
            temperature: -20
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
            temperature: -20
        }, {
            date: addDays(today, 2),
            city: req.params.city,
            temperature: -20
        }, {
            date: addDays(today, 3),
            city: req.params.city,
            temperature: -20
        }]
    });
});

function addDays(date, days) {
    const resDate = new Date();
    resDate.setDate(date.getDate() + days);
    return resDate;
}

module.exports = router;