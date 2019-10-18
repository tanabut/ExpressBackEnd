const { insertMessage } = require('./messages.db');
const { insertUser } = require('./users.db');

module.exports = {
  insertMessage,
  insertUser
}