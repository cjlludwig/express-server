
const express = require("express");
const { BAD_REQUEST, ACCEPTED, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const { postDocument, getDocument } = require("../services/documentService");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Provide and ID to search for a specific documnt.", ACCEPTED);
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params?.id;
    const response = await getDocument(id);
    res.send(response);
  } catch (error) {
    console.error(error?.message);
    res.send("Failed", INTERNAL_SERVER_ERROR) ;
  }
});

router.post("/", async function (req, res) {
  try {
    const body = JSON.parse(req.body);
    const response = await postDocument(body);
    res.send(response);
  } catch {
    res.send("Cannot parse body.", BAD_REQUEST);
  }
});

module.exports = router;