module.exports = {
  schema: true,

  attributes: {
    cena: {
      type: 'float',
      required: true,
    },

    dug: {
      type: 'float',
      required: true,
    },

    provizija: {
      type: 'float',
      required: true,
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    user: {
      model: 'user',
      required: true,
    },

    tipPredmeta: {
      model: 'tipPredmeta',
      required: true,
    },

    uplate: {
      collection: 'uplata',
      via: 'predmet',
    },

    takse: {
      collection: 'taksa',
      via: 'predmet',
      through: 'predmettaksa',
    },

    stavkeOsiguranja: {
      collection: 'stavkaOsiguranja',
      via: 'predmet',
      through: 'predmetstavka',
    },

    usluge: {
      collection: 'usluga',
      via: 'predmet',
      through: 'predmetusluga',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
