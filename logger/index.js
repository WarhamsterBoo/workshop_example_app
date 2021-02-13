const winston = require('winston')
const { ElasticsearchTransport } = require('winston-elasticsearch');

const clientOpts = {
    node: 'http://localhost:9200'
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