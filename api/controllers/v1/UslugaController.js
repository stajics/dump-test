// Usluga, usluga, usluge
import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      values.poslovnica = req.user.poslovnica.id;
      const newUsluga = await Usluga.create(values);
      res.created({ usluga: newUsluga });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let usluge = null;
      if (req.user.rola === 'super_user') {
        if (req.params.id) {
          usluge = await Usluga.findOne({ id: req.params.id });
          res.ok({ usluga: usluge });
        } else {
          usluge = await Usluga.find().populateAll();
          res.ok({ usluga: usluge });
        }
      } else if (req.params.id) {
        usluge = await Usluga.findOne({ id: req.params.id, poslovnica: req.user.poslovnica.id });
        res.ok({ usluga: usluge });
      } else {
        usluge = await Usluga.find({ poslovnica: req.user.poslovnica.id });
        res.ok({ usluga: usluge });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'poslovnica']);
      const uslugaToUpdate = await Usluga.findOne({ id: req.params.id });
      if (isEmpty(uslugaToUpdate)) {
        return res.notFound('No usluga with that ID.');
      }
      if (uslugaToUpdate.poslovnica !== req.user.poslovnica.id) {
        return res.unauthorized('Can\'t update usluga from another poslovnica.');
      }
      const updatedUsluga = await Usluga.update({ id: req.params.id }, values);
      return res.ok({ usluga: updatedUsluga[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const uslugaToDelete = await Usluga.findOne({ id: req.params.id });
      if (isEmpty(uslugaToDelete)) {
        return res.notFound('No usluga with that ID.');
      }
      if (uslugaToDelete.poslovnica !== req.user.poslovnica.id) {
        return res.unauthorized('Can\'t delete usluga from another poslovnica.');
      }
      const uslugaForDelete = await Usluga.destroy({ id: req.params.id });
      return res.ok({ usluga: uslugaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
