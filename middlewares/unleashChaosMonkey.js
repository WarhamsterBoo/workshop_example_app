const router = require('express').Router();
const { random } = require('../utils');

const modes = ['none', 'random500'];
let currentMode = 'none';

const selectMode = (mode) => currentMode = mode;

const availableModes = () => modes;

router.use((_, __, next) => {
    if (currentMode != 'none') {
        if (random(0, 2) == 0) {
            throw new Error("Chaos monkey said that you shall not pass!");
        }
    }

    next();
});

module.exports = {
    router,
    availableModes,
    selectMode,
};