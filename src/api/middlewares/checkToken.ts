import prisma from '../../database/prisma';
import JWThelper from '../../utils/jwt';
import Responses from '../../utils/response';

/**
 * function - decodes the token from the email verification
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {undefined}
 */
const decodeQueryToken = async (req: any, res: any, next: any) => {
  const { token } = req.query;
  const decoded: any = await JWThelper.decodeToken(token);
  if (Object.keys(decoded)[0] === 'error') {
    return Responses.handleError(401, 'not authourized, Please try to regenerate another email', res);
  }
  const user = await prisma.users.findUnique({
    where: { email: decoded.email }
  });
  res.locals.user = user;
  next();
};

/**
* function - decodes the token from the request
* @param {} req
* @param {} res
* @param {} next
* @returns {undefined}
*/

const verifyUser = async (req: any, res: any, next: any) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token === undefined) {
    return Responses.handleError(401, 'Token not provided', res);
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  const decoded: any = await JWThelper.decodeToken(token);
  if (Object.keys(decoded)[0] === 'error') {
    return Responses.handleError(401, 'Invalid token, please login', res);
  }
  const user = await prisma.users.findUnique({
    where: { email: decoded.email }
  });

  res.locals.user = {
    email: user.email,
    name: user.firstName,
    userId: user.id,
    verified: user.isVerified,
    receiveNotification: user.receiveNotification,
    twoFA: {
      type: user.twoFAType,
      secret: user.twoFASecret,
      dataURL: user.twoFADataURL,
      phoneNumber: user.phoneNumber,
    },
  };
  next();
};

export { decodeQueryToken, verifyUser };