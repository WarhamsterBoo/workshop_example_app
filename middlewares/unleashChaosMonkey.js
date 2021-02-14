const router = require('express').Router();
const { random } = require('../utils');

const modes = ['none', 'random500', 'random400'];
let currentMode = 'none';

const selectMode = (mode) => currentMode = mode;

const availableModes = () => modes;

router.use((_, __, next) => {
    switch (currentMode) {
        case 'random500':
            if (random(0, 2) == 0) {
                throw new Error("Chaos monkey says that you shall not pass!");
            }
            break;
        case 'random400':
            if (random(0, 2) == 0) {
                const error = new Error("Chaos monkey thinks that you said something silly!");
                error.statusCode = 400;
                return next(error);
            }
            break;
        default:
            break;
    }
    next();
});

module.exports = {
    router,
    availableModes,
    selectMode,
};