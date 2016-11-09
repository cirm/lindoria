export const serverError = (message = 'Server broken', status = 500) => {
  const err = new Error();
  err.message = message;
  err.status = status;
  return err;
};

export const authenticationError = (message = 'Wrong username/password combination') => {
  const err = new Error();
  err.message = message;
  return err;
};
