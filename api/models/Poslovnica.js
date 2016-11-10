module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    adresa: {
      type: 'string',
    },

    pib: {
      type: 'string',
    },

    matBr: {
      type: 'string',
    },

    ziro: {
      type: 'string',
    },

    telefon: {
      type: 'string',
    },

    email: {
      type: 'email',
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },

    users: {
      collection: 'user',
      via: 'poslovnica',
    },

    usluge: {
      collection: 'usluga',
      via: 'poslovnica',
    },

    osiguranja: {
      collection: 'osiguranje',
      via: 'poslovnice',
    },

    opstina: {
      model: 'opstina',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
