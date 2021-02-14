const express = require('express');
const logger = require('./logger');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(require('./middlewares/performance'));
app.use(require('./routes'));

app.use((err, req, _, next) => {
    console.log("handling errors");
    logger.log({
        level: "error",
        method: req.method,
        url: req.url,
        message: `${err.name}: ${err.message}`,
        stack: err.stack
    });
    next(err);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})