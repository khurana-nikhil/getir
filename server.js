'use strict';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const http = require('http');
const httpStatus = require('http-status');
const config = require('./config/config');

const _portSocket = config.APP_PORT || process.env.PORT;

const server = http.createServer(app);

server.listen(_portSocket, () => {
  console.info(
    'Express server listening on %d, in %s mode',
    _portSocket,
    app.get('env')
  );
});

server.on('connection', s => {
  console.log('A new connection was made by a client.');
});

server.on('error', e => {
  console.error('Error in HTTP Server >>', e);
});

// handle app level errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === httpStatus.BAD_REQUEST) {
    // Handle the error here
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: 'Failure', message: 'JSON syntax error' });
  } else {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'Failure', message: error.message });
  }
  // Pass the error to the next middleware if it wasn't a JSON parse error
});

app.get('/health', function(req, res) {
  res.status(httpStatus.OK).json({
    message: `Application health on ${new Date().toISOString()}.`
  });
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json

require('module-alias/register');

require(`${appRoot}/src/routes`)(app);

module.exports = { app, server };
