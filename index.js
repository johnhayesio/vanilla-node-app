/*
 *  API
 *
 */

// Import dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const config = require("./config");
const fs = require("fs");
const StringDecoder = require("string_decoder").StringDecoder;

// Instantiate HTTP server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// Start HTTP server
httpServer.listen(config.HTTP_PORT, () =>
  console.log(
    `[server]: running in ${config.ENV_NAME} mode at http://localhost:${config.HTTP_PORT}`
  )
);

// Instantiate HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// Start HTTPS server
httpsServer.listen(config.HTTPS_PORT, () =>
  console.log(
    `[server]: running in ${config.ENV_NAME} mode at https://localhost:${config.HTTPS_PORT}`
  )
);

// HTTP and HTTP server logic
const unifiedServer = (req, res) => {
  // Parse incoming URL
  const parseUrl = url.parse(req.url, true);

  // Set path variable from URL
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Set query variable with query string as an object
  const queryStringObject = parseUrl.query;

  // Set HTTP method variable
  const method = req.method;

  // Set headers variable as an object
  const headers = req.headers;

  // Set payload to variable, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  // Decode stream and write to buffer variable
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  // Return response when stream ends
  req.on("end", () => {
    buffer += decoder.end();

    // Choose request handler, otherwise use notFound handler
    const chooseHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct data object for handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    // Route request to specified handler in router
    chooseHandler(data, (statusCode, payload) => {
      // Use handler callback status code, otherwise default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use handler callback payload, otherwise default to {}
      payload = typeof payload == "object" ? payload : {};

      // Convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Return response
      // res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(payloadString);

      // Log response
      console.log(`Response: ${statusCode}, ${payloadString}`);
    });
  });
};

// Define handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  // Callback an HTTP status code and a payload object
  callback(406, { name: "Sample Handler" });
};

// Not found handler
handlers.notFound = (data, callback) => {
  // Callback and HTTP status code of 404 if not found
  callback(404);
};

// Define request router
const router = {
  sample: handlers.sample,
};
