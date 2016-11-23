module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    telefon: {
      type: 'string',
    },

    email: {
      type: 'email',
    },

    izuzetak: {
      type: 'string',
    },

    poslovnice: {
      collection: 'poslovnica',
      via: 'osiguranja',
    },

    stavkeOsiguranja: {
      collection: 'stavkaOsiguranja',
      via: 'osiguranje',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
