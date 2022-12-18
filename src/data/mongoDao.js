const { MongoClient, Collection, Document } = require("mongodb");

const uri = "mongodb://localhost:27017/?retryWrites=true&w=majority";
const dbName = "express-server";
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  console.log('Connected successfully to mongoDb');
  return 'done creating mongo client.';
}

async function getDocumentsCollection() {
  const db = client.db(dbName);
  return db.collection('documents');
}

async function closeDbClient() {
  return client.close();
}

run()
  .then(console.log)
  .catch(console.error);

module.exports = {
  closeDbClient,
  getDocumentsCollection
}