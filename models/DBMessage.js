var DBMessage = function(id, type, timestamp, userid, text){
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
    this.userid = userid;
    this.type = type;
};

module.exports = {
    DBMessage
};