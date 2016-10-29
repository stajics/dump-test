"use strict";

module.exports = {
  schema: true,

  attributes: {
    usluga: {
      type: 'string'
    },

    opstina: {
      type: 'integer'
    },

    vrstaVozila: {
      type: 'string'
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

    starostOd: {
      type: 'integer'
    },

    starostDo: {
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
      type: 'integer'
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  }

};
