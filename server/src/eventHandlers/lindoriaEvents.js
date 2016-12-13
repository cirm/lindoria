const db = require('../db/postgres');
const logger = require('../utilities/winston');

const getContent = async(socket) => {
  const start = new Date();
  const rawData = await db.queryFunction('empires.get_br_data', 'true');
  const data = rawData[0];
  socket.emit('BR_DATA', {
    domains: data.domains || [],
    persons: data.persons || [],
    provinces: data.provinces || [],
    organizations: data.organizations || [],
    holdings: data.holdings || [],
  });
  const finish = new Date();
  logger.info(`dataQuery took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
};

const createPerson = async(socket, data) => {
  const start = new Date();
  await db.queryFunction('empires.create_person', [data.pname, data.display]);
  const finish = new Date();
  logger.info(`savePerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

const createOrg = async(socket, data) => {
  const start = new Date();
  await db.queryFunction('empires.create_organization', [data.oname, data.display, data.owner, data.abbr, data.treasury]);
  const finish = new Date();
  logger.info(`saveOrg took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

const createHolding = async(socket, data) => {
  const start = new Date();
  console.log(data);
  await db.queryFunction('empires.create_holding', [data.level, data.owner, data.province, data.type]);
  const finish = new Date();
  logger.info(`saveHolding took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
}

const createProvince = async(socket, data) => {
  data.visible = !data.visible ? true : data.visible;
  const start = new Date();
  await db.queryFunction('empires.create_province', [data.pname, data.display, data.level, data.regent, data.loyalty, data.domain, data.visible, data.abbr]);
  const finish = new Date();
  logger.info(`saveProvince took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

const createDomain = async(socket, data) => {
  const start = new Date();
  await db.queryFunction('empires.create_domain', [data.dname, data.regent, data.display, data.abbr, data.treasury,]);
  const finish = new Date();
  logger.info(`saveDomain took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

const editPerson = async(socket, data) => {
  const start = new Date();
  await db.queryFunction('empires.update_person', [data.pname, data.display]);
  const finish = new Date();
  logger.info(`editPerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

const editProvince = async(socket, data) => {
  const start = new Date();
  await db.queryFunction('empires.update_province', [data.pname, data.display, data.level, data.regent, data.loyalty, data.domain, true, data.abbr]);
  const finish = new Date();
  logger.info(`editPerson took: ${(finish.getUTCMilliseconds() - start.getUTCMilliseconds())} ms`);
  await getContent(socket);
};

module.exports = {
  getContent,
  createPerson,
  createOrg,
  createProvince,
  createDomain,
  editPerson,
  editProvince,
  createHolding
};
