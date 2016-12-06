module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    poslovnice: {
      collection: 'poslovnica',
      via: 'opstina',
    },

    takse: {
      collection: 'taksa',
      via: 'opstina',
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
