import { Request, Response, Router } from "express";
import { json } from "express";
import config from "config";
import { Producer, Consumer, KafkaClient } from "kafka-node";
import { v1 as uuidv1 } from "uuid";
import logger from "./logger";

export const kafkaRouter = Router();

// middleware that is specific to this router, jeson parser
kafkaRouter.use(json());

export type Message = {
  id: string;
  title: string;
  value: string;
};

//const sentMessages = new Map<string, Array<Message>>();

let producer: Producer = null;
let consumer: Consumer = null;

export /*async*/ function init() {
  //const retP = new Promise((res, rej) => {
  const kafkaHost = config.get<string>("kafka.host");
  const topic: string = config.get<string>("kafka.topic");
  const client = new KafkaClient({ kafkaHost: kafkaHost });
  producer = new Producer(client);
  producer.on("ready", async function () {
    logger.info("Kafka producer connected");
    //res();
  });

  producer.on("error", function (err) {
    logger.error("Kafka producer connection ERROR!!");
    logger.error(err);
    //rej(err);
  });

  const cclient = new KafkaClient();
  consumer = new Consumer(cclient, [{ topic, partition: 0 }], {
    autoCommit: true,
  });

  consumer.on("message", function (message) {
    logger.info("Received message");
    logger.info(message);
    logger.info("");
  });

  consumer.on("error", function (err) {
    logger.error("Cannot connect consumer");
    logger.error(err);
  });
  //});
  //return retP;
}

kafkaRouter.post("/send", (req: Request, res: Response) => {
  try {
    const topic: string = config.get<string>("kafka.topic");

    const uuid = uuidv1();
    const message = {
      uuid,
      title: "Title",
      value: "Value",
    };

    const payloads = [
      { topic, messages: JSON.stringify(message), partition: 0 },
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        logger.error("[kafka-producer -> " + topic + "]: broker update failed");
        res.status(500).send("ko");
      } else {
        logger.info("[kafka-producer -> " + topic + "]: broker send success");
        res.send("ok");
      }
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send("ko");
  }
});
