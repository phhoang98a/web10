const socketio = require('socket.io');

const init = (server) =>{
    var io = socketio(server);
    
    return io;
}

module.exports = init;