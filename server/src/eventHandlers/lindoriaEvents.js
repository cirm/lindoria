import { queryFunction } from '../db/postgres';
import { logger } from '../utilities/winston';

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

export const createOrg = async (socket, data) => {
  const start = new Date();
  await queryFunction('empires.create_organization', [data.oname, data.display, data.owner, data.abbr, data.treasury]);
  const finish = new Date();
  logger.info(`savePerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

export const createProvince = async (socket, data) => {
  const start = new Date();
  await queryFunction('empires.create_province', [data.pname, data.display, data.level, data.regent, data.loyalty, data.domain, data.visible, data.abbr]);
  const finish = new Date();
  logger.info(`savePerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

export const createDomain = async (socket, data) => {
  const start = new Date();
  await queryFunction('empires.create_province', [data.dname, data.regent, data.display, data.abbr, data.treasury,]);
  const finish = new Date();
  logger.info(`savePerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

