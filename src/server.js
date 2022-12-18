const express = require('express');
const { closeDbClient } = require("./data/mongoDao");
const app = express();
const port = 9000;

const documentController = require("./controllers/documentController");

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/document", documentController);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

process.on('SIGTERM', async () => {
  console.log("Shutting down.")
  debug('SIGTERM signal received: closing HTTP server');
  await closeDbClient();
  server.close(() => {
    debug('HTTP server closed');
  });
})