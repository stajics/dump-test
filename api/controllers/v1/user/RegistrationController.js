

import { omit } from 'lodash';

module.exports = {
  create: async (req, res) => {
    try {
      let values = omit(req.allParams(), ['id']);
      if ((values.poslovnica !== req.user.poslovnica.id) && req.user.rola !== 'super_user') {
        return res.unauthorized("Can't create users from other poslovnica.");
      }
      if (req.user.rola !== 'super_user') {
        values = omit(req.allParams(), ['rola']);
      }
      const newUser = await User.create(values);
      return res.created({ user: newUser, token: CipherService.jwt.encodeSync({ id: newUser.id }) });
    } catch (err) {
      return res.badRequest(err);
    }
  },
};
