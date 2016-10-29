"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newOpstina = await Opstina.create(values);
      res.created({opstina: newOpstina});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let opstine = null;
      if( req.params.id ){
        opstine = await Opstina.findOne({id: req.params.id});
        res.ok({ opstina: opstine });
        } else {
        opstine = await Opstina.find();
        res.ok({ opstina: opstine });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedOpstina = await Opstina.update({ id: req.params.id }, values);
      if( isEmpty(updatedOpstina) ) {
        return res.notFound("No opstina with that ID.");
      }
      res.ok({opstina: updatedOpstina[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let opstinaForDelete = await Opstina.destroy({ id: req.params.id });
        if( isEmpty(opstinaForDelete) ) {
          return res.notFound("No opstina with that ID.");
        }
        res.ok({opstina: opstinaForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
