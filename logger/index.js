const winston = require('winston')
const { ElasticsearchTransport } = require('winston-elasticsearch');
const ELASTIC_HOST = process.env.ELASTIC_HOST || "localhost";
const ELASTIC_PORT = process.env.ELASTIC_PORT || 9200;

const clientOpts = {
    node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}`
}
const esTransportOpts = {
    level: 'info',
    clientOpts
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({}),
        esTransport
    ]
});

module.exports = logger;