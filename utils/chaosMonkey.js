const { random } = require('.');

const modes = ['none', 'random500'];
let currentMode = 'none';

const unleashMonkey = (_, res, next) => {
    if (currentMode != 'none') {
        if (random(0, 2) == 0) {
            throw new Error("Chaos monkey said that you shall not pass!");
        }
    }

    next();
}

const selectMonkeyMode = (mode) => {
    currentMode = mode;
}

const availableModes = () => modes;

module.exports = {
    unleashMonkey,
    selectMonkeyMode,
    availableModes
};