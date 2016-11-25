import { Map, fromJS } from 'immutable';
import { BR_DATA } from './lDataActionConstants';

const dataUpdate = (state, data) => state
  .set('domains', fromJS(data.domains))
  .set('provinces', fromJS(data.provinces))
  .set('organizations', fromJS(data.organizations))
  .set('persons', fromJS(data.persons));

const applyFilter = (state, filter, field, type) => state.set('table', state
  .get(type)
  .toSeq()
  .filter(x => x.get(field).toString().toLowerCase().includes(filter.toString().toLowerCase()))
  .toList());

function dataReducer(state = new Map(), action) {
  switch (action.type) {
    case BR_DATA:
      return dataUpdate(state, action.data);
    case 'FILTER_TABLE':
      return applyFilter(state, action.filter, action.field, action.dataType);
    case 'SET_TABLE_DATA':
      return state.set('table', action.data);
    default:
      return state;
  }
}

export default dataReducer;
