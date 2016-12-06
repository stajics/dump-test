module.exports = {
  schema: true,

  attributes: {
    nazivTakse: {
      model: 'nazivTakse',
      required: true,
    },

    opstina: {
      model: 'opstina',
    },

    vrstaVozila: {
      type: 'string',
    },

    godisteOd: {
      type: 'integer',
    },

    godisteDo: {
      type: 'integer',
    },

    zapreminaOd: {
      type: 'integer',
    },

    zapreminaDo: {
      type: 'integer',
    },

    snagaOd: {
      type: 'integer',
    },

    snagaDo: {
      type: 'integer',
    },

    brSedistaOd: {
      type: 'integer',
    },

    brSedistaDo: {
      type: 'integer',
    },

    nosivostOd: {
      type: 'integer',
    },

    nosivostDo: {
      type: 'integer',
    },

    cena: {
      type: 'integer',
      required: true,
    },

    izuzetak: {
      type: 'string',
    },

    isDefault: {
      type: 'boolean',
      defaultsTo: true,
    },

    komentar: {
      type: 'string',
    },

    tipoviPredmeta: {
      collection: 'tipPredmeta',
      via: 'takse',
    },

    predmeti: {
      collection: 'predmet',
      via: 'taksa',
      through: 'predmettaksa',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
