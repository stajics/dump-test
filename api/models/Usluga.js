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

    vrstaVozila: {
      type: 'string',
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    tipoviPredmeta: {
      collection: 'tipPredmeta',
      via: 'usluge',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
