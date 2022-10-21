/**
 * Formatted response class
 */
class Responses {
  /**
   * handleSuccess Function
   * @param {int} statusCode - Status code
   * @param {string} message - Message
   * @param {object} res - Response
   * @param {object | null} data - Data
   * @return {object} - Returned Formatted Success response object
   */
  handleSuccess(
    statusCode: number,
    message: string,
    res: any,
    data: any = null
  ) {
    return res.status(statusCode).json(
      (data)
        ? {
            status: 'success',
            message,
            data,
          }
        : {
            status: 'success',
            message,
          }
    );
  }

  /**
   * handleError Function
   * @param {int} statusCode - Status code
   * @param {string} message - Message
   * @param {object} res - Response
   * @returns {object} - Returned Formatted Error response object
   */
  handleError(statusCode: number, message: string, res: any) {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}

export default new Responses();
