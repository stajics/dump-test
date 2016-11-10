import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newPoslovnica = await Poslovnica.create(values);
      res.created({ poslovnica: newPoslovnica });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let poslovnice = null;
      if (req.user.rola !== 'super_user') {
        return res.ok({ poslovnica: req.user.poslovnica });
      }
      if (req.params.id) {
        poslovnice = await Poslovnica.findOne({ id: req.params.id }).populateAll();
        return res.ok({ poslovnica: poslovnice });
      }
      poslovnice = await Poslovnica.find().populateAll();
      return res.ok({ poslovnica: poslovnice });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const poslovnicaToUpdate = await Poslovnica.findOne({ id: req.params.id });
      if (isEmpty(poslovnicaToUpdate)) {
        return res.notFound('No poslovnica with that ID.');
      }
      if ((poslovnicaToUpdate.id !== req.user.poslovnica.id) && !req.user.rola === 'super_user') {
        return res.unauthorized('Can\'t update another poslovnica.');
      }
      let updatedPoslovnica = await Poslovnica.update({ id: req.params.id }, values);
      updatedPoslovnica = await Poslovnica.findOne({ id: updatedPoslovnica[0].id }).populateAll();
      return res.ok({ poslovnica: updatedPoslovnica });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const poslovnicaForDelete = await Poslovnica.destroy({ id: req.params.id });
      if (isEmpty(poslovnicaForDelete)) {
        return res.notFound('No poslovnica with that ID.');
      }
      return res.ok({ poslovnica: poslovnicaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
