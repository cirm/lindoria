import Server from 'socket.io';
import { lindoriaToken } from './middleware/lindoriaToken';
import { authEvents } from './eventHandlers/authentication';
import { lindoriaEvents } from './eventHandlers/lindoriaEvents';

export const startServer = () => {
  const io = new Server().attach(4545);
  io.on('connection', authEvents);

  const lindoria = io.of('/lindoria');
  // io.use(lindoriaToken);
  // lindoria.on('connection', lindoriaEvents);
};
