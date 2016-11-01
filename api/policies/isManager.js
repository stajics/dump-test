"use strict";

module.exports = (req, res, next) => {
    if (req.user.rola === 'korisnik'){
      return res.unauthorized(null, {
        data: {
          message: 'User is not menadzer!'
        }
      });
    }
    next();
};
