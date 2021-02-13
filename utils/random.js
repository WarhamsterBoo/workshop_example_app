const random = (min, max) => {
    if (max < min) {
        new Error("Invalid arguments");
    }
    return min + Math.floor((max - min) * Math.random());
};

module.exports = random;