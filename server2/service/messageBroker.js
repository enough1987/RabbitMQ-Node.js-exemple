// ---- consumer program
var q = 'task_queue';

var open = require('amqplib').connect('amqp://localhost');
  
// Consumer
const resive = () => {
  return open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q, {durable: true})
        .then(function(ok) {

          ch.prefetch(1);   // <-- only get 1 message at a time
          
          return ch.consume(q, function(msg) {
            if (msg !== null) {
              console.log(JSON.parse(msg.content));
              ch.ack(msg);
            }
          }, {noAck: false});
      });
    }).catch(console.warn);
}

module.exports = {
  resive
};
