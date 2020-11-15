/*
 *  Configuration variables
 *
 */

// Environments container
const environments = {};

// Development (default) environment
environments.development = {
  PORT: 3000,
  ENV_NAME: "development",
};

// Production environment
environments.production = {
  port: 5000,
  ENV_NAME: "production",
};

// Determine environment
const currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Set environment, otherwise default to development
const environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.development;

// Export module
module.exports = environmentToExport;
