import * as JWT from 'jsonwebtoken';
import config from '../config';

/**
 * Class tokenizer used to encode and decoded tokens
 */
class tokenizer {
  /**
   *
   * @param {object} user - its an object with users data
   * @returns {string} token
   */
  async signToken(user: any) {
    return JWT.sign(
      {
        email: user.email,
        name: user.firstName,
        userId: user.id,
        verified: user.isVerified,
        role: user.role,
      },
      config.default.secret,
      { expiresIn: config.default.jwtExpiresIn }
    );
  }

  /**
   *
   * @param {string} token
   * @returns {object} users data decoded from token
   */
  async decodeToken(token: string) {
    const data = JWT.verify(
      token,
      config.default.secret,
      (err: any, decoded: any) => {
        if (err) return { error: err.message };
        return decoded;
      }
    );
    return data;
  }

  /**
   * @param {string} token
   * @returns {boolean}
   */
  async verifyToken(token: string) {
    const data = JWT.verify(token, config.default.secret, (err: any) => {
      if (err) return { error: err.message };
      return true;
    });
    return data;
  }

  /**
   * @param {object} - Object
   * @returns {string} - token
   */
  async signTokenV2(data: any) {
    return JWT.sign(data, config.default.secret, {
      expiresIn: config.default.jwtExpiresIn,
    });
  }
}

export default new tokenizer();
