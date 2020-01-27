import amqp from "amqplib";
import config from "config";
import logger from "./lib/logger";

let _connection = null;
let _channel = null;

export function connect() {
  amqp.connect("amqp://" + config.get("rabbitMq.host"), (e, connection) => {
    if (e) throw e;
    else logger.info("Connection with topic established");

    _connection = connection;

    _connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      _channel = channel;
    });
  });
}

export function publish(msg: string) {
  var exchange = "topic_logs";

  _channel.assertExchange(exchange, "topic", {
    durable: false
  });
  var args = process.argv.slice(2);
  var key = args.length > 0 ? args[0] : "anonymous.info";
  var msg = args.slice(1).join(" ") || "Hello World!";
  _channel.publish(exchange, key, Buffer.from(msg));

  _channel.publish(exchange, key, Buffer.from(msg));
  console.log(" [x] Sent %s:'%s'", key, msg);
}

export function close() {
  setTimeout(function() {
    _connection.close();
    process.exit(0);
  }, 500);
}
