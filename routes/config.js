const router = require('express').Router();
const chaosMonkey = require('../middlewares/chaosMonkey');

router.get('/monkeyMode/:mode', (req, res) => {
    const mode = req.params.mode;

    if (!chaosMonkey.availableModes().includes(mode)) {
        return res.status(500).send(`Chaos monkey mode ${mode} is not supported.`);
    }

    chaosMonkey.selectMode(mode);
    if (mode === 'randomDelay' && req.query.delays) {
        chaosMonkey.selectAvailableDelays(req.query.delays);
    }
    
    res.status(200).send(`Chaos monkey now works in ${mode} mode.`);
});

module.exports = router;