/*
 *  API
 *
 */

// Import dependencies
const http = require("http");
const url = require("url");

// Respond to requests with a string
const server = http.createServer((req, res) => {
  // Parse incoming URL
  const parseUrl = url.parse(req.url, true);

  // Set path variable from URL
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Set query variable with query string as an object
  const queryStringObject = parseUrl.query;

  // Set HTTP method variable
  const method = req.method;

  // Send server response
  res.end("Hello World!\n");

  console.log(
    `Request received on path ${trimmedPath} with method ${method} and these query parameters ${JSON.stringify(
      queryStringObject
    )}`
  );
});

// Initialize server
server.listen(3000, () =>
  console.log("[server]: running at http://localhost:3000")
);
