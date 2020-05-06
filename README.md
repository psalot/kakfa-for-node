The purpose of this repository is to produce message from Rest API and consume the same message to further process it using node-rdkafka module in Node.js

curl request for testing purpose:
curl --location --request POST 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
"data": {
"firstname": "pooja",
"lastname": "salot"
}
}'
