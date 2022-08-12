const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/items.js']

swaggerAutogen(outputFile, endpointsFiles)