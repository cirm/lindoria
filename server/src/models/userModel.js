import { compareHash } from '../utilities/bcrypt';

export class User {
  constructor(data, options) {
    if (!options.db) throw new Error('Db is required');
    this.db = options.db;
    this.username = data.username;
    this.display = data.display;
    this.roles = data.roles;
    this.salt = data.salt;
    this.password = data.password;
  }

  async populate() {
    let qr = await this.db.query(
      'SELECT display, hpassword, salt, roles FROM web.users WHERE username = $1;',
      [this.username]);
    qr = qr[0];
    this.display = qr.display;
    this.roles = qr.roles;
    this.salt = qr.salt;
    this.password = qr.hpassword;
  }

  async authenticate(passwordToMatch) {
    if (!this.password) {
      await this.populate();
    }
    const status = await compareHash(passwordToMatch, this.password);
    return status;
  }
}
