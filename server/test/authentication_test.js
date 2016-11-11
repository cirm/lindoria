/* global describe it */
import { expect } from 'chai';
import io from 'socket.io-client';

const socketUrl = 'http://0.0.0.0:4545';
const options = {
  transports: ['websocket'],
  'force new connection': true,
};
const authenticationUrl = `${socketUrl}`;
const authEvent = 'AUTHENTICATE';
const tokenEvent = 'TOKEN';
const unauthorized = 'UNAUTHORIZED';

describe('Authentication', () => {
  it('should handle missing username', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { random: 'data' });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should handle missing payload', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent);
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should handle erroneus username', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 12345 });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should handle erroneus username with password', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 12345, password: 112233 });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });


  it('should have capability for authentication', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'tsunsun', password: 'EndOria' });
      client.on(tokenEvent, (response) => {
        expect(response).to.be.an('object');
        expect(response.token.length).to.equal(227);
        client.disconnect();
        done();
      });
    });
  });

  it('should return Unauthorized with wrong password', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'tsunsun', password: 123456 });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should return Unauthorized when missing password', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'tsunsun' });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });
});
