import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      values.poslovnica = req.user.poslovnica.id;
      const newLice = await Lice.create(values);
      res.created({ lice: newLice });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let lica = null;
      if (req.params.id) {
        lica = await Lice.findOne({ id: req.params.id, poslovnica: req.user.poslovnica.id });
        res.ok({ lice: lica });
      } else {
        lica = await Lice.find({ poslovnica: req.user.poslovnica.id });
        res.ok({ lice: lica });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedLice = await Lice.update({ id: req.params.id, poslovnica: req.user.poslovnica.id }, values);
      if (isEmpty(updatedLice)) {
        return res.notFound('No lice with that ID.');
      }
      return res.ok({ lice: updatedLice[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const liceForDelete = await Lice.destroy({ id: req.params.id, poslovnica: req.user.poslovnica.id });
      if (isEmpty(liceForDelete)) {
        return res.notFound('No lice with that ID.');
      }
      return res.ok({ lice: liceForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
