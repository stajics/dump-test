import { constructFilterTakseQuery, constructFilterStavkeOsiguranjaQuery } from '../../utils/CalculatorUtil';

module.exports = {

  filterTakse: async (req, res) => {
    try {
      const query = req.query;
      query.opstina = req.user.poslovnica.opstina;
      const takse = await Taksa.find({ or: constructFilterTakseQuery(query) }).populate('nazivTakse');
      return res.ok({ taksa: takse });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  filterStavkeOsiguranja: async (req, res) => {
    try {
      const stavkeOsiguranja = await StavkaOsiguranja.find({ or: constructFilterStavkeOsiguranjaQuery(req.query) }).populateAll();
      return res.ok({ stavkaOsiguranja: stavkeOsiguranja });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
