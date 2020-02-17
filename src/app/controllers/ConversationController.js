const Assistant = require('../../config/assistant');

module.exports = {
  async index(req, res) {
    const { sessionId } = req.params;
    const { text, context = {} } = req.body;

    try {
      const response = await Assistant.sendMessage(sessionId, text, context)
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async destroy(req, res) {
    const { sessionId } = req.params;

    try {
      await Assistant.deleteSession(sessionId);
      return res.status(200).send({ message: "Conversa finalizada" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};
