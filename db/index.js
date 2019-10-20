const { insertMessage, selectListMessages, selectMessageByUserid } = require('./messages.db');
const { insertUser } = require('./users.db');

module.exports = {
  insertMessage,
  insertUser,
  selectListMessages,
  selectMessageByUserid
}