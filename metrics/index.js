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
    const route = url.parse(req.url).pathname;
    const end = httpRequestDurationMicroseconds.startTimer();
    next();
    end({ route, code: res.statusCode, method: req.method });
});

router.get('/metrics', async (_, res) => {
	try {
		res.set('Content-Type', promClient.register.contentType);
		res.end(await promClient.register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

module.exports = router;