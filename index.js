require('dotenv').config();

const { connectToMongo } = require('./back-end/mongo.js');
const { runServer } = require('./back-end/server.js');

connectToMongo();
runServer();