require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const { PORT } = process.env;
const app = require('./app');

app.listen(PORT || 5000);
