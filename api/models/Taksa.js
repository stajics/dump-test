"use strict";

module.exports = {
  schema: true,

  attributes: {
    usluga: {
      type: 'string',
      required: true
    },

    opstina: {
      type: 'integer',
      defaultsTo: 0
    },

    vrstaVozila: {
      type: 'string',
      required: true
    },

    godisteOd: {
      type: 'integer'
    },

    godisteDo: {
      type: 'integer'
    },

    zapreminaOd: {
      type: 'integer'
    },

    zapreminaDo: {
      type: 'integer'
    },

    snagaOd: {
      type: 'integer'
    },

    snagaDo: {
      type: 'integer'
    },

    brSedistaOd: {
      type: 'integer'
    },

    brSedistaDo: {
      type: 'integer'
    },

    nosivostOd: {
      type: 'integer'
    },

    nosivostDo: {
      type: 'integer'
    },

    cena: {
      type: 'integer',
      required: true
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  }

};
