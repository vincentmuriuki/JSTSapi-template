import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

/**
 * Class Hash - for hashing passwords
 */
class Hash {
  /**
   *
   * @param {string} plainPassword
   * @returns {strings} hashed password
   */
  generateSync(plainPassword: string) {
    const salt = crypto.randomInt(8, 10);
    return bcrypt.hashSync(plainPassword, salt);
  }

  /**
   *
   * @param {string} plainPassword
   * @param {string} hash
   * @returns {boolean} if password matches
   */
  compareSync(plainPassword: string, hash: string) {
    return bcrypt.compareSync(plainPassword, hash);
  }
}

export default new Hash();
