var router = require('express').Router();

router.use('/weatherforecast', require('./weatherforecast'));

module.exports = router;
