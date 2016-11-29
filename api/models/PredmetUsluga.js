module.exports = {
  schema: true,

  attributes: {
    predmet: {
      model: 'predmet',
      required: true,
    },

    usluga: {
      model: 'usluga',
      required: true,
    },

    cena: {
      type: 'float',
    },

    dug: {
      type: 'float',
    },

    uplate: {
      collection: 'uplata',
      via: 'predmetUsluga',
      through: 'uplatapredmetusluga',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

  // Lifecycle Callbacks
  beforeCreate: (values, next) => {
    values.cena = 0.0;  // eslint-disable-line
    values.placeno = 0.0;  // eslint-disable-line
    next();
  },

};
