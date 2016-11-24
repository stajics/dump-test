import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      values.poslovnica = req.user.poslovnica.id;
      const newVozilo = await Vozilo.create(values);
      res.created({ vozilo: newVozilo });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let vozila = null;
      if (req.params.id) {
        vozila = await Vozilo.findOne({ id: req.params.id, poslovnica: req.user.poslovnica.id });
        res.ok({ vozilo: vozila });
      } else {
        vozila = await Vozilo.find({ poslovnica: req.user.poslovnica.id });
        res.ok({ vozilo: vozila });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedVozilo = await Vozilo.update({ id: req.params.id, poslovnica: req.user.poslovnica.id }, values);
      if (isEmpty(updatedVozilo)) {
        return res.notFound('No vozilo with that ID.');
      }
      return res.ok({ vozilo: updatedVozilo[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const voziloForDelete = await Vozilo.destroy({ id: req.params.id, poslovnica: req.user.poslovnica.id });
      if (isEmpty(voziloForDelete)) {
        return res.notFound('No vozilo with that ID.');
      }
      return res.ok({ vozilo: voziloForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
