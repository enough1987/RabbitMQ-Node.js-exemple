// ---- producer program
var q = 'task_queue';

var open = require('amqplib').connect('amqp://localhost');
  
// Publisher
const send = (data) => {
  return open.then(function(conn) {
    return conn.createChannel();
      }).then(function(ch) {
        return ch.assertQueue(q, {durable: true}).then(function(ok) {
            return ch.sendToQueue(q, new Buffer(JSON.stringify(data), {persistent: true}) );
        });
      }).catch(console.warn);
}

module.exports = {
    send
};
