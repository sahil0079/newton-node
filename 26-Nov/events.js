

var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('shout', function () {
    console.log('shout is detected')
});

eventEmitter.emit('shout');

