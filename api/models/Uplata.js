module.exports = {
  schema: true,

  attributes: {
    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    predmet: {
      model: 'predmet',
    },

    usluga: {
      model: 'usluga',
    },

    user: {
      model: 'user',
      required: true,
    },

    predmetTakse: {
      collection: 'predmetTaksa',
      via: 'uplata',
      through: 'uplatapredmettaksa',
    },

    predmetStavkeOsiguranja: {
      collection: 'predmetStavka',
      via: 'uplata',
      through: 'uplatapredmetstavka',
    },

    predmetUsluge: {
      collection: 'predmetUsluga',
      via: 'uplata',
      through: 'uplatapredmetusluga',
    },

    iznos: {
      type: 'float',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
