"use strict";

module.exports = (req, res, next) => {
    if (req.user.rola !== 'super_user') {
      return res.unauthorized(null, {
        data: {
          message: 'User is not super user!'
        }
    });
    }
    next();
};
