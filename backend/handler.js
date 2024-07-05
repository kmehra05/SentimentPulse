const app = require('./index.js')

exports.index = require('express-on-serverless')(app);

// const server = serverless.createServer(app);

// exports.handler = async (event, context) => {
//   return serverless.proxy(server, event, context);
// }