const EventEmitter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send an http request
        console.log(message);

        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'example.com' })
    }
}

module.exports = Logger;