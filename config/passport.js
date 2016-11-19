

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */
const secrets = require('./secrets').secrets;
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKey: secrets.jwtSecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  authScheme: 'Bearer',
  session: false,
  passReqToCallback: true,
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
 /* eslint no-underscore-dangle: 'off' */
const _onLocalStrategyAuth = (req, username, password, next) => {
  User
    .findOne({ [LOCAL_STRATEGY_CONFIG.usernameField]: username }).populate('poslovnica')
    .then((user) => {
      if (!user) {
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
      if (!user.poslovnica.isActive) {
        return next(null, null, sails.config.errors.POSLOVNICA_INACTIVE);
      }
      if (password !== CipherService.decrypt(user.password)) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, user, {});
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
  User
    .findOne({ id: payload.id }).populate('poslovnica')
    .then((user) => {
      if (!user) {
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
      if (!user.poslovnica.isActive) {
        return next(null, null, sails.config.errors.POSLOVNICA_INACTIVE);
      }
      return next(null, user, {});
    })
    .catch(next);
};


module.exports = {
  passport: {
    /**
     * Triggers when all Passport steps is done and user profile is parsed
     * @param {Object} req Request object
     * @param {Object} res Response object
     * @param {Object} error Object with error info
     * @param {Object} user User object
     * @param {Object} info Information object
     * @returns {*}
     * @private
     */
    onPassportAuth(req, res, error, user, info) {
      if (error || !user) return res.unauthorized(error, info);
      return res.ok({
        user,
        token: CipherService.jwt.encodeSync({ id: user.id }),
      });
    },
  },
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
