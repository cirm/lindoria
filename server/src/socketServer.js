const Server = require('socket.io');
const socketEvents = require('./eventHandlers/socketEvents');

const startServer = () => {
  const io = new Server().attach(4545);
  io.on('connection', socketEvents);
};

module.exports = startServer;

