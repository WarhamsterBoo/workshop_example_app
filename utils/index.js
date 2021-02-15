const random = (min, max) => {
    if (max < min) {
        new Error("Invalid arguments");
    }
    return min + Math.floor((max - min) * Math.random());
};

const addDays = (date, days) => {
    const resDate = new Date();
    resDate.setDate(date.getDate() + days);
    return resDate;
}

const waitFor = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    random,
    addDays,
    waitFor
};