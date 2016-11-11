import { CREATE_TYPE, CREATE_PERSON, CREATE_ORGANIZATION } from './lCreateActionConstants';

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
