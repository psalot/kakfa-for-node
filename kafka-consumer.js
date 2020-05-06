/**
 * Please refer git repo https://github.com/Blizzard/node-rdkafka
 * this is consumer for kafka
 */
const Kafka = require("node-rdkafka");
//basic connection configuration for consumer
const consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka-testTopic",
    "metadata.broker.list": "172.17.0.1:9092", // please change the broker details
    "api.version.request": true
  },
  {}
);

consumer
  .on("ready", function () {
    // Subscribe to the  topic named testTopic
    // This makes subsequent consumes read from that topic.
    consumer.subscribe(["testTopic"]);

    // Read one message every 1000 milliseconds

    setInterval(function () {
      consumer.consume(3);
    }, 1000);
  })
  .on("data", function (data) {
    // you will start receiving message here once the producer successfully produces the message here
    console.log("Consmer message will be seen below:");
    console.log(data, "Consumed message");

    const intoString = data.value.toString();
    const jsonData = JSON.parse(intoString);
    console.log(jsonData, "Message in json");
  })
  .on("error", function (err) {
    console.log("err", err);
  });

// initiate the consumer connection
consumer.connect(null, function () {
  console.log("Consumer connected");
});

module.exports = consumer;
