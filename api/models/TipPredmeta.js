module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    usluge: {
      collection: 'usluga',
      via: 'tipoviPredmeta',
    },

    takse: {
      collection: 'taksa',
      via: 'tipoviPredmeta',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
