import amqp from "amqplib";
import config from "config";
import logger from "./lib/logger";

export function connect() {
    amqp.connect('amqp://' + config.get("rabbitMq.host"), (e, connection) => {
        if (e) throw e;
        else logger.info("Connection with topic established");

        connection.createChannel(function(error1, channel) {
            if (error1) {
              throw error1;
            }
            var exchange = 'topic_logs';
            var args = process.argv.slice(2);
            var key = (args.length > 0) ? args[0] : 'anonymous.info';
            var msg = args.slice(1).join(' ') || 'Hello World!';
        
            channel.assertExchange(exchange, 'topic', {
              durable: false
            });
            channel.publish(exchange, key, Buffer.from(msg));
            console.log(" [x] Sent %s:'%s'", key, msg);
          });
        
          setTimeout(function() { 
            connection.close(); 
            process.exit(0) 
          }, 500);
    });


}