import hash from '../../utils/hash';

import { calculatePages, paginate } from '../../utils/pagination';
import prisma from '../../database/prisma';

/**
 * Class User services creates a middleware
 */
class UserServices {
  page: number;
  limit: number;

  constructor() {
    this.page = 1;
    this.limit = 10;
  }

  /**
   * @param userData - used to create a new user
   * @returns object
   */
  async createUser(data: any): Promise<any> {
    const passwordHash = hash.generateSync(data.password);
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: passwordHash,
    };
    const user = await prisma.users.create({ data: userData });

    return user;
  }

  /**
   * Verify user account
   * @param {string} email
   * @returns {object} user
   */
  async verifyUser(email: string): Promise<any> {
    const user = await prisma.users.update(
      {
        data: { isVerified: true },
      },
      { where: { email: email } }
    );
    return Boolean(user);
  }

  /**
   * Find User
   * @param {string} email
   * @returns {object} user
   */
  async findUser(email: string): Promise<any> {
    const user = await prisma.users.findOne({ where: { email } });
    return user;
  }

  /**
   * findUserByEmail - used to get user from database by email: for login in
   * @param {string} email - email of the user
   * @returns {object} user data from database
   */
  async findUserByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return null;
    const lastLogin = new Date().toISOString();
    await prisma.users.update({ data: { lastLogin } }, { where: { email } });
    return user;
  }

  /**
   * Verify token expiration
   * @param {string} token
   * @param {object} res
   * @returns {object} responses
   */
  //   async verifyTokenExpiration(token: any) {
  //     return token.expiryDate.getTime() < new Date().getTime();
  //   }

  /**
   * @name GetUserById
   * @description Interacts with model to find a single user
   * @param { string } id the user's id
   * @returns {object} return the user's data
   */
  async getUserById(id: number) {
    const userData = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        isVerified: true,
        gender: true,
        lastLogin: true,
        role: true,
        phoneNumber: true,
        remember: true,
        profilePicture: true,
      },
    });
    return userData;
  }

  /**
   * @name updateUserInfoByEmail
   * @description Interacts with model to find a single user
   * @param { object } attributes the user attribute to update
   * @param { string } email$ the user's email
   * @returns {object} return the user's data
   */
  async updateUserInfoByEmail(attributes: any, email$: string): Promise<any> {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      residenceAddress,
      gender,
      phoneNumber,
      remember,
      profilePicture,
    } = attributes;

    let result;
    const updateObj: any = {
      firstName,
      lastName,
      birthDate,
      gender,
      email,
      residenceAddress,
      phoneNumber,
      remember,
    };

    if (profilePicture !== '') {
      updateObj.profilePicture = profilePicture;
    }

    const userDetails = await prisma.users.update(
      {
        where: {
          email: email$,
        },
      },
      {
        data: updateObj,
      }
    );

    result = userDetails[1];

    delete result.password;
  

    return result;
  }
}

export default new UserServices();
