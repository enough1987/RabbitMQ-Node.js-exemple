// ---- producer program
var q = 'tasks';

var open = require('amqplib').connect('amqp://localhost');
  
// Publisher
const send = (data) => {
  return open.then(function(conn) {
    return conn.createChannel();
      }).then(function(ch) {
        return ch.assertQueue(q).then(function(ok) {
            return ch.sendToQueue(q, new Buffer(JSON.stringify(data)) );
        });
      }).catch(console.warn);
}

module.exports = {
    send
};
