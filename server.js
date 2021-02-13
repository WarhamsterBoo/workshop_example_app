const express = require("express");
const promClient = require('prom-client');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(require('./routes'));

promClient.collectDefaultMetrics();
app.get('/metrics', async (_, res) => {
	try {
		res.set('Content-Type', promClient.register.contentType);
		res.end(await promClient.register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})