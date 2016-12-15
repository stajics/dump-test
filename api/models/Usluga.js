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

    uplate: {
      collection: 'uplata',
      via: 'predmet',
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

    predmeti: {
      collection: 'predmet',
      via: 'usluga',
      through: 'predmetusluga',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
