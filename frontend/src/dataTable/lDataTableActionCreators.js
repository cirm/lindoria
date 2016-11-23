export function applyFilter(filter, target) {
  return {
    type: 'FILTER_TABLE',
    filter,
    target,
  };
}

export function setTableData(data) {
  return {
    type: 'SET_TABLE_DATA',
    data,
  };
}

export function startEdit(data) {
  return {
    type: 'LOAD_EDIT_FOCUS',
    data,
  };
}
