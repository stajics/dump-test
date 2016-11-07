"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newOsiguranje = await Osiguranje.create(values);
      res.created({osiguranje: newOsiguranje});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let osiguranja = null;
      if( req.params.id ){
        osiguranja = await Osiguranje.findOne({id: req.params.id});
        res.ok({ osiguranje: osiguranja });
        } else {
        osiguranja = await Osiguranje.find();
        res.ok({ osiguranje: osiguranja });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedOsiguranje = await Osiguranje.update({ id: req.params.id }, values);
      if( isEmpty(updatedOsiguranje) ) {
        return res.notFound("No osiguranje with that ID.");
      }
      res.ok({osiguranje: updatedOsiguranje[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let osiguranjeForDelete = await Osiguranje.destroy({ id: req.params.id });
        if( isEmpty(osiguranjeForDelete) ) {
          return res.notFound("No osiguranje with that ID.");
        }
        res.ok({osiguranje: osiguranjeForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
