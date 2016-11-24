export function applyFilter(filter, field, dataType) {
  return {
    type: 'FILTER_TABLE',
    filter,
    field,
    dataType,
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
