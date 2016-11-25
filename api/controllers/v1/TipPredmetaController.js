import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      values.poslovnica = req.user.poslovnica.id;
      const newTipPredmeta = await TipPredmeta.create(values);
      res.created({ tipPredmeta: newTipPredmeta });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let tipoviPredmeta = null;
      if (req.params.id) {
        tipoviPredmeta = await TipPredmeta.findOne({ id: req.params.id, poslovnica: req.user.poslovnica.id }).populateAll();
        res.ok({ tipPredmeta: tipoviPredmeta });
      } else {
        tipoviPredmeta = await TipPredmeta.find({ poslovnica: req.user.poslovnica.id }).populateAll();
        res.ok({ tipPredmeta: tipoviPredmeta });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedTipPredmeta = await TipPredmeta.update({ id: req.params.id, poslovnica: req.user.poslovnica.id }, values);
      if (isEmpty(updatedTipPredmeta)) {
        return res.notFound('No tipPredmeta with that ID.');
      }
      return res.ok({ tipPredmeta: updatedTipPredmeta[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const tipPredmetaForDelete = await TipPredmeta.destroy({ id: req.params.id, poslovnica: req.user.poslovnica.id });
      if (isEmpty(tipPredmetaForDelete)) {
        return res.notFound('No tipPredmeta with that ID.');
      }
      return res.ok({ tipPredmeta: tipPredmetaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
