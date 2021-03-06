module.exports = {
  schema: true,

  attributes: {
    tip: {
      type: 'string',
      required: true,
    },

    nazivFirme: {
      type: 'string',
    },

    ime: {
      type: 'string',
      required: true,
    },

    prezime: {
      type: 'string',
      required: true,
    },

    adresa: {
      type: 'string',
    },

    maticniBroj: {
      type: 'string',
      required: true,
      unique: true,
    },

    licnaKarta: {
      type: 'string',
      required: true,
      unique: true,
    },

    pib: {
      type: 'string',
    },

    ziroRacun: {
      type: 'string',
    },

    telFiksni: {
      type: 'string',
    },

    telMobilni: {
      type: 'string',
    },

    kontakt: {
      type: 'string',
    },

    email: {
      type: 'string',
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    vozila: {
      collection: 'vozilo',
      via: 'lice',
    },

    predmetiKorisnik: {
      collection: 'predmet',
      via: 'liceKorisnik',
    },

    predmetiVlasnik: {
      collection: 'predmet',
      via: 'liceVlasnik',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
