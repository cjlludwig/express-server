const { createDocument, queryDocumentById } = require("../data/documentDao");
const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, NOT_FOUND } = require("http-status-codes").StatusCodes;

async function postDocument(body) {
  const result = await createDocument(body);
  if (result) return ("Created", CREATED);
  return ("Failed", INTERNAL_SERVER_ERROR);
}

async function getDocument(id) {
  try {
    if (!id) return ("Bad ID", BAD_REQUEST);
    const result = await queryDocumentById(id);
    if (result) return (JSON.stringify(result), OK);
    else return ({}, NOT_FOUND);
  } catch (error) {
    console.error(error);
    return ("Failed", INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getDocument,
  postDocument
}