const { getDocumentsCollection } = require("./mongoDao");

async function createDocument(document) {
  try {
    const collection = await getDocumentsCollection();
    await collection.insertOne(document);
    return "SUCCESS";
  } catch(error) {
    console.error(error.message);
    return null;
  }
}

async function queryDocumentById(_id) {
  try {
    const collection = await getDocumentsCollection();
    const [ result ] = await collection.find({ _id }).limit(1).toArray();
    return result;
  } catch(error) {
    console.error(error.message);
    return null;
  }
}

module.exports = {
  createDocument,
  queryDocumentById
}