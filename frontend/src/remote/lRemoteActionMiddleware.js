import { toJS } from 'immutable';

const tokenKey = 'lindoriaToken';

export default socket => store => next => action => {
  if (action.meta && action.meta.auth) {
    socket.emit(action.type, action.data);
  }
  if (action.meta && action.meta.lindoria) {
    const token = JSON.parse(localStorage.getItem(tokenKey));
    if (!token) {
      return next(action);
    }
    if (!action.data) {
      action.data = {};
    } else {
      action.data = action.data.toJS();
    }
    action.data.token = `Bearer ${token}`;
    socket.emit(action.type, action.data);
  }
  return next(action);
};
