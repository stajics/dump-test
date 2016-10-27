"use strict";

import { omit } from 'lodash';

module.exports = {
  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'rola']);
      if( (values.poslovnica !== req.user.poslovnica) && req.user.rola !== 'super_user' ) {
        return res.unauthorized("Can't create users from other poslovnica.");
      }
      let newUser = await User.create(values);
      res.created({user: newUser, token: CipherService.jwt.encodeSync({id: newUser.id})});
    } catch (err) {
      res.badRequest(err);
    };
  }
};
