var router = require('express').Router();

router.use('/metrics', require('./metrics'));
router.use('/config', require('./config'));
router.use('/weatherforecast',
    require('../utils/chaosMonkey').unleashMonkey,
    require('./weatherforecast')
);

module.exports = router;
