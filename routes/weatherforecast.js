var router = require('express').Router();

router.get('/:city/today', function (req, res) {
    res.json({
        date: new Date(),
        city: req.params.city,
        temperature: -20
    });
});

module.exports = router;