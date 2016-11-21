import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newNazivTakse = await NazivTakse.create(values);
      res.created({ nazivTakse: newNazivTakse });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let naziviTaksa = null;
      if (req.params.id) {
        naziviTaksa = await NazivTakse.findOne({ id: req.params.id });
        res.ok({ nazivTakse: naziviTaksa });
      } else {
        naziviTaksa = await NazivTakse.find();
        res.ok({ naziviTaksa });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedNazivTakse = await NazivTakse.update({ id: req.params.id }, values);
      if (isEmpty(updatedNazivTakse)) {
        return res.notFound('No nazivTakse with that ID.');
      }
      return res.ok({ nazivTakse: updatedNazivTakse[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const nazivTakseForDelete = await NazivTakse.destroy({ id: req.params.id });
      if (isEmpty(nazivTakseForDelete)) {
        return res.notFound('No nazivTakse with that ID.');
      }
      return res.ok({ nazivTakse: nazivTakseForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
