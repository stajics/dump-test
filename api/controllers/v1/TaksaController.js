import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      if (req.user.rola !== 'super_user') {
        values.isDefault = false;
      }
      const newTaksa = await Taksa.create(values);
      res.created({ taksa: newTaksa });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let takse = null;
      switch (req.user.rola) {
        case 'super_user':
          if (req.params.id) {
            takse = await Taksa.findOne({ id: req.params.id });
            return res.ok({ taksa: takse });
          }
          takse = await Taksa.find();
          return res.ok({ taksa: takse });
        default:
          if (req.params.id) {
            takse = await Taksa.findOne({
              or: [{
                id: req.params.id,
                opstina: null,
              },
              {
                id: req.params.id,
                opstina: req.user.poslovnica.opstina,
              }],
            });
            return res.ok({ taksa: takse });
          }
          takse = await Taksa.find({
            or: [{
              opstina: null,
            },
            {
              opstina: req.user.poslovnica.opstina,
            }],
          });
          return res.ok({ taksa: takse });
      }
    } catch (err) {
      return res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedTaksa = await Taksa.update({ id: req.params.id }, values);
      if (isEmpty(updatedTaksa)) {
        return res.notFound('No taksa with that ID.');
      }
      return res.ok({ taksa: updatedTaksa[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const taksaForDelete = await Taksa.destroy({ id: req.params.id });
      if (isEmpty(taksaForDelete)) {
        return res.notFound('No taksa with that ID.');
      }
      return res.ok({ taksa: taksaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
