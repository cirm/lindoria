export function applyFilter(filter, field, dataType) {
  return {
    type: 'FILTER_TABLE',
    filter,
    field,
    dataType,
  };
}

export function startEdit(data) {
  return {
    type: 'LOAD_EDIT_FOCUS',
    data,
  };
}
