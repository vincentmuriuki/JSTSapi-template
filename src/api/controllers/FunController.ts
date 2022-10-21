import Response from '../../utils/response';

/**
 * Fun Controller
 */
class FunController {
  /**
   * Sends a welcome message
   */

  async sendFunMessage(_req: any, res: any) {
    const data = {
      ahoy: [
        'Hello, World! 👋 Thank you for trying out this ts boilerplate 🥳',
        'We hope this will become a friendship.',
      ],
      links: {
        homepage: 'https://ts-boilerplate.io',
        twitter: 'https://twitter.com/ts-boilerplate',
        discord: 'https://httpie.io/ts-boilerplate',
        github: 'https://github.com/ts-boilerplate',
      },
    };

    return Response.handleSuccess(200, '', res, data);
  }
}

export default new FunController();
