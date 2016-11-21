import io from 'socket.io-client';

const socketUrl = `${location.protocol}//${location.hostname}:4545`;
const socket = io(socketUrl, { transports: ['websocket'] });

export default socket;

