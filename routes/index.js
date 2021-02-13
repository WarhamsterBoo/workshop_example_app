var router = require('express').Router();

router.use('/weatherforecast',
    require('../utils/chaosMonkey').unleashMonkey,
    require('./weatherforecast')
);
router.use('/config', require('./config'));

module.exports = router;
