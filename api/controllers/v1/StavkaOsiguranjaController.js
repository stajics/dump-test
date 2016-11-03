"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newStavkaOsiguranja = await StavkaOsiguranja.create(values);
      res.created({stavkaOsiguranja: newStavkaOsiguranja});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let stavkeOsiguranja = null;
      if( req.params.id ){
        stavkeOsiguranja = await StavkaOsiguranja.findOne({id: req.params.id});
        res.ok({ stavkaOsiguranja: stavkeOsiguranja });
        } else {
        stavkeOsiguranja = await StavkaOsiguranja.find();
        res.ok({ stavkaOsiguranja: stavkeOsiguranja });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedStavkaOsiguranja = await StavkaOsiguranja.update({ id: req.params.id }, values);
      if( isEmpty(updatedStavkaOsiguranja) ) {
        return res.notFound("No stavkaOsiguranja with that ID.");
      }
      res.ok({stavkaOsiguranja: updatedStavkaOsiguranja[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let stavkaOsiguranjaForDelete = await StavkaOsiguranja.destroy({ id: req.params.id });
        if( isEmpty(stavkaOsiguranjaForDelete) ) {
          return res.notFound("No stavkaOsiguranja with that ID.");
        }
        res.ok({stavkaOsiguranja: stavkaOsiguranjaForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
