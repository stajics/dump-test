module.exports = {
  schema: true,

  attributes: {
    vrstaVozila: {
      type: 'string',
      required: true,
    },

    registarskiBr: {
      type: 'string',
      required: true,
    },

    marka: {
      type: 'string',
    },

    tip: {
      type: 'string',
    },

    model: {
      type: 'string',
    },

    godiste: {
      type: 'integer',
    },

    snagaKw: {
      type: 'integer',
    },

    zapremina: {
      type: 'integer',
    },

    nosivost: {
      type: 'integer',
    },

    masa: {
      type: 'integer',
    },

    maxMasa: {
      type: 'integer',
    },

    gorivo: {
      type: 'string',
    },

    boja: {
      type: 'string',
    },

    brSasije: {
      type: 'string',
    },

    brMotora: {
      type: 'string',
      required: true,
    },

    brOsovina: {
      type: 'string',
    },

    homoOznaka: {
      type: 'string',
    },

    prvaReg: {
      type: 'string',
    },

    mestaSedenje: {
      type: 'integer',
    },

    mestaStajanje: {
      type: 'integer',
    },

    istekReg: {
      type: 'string',
    },

    sestomesecni: {
      type: 'boolean',
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    lice: {
      model: 'lice',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
