module.exports = { runServer }

const { handleRequest } = require('./handle-request.js');

async function runServer() {

  const server = createServer(handleRequest);
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log('Server started at http://localhost:' + port));

  return server;
};

const { createServer } = require('http');
