export const serverError = (message = 'Server broken', status = 500) => {
  const err = new Error();
  err.message = message;
  err.status = status;
  return err;
};

export const authenticationError = (message = 'Wrong username/password combination') => {
  const err = new Error();
  err.message = `Authentication error: ${message}`;
  return err;
};

export const tokenError = (message = 'Unknown error') => {
  const err = new Error();
  err.message = `Token verification error: ${message}`;
  return err;
};
