import prisma from '../../database/prisma';
import Response from '../../utils/response';
import JWTHelper from '../../utils/jwt';
import UserServices from '../services/UserService';
import Hash from '../../utils/hash';

class AuthController {
  async registerUser(req: any, res: any) {
    const userExists = await prisma.users.findUnique({
      where: { email: req.body.email },
    });

    if (userExists) {
      Response.handleError(
        400,
        'User with that email exists. Please login.',
        res
      );
    }
    const user = await UserServices.createUser(req.body);

    const token = await JWTHelper.signToken(user);
    const returnData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };

    return Response.handleSuccess(201, 'created', res, returnData);
  }

  async signIn(req: any, res: any) {
    const user: any = await prisma.users.findUnique({
      where: { email: req.body.email }
    });
    if (!user) {
      return Response.handleError(404, 'invalid credentials', res);
    }
    if (user && !Hash.compareSync(req.body.password, user.password)) {
      return Response.handleError(400, 'Invalid credentials', res);
    }

    const token = await JWTHelper.signToken(user);

    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      twoFASecret: user.twoFASecret,
      twoFAType: user.twoFAType,
      twoFADataURL: user.twoFADataURL,
      token
    };

    return Response.handleSuccess(200, 'success', res, data);
  }
}

export default new AuthController();
