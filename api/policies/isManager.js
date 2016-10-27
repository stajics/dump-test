"use strict";

module.exports = (req, res, next) => {
    if (!(req.user.rola === 'menadzer' || req.user.rola === 'super_user')){
      return res.unauthorized(null, {
        data: {
          message: 'User is not menadzer!'
        }
      });
    }
    next();
};
