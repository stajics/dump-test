import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newOpstina = await Opstina.create(values);
      return res.created({ opstina: newOpstina });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let opstine = null;
      if (req.params.id) {
        opstine = await Opstina.findOne({ id: req.params.id });
        return res.ok({ opstina: opstine });
      }
      opstine = await Opstina.find();
      return res.ok({ opstina: opstine });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedOpstina = await Opstina.update({ id: req.params.id }, values);
      if (isEmpty(updatedOpstina)) {
        return res.notFound('No opstina with that ID.');
      }
      return res.ok({ opstina: updatedOpstina[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const opstinaForDelete = await Opstina.destroy({ id: req.params.id });
      if (isEmpty(opstinaForDelete)) {
        return res.notFound('No opstina with that ID.');
      }
      return res.ok({ opstina: opstinaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
