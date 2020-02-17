const routes = require('express').Router();

const AppController = require('./app/controllers/AppController');
const ConversationController = require('./app/controllers/ConversationController');

routes.get('/', AppController.status);
routes.post('/conversation/:sessionId*?', ConversationController.index);
routes.delete('/conversation/:sessionId*?', ConversationController.destroy);

module.exports = routes;
