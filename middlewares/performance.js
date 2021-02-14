const router = require('express').Router();
const url = require('url');
const promClient = require('prom-client');

promClient.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'workshop_example_app_http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

router.use((req, res, next) => {
    console.log('performance middleware');
    const route = url.parse(req.url).pathname;
    if (route == '/metrics') {
        return next();
    }

    const end = httpRequestDurationMicroseconds.startTimer();
    next();
    console.log('sending performance metrics');
    end({ route, code: res.statusCode, method: req.method });
});

module.exports = router;