"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newPoslovnica = await Poslovnica.create(values);
      res.created({poslovnica: newPoslovnica});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let poslovnice = null;
      if( req.params.id ){
        poslovnice = await Poslovnica.findOne({id: req.params.id});
        res.ok({ poslovnica: poslovnice });
        } else {
        poslovnice = await Poslovnica.find();
        res.ok({ poslovnice });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedPoslovnica = await Poslovnica.update({ id: req.params.id }, values);
      if( isEmpty(updatedPoslovnica) ) {
        return res.notFound("No poslovnica with that ID.");
      }
      res.ok({poslovnica: updatedPoslovnica[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let poslovnicaForDelete = await Poslovnica.destroy({ id: req.params.id });
        if( isEmpty(poslovnicaForDelete) ) {
          return res.notFound("No poslovnica with that ID.");
        }
        res.ok({poslovnica: poslovnicaForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
