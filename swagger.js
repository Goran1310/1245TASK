const swaggerAutogen = require('swagger-autogen')();

// Define the Swagger documentation options
const doc = {
  info: {
    version: "1.0.0",
    title: "Homework",
    description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
  },
  host: "localhost:3000",
  definitions: {
    User: {
        $username: "John Doe",
        $password: "P4ssword",
        $score: 1
    }
    },
};

// Define the output file for the Swagger documentation
const outputFile = './swagger-output.json';

// Define the endpoint files to generate documentation for
const endpointsFiles = ['./app.js'];

// Generate the Swagger documentation using the specified options
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Start the server once the documentation is generated
  require('./bin/www');
});