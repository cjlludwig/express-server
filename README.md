# express-server

## Description

A minimal Express.js server with a MongoDB-backed document store. Demonstrates a simple layered architecture (controller, service, data access) wired to a local MongoDB instance. Exposes a RESTful (/api/document) interface for creating and retrieving documents.

## Getting Started

### Dependencies

- Node.js (runtime for the server)
- npm (package manager)
- MongoDB (local database instance)

### Installation

1. Clone or download the repository.
2. Install dependencies:

```sh
npm install
```
1. Ensure MongoDB is running locally (default database: express-server, collection: documents). The app connects to mongodb://localhost:27017/express-server, collection documents.
2. Start the server:

```sh
npm run start
```
1. Open <http://localhost:9000/>

## Usage

### Running the server

```sh
npm run start
# Runs the Express HTTP server. Default address is http://localhost:9000
```

### Endpoints (via /api/document)

- GET /api/document/ — Guidance message prompting to provide an ID to search for a document.
  - Returns a 202 Accepted with a text guidance string.
- GET /api/document/:id — Retrieve the document by ID.
  - If an ID is provided, attempts to fetch the document from MongoDB.
  - Returns a response based on the service logic (see notes below).
- POST /api/document/ — Create a new document using the request body.
  - Expects a document payload in the request body.
  - Creates the document in MongoDB and returns a status indicative of the operation.

Note: The repository currently defines only the start script; no formal test suite is included.

### Tests

```sh
npm test
# No tests defined. The existing test script echoes an error message and exits.
```

## Architecture and Diagrams

The project uses a straightforward layered architecture:

- src/server.js
  - Express application entry point.
  - Mounts the document routes at /api/document.
  - Gracefully closes the MongoDB client on SIGTERM.

- src/controllers/documentController.js
  - HTTP route handlers for document-related endpoints.
  - Delegates to the document service to perform operations.

- src/services/documentService.js
  - Business logic for documents.
  - Exposes:
    - postDocument(body)
    - getDocument(id)

- src/data/documentDao.js
  - Data access object for documents.
  - Exposes:
    - createDocument(document)
    - queryDocumentById(_id)

- src/data/mongoDao.js
  - MongoDB integration layer.
  - Exposes:
    - getDocumentsCollection()
    - closeDbClient()
  - Establishes a MongoDB client connection to mongodb://localhost:27017/ and uses the express-server database, collection documents.

Architecture diagram (textual):

- Client -> Express Server (src/server.js)
  - /api/document -> documentController
    - postDocument / getDocument -> documentService
      - createDocument / queryDocumentById -> documentDao
        - getDocumentsCollection -> MongoDB

Public exports for external use are primarily the document service endpoints (getDocument, postDocument) used by the controller. Internal helpers (DAO/mongo client) are not exposed externally.

## References

- Express.js documentation: <https://expressjs.com/>
- MongoDB Node.js driver: <https://www.mongodb.com/docs/drivers/node/>
- HTTP status codes: <https://www.npmjs.com/package/http-status-codes>

## Help

- Ensure MongoDB is running locally and accessible at mongodb://localhost:27017.
- If the server fails to connect to MongoDB, verify MongoDB is installed, the service is started, and the database/collection names match (express-server, documents).
- If you modify endpoints or data shapes, update the service and DAO layers accordingly to keep consistency across controllers.
