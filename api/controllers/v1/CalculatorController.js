"use strict";

import { omit, get, isEmpty } from 'lodash';
import { constructFilterTakseQuery, constructFilterStavkeOsiguranjaQuery } from '../../utils/CalculatorUtil.js';

module.exports = {

  filterTakse: async(req, res) => {
    try {
      let usersPoslovnica = await Poslovnica.findOne({id: req.user.poslovnica});
      req.query.opstina = usersPoslovnica.opstina;
      let takse = await Taksa.find({or : constructFilterTakseQuery(req.query)});
      res.ok({taksa: takse});
    } catch (err) {
      res.badRequest(err);
    };
  },

  filterStavkeOsiguranja: async(req, res) => {
    try {
      let stavkeOsiguranja = await StavkaOsiguranja.find({or : constructFilterStavkeOsiguranjaQuery(req.query)}).populateAll();
      res.ok({stavkaOsiguranja: stavkeOsiguranja});
    } catch (err) {
      res.badRequest(err);
    };
  }

};
