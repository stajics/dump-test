module.exports = {
  schema: true,

  attributes: {
    predmetUsluga: {
      model: 'predmetUsluga',
      required: true,
    },

    uplata: {
      model: 'uplata',
      required: true,
    },

    iznos: {
      type: 'float',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

  // Lifecycle Callbacks
  beforeCreate: (values, next) => {
  //  values.cena = 0.0;  // eslint-disable-line
  //  values.placeno = 0.0;  // eslint-disable-line
    console.log(values);
    next();
  },

};
