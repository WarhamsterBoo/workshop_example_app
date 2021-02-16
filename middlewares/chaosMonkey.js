const router = require('express').Router();
const { random, waitFor } = require('../utils');

const modes = ['none', 'random500', 'random400', 'randomDelay'];
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

router.use(async (_, __, next) => {
    switch (currentMode) {
        case 'random500':
            if (random(0, 2) === 0) {
                const error = new Error("Chaos monkey says that you shall not pass!");
                error.statusCode = 500;
                return next(error);
            }
            break;
        case 'random400':
            if (random(0, 2) === 0) {
                const error = new Error("Chaos monkey thinks that you said something silly!");
                error.statusCode = 400;
                return next(error);
            }
            break;
        case 'randomDelay':
            if (random(0, 2) === 0) {
                await waitFor(availableDelays[random(0 , availableDelays.length)] * 1000);
            }
            break;
        default:
            break;
    }
    next();
});

module.exports = {
    unleash: router,
    availableModes,
    selectMode,
    selectAvailableDelays
};