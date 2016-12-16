/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */
const util = require('util');

module.exports = function serverError(data, config) {
  if (sails.config.log.consoleLogErrorResponses) {
    console.log(data);
  }
  const responseData = util.inspect(data);
  const response = Object.assign({
    status: 'error',
    message: 'Something bad happened on the server.',
    data: responseData || null,
  }, config);

  LoggerService.logger.error(`${this.req.method} ${this.req.path} -body- ${util.inspect(this.req.body)} -500- data - ${util.inspect(data)}  config - ${util.inspect(config)}`);
  this.res.status(500);
  this.res.jsonx(response);
};
