const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const routes = require('./routes');

class App {
  constructor() {
    this.app = app;
    this.server = server;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().server;
