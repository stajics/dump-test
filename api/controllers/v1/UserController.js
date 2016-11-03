"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {
  read: async(req, res) => {
    try {
      let users = null;
      if( req.user.rola === 'super_user') {
        if( req.params.id ){
          users = await User.findOne({id: req.params.id});
          res.ok({ user: users });
          } else {
          users = await User.find();
          res.ok({ users });
        }
      } else {
        if( req.params.id ){
          users = await User.findOne({id: req.params.id, poslovnica: req.user.poslovnica.id});
          res.ok({ user: users });
          } else {
          users = await User.find({poslovnica: req.user.poslovnica.id});
          res.ok({ users });
        }
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'password']);
      let userForUpdate = await User.findOne({ id: req.params.id });
      if( isEmpty(userForUpdate) ) {
        return res.notFound("No user with that ID.");
      }
      if( (userForUpdate.poslovnica !== req.user.poslovnica.id) && req.user.rola !== 'super_user' ) {
        return res.unauthorized("Can't update users from other poslovnica.");
      }
      let updatedUser = await User.update({ id: req.params.id }, values);
      res.ok({user: updatedUser[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let userForDelete = await User.findOne({ id: req.params.id });
        if( isEmpty(userForDelete) ) {
          return res.notFound("No user with that ID.");
        }
        if( userForDelete.id === req.user.id ) {
          return res.badRequest("Can't delete urself.");
        }
        if( (userForDelete.poslovnica !== req.user.poslovnica.id) && req.user.rola !== 'super_user' ) {
          return res.unauthorized("Can't delete users from other poslovnica.");
        }
        await userForDelete.destroy();
        delete userForDelete.password;
        res.ok({user: userForDelete});
    } catch (err) {
      res.badRequest(err);
    };
  },

};
