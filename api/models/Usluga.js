module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    opis: {
      type: 'string',
    },

    cena: {
      type: 'string',
      required: true,
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
