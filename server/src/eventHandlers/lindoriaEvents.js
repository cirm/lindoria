import { queryFunction } from '../db/postgres';
import { logger } from '../utilities/winston';

export const lindoriaEvents = (socket) => {
  socket.on('testing', () => socket.emit('tested'));
};

export const getContent = async (socket) => {
  const start = new Date();
  const rawData = await queryFunction('empires.get_br_data', 'true');
  const data = rawData[0];
  socket.emit('BR_DATA', {
    domains: data.domains || [],
    persons: data.persons || [],
    provinces: data.provinces || [],
  });
  const finish = new Date();
  logger.info(`dataQuery took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
};

export const createPerson = async (socket, data) => {
  const start = new Date();
  await queryFunction('empires.create_person', [data.pname, data.display]);
  const finish = new Date();
  logger.info(`savePerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};
