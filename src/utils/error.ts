/**
 * Class representing errorHandlers.
 * @extends Error
 */
export default class ErrorHandler extends Error {
  statusCode: number;
  /**
   * Create error handler.
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message: any, statusCode: number = 500) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
