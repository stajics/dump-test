import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newBanka = await Banka.create(values);
      res.created({ banka: newBanka });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let banke = null;
      if (req.params.id) {
        banke = await Banka.findOne({ id: req.params.id });
        res.ok({ banka: banke });
      } else {
        banke = await Banka.find();
        res.ok({ banke });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedBanka = await Banka.update({ id: req.params.id }, values);
      if (isEmpty(updatedBanka)) {
        return res.notFound('No banka with that ID.');
      }
      return res.ok({ banka: updatedBanka[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const bankaForDelete = await Banka.destroy({ id: req.params.id });
      if (isEmpty(bankaForDelete)) {
        return res.notFound('No banka with that ID.');
      }
      return res.ok({ banka: bankaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
