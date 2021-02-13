const { random } = require('.');

const modes = ['none', 'random500']
let currentMode = 'none';

const unleashMonkey = (_, res, next) => {
    if (currentMode != 'none') {
        console.log("chaos monkey is in aciton!");

        if (random(0, 2) == 0) {
            return res.status(500).send('Something is broken!');
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