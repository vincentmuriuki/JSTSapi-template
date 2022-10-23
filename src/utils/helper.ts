/**
   * use to wrap around controller to avoid try catch blocks
   * @param {function} fn
   * @returns {function} next
   */
const catchErrors = (fn: any) => (req: any, res: any, next: any) => fn(req, res, next).catch(next);

export default catchErrors;