"use strict";

module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true
    },

    telefon: {
      type: 'string'
    },

    email: {
      type: 'email'
    },

    poslovnice: {
      collection: 'poslovnica',
      via: 'osiguranja'
    },

    stavkeOsiguranja: {
      collection: 'stavkaOsiguranja',
      via: 'osiguranje'
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  }

};
