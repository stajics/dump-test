/**
 * 401 (Unauthorized) Response
 *
 * Similar to 403 Forbidden.
 * Specifically for use when authentication is possible but has failed or not yet been provided.
 * Error code response for missing or invalid authentication token.
 */
const util = require('util');

module.exports = function unauthorized(data, config) { // TODO adjust response to signin without params to meet JSend
  if (sails.config.log.consoleLogErrorResponses) {
   console.log(data);
  }

  const response = Object.assign({
    status: 'fail',
    data: data || null,
  }, config);

  LoggerService.logger.error(`${this.req.method} ${this.req.path} -body- ${util.inspect(this.req.body)} -401- data - ${util.inspect(data)}  config - ${util.inspect(config)}`);
  this.res.status(401);
  this.res.jsonx(response);
};
