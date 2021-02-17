const router = require('express').Router();
const { random, waitFor } = require('../utils');
const logger = require('../logger');

const modes = ['none', 'random500', 'random400', 'randomDelay', 'randomError'];
const defaultDelays = [0, 0.1, 0.5, 1, 2, 3, 5];
let availableDelays = defaultDelays;
let currentMode = 'none';

const selectMode = (mode) => currentMode = mode;
const selectAvailableDelays = (delays) => {
    try {
        availableDelays = delays.split(",");
    } catch {
        availableDelays = defaultDelays;
    }
}
const availableModes = () => modes;
const tossACoin = () => random(0, 2) === 0;

router.use(async (_, __, next) => {
    if (tossACoin()) {
        switch (currentMode) {
            case 'random500':
                const error = new Error("Chaos monkey says that you shall not pass!");
                error.statusCode = 500;
                return next(error);
            case 'random400':
                const error = new Error("Chaos monkey thinks that you said something silly!");
                error.statusCode = 400;
                return next(error);
            case 'randomDelay':
                logger.log({
                    level: "warning",
                    message: `Chaos monkey assumes that your app is slooooow!`
                });
                await waitFor(availableDelays[random(0, availableDelays.length)] * 1000);
                return next();
            case 'randomError':
                logger.log({
                    level: "error",
                    message: `Chaos monkey insists that something went wrong!`
                });
                return next();
        }
    }

    next();
});

module.exports = {
    unleash: router,
    availableModes,
    selectMode,
    selectAvailableDelays
};