// ---- consumer program
var q = 'tasks';

var open = require('amqplib').connect('amqp://localhost');
  
// Consumer
const resive = () => {
  return open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, function(msg) {
          if (msg !== null) {
            console.log(JSON.parse(msg.content));
            //ch.ack(msg);
          }
        }, {noAck: true});
      });
    }).catch(console.warn);
}

module.exports = {
  resive
};
