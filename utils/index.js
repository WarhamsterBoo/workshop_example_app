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

module.exports = {
    random,
    addDays
};