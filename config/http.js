

/**
 * HTTP Server Settings
 * Configuration for the underlying HTTP server in Sails
 */
 /* eslint max-len: 'off', global-require: 'off', no-param-reassign: 'off' */
const util = require('util');
const morgan = require('morgan');

module.exports = {
  /**
   * Port where to run this app
   * @type {Number}
   */
  port: 3000,

  /**
   * Your SSL certificates
   * @description They are should be as result of fs.readFileSync() method
   * @type {Object}
   * @example
   * ssl: {
   *    cert: fs.readFileSync('your/path/to/cert.pem'),
   *    key: fs.readFileSync('your/path/to/key.pem')
   * }
   */
  ssl: {
    cert: false,
    key: false,
  },

  http: {
    /**
     * This is the options object for the `createServer` method, as discussed here:
     * http://nodejs.org/api/https.html#https_class_https_server
     *
     * @type {Object|Boolean}
     */
    serverOptions: undefined,

    /**
     * You can define own custom middleware here
     * @param app Express application
     */
    customMiddleware: (app) => {

    },

    /**
     * Configures the middleware function used for parsing the HTTP request body
     * Defaults to the Formidable-based version built into Express/Connect
     *
     * To enable streaming file uploads (to disk or somewhere else)
     * you'll want to set this option to `false` to disable the body parser
     *
     * @type {Function|Boolean|Object}
     */
    bodyParser: undefined,

    /**
     * Express middleware to use for every Sails request
     * @type {Object}
     */
    middleware: {
      /**
       * Middleware for setting Connection: keep-alive to all responses
       */
      keepAlive: (req, res, next) => {
        res.set('Connection', 'keep-alive');
        next();
      },

      morgan: process.env.NODE_ENV !== 'test' ? morgan('dev') : null,

      500: (err, req, res, next) => {
        err = util.inspect(err);
        const response = {
          status: 'error',
          message: 'Something bad happened on the server.',
          data: err || null,
        };

        if (typeof res.negotiate === 'function') {
          return res.negotiate(err);
        }
        res.status(500);
        return res.json(response);
      },
      /**
       * The order in which middleware should be run for HTTP request
       * @type {Array}
       */
      order: [
        'morgan',
        'compress',
        'keepAlive',
        'bodyParser',
        '$custom',
        'router',
        '404',
        '500',
      ],
    },
  },
};
