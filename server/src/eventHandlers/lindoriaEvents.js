const db = require('../db/postgres');
const includes = require('lodash/fp/includes');

const getContent = async (socket, data1, roles) => {
  const rawData = await db.queryFunction('empires.get_br_data', `${includes('admin')(roles)}`);
  const data = rawData[0];
  socket.emit('BR_DATA', {
    domains: data.domains || [],
    persons: data.persons || [],
    provinces: data.provinces || [],
    organizations: data.organizations || [],
    holdings: data.holdings || [],
  });
};

const createPerson = async (socket, data) => {
  await db.queryFunction('empires.create_person', [data.pname, data.display]);
  await getContent(socket);
};

const createOrg = async (socket, data) => {
  await db.queryFunction('empires.create_organization', [data.oname, data.display, data.owner, data.abbr, data.treasury]);
  await getContent(socket);
};

const createHolding = async (socket, data) => {
  console.log(data);
  await db.queryFunction('empires.create_holding', [data.level, data.owner, data.province, data.type]);
  await getContent(socket);
};

const createProvince = async (socket, data) => {
  data.visible = !data.visible ? true : data.visible;
  await db.queryFunction('empires.create_province', [data.pname, data.display, data.level, data.regent, data.loyalty, data.domain, data.visible, data.abbr]);
  await getContent(socket);
};

const createDomain = async (socket, data) => {
  await db.queryFunction('empires.create_domain', [data.dname, data.regent, data.display, data.abbr, data.treasury]);
  await getContent(socket);
};

const editPerson = async (socket, data) => {
  await db.queryFunction('empires.update_person', [data.pname, data.display]);
  await getContent(socket);
};

const editProvince = async (socket, data) => {
  await db.queryFunction('empires.update_province', [data.pname, data.display, data.level, data.regent, data.loyalty, data.domain, true, data.abbr]);
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
  createHolding,
};
