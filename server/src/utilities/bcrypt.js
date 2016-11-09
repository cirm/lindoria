import Promise from 'bluebird';
import bcrypt from 'bcrypt';
Promise.promisifyAll(bcrypt);

export const createSalt = async() => await bcrypt.genSaltAsync(12);
export const compareHash = async(password, hashedPassword) => await bcrypt.compareAsync(password, hashedPassword);
