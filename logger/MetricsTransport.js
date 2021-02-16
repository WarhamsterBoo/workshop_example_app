const Transport = require('winston-transport');
const Counter = require('prom-client').Counter;

module.exports = class MetricsTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.logEventsCounter = new Counter({
            name: 'workshop_example_app_number_of_log_events_total',
            help: 'Number of log events',
            labelNames: ['level', 'host']
        });
    }

    log(info, callback) {
        this.logEventsCounter.inc({ level: info.level, host: info.host });

        setImmediate(() => {
            this.emit('logged', info);
        });

        callback();
    }
};