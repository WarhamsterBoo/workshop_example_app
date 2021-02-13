const winston = require('winston')
const { ElasticsearchTransport } = require('winston-elasticsearch');
const useElastic = process.env.USE_ELASTIC

const transports = [new winston.transports.Console({})];
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
    transports
});

module.exports = logger;