const router = require('express').Router();
const promClient = require('prom-client');

router.get('/', async (_, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

module.exports = router;