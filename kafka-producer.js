/**
 * Please refer git repo https://github.com/Blizzard/node-rdkafka
 * this is producer for kafka
 */
const Kafka = require("node-rdkafka");

//basic connection configuration for producer
const producer = Kafka.Producer({
  dr_cb: true,
  "metadata.broker.list": "172.17.0.1:9092", // please change the broker details
  "api.version.request": true
});
producer.on("ready", function () {
  console.log("producer ready");
});

producer.on("event.error", function (err) {
  console.log("Error from producer");
  console.log(err);
});
producer.connect(null, (err, metadata) => {
  console.log("Producer Connected");
});
function producerMessage(data) {
  return new Promise(async (resolve, reject) => {
    let producemessage = Buffer.from(JSON.stringify(data));

    // message specified in Buffer section below will be created on topic testTopic
    // make sure you create the topic before producing the message if autocreate topic is disabled.
    try {
      await producer.produce(
        "testTopic",
        null,
        producemessage,
        null,
        Date.now()
      );
      resolve(producemessage);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = producerMessage;
