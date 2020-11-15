/*
 *  API
 *
 */

// Import dependencies
const http = require("http");

// Respond to requests with a string
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// Initialize server
server.listen(3000, () =>
  console.log("[server]: running at http://localhost:3000")
);
