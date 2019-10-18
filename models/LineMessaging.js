const head = function(token){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
};

var body = function(user, messages){
    this.to = user;
    this.messages = messages;
};

var message = function(type, text){
    this.type = type;
    this.text = text;
};

module.exports = {
    head,
    body,
    message
};