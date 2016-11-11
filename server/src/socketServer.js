import Server from 'socket.io';
import socketEvents from './eventHandlers/socketEvents';

export const startServer = () => {
  const io = new Server().attach(4545);
  io.on('connection', socketEvents);
};
