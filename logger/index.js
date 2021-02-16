const winston = require('winston')
const { ElasticsearchTransport } = require('winston-elasticsearch');
const MetricsTransport = require('./MetricsTransport');
const useElastic = process.env.USE_ELASTIC;

const transports = [new winston.transports.Console({}), new MetricsTransport()];
if (useElastic) {
    const ELASTIC_HOST = process.env.ELASTIC_HOST || "localhost";
    const ELASTIC_PORT = process.env.ELASTIC_PORT || 9200;

    const clientOpts = {
        node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}`
    }
    const esTransportOpts = {
        level: 'info',
        clientOpts,
        indexPrefix: "workshop_example_app"
    };

    const esTransport = new ElasticsearchTransport(esTransportOpts);

    transports.push(esTransport);
}

const logger = winston.createLogger({
    defaultMeta: { host: process.env.INSTANCE || "localhost:5000" },
    transports
});

logger.on('finish', function (info) {
    console.log(info)
});

module.exports = logger;