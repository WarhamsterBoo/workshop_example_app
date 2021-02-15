const express = require('express');
const promMid = require('express-prometheus-middleware');
const logger = require('./logger');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5, 2, 3, 5],
    prefix: 'workshop_example_app_'
}));
app.use('/weatherforecast', require('./middlewares/chaosMonkey').unleash);
app.use(require('./routes'));

app.use((err, req, _, next) => {
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