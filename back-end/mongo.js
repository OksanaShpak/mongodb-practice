module.exports = { connectToMongo }

async function connectToMongo() {

  const client = new MongoClient(uri, options);
  client.connect().catch(console.error);
  globalThis.client = client;

  return client;
}

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_CONN_STR;
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };
