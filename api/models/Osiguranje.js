"use strict";

module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true
    },

    vrstaVozila: {
      type: 'string',
      required: true
    },

    kwOd: {
      type: 'string',
      required: true
    },

    kwDo: {
      type: 'string',
      required: true
    },

    nosivost: {
      type: 'string',
      required: true
    },

    ccm: {
      type: 'string',
      required: true
    },

    brMesta: {
      type: 'string',
      required: true
    },

    cena: {
      type: 'string',
      required: true
    },

    cena5: {
      type: 'string',
      required: true
    },

    cena10: {
      type: 'string',
      required: true
    },

    cena15: {
      type: 'string',
      required: true
    },

    poslovnice: {
      collection: 'poslovnica',
      via: 'osiguranja'
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  }

};
