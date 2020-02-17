const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const { API_KEY, API_URL, ASSISTANT_ID, ASSISTANT_VERSION } = process.env;

class Assistant {

  constructor() {
    this.assistant = this.auth();
  }

  auth() {
    return new AssistantV2({
      authenticator: new IamAuthenticator({ apikey: API_KEY }),
      url: API_URL,
      version: ASSISTANT_VERSION
    });
  }

  async sendMessage(sessionId = '', text, context) {
    if (!sessionId.length) sessionId = await this.setSessionId();

    try {
      const { result } = await this.assistant.message({
        input: { text },
        assistantId: ASSISTANT_ID,
        sessionId,
        context,
      })

      return { sessionId, result };
    } catch (err) {
      console.log('send messsage fail: ', err);
      return err;
    }
  }

  async setSessionId() {
    try {
      const { result: { session_id } } = await this.assistant.createSession({ assistantId: ASSISTANT_ID });
      return session_id;
    } catch (err) {
      console.log('create session fail: ', err);
    };
  }

  async deleteSession(sessionId = '') {
    try {
      await this.assistant.deleteSession({ assistantId: ASSISTANT_ID, sessionId })
    } catch(err) {
      console.log('delete session fail: ', err);
    }
  }
}

module.exports = new Assistant();
