var express = require("express");
var app = express();
const bodyparser = require("body-parser");
const produce = require("./kafka-producer");
const consumer = require("./kafka-consumer");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/", async function (req, res) {
  try {
    await produce(req.body.data);
    res.send({ status: 200, message: "Message Produce successfully" });
  } catch (e) {
    console.log(e, "error");
    res.send({ status: 400, message: "Some error occured" });
  }
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
