/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */
const util = require('util');

module.exports = function badRequest(data, config) {
  if (sails.config.log.consoleLogErrorResponses) {
    console.log(data);
  }
  const responseData = util.inspect(data);
  const response = Object.assign({
    status: 'fail',
    data: responseData || null,
  }, config);

  LoggerService.logger.error(`${this.req.method} ${this.req.path} -body- ${util.inspect(this.req.body)} -400- data - ${util.inspect(data)}  config - ${util.inspect(config)}`);
  this.res.status(400);
  this.res.jsonx(response);
};
