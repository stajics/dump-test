/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */
const util = require('util');

module.exports = function notFound(data, config) {
  const response = Object.assign({
    status: 'fail',
    data: data || {
      message: 'The requested resource could not be found but may be available again in the future.',
    },
  }, config);

  LoggerService.logger.error(`${this.req.method} ${this.req.path} -body- ${util.inspect(this.req.body)} -404-`);
  this.res.status(404);
  this.res.jsonx(response);
};
