"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newTaksa = await Taksa.create(values);
      res.created({taksa: newTaksa});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let takse = null;
      if( req.params.id ){
        takse = await Taksa.findOne({id: req.params.id});
        res.ok({ taksa: takse });
        } else {
        takse = await Taksa.find();
        res.ok({ taksa: takse });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedTaksa = await Taksa.update({ id: req.params.id }, values);
      if( isEmpty(updatedTaksa) ) {
        return res.notFound("No taksa with that ID.");
      }
      res.ok({taksa: updatedTaksa[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let taksaForDelete = await Taksa.destroy({ id: req.params.id });
        if( isEmpty(taksaForDelete) ) {
          return res.notFound("No taksa with that ID.");
        }
        res.ok({taksa: taksaForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
