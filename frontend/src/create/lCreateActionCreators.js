import {
  CREATE_TYPE,
  CREATE_PERSON,
  CREATE_ORGANIZATION,
  CREATE_DOMAIN,
  CREATE_PROVINCE,
} from './lCreateActionConstants';

export function setCreateType(type) {
  return {
    type: CREATE_TYPE,
    data: type,
  };
}

export function createPerson(values) {
  return {
    meta: { lindoria: true },
    type: CREATE_PERSON,
    data: values,
  };
}

export function createOrganization(values) {
  return {
    meta: { lindoria: true },
    type: CREATE_ORGANIZATION,
    data: values,
  };
}

export function createDomain(values) {
  return {
    meta: { lindoria: true },
    type: CREATE_DOMAIN,
    data: values,
  };
}

export function createProvince(values) {
  return {
    meta: { lindoria: true },
    type: CREATE_PROVINCE,
    data: values,
  };
}

export function stopEdit() {
  return {
    type: 'REMOVE_EDIT_FOCUS',
  };
}

export function editPerson(payload) {
  return {
    type: 'EDIT_PERSON',
    meta: { lindoria: true },
    data: payload.delete('type'),
  };
}

export function editProvince(payload) {
  return {
    type: 'EDIT_PROVINCE',
    meta: { lindoria: true },
    data: payload.delete('type'),
  };
}

export function createHolding(values) {
  return {
    type: 'CREATE_HOLDING',
    meta: { lindoria: true },
    data: values,
  };
}

export function editHolding(payload) {
  return {
    type: 'EDIT_HOLDING',
    meta: { lindoria: true },
    data: payload.delete('type'),
  };
}
