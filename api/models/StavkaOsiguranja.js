module.exports = {
  schema: true,

  attributes: {
    osiguranje: {
      model: 'osiguranje',
      required: true,
    },

    vrstaVozila: {
      type: 'string',
      required: true,
    },

    kwOd: {
      type: 'integer',
    },

    kwDo: {
      type: 'integer',
    },

    nosivostOd: {
      type: 'integer',
    },

    nosivostDo: {
      type: 'integer',
    },

    ccmOd: {
      type: 'integer',
    },

    ccmDo: {
      type: 'integer',
    },

    brMestaOd: {
      type: 'integer',
    },

    brMestaDo: {
      type: 'integer',
    },

    cena: {
      type: 'integer',
      required: true,
    },

    popust: {
      type: 'integer',
    },

    izuzetak: {
      type: 'string',
    },

    opis: {
      type: 'string',
    },

    predmeti: {
      collection: 'predmet',
      via: 'stavkaOsiguranja',
      through: 'predmetstavka',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
